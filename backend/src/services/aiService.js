import Groq from "groq-sdk";
import fs from "fs";
import path from "path";

const conversations = new Map();

export const getChatResponse = async (message, user) => {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  // ✅ SAFE SESSION ID
  const sessionId = user?._id?.toString() || "guest";

  // Load training file
  let trainingContent = "";
  try {
    const trainingPath = path.join(process.cwd(), "data/custom-training.txt");
    if (fs.existsSync(trainingPath)) {
      trainingContent = fs.readFileSync(trainingPath, "utf8");
    }
  } catch (err) {
    console.error("Training file error:", err);
  }

  // Determine role safely
  const role = user?.role || "guest";

  // Initialize conversation if new
  if (!conversations.has(sessionId)) {
    conversations.set(sessionId, [
      {
        role: "system",
        content: `
${trainingContent}

Current user role: ${role}

IMPORTANT:
- If Student → guide only student features.
- If College Admin → guide only admin features.
- If Super Admin → guide super admin features.
- If Guest → explain platform and suggest login.
- If feature not allowed → politely restrict.
- Always greet warmly.
- Use numbered steps.
- Stay strictly within CampusEventHub platform.
`,
      },
    ]);
  }

  const history = conversations.get(sessionId);

  history.push({
    role: "user",
    content: message,
  });

  // Limit memory
  if (history.length > 13) {
    history.splice(1, 2);
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: history,
      temperature: 0.3,
    });

    const reply = completion.choices[0].message.content;

    history.push({
      role: "assistant",
      content: reply,
    });

    return reply;

  } catch (error) {
    console.error("Groq API error:", error);
    return "I'm currently having trouble responding. Please try again shortly.";
  }
};