const TelegramBot = require("node-telegram-bot-api");
const User = require("./models/User");
const Goal = require("./models/Goal");
const generateReply = require("./services/gemini");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// START COMMAND
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  await User.findOneAndUpdate(
    { chatId },
    { name: msg.from.first_name },
    { upsert: true }
  );

  bot.sendMessage(chatId, "Welcome to TaskPilot 🚀\nTell me your goal!");
});

// HANDLE MESSAGES (MERGED)
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text || text === "/start") return;

  try {
    // ✅ Step 1: Save goal (basic logic)
    if (!text.includes(":")) {
      await Goal.create({
        chatId,
        goal: text,
        remindTime: "21:00", // TEMP default
        completed: false
      });

      await bot.sendMessage(chatId, "Got it! I’ll remind you at 9 PM ⏰");
    }

    // ✅ Step 2: Gemini AI reply
    const reply = await generateReply(text);
    await bot.sendMessage(chatId, reply);

  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, "⚠️ Something went wrong.");
  }
});

module.exports = bot;