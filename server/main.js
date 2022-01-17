const app = require('./app.js');
const startServer = require('./start-server');
const startMongo = require('./start-mongo');

startMongo();
startServer(app, 3000);