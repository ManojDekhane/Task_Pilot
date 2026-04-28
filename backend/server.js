process.on("unhandledRejection", (err) => {
  if (err?.code === "ECONNRESET" || err?.message?.includes("ECONNRESET")) return;
  console.error("Unhandled Rejection:", err.message);
});

process.on("uncaughtException", (err) => {
  if (err?.code === "ECONNRESET" || err?.message?.includes("ECONNRESET")) return;
  console.error("Uncaught Exception:", err.message);
});

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const TelegramBot = require("node-telegram-bot-api");
const cron = require("node-cron");
const cors = require("cors");

const User = require("./models/User");
const Goal = require("./models/Goal");
const { generateReply } = require("./services/gemini");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
    params: { timeout: 10 }
  }
});

bot.on("polling_error", (err) => {
  if (err?.code === "EFATAL" || err?.message?.includes("ECONNRESET")) return;
  console.error("Polling error:", err.message);
});

const conversationHistory = {};

function parseRemindTime(text) {
  const match = text.match(/\b(\d{1,2}):(\d{2})\s*(am|pm)?\b/i);
  if (!match) return null;

  let hours = parseInt(match[1]);
  const minutes = match[2];
  const meridiem = match[3]?.toLowerCase();

  if (meridiem === "pm" && hours !== 12) hours += 12;
  if (meridiem === "am" && hours === 12) hours = 0;

  return `${String(hours).padStart(2, "0")}:${minutes}`;
}

function isReminderMessage(text) {
  const keywords = /remind|reminder|alert|notify|at \d{1,2}:\d{2}|by \d{1,2}:\d{2}/i;
  return keywords.test(text);
}

// ✅ IST current time
function getCurrentISTTime() {
  return new Date().toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
}

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  await User.findOneAndUpdate(
    { chatId },
    { name: msg.from.first_name },
    { upsert: true }
  );

  conversationHistory[chatId] = [];
  bot.sendMessage(chatId, "Hey 👋 I'm TaskPilot.\nTell me your goal!");
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text || text === "/start") return;

  if (!conversationHistory[chatId]) {
    conversationHistory[chatId] = [];
  }

  conversationHistory[chatId].push({ role: "user", content: text });

  if (conversationHistory[chatId].length > 10) {
    conversationHistory[chatId].shift();
  }

  try {
    const parsedTime = parseRemindTime(text);
    const hasReminderIntent = isReminderMessage(text);

    if (parsedTime && hasReminderIntent) {
      await Goal.create({
        chatId,
        goal: text,
        remindTime: parsedTime,
        completed: false
      });

      const reply = await generateReply(text, conversationHistory[chatId]);
      conversationHistory[chatId].push({ role: "assistant", content: reply });
      bot.sendMessage(chatId, `⏰ Got it! I'll remind you at ${parsedTime}.\n\n${reply}`);

    } else {
      const reply = await generateReply(text, conversationHistory[chatId]);
      conversationHistory[chatId].push({ role: "assistant", content: reply });
      bot.sendMessage(chatId, reply);
    }

  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, "⚠️ Something went wrong.");
  }
});

// ✅ Cron uses IST time
cron.schedule("* * * * *", async () => {
  try {
    const currentTime = getCurrentISTTime();

    const goals = await Goal.find({
      remindTime: currentTime,
      completed: false
    });

    for (const goal of goals) {
      await bot.sendMessage(
        goal.chatId,
        `⏰ Reminder: ${goal.goal}\nDid you do it?`
      );
      await Goal.findByIdAndUpdate(goal._id, { completed: true });
    }

  } catch (err) {
    console.error("Cron Error:", err);
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});