/**
 * The MIT License (MIT)
 * Copyright (c) 2016
 *
 * Engine
 */


// own modules
var errors = require('./errors');
var math = require('./math');
var networks = require('./networks');


exports = module.exports = {
  init: init,

  errors: errors,
  math: math,
  networks: networks,
};


function init() {
  networks.init();
}
