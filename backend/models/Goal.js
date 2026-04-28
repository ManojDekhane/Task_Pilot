const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  chatId: Number,
  goal: String,
  remindTime: String,
  completed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Goal", goalSchema);