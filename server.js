require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize OpenAI client with OpenRouter endpoint
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1'
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Store conversation history (in production, use a database)
const conversations = new Map();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Chatbot server is running' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId = 'default' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get or create conversation history
    if (!conversations.has(sessionId)) {
      let systemPrompt = 'You are a helpful and friendly AI assistant. Provide concise, accurate, and helpful responses.';

      try {
        // Load custom training data
        const customTrainingPath = path.join(__dirname, 'data/custom-training.txt');
        if (fs.existsSync(customTrainingPath)) {
          const trainingData = fs.readFileSync(customTrainingPath, 'utf8');
          systemPrompt = trainingData;
        }
      } catch (err) {
        console.error('Error reading training file:', err);
      }

      conversations.set(sessionId, [
        {
          role: 'system',
          content: systemPrompt
        }
      ]);
    }

    const conversationHistory = conversations.get(sessionId);

    // Add user message to history
    conversationHistory.push({
      role: 'user',
      content: message
    });

    // Call OpenRouter API
    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-3.5-turbo',
      messages: conversationHistory,
      max_tokens: 500,
      temperature: 0.7
    });

    const assistantMessage = completion.choices[0].message.content;

    // Add assistant response to history
    conversationHistory.push({
      role: 'assistant',
      content: assistantMessage
    });

    // Keep only last 10 messages to prevent token limit issues
    if (conversationHistory.length > 21) {
      conversationHistory.splice(1, 2); // Keep system message, remove oldest exchange
    }

    res.json({
      response: assistantMessage,
      sessionId: sessionId
    });

  } catch (error) {
    console.error('Error:', error);

    if (error.status === 401) {
      return res.status(500).json({
        error: 'Invalid API key. Please check your OpenRouter API key in the .env file.'
      });
    }

    res.status(500).json({
      error: 'An error occurred while processing your request.',
      details: error.message
    });
  }
});

// Clear conversation history endpoint
app.post('/api/clear', (req, res) => {
  const { sessionId = 'default' } = req.body;
  conversations.delete(sessionId);
  res.json({ message: 'Conversation cleared' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🤖 Chatbot server running on http://localhost:${PORT}`);
  console.log(`📝 Make sure to set your OPENROUTER_API_KEY in the .env file`);
});
