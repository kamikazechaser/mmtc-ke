/**
 * The MIT License (MIT)
 * Copyright (c) 2016 GochoMugo <mugo@forfuture.co.ke>
 * Copyright (c) 2016 Forfuture, LLC <we@forfuture.co.ke>
 *
 * Mobile Money Transaction Costs (MMTC).
 */


// built-in modules
const path = require('path');


// npm-installed modules
const bodyParser = require('body-parser');
const config = require('config');
const Debug = require('debug');
const express = require('express');
const nunjucks = require('nunjucks');


// own modules
const engine = require('./engine');
const routes = require('./routes');
const webConfig = require('./web/config');
const pkg = require('./package.json');


// module variables
const app = express();
const debug = Debug('mmtc-ke:app');
const logger = engine.clients.getLogger();
let nunjucksEnv;
const devmode = app.get('env') === 'development';


debug('initializing engine');
engine.init();


debug('configuring nunjucks');
nunjucksEnv = nunjucks.configure('web', {
  autoescape: true,
  express: app,
  noCache: devmode ? true : false,
});


debug('adding global variables for nunjucks templates');
nunjucksEnv.addGlobal('pkg', pkg);
nunjucksEnv.addGlobal('site', config.get('site'));
nunjucksEnv.addGlobal('env', process.env);


debug('setting up views');
app.set('views', path.join(__dirname, 'web'));


debug('setting up default engine extension');
app.set('view engine', 'html');


debug('disabling Express view cache');
app.set('view cache', false);


debug('mounting middleware for parsing request body');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


debug('mounting middleware for serving static files');
routes.utils.webMiddleware(app, webConfig);


debug('adding routes');
app.use(routes);


debug('mounting catch-all handler');
app.use(function(req, res) {
  return routes.utils.renderPage(req, res, 'error', {
    error: new engine.errors.PageNotFoundError(`page '${req.path}' not found`),
  });
});


debug('mounting middleware for error handling');
app.use(function(err, req, res, next) { // eslint-disable-line no-unused-vars
  logger.error(err);
  return routes.utils.renderPage(req, res, 'error', {
    error: err,
  });
});


debug('starting server');
app.listen(config.get('server.port'), config.get('server.ip'), function() {
  logger.info('server listening');
  debug('server started at http://%s:%s', config.get('server.ip'), config.get('server.port'));
});
