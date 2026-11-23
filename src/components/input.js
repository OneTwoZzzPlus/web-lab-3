export function attachKeyboard(onMove) {
  const keys = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
  };

  document.addEventListener("keydown", (e) => {
    const dir = keys[e.key];
    if (!dir) return;
    e.preventDefault();
    onMove(dir);
  });
}
