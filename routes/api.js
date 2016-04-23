// built-in modules
var path = require("path");


// npm-installed modules
var Debug = require("debug");
var express = require("express");


// own modules
var engine = require("../engine");


// module variables
var debug = Debug("mmtc-ke:routes:api");
var router = express.Router();
var logger = engine.clients.getLogger();


// serving data for all networks
router.get("/networks", function(req, res, next) {
  return res.json({
    networks: engine.networks.getNetworks(),
  });
});


// serving data for a network
router.get("/networks/:network", function(req, res, next) {
  var network = engine.networks.getNetwork(req.params.network);
  if (!network) {
    var networkNotFoundError = new engine.errors.NetworkNotFoundError(`network '${req.params.network}' not found`);
    networkNotFoundError.status_code = 404;
    return next(networkNotFoundError);
  }
  return res.json(network);
});


// API Error handler
router.use(function(err, req, res, next) {
  var status_code = err.status_code || 500;
  if (status_code === 500) {
    logger.error(err);
  }
  return res.status(status_code).json({
    error: err,
  });
});


// expose the router
exports = module.exports = router;
exports.router = router;
