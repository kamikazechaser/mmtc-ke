exports = module.exports = {
  init: init,
  calculate: calculate,
  getNetwork: getNetwork,
  getNetworks: getNetworks,
};

var fs = require('fs');
var path = require('path');

var _ = require('lodash');

var datadir = path.resolve(__dirname, '../data');
var cache = {
  networks: {},
};

function init() {
  fs.readdirSync(datadir).forEach(function(filename) {
    var filepath = path.join(__dirname, '../data', filename);
    var data = require(filepath);
    cache.networks[data.name] = data;
  });
}


function getNetworks() {
  var networks = [];
  for (var networkName in cache.networks) {
    networks.push(cache.networks[networkName]);
  }
  return networks;
}


function getNetwork(name) {
  return cache.networks[name];
}

/**
 * Calculate the amount
 *
 * @param {String} name of the network
 * @param {Object} params of the calculation
 * @param {String} params.transactionType e.g. 'transfer', 'withdrawal'
 * @param {String} params.transactor e.g. 'atm', 'registered users'
 * @param {String|Number} params.amount of the transaction
 */
function calculate(name, params) {
  var network, transaction, transactionClass;

  network = getNetwork(name);
  if (!network) {
    throw new Error('NetworkNotFound');
  }

  transaction = network.transactions.find(function(t) {
    return params.transactionType === t.type;
  });
  if (!transaction) {
    throw new Error('TransactionNotFound');
  }

  transactionClass = transaction.classes.find(function(c) {
    return params.transactor === c.transactor;
  });
  if (!transactionClass) {
    throw new Error('TransactionClassNotFound');
  }

  var amount, range;

  amount = parseInt(params.amount, 10);
  if (amount < 0) {
    throw new Error('InvalidAmount');
  }

  range = transactionClass.ranges.find(function(r) {
    r = parseRange(r);
    return r !== null && r.low <= amount && amount <= r.high;
  });

  if (!range) {
    throw new Error('RangeNotFound');
  }

  return range.amount;
}


/**
 * Parse the range into valid numerical values
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
