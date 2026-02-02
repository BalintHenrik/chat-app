import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";
import { loadFromStorage } from "../utils/storage.js";
import { socket } from "../utils/socket.js";

export function chatInput(currentUser) {
  const input = document.getElementById("message-input");
  const sendBtn = document.getElementById("send-btn");
  sendBtn.addEventListener("click", () => sendMessage(currentUser));
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage(currentUser);
    }
  });

  const emojiBtn = document.getElementById("emoji-btn");
  const tooltip = document.getElementById("emoji-tooltip");

  let popperInstance = Popper.createPopper(emojiBtn, tooltip, {
    placement: "top",
  });

  emojiBtn.onclick = () => {
    tooltip.classList.toggle("shown");
    popperInstance.update();
  };

  const emojiPicker = document.getElementById("emoji-picker");
  emojiPicker.addEventListener("emoji-click", (event) => {
    input.value += event.detail.unicode;
    input.focus();
  });
}

function sendMessage(currentUser) {
  const [, activeChatId] = loadFromStorage();
  const input = document.getElementById("message-input");
  const text = input.value.trim();
  if (text !== "") {
    const messageData = {
      text: text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: currentUser,
      roomId: activeChatId,
      socketId: socket.id,
    };
    socket.emit("chat message", messageData);
    input.value = "";
    input.focus();
  }
}
