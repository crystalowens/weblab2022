const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
    score : Number,
    userId : {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
});

// compile model from schema
module.exports = mongoose.model("game", GameSchema);
