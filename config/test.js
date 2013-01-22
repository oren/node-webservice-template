config = {
  environment: 'test',
  webSitePort: 3001,
  mongoHost: 'mongodb://localhost/push-test',
  db: require('../mockDb.js'), 
  push: require('../mockPush.js')
}

module.exports = config;
