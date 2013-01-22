# Http Service template in node

## Run

    node server.js

    curl 0.0.0.0:3000/health
    =>
    200
    {"host":"foo","pid":91085,"memory":{"rss":23724032,"heapTotal":17558272,"heapUsed":9607960},"uptime":26}

## Test

Each test lives in a single file under test folder

    npm test                        # run all unit tests
    node test/unit/test_health.js   # run asingle test


## Run from anywhere
    app = require('./app.js');
    app.init();
    app.start();

Init accepts an optional configuration object and an optional callback that will be called when the server is ready to start.  
If you don't provide configuration object, it will use config/development.js.  
Here is an example for running the server in test mode:

    config = {
      environment: 'test',
      webSitePort: 3001,
      mongoHost: 'mongodb://localhost/push-test',
      db: require('../mockDb.js'), 
      push: require('../mockPush.js')
    }

    app.init(config, function(){
      app.start();
    })
