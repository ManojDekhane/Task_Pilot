function detectIntent(text) {
  text = text.toLowerCase();

  // ❌ Negative / stop signals
  if (
    text.includes("don't remind") ||
    text.includes("leave me alone") ||
    text.includes("stop") ||
    text.includes("don't annoy")
  ) return "stop";

  // ❌ Casual conversation
  if (
    text.includes("busy") ||
    text.includes("college") ||
    text.includes("what") ||
    text.includes("why") ||
    text.includes("how")
  ) return "chat";

  // ❌ Excuses
  if (
    text.includes("later") ||
    text.includes("tomorrow") ||
    text.includes("tired")
  ) return "excuse";

  // ✅ Task detection (IMPORTANT)
  if (
    text.match(/\b(study|do|complete|finish|solve|work|task)\b/) &&
    text.match(/\b(by|till|before|at)\b/)
  ) return "task";

  return "general";
}

module.exports = detectIntent;