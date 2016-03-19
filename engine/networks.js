/**
 * The MIT License (MIT)
 * Copyright (c) 2016 Forfuture LLC
 *
 * Handling networks
 */


exports = module.exports = {
  getNetwork: getNetwork,
  getNetworks: getNetworks,
  init: init,
};


// built-in modules
var fs = require('fs');
var path = require('path');


// module variables
var datadir = path.resolve(__dirname, '../data');
var cache = {
  networks: {},
};
var isJsonFileRegex = new RegExp('.json$');


/**
 * Initialize the Engine. It executes synchronously.
 */
function init() {
  fs.readdirSync(datadir).forEach(function(filename) {
    if (!isJsonFileRegex.test(filename)) return;

    var filepath = path.join(__dirname, '../data', filename);
    var data = require(filepath);
    cache.networks[data.name] = data;
  });
}


/**
 * Return names of all the loaded networks in an array.
 *
 * @return {Array}
 */
function getNetworks() {
  var networks = [];

  for (var networkName in cache.networks) {
    networks.push(cache.networks[networkName]);
  }

  return networks;
}


/**
 * Return the network object.
 *
 * @param {String} name of the network (possibly from `getNetworks()`)
 * @return {Network}
 */
function getNetwork(name) {
  return cache.networks[name];
}
