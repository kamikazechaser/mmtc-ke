/**
 * The MIT License (MIT)
 * Copyright (c) 2016 Forfuture LLC
 *
 * Client to support services.
 */


exports = module.exports = {
  getLogger: getLogger,
};


// npm-installed modules
var winston = require('winston');


/**
 * Return the main application logger
 *
 * @return {Object} logger
 */
function getLogger() {
  return winston;
}
