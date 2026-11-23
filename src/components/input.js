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

export function attachSwipe(target, onMove, threshold = 30, axisRatio = 1.25) {
  let startX = 0;
  let startY = 0;
  let tracking = false;

  target.addEventListener(
    "touchstart",
    (e) => {
      tracking = e.touches.length === 1;
      if (!tracking) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    },
    { passive: true },
  );

  target.addEventListener("touchend", (e) => {
    if (!tracking) return;
    tracking = false;

    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (Math.max(absX, absY) < threshold) return;

    if (absX > absY * axisRatio) onMove(dx > 0 ? "right" : "left");
    else if (absY > absX * axisRatio) onMove(dy > 0 ? "down" : "up");
  });

  target.addEventListener("touchcancel", () => {
    tracking = false;
  });
}
