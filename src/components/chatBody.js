import { clearElementChildren, createMessage } from "../utils/dom.js";

export function renderMessages(chatState) {
  const chatBody = document.getElementById("chat-body");
  clearElementChildren(chatBody);

  chatState.forEach((msg) => {
    const msgDiv = createMessage(msg);
    if (msgDiv) {
      chatBody.appendChild(msgDiv);
    }
  });

  chatBody.scrollTop = chatBody.scrollHeight;
}
