export function createTile(tile) {
  const node = document.createElement("div");
  node.classList.add("tile");
  node.dataset.value = tile.value;
  node.dataset.digits = String(tile.value).length;

  const inner = document.createElement("div");
  inner.classList.add("tile-inner");
  inner.textContent = tile.value;
  node.append(inner);

  node.style.transform = `translate(${tile.col * 100}%, ${tile.row * 100}%)`;
  return node;
}
