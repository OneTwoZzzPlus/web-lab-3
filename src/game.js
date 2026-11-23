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

function spawn(state, fresh = new Set()) {
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
  fresh.add(tile.id);
}

function lineCells(dir, i) {
  const isHorizontal = dir === "left" || dir === "right";
  const isReverse = dir === "left" || dir === "up";

  const cells = [];
  for (let k = 0; k < SIZE; k++) {
    const j = isReverse ? k : SIZE - 1 - k;
    if (isHorizontal) cells.push({ row: i, col: j });
    else cells.push({ row: j, col: i });
  }

  return cells;
}

function slideTiles(tiles) {
  const stack = [];
  let gained = 0;

  for (const tile of tiles) {
    let group = { value: tile.value, sources: [tile] };

    while (stack.length > 0 && stack[stack.length - 1].value === group.value) {
      const top = stack.pop();
      group = {
        value: group.value * 2,
        sources: [...top.sources, ...group.sources],
      };
      gained += group.value;
    }
    stack.push(group);
  }

  return { group: stack, gained };
}

function canMove(state) {
  if (state.tiles.length < SIZE * SIZE) return true;

  for (const a of state.tiles) {
    for (const b of state.tiles) {
      const distance = Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
      if (distance === 1 && a.value === b.value) return true;
    }
  }
  return false;
}

export function move(state, dir) {
  if (state.over) return null;

  const ghosts = [];
  const merged = new Set();

  const result = [];
  let gained = 0;
  let moved = false;
  let nextId = state.nextId;

  for (let i = 0; i < SIZE; i++) {
    const cells = lineCells(dir, i);
    const lineTiles = [];
    for (const { row, col } of cells) {
      const tile = state.tiles.find((t) => t.row === row && t.col === col);
      if (tile) lineTiles.push(tile);
    }

    const slid = slideTiles(lineTiles);
    gained += slid.gained;

    slid.group.forEach((group, k) => {
      const { row, col } = cells[k];

      if (group.sources.length === 1) {
        const tile = group.sources[0];
        if (tile.row !== row || tile.col !== col) moved = true;
        result.push({ ...tile, row, col });
      } else {
        moved = true;
        for (const t of group.sources) {
          ghosts.push({ id: t.id, row, col });
        }
        merged.add(nextId);
        result.push({ id: nextId, row, col, value: group.value });
        nextId++;
      }
    });
  }

  if (!moved) return null;

  state.prev = { tiles: state.tiles, score: state.score, nextId: state.nextId };
  state.tiles = result;
  state.nextId = nextId;
  state.score += gained;

  const fresh = new Set();
  const count = Math.random() < 0.5 ? 1 : 2;
  for (let i = 0; i < count; i++) spawn(state, fresh);

  state.over = !canMove(state);

  return { ghosts, fresh, merged };
}

export function undo(state) {
  if (!state.prev || state.over) return null;

  return {
    tiles: state.prev.tiles,
    score: state.prev.score,
    nextId: state.prev.nextId,
    over: false,
    saved: false,
    prev: null,
  };
}

export function isValidState(s) {
  const okTile = (t) =>
    t &&
    Number.isInteger(t.id) &&
    Number.isInteger(t.value) &&
    Number.isInteger(t.row) &&
    t.row >= 0 &&
    t.row < SIZE &&
    Number.isInteger(t.col) &&
    t.col >= 0 &&
    t.col < SIZE;

  const okPrev = (p) =>
    p === null ||
    (p &&
      Array.isArray(p.tiles) &&
      p.tiles.every(okTile) &&
      Number.isInteger(p.score) &&
      Number.isInteger(p.nextId));

  return Boolean(
    s &&
    Array.isArray(s.tiles) &&
    s.tiles.every(okTile) &&
    Number.isInteger(s.score) &&
    Number.isInteger(s.nextId) &&
    typeof s.over === "boolean" &&
    typeof s.saved === "boolean" &&
    okPrev(s.prev),
  );
}
