/**
 * The MIT License (MIT)
 * Copyright (c) 2016 GochoMugo <mugo@forfuture.co.ke>
 * Copyright (c) 2016 Forfuture, LLC <we@forfuture.co.ke>
 *
 * Our tests
 */


// built-in modules
const fs = require('fs');
const path = require('path');


// npm-installed modules
const elbow = require('elbow');
const express = require('express');
const should = require('should');


// own modules
const app = require('../app');


// module variables
const schemaDir = path.resolve(__dirname, '../schema');
const staticServer = express();
const appPort = 9666;
const staticServerPort = 9667;


before(function(done) {
  staticServer.use(express.static(schemaDir));
  app.run({ port: appPort }, function() {
    staticServer.listen(staticServerPort, done);
  });
});


describe('E2E tests for API v0', function() {
  elbow.run(it, `http://localhost:${appPort}/api/v0`, path.join(__dirname, 'elbow/v0'));
});


describe('API docs', function() {
  it('exist for each available API', function() {
    const apis = fs.readdirSync(path.resolve(__dirname, '../routes/api'));
    const docs = fs.readdirSync(path.resolve(__dirname, '../docs/api'));

    // determine missing docs
    const missing = apis.filter(function(api) {
      const doc = path.basename(api, '.js') + '.md';
      return docs.indexOf(doc) === -1;
    });

    should(missing).be.empty();
  });
});
