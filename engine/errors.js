/**
 * The MIT License (MIT)
 * Copyright (c) 2016 GochoMugo <mugo@forfuture.co.ke>
 * Copyright (c) 2016 Forfuture, LLC <we@forfuture.co.ke>
 *
 * Custom errors.
 */


// npm-installed modules
const errors = require('common-errors');


// module variables
const define = errors.helpers.generateClass;


exports = module.exports = {
  // General Errors
  PageNotFoundError: define('PageNotFoundError'),

  // Calculation Errors
  InvalidAmountError: define('InvalidAmountError'),
  NetworkNotFoundError: define('NetworkNotFoundError'),
  RangeNotFoundError: define('RangeNotFoundError'),
  TransactionClassNotFoundError: define('TransactionClassNotFoundError'),
  TransactionNotFoundError: define('TransactionNotFoundError'),
};
