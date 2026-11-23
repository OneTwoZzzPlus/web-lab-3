const STATE_KEY = "2048:state";

export function loadState() {
  try {
    const text = localStorage.getItem(STATE_KEY);
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch {}
}
