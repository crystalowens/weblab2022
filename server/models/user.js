const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  picture: String,
  highscore : Number,
  googleid: String
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
