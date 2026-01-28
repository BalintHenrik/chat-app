import { renderMessages } from "./chatBody.js";
import { renderSideBar } from "./sideBar.js";

export function chatInput(conversations, activeChatId) {
  console.log("Setting up chat input for conversation ID:", activeChatId);
  const input = document.getElementById("message-input");
  const sendBtn = document.getElementById("send-btn");
  sendBtn.addEventListener("click", () =>
    sendMessage(conversations, activeChatId),
  );
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage(conversations, activeChatId);
    }
  });
}

function sendMessage(conversations, activeChatId) {
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
    renderMessages(conversations, activeChatId);
    renderSideBar(conversations, activeChatId);
    input.value = "";
    input.focus();
  }
}
