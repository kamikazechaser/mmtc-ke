/**
 * The MIT License (MIT)
 * Copyright (c) 2016 GochoMugo <mugo@forfuture.co.ke>
 * Copyright (c) 2016 Forfuture, LLC <we@forfuture.co.ke>
 *
 * Main router.
 */



// built-in modules
const fs = require('fs');
const path = require('path');


// npm-installed modules
const Debug = require('debug');
const express = require('express');


// own modules
const engine = require('../engine');
const public = require('./public');
const utils = require('./utils');


// module variables
const debug = Debug('mmtc-ke:routes:index');
const router = express.Router();
const apiDir = path.resolve(__dirname, 'api');
let apiVersion = -1;
const apis = {};


// exports
exports = module.exports = router;
exports.router = router;
exports.utils = utils;


// API doc
router.get('/api/:version', function(req, res, next) {
  const match = /^v(\d)$/.exec(req.params.version);
  if (!match) return next();

  if (!apis[match[1]]) {
    return utils.renderPage(req, res, 'error', {
      error: new engine.errors.PageNotFoundError(`Documentation for API ${req.params.version} not found`),
    });
  }

  const filepath = path.resolve(__dirname, `../docs/api/${req.params.version}.md`);
  return utils.renderMarkdownPage(req, res, next, filepath);
});


fs.readdirSync(apiDir).forEach(function(version) {
  version = parseInt(version.slice(1), 10);
  apis[version] = require(`./api/v${version}`);

  debug('mounting API v%s router', version);
  router.use(`/api/v${version}`, apis[version]);

  if (version > apiVersion) apiVersion = version;
});


debug('add redirect route for current API docs');
router.get('/api', function(req, res) {
  return res.redirect(`${req.baseUrl}/api/v${apiVersion}`);
});


debug('mounting public router');
router.use(public);
