/**
 * The MIT License (MIT)
 * Copyright (c) 2016 GochoMugo <mugo@forfuture.co.ke>
 * Copyright (c) 2016 Forfuture, LLC <we@forfuture.co.ke>
 *
 * Our tests
 */


// built-in modules
const path = require('path');


// npm-installed modules
const elbow = require('elbow');
const express = require('express');


// own modules
const app = require('../app');


// module variables
const schemaDir = path.resolve(__dirname, '../schema');
const staticServer = express();
const staticServerPort = 9667;


before(function(done) {
  staticServer.use(express.static(schemaDir));
  staticServer.listen(staticServerPort, done);
});


describe('E2E tests for API', function() {
  const port = 9666;

  before(function(done) {
    app.run({ port }, done);
  });

  elbow.run(it, `http://localhost:${port}/api/`, path.join(__dirname, 'elbow'));
});
