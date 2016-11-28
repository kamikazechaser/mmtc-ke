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
const apis = {
  'v0': require('./api/v0'),
};
const public = require('./public');
const utils = require('./utils');


// module variables
const debug = Debug('mmtc-ke:routes:index');
const router = express.Router();
// TODO: add doc
const API_VERSION = 'v0';


// exports
exports = module.exports = router;
exports.router = router;
exports.utils = utils;


for (let version in apis) {
  debug('mounting API %s router', version);
  router.use(`/api/${version}`, apis[version]);
}


debug('add redirect route for current API docs');
router.get('/api', function(req, res) {
  return res.redirect(`${req.baseUrl}/api/${API_VERSION}`);
});


debug('mounting public router');
router.use(public);
