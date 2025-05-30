async function sendMessage() {
  const input = document.getElementById('chat-input');
  const chatLog = document.getElementById('chat-log');
  const msg = input.value;
  if (!msg) return;
  chatLog.innerHTML += '<div><strong>You:</strong> ' + msg + '</div>';
  input.value = '';

  const response = await fetch('https://two00rx-io-chatbot.onrender.com', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({question: msg})
  });
  const data = await response.json();
  chatLog.innerHTML += '<div><strong>Bot:</strong> ' + data.answer + '</div>';
}

function toggleChat() {
  const box = document.getElementById('chat-box');
  box.style.display = box.style.display === 'none' ? 'block' : 'none';
}