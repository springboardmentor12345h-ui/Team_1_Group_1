# Chatbot Training Guide

## How to Train Your Chatbot

This chatbot uses the OpenRouter API and can be "trained" through prompt engineering and context injection. Here's how to customize its behavior:

## Method 1: Edit context.txt (Recommended)

The main training file is `data/context.txt`. The chatbot reads this file on every new conversation and includes it in the system prompt.

### What to add:
1. **Company/Product Information**: Details about your business, services, or products
2. **FAQs**: Common questions and their ideal answers
3. **Domain Knowledge**: Specialized information relevant to your use case
4. **Response Guidelines**: How the chatbot should respond (tone, style, length)
5. **Example Conversations**: Show the chatbot how to handle specific scenarios

### Example Context:
```
# About Our Company
We are TechCorp, a software development company specializing in web applications.
Founded in 2020, we serve clients worldwide.

# Services
- Web Development
- Mobile App Development
- Cloud Solutions
- AI Integration

# Common Questions
Q: What are your business hours?
A: We operate Monday-Friday, 9 AM - 5 PM EST.

Q: How do I contact support?
A: Email us at support@techcorp.com or call 1-800-TECH-CORP
```

## Method 2: Modify System Prompt

Edit the system prompt directly in `server.js` (line ~41):

```javascript
let systemPrompt = 'You are a helpful and friendly AI assistant. Provide concise, accurate, and helpful responses.';
```

Change it to match your needs:
```javascript
let systemPrompt = 'You are Sarah, a customer service representative for TechCorp. You are friendly, professional, and knowledgeable about our software products. Always maintain a helpful tone and prioritize customer satisfaction.';
```

## Method 3: Few-Shot Learning

Add examples in the context to show the chatbot how to respond:

```
# Example Conversations

User: "I need help with my account"
Assistant: "I'd be happy to help you with your account! Could you please tell me what specific issue you're experiencing?"

User: "How do I reset my password?"
Assistant: "To reset your password: 1) Go to the login page, 2) Click 'Forgot Password', 3) Enter your email, 4) Check your inbox for a reset link. Let me know if you need any clarification!"
```

## Method 4: Dynamic Context (Advanced)

For advanced use cases, you can modify the chat endpoint to load different contexts based on:
- User type
- Conversation topic
- Time of day
- Previous interactions

Edit the `/api/chat` endpoint in `server.js` to add conditional context loading.

## Testing Your Training

After adding training data:
1. Restart the server: `npm start`
2. Start a new conversation (Click "Clear Chat")
3. Test with questions related to your training data
4. Refine the context based on responses

## Tips for Better Training

1. **Be Specific**: The more detailed your context, the better the responses
2. **Use Examples**: Show don't just tell - provide example Q&A pairs
3. **Update Regularly**: Keep your training data current
4. **Test Thoroughly**: Try edge cases and unusual questions
5. **Monitor Conversations**: Review actual user interactions to improve training

## Model Selection

Different models have different capabilities. Edit `server.js` to change models:

```javascript
model: 'openai/gpt-3.5-turbo',  // Fast, cost-effective
// model: 'openai/gpt-4',       // Most capable
// model: 'anthropic/claude-3-opus', // Great for reasoning
// model: 'meta-llama/llama-3-8b', // Free option
```

See all available models at: https://openrouter.ai/models

## Limitations

- This is prompt-based training, not true model fine-tuning
- The AI may still provide information outside your training data
- Complex or ambiguous queries might not follow your guidelines perfectly
- Training data is loaded per session, not stored in model weights

## Advanced: Fine-Tuning

For true model training (fine-tuning), you would need to:
1. Prepare a dataset of training examples
2. Use OpenAI's fine-tuning API
3. Create a custom model
4. Update the model ID in your code

This is more expensive and complex but provides better results for specialized use cases.

---

Need help? Check the README.md or visit OpenRouter documentation.
