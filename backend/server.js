require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const TelegramBot = require("node-telegram-bot-api");
const cron = require("node-cron");
const cors = require("cors");

const User = require("./models/User");
const Goal = require("./models/Goal");
const generateReply = require("./services/gemini");


const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Telegram Bot
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// START COMMAND
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  await User.findOneAndUpdate(
    { chatId },
    { name: msg.from.first_name },
    { upsert: true }
  );

  bot.sendMessage(chatId, "Hey 👋 I'm TaskPilot.\nTell me your goal!");
});

// MESSAGE HANDLER
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text || text === "/start") return;

  try {
    // Save goal
    await Goal.create({
      chatId,
      goal: text,
      remindTime: getNextMinute(),
      completed: false
    });

    // AI reply
    const reply = await generateReply(text);
    bot.sendMessage(chatId, reply);

  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, "⚠️ Something went wrong.");
  }
});

// SIMPLE TIME (next minute for demo)
function getNextMinute() {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 1);
  return now.toTimeString().slice(0, 5);
}

// ✅ MERGED CRON JOB (every minute)
cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);

    const goals = await Goal.find({
      remindTime: currentTime,
      completed: false
    });

    goals.forEach(goal => {
      bot.sendMessage(
        goal.chatId,
        `⏰ Reminder: ${goal.goal}\nDid you do it?`
      );
    });

  } catch (err) {
    console.error("Cron Error:", err);
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});