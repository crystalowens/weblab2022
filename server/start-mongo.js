// Server configuration below
const mongoose = require('mongoose');

const mongoConnectionURL = "mongodb+srv://admin:123@firstcluster.vt0fr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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