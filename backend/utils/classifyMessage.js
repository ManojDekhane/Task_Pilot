const axios = require("axios");

const GROQ_API_KEY = process.env.GROQ_API_KEY;

async function classifyMessage(text) {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages: [
          {
            role: "user",
            content: `
Classify the message into ONE category:
- task
- chat
- excuse
- stop

Also give confidence (0 to 1).

Message: "${text}"

Reply ONLY in JSON:
{
  "type": "task",
  "confidence": 0.92
}
`,
          },
        ],
        temperature: 0,
        max_tokens: 50,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const raw = response.data.choices[0].message.content.trim();

    try {
      return JSON.parse(raw);
    } catch {
      return { type: "chat", confidence: 0.5 };
    }

  } catch (err) {
    console.error("Classification Error:", err.message);
    return { type: "chat", confidence: 0.5 };
  }
}

module.exports = classifyMessage;