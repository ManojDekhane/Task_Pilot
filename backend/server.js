require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const TelegramBot = require("node-telegram-bot-api");
const cron = require("node-cron");
const cors = require("cors");

const User = require("./models/User");
const Goal = require("./models/Goal");
const generateReply = require("./services/gemini");
const classifyMessage = require("./utils/classifyMessage");

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

  if (!text || text.startsWith("/")) return;

  try {
    // 1. Determine what the user wants
    const classification = await classifyMessage(text);

    // 2. Handle based on type
    if (classification.type === "task" && classification.confidence > 0.85 && classification.minutes_from_now > 0) {
      // It's a task! Save it.

      // await Goal.create({
      //   chatId,
      //   goal: text,
      //   remindTime: getNextMinute(), // You should eventually parse real time here
      //   completed: false
      // });

      const mins = classification.minutes_from_now;
      const taskDeadline = calculateDeadline(mins);

      await Goal.create({
        chatId,
        goal: text,
        deadline: taskDeadline,
        completed: false
      });

      const reply = await generateReply(text);
      // bot.sendMessage(chatId, `✅ Tracking this: "${text}"\n\n${reply}`);

      const timeString = taskDeadline.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      bot.sendMessage(chatId, `📝 *Tracking:* "${text}"\n⏰ Deadline: *${timeString}*\n\n${reply}`, { parse_mode: "Markdown" });

    } else if (classification.type === "excuse") {
      // Don't save as a goal, just let Gemini "roast" or motivate them
      const reply = await generateReply(text);
      bot.sendMessage(chatId, reply);

    } else {
      // Just normal chat
      const reply = await generateReply(text);
      bot.sendMessage(chatId, reply);
    }

  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, "⚠️ I tripped over my own wires. Try again?");
  }
});

// SIMPLE TIME (next minute for demo)
function getNextMinute() {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 1);
  return now.toTimeString().slice(0, 5);
}

// ✅ MERGED CRON JOB (every minute)
// ✅ PROFESSIONAL TIERED REMINDER SYSTEM
cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();

    // 1. PRE-GAME NUDGE (Tasks due in the next 15 minutes)
    const twentyMinsFromNow = new Date(now.getTime() + 20 * 60000);
    const tenMinsFromNow = new Date(now.getTime() + 10 * 60000);

    const preGoals = await Goal.find({
      deadline: { $lte: twentyMinsFromNow, $gt: tenMinsFromNow }, // Only in this window
      "remindersSent.pre": false,
      completed: false
    });

    for (const g of preGoals) {
      await bot.sendMessage(g.chatId, `⏳ *Heads up!* \n"${g.goal}" is due in about 15 minutes. Get ready!`, { parse_mode: "Markdown" });
      g.remindersSent.pre = true;
      await g.save();
    }

    // 2. THE DEADLINE ALERT (Tasks due now or recently missed)
    const dueGoals = await Goal.find({
      deadline: { $lte: now },
      "remindersSent.deadline": false,
      completed: false
    });

    for (const g of dueGoals) {
      await bot.sendMessage(g.chatId, `⏰ *TIME'S UP!* \nGoal: "${g.goal}"\n\nDid you actually finish it, or are we making excuses today? 👀`, {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [[
            { text: "✅ I did it!", callback_data: `done_${g._id}` },
            { text: "🤷 No... (Snooze)", callback_data: `snooze_${g._id}` }
          ]]
        }
      });
      g.remindersSent.deadline = true;
      await g.save();
    }

  } catch (err) {
    console.error("Cron Error:", err);
  }
});

// ✅ HANDLE BUTTON CLICKS (Done / Snooze)
bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const [action, goalId] = query.data.split("_");

  try {
    if (action === "done") {
      await Goal.findByIdAndUpdate(goalId, { completed: true });

      // Update the message so the buttons disappear
      await bot.editMessageText("🔥 *Mission Accomplished!* \nI knew you had it in you. On to the next one!", {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: "Markdown"
      });
    }

    if (action === "snooze") {
      // Push deadline back by 30 minutes
      const newTime = new Date(Date.now() + 30 * 60000);
      await Goal.findByIdAndUpdate(goalId, {
        deadline: newTime,
        "remindersSent.deadline": false // Reset so it reminds again
      });

      await bot.editMessageText("🕒 *Snoozed.* \nI'll give you 30 more minutes. Don't waste them.", {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: "Markdown"
      });
    }

    // Acknowledge the click to Telegram
    bot.answerCallbackQuery(query.id);

  } catch (err) {
    console.error("Callback Error:", err);
  }
});

// Helper to turn AI minutes into a real Date object
function calculateDeadline(minutes) {
  const now = new Date();
  return new Date(now.getTime() + minutes * 60000);
}

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});