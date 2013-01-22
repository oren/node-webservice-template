// core modules
var assert = require('assert');

// non-core packages
var request = require('request');

// my modules
var config = require('../../config/test.js');
var app = require('../../app.js');

// I want to hit the real DB in integration tests
config.db = require('../../db.js');

app.set(config).init(function (err, msg) {
  if (err) {
    console.log(err);
  } else {
    console.log(msg);
    app.start(runTest);
  }
});

function runTest() {
  // GET /register should add iPhone info the DB
  var options = {
    'method' : 'POST',
    'uri' : "http://localhost:" + config.webSitePort + "/register",
    'body' : '{"user_id" : "1", "app_id" : "mongoose", "token" : "<123 567 434>", "device_id" : "123"}',
    'headers' : {
      'content-type' : 'application/x-www-form-urlencoded'
    }
  };

  request(options, function (err, res, body) {
    if (err) {
      console.log('Error in ' + __filename + '. ' + err);
    } else {
      assert.equal(res.statusCode, 201)
      process.exit();
    }
  });
};

