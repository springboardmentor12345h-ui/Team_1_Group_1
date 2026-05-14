# 🤖 How to Train Your Chatbot

Your chatbot is now configured to use custom training data! Here's how to customize it:

## Quick Start

1. **Edit the Training File**: Open [data/custom-training.txt](data/custom-training.txt)

2. **Add Your Custom Knowledge**:
   - Company information
   - Product details
   - FAQs
   - Specific domain knowledge
   - Response examples

3. **Restart the Server**: 
   ```bash
   npm start
   ```

4. **Test**: Click "Clear Chat" in the browser and start a new conversation

## What You Can Customize

### 1. Personality & Tone
Change how the chatbot communicates (formal, casual, professional, friendly)

### 2. Knowledge Base  
Add specific information the chatbot should know about:
- Your business/product
- Technical documentation
- Policies and procedures
- Common questions and answers

### 3. Response Guidelines
Define how the chatbot should respond:
- Length of responses
- Level of detail
- What to avoid
- Specialized vocabulary

### 4. Example Conversations
Show the AI how to handle specific scenarios with example Q&A pairs

## Training File Location

📁 **[data/custom-training.txt](data/custom-training.txt)** - Edit this file to train your chatbot

## Advanced Training

### Change the AI Model
Edit [server.js](server.js#L73) to use different models:

```javascript
model: 'openai/gpt-3.5-turbo',     // Default: Fast & cheap
// model: 'openai/gpt-4',          // Smarter but slower
// model: 'anthropic/claude-3-opus' // Great reasoning
// model: 'google/gemini-pro'      // Google's model
```

See all models: https://openrouter.ai/models

### Adjust Response Parameters

In [server.js](server.js#L73-L76):
- `max_tokens`: Response length (100-2000)
- `temperature`: Creativity (0.0-1.0)
  - Low (0.3): Focused, consistent
  - High (0.9): Creative, varied

## Example Training Data

```markdown
# About Our Company
We are TechSupport Inc., providing 24/7 technical assistance.

# Common Questions
Q: What are your hours?
A: We're available 24/7 to help you!

Q: How do I reset my password?
A: Click "Forgot Password" on the login page, enter your email, and check your inbox for a reset link.

# Response Style
- Always be patient and understanding
- Use simple, non-technical language when possible
- Offer to help further after each response
```

## Tips for Better Training

✅ **Do:**
- Be specific and detailed
- Provide example conversations
- Update regularly based on common questions
- Test after each change

❌ **Don't:**
- Add too much irrelevant information
- Make the training file too long (>5000 words)
- Contradict yourself in different sections

## Testing Your Training

1. Make changes to [data/custom-training.txt](data/custom-training.txt)
2. Restart server: `npm start`
3. Clear chat and ask test questions
4. Refine based on responses

## Need Help?

- Check [data/training-guide.md](data/training-guide.md) for detailed instructions
- See [README.md](README.md) for general setup
- Visit https://openrouter.ai/docs for API documentation

---

**Current Status**: ✅ Custom training is active and loaded from `data/custom-training.txt`
