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
   *
   * @throws UnsupportedSpecError if a data-file uses an unsupported spec
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


// npm-installed modules
const Ajv = require('ajv');
const Debug = require('debug');


// own modules
const errors = require('./errors');
const schema = require('../schema/definitions.json');


// module variables
const ajv = new Ajv();
const debug = Debug('mmtc-ke:engine:networks');
const datadir = path.resolve(__dirname, '../data');
const cache = {
  networks: {},
};
const isJsonFileRegex = new RegExp('.json$');
// SPEC_VERSION is the *major* version number of the Data File Specification
// that this engine can handle.
const SPEC_VERSION = 0;


function init() {
  debug('reading data files');
  fs.readdirSync(datadir).forEach(function(filename) {
    if (!isJsonFileRegex.test(filename)) return;

    const filepath = path.join(__dirname, '../data', filename);
    const data = require(filepath);

    const valid = ajv.validate(schema, data);
    if (!valid) {
      console.error(ajv.errors); // eslint-disable-line no-console
      throw new errors.SpecViolationError(`data file '${filename}' is invalid`);
    }

    const spec = data.meta.spec;
    if (Math.floor(spec) !== SPEC_VERSION) {
      throw new errors.UnsupportedSpecError(`spec version '${spec}' is not supported`);
    }

    debug('loaded data for %s', data.name);
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
