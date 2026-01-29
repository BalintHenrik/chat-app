import { clearElementChildren } from "../utils/dom.js";
import { loadFromStorage, saveToStorage } from "../utils/storage.js";
import { renderMessages } from "./chatBody.js";
import { socket } from "../utils/socket.js";

export function renderSideBar() {
  let [conversations, activeChatId] = loadFromStorage();
  renderSideBarItems(conversations, activeChatId);

  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    renderSideBarItems(conversations, activeChatId, searchTerm);
  });
}

function renderSideBarItems(conversations, activeChatId, searchTerm = "") {
  const sideBarList = document.documentElement.querySelector(".list-group");
  if (!sideBarList) return;
  clearElementChildren(sideBarList);

  searchTerm = document.getElementById("search-input").value.toLowerCase();
  for (let id in conversations) {
    id = parseInt(id, 10);
    const chat = conversations[id];
    if (chat.name.toLowerCase().includes(searchTerm)) {
      const item = createSideBarItem(chat, activeChatId === id ? "active" : "");
      item.onclick = () => {
        activeChatId = id;
        socket.emit("join room", activeChatId);
        saveToStorage(conversations, activeChatId);

        renderSideBar();
        renderMessages();
      };
      sideBarList.appendChild(item);
    }
  }
}

function createSideBarItem(chat, isActive = "") {
  if (!chat) {
    return null;
  }
  const item = document.createElement("a");
  item.href = "#";
  item.className = "list-group-item list-group-item-action py-3 lh-sm";
  if (isActive) {
    item.classList.add(isActive);
  }

  const div = document.createElement("div");
  div.className = "d-flex w-100 align-items-center justify-content-between";

  const strong = document.createElement("strong");
  strong.className = "mb-1";
  strong.textContent = chat.name;

  const small = document.createElement("small");
  small.className = "text-body-secondary";

  const lastMsg = document.createElement("div");
  lastMsg.className = "col-10 mb-1 small";

  if (chat.messages.length !== 0) {
    lastMsg.textContent =
      chat.messages[chat.messages.length - 1].text.slice(0, 30) + "...";
    small.textContent = chat.messages[chat.messages.length - 1].time;
  } else {
    lastMsg.textContent = "No messages yet. Start the conversation!";
    small.textContent = "";
  }

  div.appendChild(strong);
  div.appendChild(small);
  item.appendChild(div);
  item.appendChild(lastMsg);

  return item;
}
