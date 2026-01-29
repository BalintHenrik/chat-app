import { clearElementChildren } from "../utils/dom.js";
import { loadFromStorage } from "../utils/storage.js";

export function renderMessages() {
  const [conversations, activeChatId] = loadFromStorage();
  const chatBody = document.getElementById("chat-body");
  clearElementChildren(chatBody);
  const conversation = conversations[activeChatId];
  const headerName = document.querySelector(".chat-header-name");
  headerName.textContent = conversation.name;

  conversation.messages.forEach((msg) => {
    const msgDiv = createMessage(msg);
    if (msgDiv) {
      chatBody.appendChild(msgDiv);
    }
  });

  chatBody.scrollTop = chatBody.scrollHeight;
}

function createMessage(msg) {
  if (!msg) {
    return null;
  }
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", msg.isMe ? "sent" : "received");

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = msg.text;

  const timestamp = document.createElement("span");
  timestamp.className = "timestamp";
  timestamp.textContent = msg.time;

  msgDiv.appendChild(bubble);
  msgDiv.appendChild(timestamp);

  return msgDiv;
}
