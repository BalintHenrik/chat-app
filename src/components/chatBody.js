import { clearElementChildren, createMessage } from "../utils/dom.js";

export function renderMessages(conversations, activeChatId) {
  // console.log("Rendering messages for conversation:", conversations);
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
