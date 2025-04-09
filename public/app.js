document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const codeDisplay = document.getElementById('code-display');

    // Connect to Socket.io
    socket.on('connect', () => {
        addMessage('ai', 'Welcome to the AI Coding Assessment! I\'ll guide you through coding challenges step by step.');
    });

    // Handle incoming messages
    socket.on('chat message', (msg) => {
        addMessage(msg.user, msg.text);
    });

    // Send message function
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            socket.emit('chat message', message);
            addMessage('user', message);
            userInput.value = '';
        }
    }

    // Add message to chat UI
    function addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `mb-2 p-3 rounded-lg max-w-xs ${sender === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200 text-gray-800 mr-auto'}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Event listeners
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Initial assessment prompt
    setTimeout(() => {
        socket.emit('chat message', 'start assessment');
    }, 1000);
});
