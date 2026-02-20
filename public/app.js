// Generate a unique session ID for this browser session
const sessionId = 'session_' + Math.random().toString(36).substr(2, 9);

// DOM elements
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const chatContainer = document.getElementById('chatContainer');
const sendBtn = document.getElementById('sendBtn');
const sendBtnText = document.getElementById('sendBtnText');
const sendBtnLoader = document.getElementById('sendBtnLoader');
const clearBtn = document.getElementById('clearBtn');

// API endpoint (change if needed)
const API_URL = 'http://localhost:3000/api';

// Add message to chat
function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const sender = document.createElement('strong');
    sender.textContent = isUser ? 'You:' : 'AI Assistant:';
    
    const text = document.createElement('p');
    text.textContent = content;
    
    messageContent.appendChild(sender);
    messageContent.appendChild(text);
    messageDiv.appendChild(messageContent);
    
    chatContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Add error message
function addErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = '❌ Error: ' + message;
    chatContainer.appendChild(errorDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Set loading state
function setLoading(isLoading) {
    sendBtn.disabled = isLoading;
    messageInput.disabled = isLoading;
    
    if (isLoading) {
        sendBtnText.style.display = 'none';
        sendBtnLoader.style.display = 'inline-block';
    } else {
        sendBtnText.style.display = 'inline';
        sendBtnLoader.style.display = 'none';
    }
}

// Send message to API
async function sendMessage(message) {
    try {
        const response = await fetch(`${API_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                sessionId: sessionId
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to get response');
        }
        
        return data.response;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}

// Handle form submission
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const message = messageInput.value.trim();
    if (!message) return;
    
    // Add user message to chat
    addMessage(message, true);
    
    // Clear input
    messageInput.value = '';
    
    // Set loading state
    setLoading(true);
    
    try {
        // Send message to API
        const response = await sendMessage(message);
        
        // Add bot response to chat
        addMessage(response, false);
    } catch (error) {
        addErrorMessage(error.message || 'Failed to get response. Please try again.');
    } finally {
        setLoading(false);
        messageInput.focus();
    }
});

// Clear chat
clearBtn.addEventListener('click', async () => {
    if (!confirm('Are you sure you want to clear the chat?')) {
        return;
    }
    
    try {
        await fetch(`${API_URL}/clear`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sessionId: sessionId
            })
        });
        
        // Clear chat container
        chatContainer.innerHTML = '';
        
        // Add welcome message
        addMessage('Hello! I\'m your AI assistant. How can I help you today?', false);
    } catch (error) {
        console.error('Error clearing chat:', error);
        addErrorMessage('Failed to clear chat');
    }
});

// Focus input on load
messageInput.focus();

// Check server health on load
fetch(`${API_URL}/health`)
    .then(response => response.json())
    .then(data => {
        console.log('✅ Server connected:', data.message);
    })
    .catch(error => {
        console.error('❌ Server connection failed:', error);
        addErrorMessage('Cannot connect to server. Make sure the backend is running on http://localhost:3000');
    });
