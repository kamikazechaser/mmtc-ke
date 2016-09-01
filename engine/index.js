/**
 * The MIT License (MIT)
 * Copyright (c) 2016 GochoMugo <mugo@forfuture.co.ke>
 * Copyright (c) 2016 Forfuture, LLC <we@forfuture.co.ke>
 *
 * The Engine; where the hard work happens.
 */


// own modules
const clients = require('./clients');
const errors = require('./errors');
const math = require('./math');
const networks = require('./networks');
const pages = require('./pages');


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
