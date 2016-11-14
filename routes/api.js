/**
 * The MIT License (MIT)
 * Copyright (c) 2016 GochoMugo <mugo@forfuture.co.ke>
 * Copyright (c) 2016 Forfuture, LLC <we@forfuture.co.ke>
 *
 * API router.
 */


// built-in modules
const path = require('path');


// npm-installed modules
const _ = require('lodash');
const express = require('express');


// own modules
const engine = require('../engine');
const utils = require('./utils');


// module variables
const router = express.Router();
const logger = engine.clients.getLogger();


// expose the router
exports = module.exports = router;
exports.router = router;


// API doc
router.get('/', function(req, res, next) {
  const filepath = path.resolve(__dirname, '../docs/api.md');
  return utils.renderMarkdownPage(req, res, next, filepath);
});


// serving data for all networks
router.get('/networks', function(req, res) {
  return res.json({
    networks: engine.networks.getNetworks(),
  });
});


// serving data for a network
router.get('/networks/:network', function(req, res, next) {
  const network = engine.networks.getNetwork(req.params.network);
  if (!network) {
    let networkNotFoundError = new engine.errors.NetworkNotFoundError(`network '${req.params.network}' not found`);
    networkNotFoundError.statusCode = 404;
    return next(networkNotFoundError);
  }
  return res.json(network);
});


// calculations
router.post('/cost', function(req, res, next) {
  if (!_.isString(req.body.network)
      || !_.isNumber(req.body.amount)
      || !_.isString(req.body.transactionType)
      || !_.isString(req.body.transactor)) {
    const error = new Error('missing/invalid parameter');
    error.statusCode = 400;
    return next(error);
  }

  let cost;
  try {
    cost = engine.math.calculate(req.body.network, req.body);
  } catch(ex) {
    return next(ex);
  }

  return res.json({
    cost,
  });
});


// API 404
router.use(function(req, res, next) {
  const error = new Error('API Endpoint Not Found');
  error.statusCode = 404;
  return next(error);
});


// API Error handler
router.use(function(error, req, res, next) { // eslint-disable-line no-unused-vars
  error.statusCode = error.statusCode || 500;
  if (error.statusCode >= 500) {
    logger.error(error);
  }
  return res.status(error.statusCode).json({
    error: {
      message: error.message,
      name: error.name,
      statusCode: error.statusCode,
    },
  });
});
