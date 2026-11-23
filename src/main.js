import { createGame, move } from "./game.js";
import { createBoard } from "./components/board.js";
import { attachKeyboard } from "./components/input.js";

const scoreEl = document.querySelector("#score");
const overlayEl = document.querySelector("#game-over");
const finalScoreEl = document.querySelector("#final-score");

let state = createGame();
const board = createBoard(
  document.querySelector("#cells"),
  document.querySelector("#tiles"),
);

function draw() {
  board.render(state);
  scoreEl.textContent = state.score;
  finalScoreEl.textContent = state.score;
  overlayEl.hidden = !state.over;
}

function handleMove(dir) {
  if (move(state, dir)) draw();
}

attachKeyboard(handleMove);
draw();
