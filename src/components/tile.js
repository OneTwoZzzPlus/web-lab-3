export function setPosition(node, tile) {
  node.style.transform = `translate(${tile.col * 100}%, ${tile.row * 100}%)`;
}

export function updateTile(node, tile) {
  node.dataset.value = tile.value;
  node.dataset.digits = String(tile.value).length;
  node.firstChild.textContent = tile.value;
}

export function createTile(tile) {
  const node = document.createElement("div");
  node.classList.add("tile");

  const inner = document.createElement("div");
  inner.classList.add("tile-inner");
  node.append(inner);

  updateTile(node, tile);
  setPosition(node, tile);

  return node;
}
