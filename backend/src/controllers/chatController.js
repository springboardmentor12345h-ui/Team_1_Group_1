import { getChatResponse } from "../services/aiService.js";

export const chatHandler = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const response = await getChatResponse(message, req.user);

    res.json({ response });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ message: "Chat failed" });
  }
};