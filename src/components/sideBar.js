import { clearElementChildren, createSideBarItem } from "../utils/dom.js";
import { renderMessages } from "./chatBody.js";
import { chatInput } from "./chatInput.js";

export function renderSideBar(conversations, activeChatId) {
  // console.log("Rendering sidebar with active chat ID:", activeChatId);
  const sideBarList = document.documentElement.querySelector(".list-group");
  if (!sideBarList) return;
  clearElementChildren(sideBarList);

  for (let id in conversations) {
    id = parseInt(id, 10);
    const chat = conversations[id];
    const isActive = activeChatId === id ? "active" : "";

    const item = createSideBarItem(chat, isActive);
    item.onclick = () => {
      activeChatId = id;
      // console.log("Active chat changed to ID:", activeChatId);
      renderSideBar(conversations, activeChatId);
      renderMessages(conversations, activeChatId);
      chatInput(conversations, activeChatId);
    };

    sideBarList.appendChild(item);
  }
}
