exports = module.exports = {
  init: init,
  calculate: calculate,
  getNetwork: getNetwork,
  getNetworks: getNetworks,
};


// built-in modules
var fs = require('fs');
var path = require('path');


// npm-installed modules
var _ = require('lodash');


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


/**
 * Calculate the Cost.
 *
 * @param {String} name of the network
 * @param {Object} params of the calculation
 * @param {String} params.transactionType e.g. 'transfer', 'withdrawal'
 * @param {String} params.transactor e.g. 'atm', 'registered users'
 * @param {String|Number} params.amount of the transaction
 * @return {Cost}
 * @throws NetworkNotFoundError if no such network has been loaded
 * @throws TransactionNotFoundError if the target transaction was not found
 * @throws TransactionClassNotFoundError if the target class of the
 *  transaction was not found
 * @throws RangeNotFoundError if the amount was not found in any range
 * @throws InvalidAmountError if the amount entered was invalid
 */
function calculate(name, params) {
  var network, transaction, transactionClass;

  network = getNetwork(name);
  if (!network) {
    throw new Error('NetworkNotFoundError');
  }

  transaction = network.transactions.find(function(t) {
    return params.transactionType === t.name;
  });
  if (!transaction) {
    throw new Error('TransactionNotFoundError');
  }

  transactionClass = transaction.classes.find(function(c) {
    return params.transactor === c.name;
  });
  if (!transactionClass) {
    throw new Error('TransactionClassNotFoundError');
  }

  var amount, range;

  amount = parseInt(params.amount, 10);
  if (amount < 0) {
    throw new Error('InvalidAmountError');
  }

  range = transactionClass.ranges.find(function(r) {
    r = parseRange(r);
    return r !== null && r.low <= amount && amount <= r.high;
  });
  if (!range) {
    throw new Error('RangeNotFoundError');
  }

  return range.amount;
}


/**
 * Parse the range into an internal object.
 *
 * @param {Object} range
 * @param {String|Number} range.low
 * @param {String|Number} range.high
 * @param {String|Number} range.amount
 * @return {Object|null}
 */
function parseRange(range) {
  var result = {};

  result = {
    low: _parse(range.low),
    high: _parse(range.high),
    amount: _parse(range.amount),
  };
  if (_.isNumber(result.low) && _.isNumber(result.high) && _.isNumber(range.amount)) {
    return result;
  }

  return null;

  function _parse(n) {
    if (n === '-Infinity') {
      return -Infinity;
    } else if (n === '+Infinity') {
      return +Infinity;
    }
    return parseInt(n, 10);
  }
}
