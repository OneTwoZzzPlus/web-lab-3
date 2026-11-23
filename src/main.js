import { createGame, move, undo, isValidState } from "./game.js";
import { createBoard } from "./components/board.js";
import { attachKeyboard, attachSwipe } from "./components/input.js";
import { renderLeaders } from "./components/leaderboard.js";
import {
  loadState,
  saveState,
  addLeader,
  getLeaders,
} from "./components/store.js";

const scoreEl = document.querySelector("#score");
const overlayEl = document.querySelector("#game-over");
const finalScoreEl = document.querySelector("#final-score");
const restartBtnEl = document.querySelector("#restart");
const undoBtnEl = document.querySelector("#undo");

const restartOverBtnEl = document.querySelector("#over-restart");
const formEl = document.querySelector("#save-form");
const nameEl = document.querySelector("#player-name");
const overMessageEl = document.querySelector("#over-message");
const savedMessageEl = document.querySelector("#saved-message");

const modalEl = document.querySelector("#modal");
const leadersEl = document.querySelector("#leaders");
const leadersOpenEl = document.querySelector("#leaders-open");
const modalCloseEl = document.querySelector("#modal-close");

function openLeaders() {
  renderLeaders(leadersEl, getLeaders());
  modalEl.hidden = false;
  modalCloseEl.focus();
}

function closeLeaders() {
  modalEl.hidden = true;
  leadersOpenEl.focus();
}

leadersOpenEl.addEventListener("click", openLeaders);
modalCloseEl.addEventListener("click", closeLeaders);

modalEl.addEventListener("click", (e) => {
  if (e.target === modalEl) closeLeaders();
});

document.addEventListener("keydown", (e) => {
  if (modalEl.hidden) return;
  if (e.key === "Escape") {
    closeLeaders();
  } else if (e.key === "Tab") {
    e.preventDefault();
    modalCloseEl.focus();
  }
});

let state = loadState();
if (!isValidState(state)) {
  state = createGame();
}

const board = createBoard(
  document.querySelector("#cells"),
  document.querySelector("#tiles"),
);

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  if (state.saved) return;

  const name = Array.from(nameEl.value.trim()).slice(0, 20).join("") || "Игрок";
  addLeader(name, state.score);
  state.saved = true;
  nameEl.value = "";
  draw();
});

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

function draw(events) {
  saveState(state);
  board.render(state, events);
  scoreEl.textContent = state.score;
  undoBtnEl.disabled = !state.prev || state.over;
  finalScoreEl.textContent = state.score;
  overlayEl.hidden = !state.over;
  overMessageEl.hidden = state.saved;
  savedMessageEl.hidden = !state.saved;
}

function handleMove(dir) {
  if (!modalEl.hidden) return;
  const events = move(state, dir);
  if (events) draw(events);
}

attachKeyboard(handleMove);
attachSwipe(document.querySelector("#board"), handleMove);
draw();
