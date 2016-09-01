/**
 * The MIT License (MIT)
 * Copyright (c) 2016 GochoMugo <mugo@forfuture.co.ke>
 * Copyright (c) 2016 Forfuture, LLC <we@forfuture.co.ke>
 *
 * Client to support services.
 */


exports = module.exports = {
  getLogger: getLogger,
};


// npm-installed modules
const winston = require('winston');


/**
 * Return the main application logger
 *
 * @return {Object} logger
 */
function getLogger() {
  return winston;
}
