// my modules
var config = require('../../config/test.js');
var app = require('../../app.js');

function runTests() {
  console.log('running tests:');

  tests = [];
  tests = require("fs").readdirSync(__dirname).filter(function(file) {
    return (/^test/.test(file)) 
  });

  tests.forEach(function(file) {
    require("./" + file)(config);
  });
};

app.init(config, function (err, msg) {
  if (err) {
    console.log(err);
  } else {
    console.log(msg);
    app.start(runTests);
  }
});
