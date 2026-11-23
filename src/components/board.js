import { SIZE } from "../game.js";
import { createTile, setPosition, updateTile } from "./tile.js";

export function createBoard(cellsElement, tilesElement) {
  for (let i = 0; i < SIZE * SIZE; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cellsElement.append(cell);
  }

  const nodes = new Map();

  function render(state) {
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
    }
  }

  function clear() {
    tilesElement.replaceChildren();
    nodes.clear();
  }

  return { render, clear };
}
