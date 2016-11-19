/**
 * The MIT License (MIT)
 * Copyright (c) 2016 GochoMugo <mugo@forfuture.co.ke>
 * Copyright (c) 2016 Forfuture, LLC <we@forfuture.co.ke>
 *
 * Custom errors.
 */


// constants
const BROWSER = typeof window !== 'undefined';


// npm-installed modules
let commonErrors = BROWSER || require('common-errors');


// module variables
const define = BROWSER || commonErrors.helpers.generateClass;
const errors = {};
const definitions = [
  // General Errors
  'PageNotFoundError',

  // Data-file handling Errors
  'SpecViolationError',
  'UnsupportedSpecError',

  // Calculation Errors
  'InvalidAmountError',
  'AmountNotAllowedError',
  'AmountNotFoundError',
  'NetworkNotFoundError',
  'RangeNotFoundError',
  'TransactionClassNotFoundError',
  'TransactionNotFoundError',
];


definitions.forEach(function(definition) {
  if (BROWSER) {
    errors[definition] = Error;
  } else {
    errors[definition] = define(definition);
  }
});


exports = module.exports = errors;
