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
