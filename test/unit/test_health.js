// core modules
var assert = require('assert');

// non-core packages
var request = require('request');

function test(config) {
  console.log('GET /health');

  // GET /health should return 200
  request({
      'uri' : "http://localhost:" + config.webSitePort + "/health",
      followRedirect: false 
    }, 
    function (err, res, body) {
      if (err) {
        console.log('Error in ' + __filename + '. ' + err);
      } else {
        assert.equal(res.statusCode, 200)
        process.exit();
      };
    });
};

if (module === require.main) {
  // my modules
  var config = require('../../config/test.js');
  var app = require('../../app.js');

  app.init(config, function (err, msg) {
    if (err) {
      console.log(err);
    } else {
      console.log(msg);
      app.start(test(config));
    }
  });
} else {
  module.exports = test;
};
