export function renderLeaders(listElement, records) {
  listElement
    .querySelectorAll("li:not(.leaders-head)")
    .forEach((li) => li.remove());

  if (records.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Нет сохраненных рекордов";
    listElement.append(li);
    return;
  }

  for (const record of records) {
    const li = document.createElement("li");

    const name = document.createElement("span");
    name.classList.add("name");
    name.textContent = record.name;

    const score = document.createElement("b");
    score.textContent = record.score;

    const date = document.createElement("span");
    date.classList.add("date");
    date.textContent = new Date(record.date).toLocaleString("ru-RU", {
      dateStyle: "short",
      timeStyle: "short",
    });

    li.append(name, score, date);
    listElement.append(li);
  }
}
