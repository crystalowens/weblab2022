const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
    score : Number,
    googleid: String
});

// compile model from schema
module.exports = mongoose.model("game", GameSchema);
