import { createGame, move, undo } from "./game.js";
import { createBoard } from "./components/board.js";
import { attachKeyboard } from "./components/input.js";

const scoreEl = document.querySelector("#score");
const overlayEl = document.querySelector("#game-over");
const finalScoreEl = document.querySelector("#final-score");
const restartBtnEl = document.querySelector("#restart");
const restartOverBtnEl = document.querySelector("#over-restart");
const undoBtnEl = document.querySelector("#undo");

let state = createGame();
const board = createBoard(
  document.querySelector("#cells"),
  document.querySelector("#tiles"),
);

function handleUndo() {
  const previous = undo(state);
  if (!previous) return;
  state = previous;
  draw();
}

undoBtnEl.addEventListener("click", handleUndo);

function handleRestart() {
  state = createGame();
  board.clear();
  draw();
}

restartBtnEl.addEventListener("click", handleRestart);
restartOverBtnEl.addEventListener("click", handleRestart);

function draw() {
  board.render(state);
  scoreEl.textContent = state.score;
  finalScoreEl.textContent = state.score;
  overlayEl.hidden = !state.over;
  undoBtnEl.disabled = !state.prev || state.over;
}

function handleMove(dir) {
  if (move(state, dir)) draw();
}

attachKeyboard(handleMove);
draw();
