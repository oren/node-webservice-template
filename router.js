module.exports = router;

// my modules
var health = require('./health.js');
var checkHealth = require('./checkHealth.js');
var pusher = require('./pusher.js');
var register = require('./register.js');

// The server's main routes function
//
// Supports the following end-points:
// POST /push
// POST /register
// GET /health
// GET /health.txt
function router(config, req, res) {
  if (req.url == '/push') { 
    if(req.method.toLowerCase() == 'post') {
      pusher(config.db, config.push,  req, res);
    } else {
      res.statusCode = 405;
      res.end();
    }
  } else if (req.url == '/register') { 
    if(req.method.toLowerCase() == 'post') {
      register(config.db, req, res);
    } else {
      res.statusCode = 405;
      res.end();
    }
  } else if (req.url == '/health') { 
    if(req.method.toLowerCase() == 'get') {
      info = health();
      res.end(JSON.stringify(info));
    } else {
      res.statusCode = 405;
      res.end();
    }
  } else if (req.url == '/health.txt') { 
    if(req.method.toLowerCase() == 'get') {
      checkHealth(req, res);
    } else {
      res.statusCode = 405;
      res.end();
    }
  } else {
    res.statusCode = 404;
    res.end();
  };
};
