export function attachKeyboard(onMove) {
  const keys = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
  };

  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT") return;
    const dir = keys[e.key];
    if (!dir) return;
    e.preventDefault();
    onMove(dir);
  });
}
