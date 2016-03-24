/**
 * The MIT License (MIT)
 * Copyright (c) 2016 Forfuture LLC
 *
 * Error handling
 */


// npm-installed modules
var errors = require('common-errors');


// module variables
var define = errors.helpers.generateClass;


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
