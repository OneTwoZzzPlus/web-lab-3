export const SIZE = 4;

export function createGame() {
  const state = {
    tiles: [],
    score: 0,
    nextId: 1,
    over: false,
    saved: false,
    prev: null,
  };

  const count = Math.ceil(Math.random() * 3);
  for (let i = 0; i < count; i++) spawn(state);

  return state;
}

export function spawn(state) {
  const free = [];
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      const busy = state.tiles.some((t) => t.row === row && t.col === col);
      if (!busy) free.push({ row, col });
    }
  }
  if (free.length === 0) return;

  const cell = free[Math.floor(Math.random() * free.length)];

  const tile = {
    id: state.nextId,
    row: cell.row,
    col: cell.col,
    value: Math.random() < 0.9 ? 2 : 4,
  };
  state.nextId++;
  state.tiles.push(tile);
}
