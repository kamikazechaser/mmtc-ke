/**
 * The MIT License (MIT)
 * Copyright (c) 2016 GochoMugo <mugo@forfuture.co.ke>
 * Copyright (c) 2016 Forfuture, LLC <we@forfuture.co.ke>
 *
 * Main router.
 */


// npm-installed modules
const Debug = require('debug');
const express = require('express');


// own modules
const api = require('./api');
const public = require('./public');
const utils = require('./utils');


// module variables
const debug = Debug('mmtc-ke:routes:index');
const router = express.Router();


// exports
exports = module.exports = router;
exports.router = router;
exports.utils = utils;


debug('mounting API router');
router.use('/api', api);


debug('mounting public router');
router.use(public);
