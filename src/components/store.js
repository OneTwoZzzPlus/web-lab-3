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

const LEADERS_KEY = "2048:leaders";

export function getLeaders() {
  try {
    const text = localStorage.getItem(LEADERS_KEY);
    const list = text ? JSON.parse(text) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function addLeader(name, score) {
  let list = getLeaders();
  list.push({ name, score, date: new Date().toISOString() });
  list.sort((a, b) => b.score - a.score);
  list = list.slice(0, 10);

  try {
    localStorage.setItem(LEADERS_KEY, JSON.stringify(list));
  } catch {}
}
