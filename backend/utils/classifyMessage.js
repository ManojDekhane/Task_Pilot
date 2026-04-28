const axios = require("axios");

const GROQ_API_KEY = process.env.GROQ_API_KEY;

async function classifyMessage(text) {
  const now = new Date();
  const currentTime = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit'});

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
Analyze: "${text}"
Current Time (24h format): ${currentTime}
Your goal is to decide if the user is actually setting a NEW task or just chatting/venting.

Categories:
1. "task": Only if they say they WILL do something (e.g., "I will study", "Remind me to fix code"). 
2. "chat": Greetings, insults, random words ("hush", "damn", "jojo", "u r the reason").
3. "excuse": Reasons for not working ("I'm tired", "going to sleep").
Rules:
1. "I am going to sleep", "I'm tired", "taking rest" = "excuse".
2. If "task", calculate minutes_from_now. 
   Example: If Current Time is 11:30 and task is "at 14:00", minutes_from_now is 150.
3. If no time is mentioned, return 60.
4. If time mentioned is in the past, assume it's for the next day (+1440 mins).

Return ONLY JSON: {"type": "task", "confidence": 0.9, "minutes_from_now": 150}
`
          },
        ],
        response_format: { type: "json_object" },
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
    return { type: "chat", confidence: 0.5, minutes_from_now: 0 };
  }
}

module.exports = classifyMessage;