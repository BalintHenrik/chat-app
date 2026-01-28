import { renderMessages } from "./chatBody.js";

export function chatInput(chatState) {
  const input = document.getElementById("message-input");
  const sendBtn = document.getElementById("send-btn");
  sendBtn.addEventListener("click", () => sendMessage(chatState));
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage(chatState);
    }
  });
}

function sendMessage(chatState) {
  const input = document.getElementById("message-input");
  const text = input.value.trim();
  if (text !== "") {
    chatState.push({
      id: chatState.length + 1,
      sender: "Me",
      text: text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMe: true,
    });
    renderMessages(chatState);
    input.value = "";
    input.focus();
  }
}
