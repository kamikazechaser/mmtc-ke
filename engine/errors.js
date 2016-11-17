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

  // Data-file handling Errors
  SpecViolationError: define('SpecViolationError'),
  UnsupportedSpecError: define('UnsupportedSpecError'),

  // Calculation Errors
  InvalidAmountError: define('InvalidAmountError'),
  AmountNotAllowedError: define('AmountNotAllowedError'),
  AmountNotFoundError: define('AmountNotFoundError'),
  NetworkNotFoundError: define('NetworkNotFoundError'),
  RangeNotFoundError: define('RangeNotFoundError'),
  TransactionClassNotFoundError: define('TransactionClassNotFoundError'),
  TransactionNotFoundError: define('TransactionNotFoundError'),
};
