function toggleChat() {
  const box = document.getElementById('chat-box');
  box.style.display = box.style.display === 'none' ? 'block' : 'none';
}

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const chatLog = document.getElementById('chat-log');
  const msg = input.value;
  if (!msg) return;
  chatLog.innerHTML += '<div><strong>You:</strong> ' + msg + '</div>';
  input.value = '';

  try {
    const response = await fetch('https://two00rx-io-chatbot.onrender.com/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: msg })
    });

    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    const data = await response.json();
    chatLog.innerHTML += `<div><strong>Bot:</strong> ${data.answer}</div>`;
  } catch (err) {
    chatLog.innerHTML += `<div><strong>Bot:</strong> Sorry, something went wrong. (${err.message})</div>`;
  }
}

// Bind enter key to send message
window.addEventListener("DOMContentLoaded", function () {
  const launcher = document.getElementById("chat-launcher");
  if (launcher) {
    launcher.addEventListener("click", toggleChat);
  }

  const input = document.getElementById("chat-input");
  if (input) {
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }
});
