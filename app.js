// built-in modules
var path = require('path');


// npm-installed modules
var bodyParser = require('body-parser');
var config = require('config');
var Debug = require('debug');
var express = require('express');
var nunjucks = require('nunjucks');


// own modules
var engine = require('./engine');
var routes = require('./routes');
var webConfig = require('./web/config');


// module variables
var app = express();
var debug = Debug('mmtc-ke:app');
var nunjucksEnv;


debug('initializing engine');
engine.init();


debug('configuring nunjucks');
nunjucksEnv = nunjucks.configure('web', {
    autoescape: true,
    express: app,
});


debug("adding global variables for nunjucks templates");
nunjucksEnv.addGlobal("site", config.get("site"));
nunjucksEnv.addGlobal("env", process.env);


debug('setting up views');
app.set('views', path.join(__dirname, 'web'));


debug('setting up default engine extension');
app.set('view engine', 'html');


debug('disabling Express view cache');
app.set("view cache", false);


debug('mounting middleware for parsing request body');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false  }));


debug('mouting middleware for serving static files');
routes.utils.webMiddleware(app, webConfig);


debug('adding routes');
app.use(routes);


debug('mounting catch-all handler');
app.use(function(req, res, next) {
    return next(new Error('404'));
});


debug('mounting middleware for error handling');
app.use(function(err, req, res, next) {
    console.error(err);
    return res.status(500).end();
    return routes.utils.renderPage(req, res, 'errors/index', {
        error: err,
    });
});


debug('starting server');
app.listen(config.get('server.port'), config.get('server.ip'), function() {
    debug('server started at http://%s:%s', config.get('server.ip'), config.get('server.port'));
});
