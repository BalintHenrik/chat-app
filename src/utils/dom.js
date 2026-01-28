export function clearElementChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function createMessage(msg) {
  if (!msg) {
    return null;
  }
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", msg.isMe ? "sent" : "received");

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = msg.text;

  const timestamp = document.createElement("span");
  timestamp.className = "timestamp";
  timestamp.textContent = msg.time;

  msgDiv.appendChild(bubble);
  msgDiv.appendChild(timestamp);

  return msgDiv;
}

export function createSideBarItem(chat, isActive = "") {
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
  small.textContent = chat.messages[chat.messages.length - 1].time;

  const lastMsg = document.createElement("div");
  lastMsg.className = "col-10 mb-1 small";
  lastMsg.textContent =
    chat.messages[chat.messages.length - 1].text.slice(0, 30) + "...";

  div.appendChild(strong);
  div.appendChild(small);
  item.appendChild(div);
  item.appendChild(lastMsg);

  return item;
}
