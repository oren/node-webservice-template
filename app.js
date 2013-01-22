// This is the http server.
// We expose 3 functions to make it easy to require our app from anywhere - server.js or test/unit/runner.js etc.
//
// Usage example
//
// app = require('./app.js');
// app.init();
// app.start();
//
//curl 0.0.0.0:3000/health
//{"host":"foo","pid":91085,"memory":{"rss":23724032,"heapTotal":17558272,"heapUsed":9607960},"uptime":26}
exports.init = init;
exports.start = start;
exports.stop = stop;

// core modules
var http = require('http');

// my modules
var router = require('./router.js');

var config = null;
var app = null;

// This functions initialize everything the server needs - connect to a db, and other external dependencies
// parameters
// options - object with different configs 
// callback - a function that will be called when everything is ready to start the server
function init(options, callback) {
  config = {
    environment: 'development',
    webSitePort: 3000,
    mongoHost: 'mongodb://localhost/push',
    db: require('./db.js'),
    push: require('./push.js')
  };
  
  if (options) {
    Object.keys( options ).forEach(function ( k ) {
      config[k] = options[k]
    });
  };

  config.db.connect(config.mongoHost, callback);
}

// start the server by listening on the port defined in the configuration
function start(callback) {
  app = http.createServer(function(req, res) {
    router(config, req, res);
  }).listen(config.webSitePort, listening(callback));
  
  return app;
};

// stop the server
function stop(callback) {
  app.close();
};

// private

function listening(callback) {
  console.log('Push server is running. port ' + config.webSitePort + ' and ' + config.environment + ' environment\n');
  callback && callback();
}
