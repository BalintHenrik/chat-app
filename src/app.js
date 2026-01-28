import { chatInput } from "./components/chatInput.js";
import { renderMessages } from "./components/chatBody.js";

const chatState = [
  {
    id: 1,
    sender: "Alice",
    text: "Hey! ",
    time: "10:15 AM",
    isMe: false,
  },
  {
    id: 2,
    sender: "Me",
    text: "Hello, Alice! How are you?",
    time: "10:16 AM",
    isMe: true,
  },
  {
    id: 3,
    sender: "Alice",
    text: "I'm good, thanks for asking!",
    time: "10:17 AM",
    isMe: false,
  },
];

function app(chatState) {
  chatInput(chatState);
  renderMessages(chatState);
}

document.addEventListener("DOMContentLoaded", () => {
  app(chatState);
});
