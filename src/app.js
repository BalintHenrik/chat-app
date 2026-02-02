import { chatInput } from "./components/chatInput.js";
import { renderMessages } from "./components/chatBody.js";
import { renderSideBar } from "./components/sideBar.js";
import {
  deleteStorage,
  loadFromStorage,
  saveToStorage,
} from "./utils/storage.js";
import { socket } from "./utils/socket.js";
import { handleLogin } from "./components/loginModal.js";

let currentUser = "";

socket.on("user list", (users) => {
  let [conversations, activeChatId] = loadFromStorage();

  for (let socketId in users) {
    if (socketId !== socket.id && !conversations[socketId]) {
      const roomId = socketId;
      conversations[roomId] = { name: users[socketId], messages: [] };
    }
  }

  saveToStorage(conversations, activeChatId);
  renderSideBar();
});

socket.on("chat message", (msg) => {
  let [conversations, activeChatId] = loadFromStorage();
  console.log("Received message", msg);

  const isMe = socket.id !== msg.roomId;
  const roomKey = isMe ? msg.roomId : msg.socketId;
  const incomingMsg = {
    text: msg.text,
    time: msg.time,
    sender: msg.sender,
    isMe: isMe,
  };
  console.log("Incoming message", incomingMsg);

  if (!conversations[roomKey]) {
    conversations[roomKey] = {
      name: isMe ? currentUser : msg.sender,
      messages: [],
    };
  }
  conversations[roomKey].messages.push(incomingMsg);
  saveToStorage(conversations, activeChatId);

  if (roomKey === activeChatId) {
    renderMessages();
  }
  renderSideBar();
});

function app(currentUser) {
  saveToStorage({}, null);
  renderSideBar();
  chatInput(currentUser);
  renderMessages();
}

document.addEventListener("DOMContentLoaded", async () => {
  const currentUser = await handleLogin();
  console.log("Current User:", currentUser);
  app(currentUser);
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    deleteStorage();
  }
});
