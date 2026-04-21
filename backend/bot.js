const TelegramBot = require("node-telegram-bot-api");
const User = require("./models/User");
const Goal = require("./models/Goal");
const generateReply = require("./services/gemini");
const classifyMessage = require("./utils/classifyMessage");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// 🚫 STRONG NON-TASK FILTER (VERY IMPORTANT)
const NON_TASK_PATTERNS = [
  /^ok/i, /^okay/i, /^yes/i, /^no/i,
  /^not yet/i, /^done/i, /^hi/i, /^hello/i,
  /^bro/i, /^just/i, /^please/i,
  /^u/i, /^hmm/i, /^huh/i
];

// 🧠 STRICT TASK PATTERN (REAL TASK ONLY)
const STRICT_TASK_PATTERN =
  /\b(study|complete|finish|solve|prepare|revise|work|practice)\b/i;

const TIME_PATTERN =
  /\b(by|before|till|at)\b/i ||
  /\d{1,2}(:\d{2})?\s?(am|pm)?/i;

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

// ✅ SINGLE MESSAGE HANDLER
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  let text = msg.text;

  if (!text || text === "/start") return;
  text = text.trim();

  try {
    // 🧠 STEP 1: FETCH USER
    const user = await User.findOne({ chatId });

    // ============================
    // 🔥 STEP 2: HANDLE PENDING TASK FIRST
    // ============================
    if (user?.pendingTask) {
      const pending = user.pendingTask.text;

      // ✅ COMPLETE TASK
      if (/done|completed|finished/i.test(text)) {
        await Goal.create({
          chatId,
          goal: pending,
          remindTime: "21:00",
          completed: true,
          active: false
        });

        await User.updateOne({ chatId }, { $unset: { pendingTask: "" } });

        return bot.sendMessage(chatId, "Nice. Marked as done ✅");
      }

      // ❌ IGNORE SHORT REPLIES (CRITICAL FIX)
      if (text.split(" ").length < 5) {
        const reply = await generateReply(text);
        return bot.sendMessage(chatId, reply);
      }

      // ✅ ONLY UPDATE IF CLEARLY TASK EXTENSION
      const hasVerb = STRICT_TASK_PATTERN.test(text);

      if (hasVerb) {
        const updatedTask = pending + " " + text;

        await User.updateOne(
          { chatId },
          {
            pendingTask: {
              text: updatedTask,
              createdAt: new Date()
            }
          }
        );

        return bot.sendMessage(chatId, "Updated your task 👍");
      }

      const reply = await generateReply(text);
      return bot.sendMessage(chatId, reply);
    }

    // ============================
    // ⚡ STEP 3: HARD FILTER (NO AI CALL)
    // ============================
    if (NON_TASK_PATTERNS.some((p) => p.test(text))) {
      const reply = await generateReply(text);
      return bot.sendMessage(chatId, reply);
    }

    // ============================
    // ⚡ STEP 4: SHORT MESSAGE BLOCK
    // ============================
    if (text.split(" ").length < 4) {
      const reply = await generateReply(text);
      return bot.sendMessage(chatId, reply);
    }

    // ============================
    // 🔥 STEP 5: AI CLASSIFICATION
    // ============================
    const { type, confidence } = await classifyMessage(text);

    // ============================
    // 🛑 STOP
    // ============================
    if (type === "stop") {
      await Goal.updateMany({ chatId }, { active: false });
      return bot.sendMessage(chatId, "Alright, I’ll stop 👍");
    }

    // ============================
    // 💬 CHAT
    // ============================
    if (type === "chat") {
      const reply = await generateReply(text);
      return bot.sendMessage(chatId, reply);
    }

    // ============================
    // 🚨 FINAL TASK FILTER (ULTRA STRICT)
    // ============================
    const isStrongTask =
      STRICT_TASK_PATTERN.test(text) &&
      (/\b(by|before|till|at)\b/i.test(text) ||
        /\d{1,2}(:\d{2})?\s?(am|pm)?/i.test(text)) &&
      text.split(" ").length >= 5;

    if (type === "task" && confidence > 0.9 && isStrongTask) {
      await User.findOneAndUpdate(
        { chatId },
        {
          pendingTask: {
            text,
            createdAt: new Date()
          }
        }
      );

      return bot.sendMessage(
        chatId,
        `Got this:\n"${text}"\n\nI’ll track it. Say "done" when finished.`
      );
    }

    // ============================
    // 😴 EXCUSE
    // ============================
    if (type === "excuse") {
      const reply = await generateReply(text);
      return bot.sendMessage(chatId, reply);
    }

    // ============================
    // 🔁 FALLBACK
    // ============================
    const reply = await generateReply(text);
    return bot.sendMessage(chatId, reply);

  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, "⚠️ Something went wrong.");
  }
});

module.exports = bot;