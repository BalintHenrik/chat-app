import { chatInput } from "./components/chatInput.js";
import { renderMessages } from "./components/chatBody.js";
import { renderSideBar } from "./components/sideBar.js";
import { saveToStorage } from "./utils/storage.js";

const conversations = {
  1: {
    name: "Alice Cooper",
    messages: [
      { text: "Hey! ", time: "10:15 AM", isMe: false },
      { text: "Hello, Alice! How are you?", time: "10:16 AM", isMe: true },
      { text: "I'm good, thanks for asking!", time: "10:17 AM", isMe: false },
    ],
  },
  2: {
    name: "Bob Smith",
    messages: [
      { text: "Hi there!", time: "9:00 AM", isMe: false },
      { text: "Hey Bob, what's up?", time: "9:01 AM", isMe: true },
    ],
  },
  3: {
    name: "Charlie Johnson",
    messages: [
      { text: "Good morning!", time: "8:30 AM", isMe: false },
      { text: "Morning Charlie!", time: "8:31 AM", isMe: true },
    ],
  },
  4: {
    name: "Alice Prince",
    messages: [],
  },
};

function app(conversations) {
  saveToStorage(conversations, 1);
  renderSideBar();
  chatInput();
  renderMessages();
}

document.addEventListener("DOMContentLoaded", () => {
  app(conversations);
});
