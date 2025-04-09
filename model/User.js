const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  fileName: String,
  public_id: String,
  imgUrl: String,
});
const user = mongoose.model("user", userSchema);
module.exports = user;
