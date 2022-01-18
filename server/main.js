
const Path = require('path');
require('dotenv').config({path:Path.join(__dirname, "..", ".env")});
const app = require('./app.js');
const startServer = require('./start-server');
const startMongo = require('./start-mongo');

startMongo();
startServer(app, 3000);