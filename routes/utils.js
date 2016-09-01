/**
 * The MIT License (MIT)
 * Copyright (c) 2016 GochoMugo <mugo@forfuture.co.ke>
 * Copyright (c) 2016 Forfuture, LLC <we@forfuture.co.ke>
 *
 * Router utilities.
 */


exports = module.exports = {
  /**
   * Render a page
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {String} path
   * @param {Object} [ctx]
   */
  renderPage,
  /**
   * Render a markdown page
   *
   * @param  {Express.Request} req
   * @param  {Express.Response} res
   * @param  {Function} next
   * @param  {String} filepath
   */
  renderMarkdownPage,
  /**
   * Web Middleware
   *
   * @param {Express.Router} router
   * @param {Object} config
   */
  webMiddleware,
};


// built-in modules
const path = require('path');


// npm-installed modules
const _ = require('lodash');
const config = require('config');
const express = require('express');


// own modules
const engine = require("../engine");


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


function renderPage(req, res, path, ctx) {
  if (!_.isPlainObject(ctx)) {
    ctx = {};
  }

  ctx.__path = req.path;
  return res.render(path, ctx);
}


function renderMarkdownPage(req, res, next, filepath) {
  return engine.pages.getHTML(filepath, function(getErr, html) {
    if (getErr) {
      return next(getErr);
    }

    return renderPage(req, res, 'misc/content', {
      content: html,
    });
  });
}
