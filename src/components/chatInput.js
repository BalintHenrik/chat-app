import { loadFromStorage, saveToStorage } from "../utils/storage.js";
import { renderMessages } from "./chatBody.js";
import { renderSideBar } from "./sideBar.js";

export function chatInput() {
  const input = document.getElementById("message-input");
  const sendBtn = document.getElementById("send-btn");
  sendBtn.addEventListener("click", () => sendMessage());
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
}

function sendMessage() {
  const [conversations, activeChatId] = loadFromStorage();
  const input = document.getElementById("message-input");
  const text = input.value.trim();
  if (text !== "") {
    conversations[activeChatId].messages.push({
      text: text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMe: true,
    });
    saveToStorage(conversations, activeChatId);
    renderMessages();
    renderSideBar();
    input.value = "";
    input.focus();
  }
}
