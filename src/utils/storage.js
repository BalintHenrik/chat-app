import { socket } from "./socket.js";

const CONVERSATIONS_KEY = "conversations";
const ACTIVE_ID_KEY = "active_id";

export function saveToStorage(conversations, activeChatId) {
  try {
    if (!socket.id) {
      console.error("Socket ID is required to save conversations");
      return;
    }
    localStorage.setItem(
      `${CONVERSATIONS_KEY}_${socket.id}`,
      JSON.stringify(conversations),
    );
    localStorage.setItem(`${ACTIVE_ID_KEY}_${socket.id}`, activeChatId);
  } catch (error) {
    console.error("Failed to save history to localStorage", error);
  }
}

export function loadFromStorage() {
  try {
    if (!socket.id) {
      console.error("Socket ID is required to load conversations");
      return {};
    }
    const rawMap = localStorage.getItem(`${CONVERSATIONS_KEY}_${socket.id}`);
    const map = rawMap ? JSON.parse(rawMap) : {};
    const activeChatId = localStorage.getItem(`${ACTIVE_ID_KEY}_${socket.id}`);
    return [map, activeChatId];
  } catch (error) {
    console.error("Failed to load history from localStorage", error);
    return [];
  }
}

export function deleteStorage() {
  try {
    localStorage.removeItem(`${CONVERSATIONS_KEY}_${socket.id}`);
    localStorage.removeItem(`${ACTIVE_ID_KEY}_${socket.id}`);
  } catch (error) {
    console.error("Failed to delete history from localStorage", error);
  }
}
