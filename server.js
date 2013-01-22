var environment = process.env.NODE_ENV || 'development';
var config = require('./config/' + environment + '.js');
var app = require('./app.js');

app.init(config, function (err, msg) {
  if (err) {
    console.log(err);
  } else {
    console.log(msg);
    app.start();
  }
});
