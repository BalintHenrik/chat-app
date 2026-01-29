const CONVERSATIONS_KEY = "conversations";
const ACTIVE_ID_KEY = "active_id";

export function saveToStorage(conversations, activeChatId) {
  try {
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
    localStorage.setItem(ACTIVE_ID_KEY, activeChatId);
  } catch (error) {
    console.error("Failed to save history to localStorage", error);
  }
}

export function loadFromStorage() {
  try {
    const rawMap = localStorage.getItem(CONVERSATIONS_KEY);
    const map = rawMap ? JSON.parse(rawMap) : {};
    const rawId = localStorage.getItem(ACTIVE_ID_KEY);
    const activeId = rawId ? JSON.parse(rawId) : null;
    return [map, parseInt(activeId, 10)];
  } catch (error) {
    console.error("Failed to load history from localStorage", error);
    return {};
  }
}
