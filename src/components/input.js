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

export function attachSwipe(target, onMove, threshold = 30) {
  let startX = 0;
  let startY = 0;

  target.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    },
    { passive: true },
  );

  target.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;

    if (Math.max(Math.abs(dx), Math.abs(dy)) < threshold) return;

    if (Math.abs(dx) > Math.abs(dy)) {
      onMove(dx > 0 ? "right" : "left");
    } else {
      onMove(dy > 0 ? "down" : "up");
    }
  });
}
