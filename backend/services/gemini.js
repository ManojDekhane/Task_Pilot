const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateReply(userText, history = []) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
You are TaskPilot, a cool but strict accountability buddy.

User past excuses: ${history.join(", ")}

User just said: "${userText}"

Respond in a short, Gen Z tone.
Be slightly strict, motivating, and real.
Avoid long paragraphs.
`;

    const result = await model.generateContent(prompt);
    return result.response.text();

  } catch (err) {
    console.error(err);
    return "Bro... just do the task 😤";
  }
}

module.exports = generateReply;