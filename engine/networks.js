/**
 * The MIT License (MIT)
 * Copyright (c) 2016 GochoMugo <mugo@forfuture.co.ke>
 * Copyright (c) 2016 Forfuture, LLC <we@forfuture.co.ke>
 *
 * Handling networks
 */


exports = module.exports = {
  /**
   * Initialize the Engine. It executes synchronously.
   */
  init: init,
  /**
   * Return the network object.
   *
   * @param  {String} name of the network (possibly from `getNetworks()`)
   * @return {Network}
   */
  getNetwork: getNetwork,
  /**
   * Return names of all the loaded networks in an array.
   *
   * @return {Array}
   */
  getNetworks: getNetworks,
};


// built-in modules
const fs = require('fs');
const path = require('path');


// module variables
const datadir = path.resolve(__dirname, '../data');
const cache = {
  networks: {},
};
const isJsonFileRegex = new RegExp('.json$');


function init() {
  fs.readdirSync(datadir).forEach(function(filename) {
    if (!isJsonFileRegex.test(filename)) return;

    const filepath = path.join(__dirname, '../data', filename);
    const data = require(filepath);
    cache.networks[data.name] = data;
  });
}


function getNetworks() {
  const networks = [];

  for (let networkName in cache.networks) {
    networks.push(cache.networks[networkName]);
  }

  return networks;
}


function getNetwork(name) {
  return cache.networks[name];
}
