const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY, {
  apiVersion: "v1beta"
});

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

async function generateReply(userText, history = [], retries = 3) {
  try {
    const historyContext = history.length
      ? history
          .slice(-6)
          .map(m => `${m.role === "user" ? "User" : "TaskPilot"}: ${m.content}`)
          .join("\n")
      : "No previous conversation.";

    const prompt = `
You are TaskPilot, a no-nonsense accountability coach on Telegram built specifically for procrastinators.

Recent conversation:
${historyContext}

The user just said: "${userText}"

Rules:
- Keep replies under 3 sentences
- You are NOT a therapist. Do NOT validate excuses or agree with delays.
- If the user says "not yet", "later", "I don't feel like it", "I'm tired" — give them a firm but kind reality check. Remind them why they set the goal in the first place.
- If they've given the same excuse before in this conversation, call it out directly.
- Never say things like "That's understandable", "I'm here when you're ready", "Take your time" — these enable procrastination.
- Instead say things like "You set this goal for a reason — what's really stopping you?", "5 minutes is all it takes to start. Go.", "You'll feel worse later if you don't start now."
- If they completed a task, celebrate genuinely and push them to the next one.
- IMPORTANT: If the user is setting a reminder or says "ok", "just remind me", "sure" — ONE short confirm line and STOP. No questions.
- Only ask ONE question max per reply, and only when it helps them take action
`;

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }]
    });

    const text = result.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    return text || "Hmm… say that again?";

  } catch (err) {
    // ✅ Handle both 429 (rate limit) and 503 (overloaded)
    const isRetryable = err.message?.includes("429") || err.message?.includes("503");

    if (isRetryable && retries > 0) {
      const delay = retries === 3 ? 10000 : retries === 2 ? 20000 : 30000;
      console.warn(`Gemini unavailable. Retrying in ${delay / 1000}s... (${retries} retries left)`);
      await wait(delay);
      return generateReply(userText, history, retries - 1);
    }

    console.error("Gemini Error:", err.message);
    return "I'm a little overwhelmed right now, just like you might be sometimes 😅 Try again in a moment!";
  }
}

module.exports = { generateReply };