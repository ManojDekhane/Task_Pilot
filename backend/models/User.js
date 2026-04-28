const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  chatId: Number,
  name: String
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);