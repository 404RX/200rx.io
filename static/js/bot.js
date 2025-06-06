function toggleChat() {
  const box = document.getElementById('chat-box');
  box.style.display = box.style.display === 'none' ? 'flex' : 'none';
}

function showLoading() {
  const loading = document.getElementById('chat-loading');
  loading.style.display = 'block';
}

function hideLoading() {
  const loading = document.getElementById('chat-loading');
  loading.style.display = 'none';
}

function addMessage(content, isUser = false) {
  const chatLog = document.getElementById('chat-log');
  const messageDiv = document.createElement('div');
  messageDiv.className = isUser ? 'user-message' : 'bot-message';
  messageDiv.innerHTML = `<strong>${isUser ? 'You' : 'Bot'}:</strong> ${content}`;
  chatLog.appendChild(messageDiv);
  chatLog.scrollTop = chatLog.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if (!msg) return;

  // Add user message and clear input
  addMessage(msg, true);
  input.value = '';
  input.disabled = true;
  showLoading();

  try {
    const response = await fetch('https://two00rx-io-chatbot.onrender.com/ask', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      mode: 'cors',
      credentials: 'omit',
      body: JSON.stringify({ question: msg })
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    addMessage(data.answer);
  } catch (err) {
    addMessage(`Sorry, something went wrong. (${err.message})`);
  } finally {
    hideLoading();
    input.disabled = false;
    input.focus();
  }
}

// Initialize chat functionality
window.addEventListener("DOMContentLoaded", function () {
  const launcher = document.getElementById("chat-launcher");
  const input = document.getElementById("chat-input");
  const chatBox = document.getElementById("chat-box");
  const chatClose = document.getElementById("chat-close");

  if (launcher) {
    launcher.addEventListener("click", toggleChat);
  }

  if (chatClose) {
    chatClose.addEventListener("click", toggleChat);
  }

  if (input) {
    // Handle Enter key
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    // Handle Escape key to close chat
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        chatBox.style.display = 'none';
      }
    });
  }

  // Close chat when clicking outside
  document.addEventListener("click", function (e) {
    if (chatBox && chatBox.style.display !== 'none') {
      const isClickInside = chatBox.contains(e.target) || launcher.contains(e.target);
      if (!isClickInside) {
        chatBox.style.display = 'none';
      }
    }
  });
});
