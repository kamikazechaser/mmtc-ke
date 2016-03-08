// npm-installed modules
var Debug = require('debug');
var express = require('express');


// own modules
var api = require('./api');
var public = require('./public');
var utils = require('./utils');


// module variables
var debug = Debug('mmtc-ke:routes:index');
var router = express.Router();


// exports
exports = module.exports = router;
exports.router = router;
exports.utils = utils;


debug('mounting API router');
router.use('/api', api);


debug('mounting public router');
router.use(public);
