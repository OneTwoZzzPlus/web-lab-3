import { SIZE } from "../game.js";
import { createTile } from "./tile.js";

export function createBoard(cellsElement, tilesElement) {
  for (let i = 0; i < SIZE * SIZE; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cellsElement.append(cell);
  }

  function render(state) {
    for (const tile of state.tiles) {
      tilesElement.append(createTile(tile));
    }
  }

  return { render };
}
