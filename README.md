# AI Chatbot

A modern, AI-powered chatbot application with a Node.js/Express backend and vanilla JavaScript frontend, integrated with OpenRouter API for access to multiple AI models.

## Features

- 🤖 **AI-Powered Conversations** - Uses OpenRouter with GPT-3.5-turbo and other models
- 💬 **Session Management** - Maintains conversation context for natural dialogue
- 🎨 **Modern UI** - Clean and responsive design with gradient theme
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- ⚡ **Real-time Chat** - Fast and smooth messaging experience
- 🔄 **Clear Chat** - Reset conversation history anytime

## Project Structure

```
Yukesh/
├── public/
│   ├── index.html      # Frontend HTML
│   ├── style.css       # Styling
│   └── app.js          # Frontend JavaScript logic
├── server.js           # Express backend server
├── package.json        # Dependencies
├── .env.example        # Environment variables template
└── .gitignore         # Git ignore rules
```

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- OpenRouter API key ([Get one here](https://openrouter.ai/keys))

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env`:
     ```bash
     copy .env.example .env
     ```
   - Open `.env` and add your OpenRouter API key:
     ```
     OPENROUTER_API_KEY=your-actual-api-key-here
     PORT=3000
     ```

## Running the Application

### Start the server:

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000`

### Access the chatbot:

Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

1. Type your message in the input field at the bottom
2. Press Enter or click the "Send" button
3. Wait for the AI assistant to respond
4. Continue the conversation naturally
5. Click "Clear Chat" to start a new conversation

## API Endpoints

### `GET /api/health`
Check if the server is running
- **Response:** `{ "status": "ok", "message": "Chatbot server is running" }`

### `POST /api/chat`
Send a message to the chatbot
- **Body:** 
  ```json
  {
    "message": "Your message here",
    "sessionId": "optional-session-id"
  }
  ```
- **Response:**
  ```json
  {
    "response": "AI response",
    "sessionId": "session-id"
  }
  ```

### `POST /api/clear`
Clear conversation history
- **Body:**
  ```json
  {
    "sessionId": "your-session-id"
  }
  ```

## Configuration

You can customize the chatbot behavior in `server.js`:

- **Model:** Change `openai/gpt-3.5-turbo` to `openai/gpt-4`, `anthropic/claude-3-opus`, or other [OpenRouter models](https://openrouter.ai/models)
- **Temperature:** Adjust `0.7` (0-1) for more creative or focused responses
- **Max Tokens:** Modify `500` to control response length
- **System Message:** Edit the initial system prompt to change the assistant's personality

## Technologies Used

### Backend
- Node.js & Express.js
- OpenRouter API (access to GPT-3.5-turbo, GPT-4, Claude, and more)
- dotenv for environment variables
- CORS for cross-origin requests

### Frontend
- HTML5
- CSS3 (with gradients and animations)
- Vanilla JavaScript (ES6+)
- Fetch API for HTTP requests

## Security Notes

- Never commit your `.env` file with the API key
- Keep your OpenRouter API key secure
- Monitor your API usage to avoid unexpected costs
- Consider adding rate limiting for production use

## Troubleshooting

### "Cannot connect to server" error
- Make sure the backend server is running (`npm start`)
- Check if port 3000 is available
- Verify the API_URL in `public/app.js` matches your server

### "Invalid API key" error
- Verify your OpenRouter API key is correct in `.env`
- Get your API key from [OpenRouter Keys](https://openrouter.ai/keys)
- Check your OpenRouter account has available credits

### Server crashes or errors
- Check the console/terminal for error messages
- Verify all dependencies are installed (`npm install`)
- Make sure Node.js version is v14 or higher

## Future Enhancements

- [ ] User authentication
- [ ] Multiple chat sessions
- [ ] Message history persistence (database)
- [ ] File/image upload support
- [ ] Voice input/output
- [ ] Dark mode toggle
- [ ] Export chat history
- [ ] Typing indicators
- [ ] Rate limiting

## License

ISC

## Author

Created with ❤️ using OpenRouter API

---

**Note:** This chatbot requires an active OpenRouter API key and will incur costs based on usage. Monitor your usage at [OpenRouter Dashboard](https://openrouter.ai/activity).
