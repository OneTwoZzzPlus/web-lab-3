# 2048

[ТЗ на работу](https://github.com/elmosmokinweed/WEB2025Q26LB3) ●
[Развернутая страница](https://onetwozzzplus.github.io/web-lab-3)

[![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Запуск

Запустить простой http сервер, например `python3 -m http.server 8000` или vscode live server, открыть сайт.

## Структура проекта

```text
/
├── index.html              # Разметка
├── style.css               # Стили, адаптив, анимации и палитра
├── assets/                 # Статические ресурсы (favicon.svg, reload.svg)
└── src/
    ├── main.js             # Точка входа
    ├── game.js             # Чистая игровая логика
    └── components/
        ├── board.js        # Отрисовка сетки 4x4, обновление позиций и анимаций плиток/призраков
        ├── tile.js         # Создание и обновление DOM-элементов плиток и их размеров шрифта
        ├── input.js        # Обработка управления с клавиатуры (стрелки) и свайпов на тач-экранах
        ├── leaderboard.js  # Отрисовка таблицы лидеров и форматирование даты
        └── store.js        # Чтение и запись состояния игры и топ-10 рекордов в localStorage
```

## Схема работы

1. **Инициализация:** при загрузке `main.js` пытается прочитать сохраненное состояние из `localStorage` (`loadState`) и проверяет его через `isValidState`. Если сохранений нет или данные повреждены, создается новая игра (`createGame`) с 1–3 случайными плитками `2` или `4`. Затем вызывается `draw()`, который строит поле и сохраняет состояние.

2. **Ход игрока:** нажатие стрелки (`attachKeyboard`) или свайп (`attachSwipe`) вызывает `handleMove(dir)`. Если модальное окно рекордов закрыто, вызывается `move(state, dir)`:
   - Поле просматривается построчно или по столбцам в зависимости от направления (`lineCells`).
   - Плитки сдвигаются и объединяются (`slideTiles`), начисляются очки (`gained`), формируются списки `ghosts` (плитки, участвовавшие в слиянии), `merged` (новые объединенные плитки) и `fresh` (новые появившиеся после хода плитки).
   - Если ни одна плитка не сдвинулась и не объединилась, ход игнорируется (`null`).
   - Иначе текущий снимок сохраняется в `state.prev` (для `undo`), добавляются 1–2 новые плитки (`2` или `4` на свободные клетки) и проверяется `canMove(state)` — если ходов нет, выставляется `state.over = true`.

3. **Отрисовка и сохранение:** `draw(events)` сохраняет `state` в `localStorage` (`saveState`), обновляет счет, состояние кнопки `undo` и оверлей окончания игры, а `board.render(...)` плавно перемещает плитки через CSS `transform: translate(...)` и запускает анимации.

4. **Рекорды и перезапуск:** при `state.over` открывается оверлей с формой. Отправка формы вызывает `addLeader(name, score)` (сортировка по убыванию очков и обрезка до топ-10 в `localStorage`), скрывает форму и показывает _«Ваш рекорд сохранен»_. Кнопки «Заново» и «Отменить» обновляют `state` и перерисовывают интерфейс без перезагрузки страницы.
