const axios = require("axios");

const GROQ_API_KEY = process.env.GROQ_API_KEY;

async function generateReply(userText, history = []) {
  try {
    const prompt = `
You are TaskPilot — a smart, human-like accountability partner.

Your personality:
- Supportive but honest
- Slightly strict when user makes excuses
- Friendly and relatable (like a real friend, not a robot)
- Never repeat the same phrase like "just do it"

Context:
User past behavior/excuses: ${history.length ? history.join(", ") : "None"}

User message: "${userText}"

Instructions:
1. If user gives an excuse → gently call it out using past patterns if relevant
2. If user shares progress → appreciate briefly
3. If user is casual → respond naturally, not like a coach
4. Avoid repeating same phrases
5. Keep it short (1–2 lines max ideally, but can extend if needed)
6. Sound human, not robotic
7. Use light Gen Z tone occasionally

Now generate a response:
`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        // model: "meta-llama/llama-4-scout-17b-16e-instruct", // ✅ your chosen model
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;

  } catch (err) {
    console.error("Groq Error:", err.response?.data || err.message);

    // 🔥 Smart fallback (never break UX)
    const text = userText.toLowerCase();

    if (text.includes("later") || text.includes("tomorrow")) {
      return "You’ve been pushing this… when are you actually starting?";
    }

    if (text.includes("tired")) {
      return "Tired or avoiding it? Be honest 👀";
    }

    if (text.includes("done") || text.includes("completed")) {
      return "Good. That’s progress. Keep it going 🔥";
    }

    return "Noted. Stay consistent 👀";
  }
}

module.exports = generateReply;