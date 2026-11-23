import { createGame, move } from "./game.js";
import { createBoard } from "./components/board.js";

const state = createGame();
const board = createBoard(
  document.querySelector("#cells"),
  document.querySelector("#tiles"),
);

board.render(state);

// Game in console
window.state = createGame();
window.move = move;
