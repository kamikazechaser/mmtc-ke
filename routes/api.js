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
const Debug = require('debug');
const express = require('express');


// own modules
const engine = require('../engine');


// module variables
const debug = Debug('mmtc-ke:routes:api');
const router = express.Router();
const logger = engine.clients.getLogger();


// expose the router
exports = module.exports = router;
exports.router = router;


// serving data for all networks
router.get('/networks', function(req, res, next) {
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


// API Error handler
router.use(function(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  if (err.statusCode === 500) {
    logger.error(err);
  }
  return res.status(err.statusCode).json({
    error: err,
  });
});
