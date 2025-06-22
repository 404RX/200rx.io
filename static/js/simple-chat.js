// Simple fallback chatbot without backend dependency
class SimpleChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        this.createChatInterface();
        this.bindEvents();
    }

    createChatInterface() {
        // Create chat launcher
        const launcher = document.createElement('div');
        launcher.id = 'chat-launcher';
        launcher.innerHTML = '💬 Questions about my experience?';
        launcher.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #333;
            color: #fff;
            padding: 10px 14px;
            border-radius: 20px;
            cursor: pointer;
            z-index: 1000;
            font-family: sans-serif;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        `;

        // Create chat box
        const chatBox = document.createElement('div');
        chatBox.id = 'chat-box';
        chatBox.style.cssText = `
            position: fixed;
            bottom: 70px;
            right: 20px;
            width: 320px;
            max-height: 400px;
            background: #fff;
            border: 1px solid #ccc;
            border-radius: 8px;
            font-family: sans-serif;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 999;
            display: none;
        `;

        chatBox.innerHTML = `
            <div style="background: #333; color: white; padding: 12px; border-radius: 8px 8px 0 0; font-weight: bold;">
                Chat with Corey
                <span id="chat-close" style="float: right; cursor: pointer;">&times;</span>
            </div>
            <div id="chat-messages" style="height: 250px; overflow-y: auto; padding: 10px;"></div>
            <div style="padding: 10px; border-top: 1px solid #eee;">
                <input id="chat-input" type="text" placeholder="Ask me something..." 
                       style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; outline: none;">
            </div>
        `;

        document.body.appendChild(launcher);
        document.body.appendChild(chatBox);
    }

    bindEvents() {
        const launcher = document.getElementById('chat-launcher');
        const chatBox = document.getElementById('chat-box');
        const closeBtn = document.getElementById('chat-close');
        const input = document.getElementById('chat-input');

        launcher.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.toggleChat());
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage(e.target.value);
                e.target.value = '';
            }
        });
    }

    toggleChat() {
        const chatBox = document.getElementById('chat-box');
        this.isOpen = !this.isOpen;
        chatBox.style.display = this.isOpen ? 'block' : 'none';
        
        if (this.isOpen && this.messages.length === 0) {
            this.addMessage('bot', 'Hello! I\'m Corey\'s AI assistant. I can help answer questions about his experience, skills, and background. What would you like to know?');
        }
    }

    addMessage(sender, text) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            margin-bottom: 10px;
            text-align: ${sender === 'user' ? 'right' : 'left'};
        `;
        
        const messageBubble = document.createElement('div');
        messageBubble.style.cssText = `
            display: inline-block;
            max-width: 80%;
            padding: 8px 12px;
            border-radius: 12px;
            background: ${sender === 'user' ? '#007bff' : '#f1f1f1'};
            color: ${sender === 'user' ? 'white' : '#333'};
            font-size: 14px;
            line-height: 1.4;
        `;
        messageBubble.textContent = text;
        
        messageDiv.appendChild(messageBubble);
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        this.messages.push({ sender, text });
    }

    sendMessage(text) {
        if (!text.trim()) return;
        
        this.addMessage('user', text);
        
        // Simulate thinking
        setTimeout(() => {
            const response = this.generateResponse(text);
            this.addMessage('bot', response);
        }, 500);
    }

    generateResponse(question) {
        const q = question.toLowerCase();
        
        // Basic keyword matching for demo purposes
        if (q.includes('experience') || q.includes('work') || q.includes('job')) {
            return 'Corey has extensive experience as a System Administrator with expertise in cloud administration, PowerShell, Python, and DevOps practices. He has worked in both government and private sector environments.';
        } else if (q.includes('skill') || q.includes('technology') || q.includes('tech')) {
            return 'Corey\'s key skills include: Windows Server Administration, Cloud Architecture (AWS/Azure), PowerShell scripting, Python development, Network Administration, and DevOps practices. He\'s also experienced with automation and infrastructure management.';
        } else if (q.includes('education') || q.includes('learn') || q.includes('study')) {
            return 'Corey is continuously learning and staying current with technology trends. His background includes both formal education and extensive hands-on experience in IT systems and administration.';
        } else if (q.includes('contact') || q.includes('reach') || q.includes('email')) {
            return 'You can reach Corey at vinnym@200rx.com or connect with him on LinkedIn. Feel free to reach out for opportunities or technical discussions!';
        } else if (q.includes('project') || q.includes('portfolio') || q.includes('work')) {
            return 'Corey has worked on various projects involving system automation, cloud migrations, and infrastructure optimization. Check out the Projects section above for more details about his recent work.';
        } else {
            return 'That\'s a great question! While I have limited information, I\'d recommend checking out Corey\'s full profile above or reaching out to him directly at vinnym@200rx.com for more specific details.';
        }
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    new SimpleChatbot();
});
