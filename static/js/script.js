document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    
    function addMessage(message, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'user-message' : 'bot-message';
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
                <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        addMessage(message, true);
        userInput.value = '';
        
        // Send to server
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            addMessage(data.response, false);
        })
        .catch(error => {
            addMessage("Sorry, I'm having trouble connecting to the server.", false);
            console.error('Error:', error);
        });
    }
    
    sendButton.addEventListener('click', sendMessage);
    
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});