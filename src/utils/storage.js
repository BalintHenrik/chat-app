const CONVERSATIONS_KEY = "conversations";

let sessionActiveChatId = 1;

export function saveToStorage(conversations, activeChatId) {
  try {
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
    if (activeChatId !== undefined) {
      sessionActiveChatId = activeChatId;
    }
  } catch (error) {
    console.error("Failed to save history to localStorage", error);
  }
}

export function loadFromStorage() {
  try {
    const rawMap = localStorage.getItem(CONVERSATIONS_KEY);
    const map = rawMap ? JSON.parse(rawMap) : null;
    return [map, sessionActiveChatId];
  } catch (error) {
    console.error("Failed to load history from localStorage", error);
    return {};
  }
}
