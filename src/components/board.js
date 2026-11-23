import { SIZE } from "../game.js";
import { createTile, setPosition, updateTile } from "./tile.js";

export function createBoard(cellsElement, tilesElement) {
  for (let i = 0; i < SIZE * SIZE; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cellsElement.append(cell);
  }

  const nodes = new Map();

  function render(
    state,
    { ghosts = [], fresh = new Set(), merged = new Set() } = {},
  ) {
    for (const g of ghosts) {
      const node = nodes.get(g.id);
      if (!node) continue;
      nodes.delete(g.id);
      node.classList.add("ghost");
      setPosition(node, g);
      setTimeout(() => node.remove(), 140);
    }

    const alive = new Set(state.tiles.map((t) => t.id));
    for (const [id, node] of nodes) {
      if (!alive.has(id)) {
        node.remove();
        nodes.delete(id);
      }
    }

    for (const tile of state.tiles) {
      let node = nodes.get(tile.id);
      if (!node) {
        node = createTile(tile);
        tilesElement.append(node);
        nodes.set(tile.id, node);
      } else {
        updateTile(node, tile);
        setPosition(node, tile);
      }
      node.classList.toggle("new", fresh.has(tile.id));
      node.classList.toggle("merged", merged.has(tile.id));
    }
  }

  function clear() {
    tilesElement.replaceChildren();
    nodes.clear();
  }

  return { render, clear };
}
