exports = module.exports = {
  renderPage,
  webMiddleware,
};


// built-in modules
var path = require('path');


// npm-installed modules
var _ = require('lodash');
var config = require('config');
var express = require('express');


/**
 * Web Middleware
 *
 * @param {Express.Router} router
 * @param {Object} config
 */
function webMiddleware(router, config) {
  if (!_.isPlainObject(config)) {
    throw new Error('expected configuration to be object');
  }

  // statics
  if (_.isArray(config.statics)) {
    config.statics.forEach(function(static) {
      router.use(`/${static}`, express.static(path.join(__dirname, `../web/${static}`)));
    });
  }
}


/**
 * Render a page
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {String} path
 * @param {Object} [ctx]
 */
function renderPage(req, res, path, ctx) {
  if (!_.isPlainObject(ctx)) {
    ctx = {};
  }

  ctx.__path = req.path;
  return res.render(path, ctx);
}
