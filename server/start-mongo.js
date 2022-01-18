// Server configuration below
const mongoose = require('mongoose');

const mongoConnectionURL = process.env.MONGO_CONNECTION_URL;
const databaseName = "FirstCluster";

function startMongo(){
    mongoose.connect(mongoConnectionURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: databaseName,
      })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));
}

module.exports = startMongo;