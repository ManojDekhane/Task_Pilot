const axios = require("axios");

const GROQ_API_KEY = process.env.GROQ_API_KEY;

async function classifyMessage(text) {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        // model: "llama3-8b-8192",
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: `
Classify the user's message into one of these:
- "task": User explicitly mentions something they WANT to do or BE REMINDED of.
- "chat": Greeting, asking how you are, or random talk.
- "excuse": User explaining why they DIDN'T do a task.

Examples:
"Remind me to study math at 5" -> task
"I'm feeling really lazy today" -> excuse
"What's the weather like?" -> chat
"I will finish the report by tonight" -> task

Message: "${text}"
Reply ONLY in JSON: {"type": "type", "confidence": 0.0}
`
          },

        ],
        response_format: {type: "json_object"},
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

    return JSON.parse(response.data.choices[0].message.content);

  } catch (err) {
    if (err.response?.status === 400) {
      console.error("Groq 400 Error: Check if model ID is correct or params are valid.");
    }
    return { type: "chat", confidence: 0.5 };
  }
}

module.exports = classifyMessage;