const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  chatId: Number,
  goal: String,
  deadline: Date, // Use a full Date object, not just a string
  remindersSent: {
    pre: { type: Boolean, default: false },
    deadline: { type: Boolean, default: false },
    overdue: { type: Boolean, default: false }
  },
  completed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Goal", goalSchema);