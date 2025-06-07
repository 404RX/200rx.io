window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("chat-root");
  if (!root) return;

  root.innerHTML = `
    <div id="chat-launcher">💬 Questions about my experience?</div>
    <div id="chat-box" style="display: none;">
      <div id="chat-log"></div>
      <input id="chat-input" placeholder="Ask me something..." onkeydown="if(event.key==='Enter'){sendMessage()}" />
    </div>
  `;

  document.getElementById("chat-launcher").onclick = () => {
    const box = document.getElementById("chat-box");
    box.style.display = box.style.display === "none" ? "block" : "none";
  };
});

async function sendMessage() {
  const input = document.getElementById("chat-input");
  const log = document.getElementById("chat-log");
  const userMessage = input.value;
  if (!userMessage) return;

  log.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;
  input.value = "";

  try {
    const res = await fetch("https://<your-backend>.onrender.com/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: userMessage })
    });
    const data = await res.json();
    log.innerHTML += `<div><strong>Bot:</strong> ${data.answer}</div>`;
  } catch (err) {
    log.innerHTML += `<div><strong>Bot:</strong> Sorry, something went wrong. (${err.message})</div>`;
  }
}
