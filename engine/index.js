/**
 * The MIT License (MIT)
 * Copyright (c) 2016
 *
 * Engine
 */


// own modules
var clients = require('./clients');
var errors = require('./errors');
var math = require('./math');
var networks = require('./networks');
var pages = require('./pages');


exports = module.exports = {
  init: init,

  clients: clients,
  errors: errors,
  math: math,
  networks: networks,
  pages: pages,
};


function init() {
  networks.init();
}
