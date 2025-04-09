const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema({
  name: String,
  email: String,
  review: String,
  time: String,
  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
