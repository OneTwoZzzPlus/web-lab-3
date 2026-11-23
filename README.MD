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
├── index.html              # HTML (подключение скрипта)
├── style.css               # CSS (стили)
├── assets/                 # Иконки
└── src/
    ├── main.js             # Точка входа
    └── components
```

## Схема работы

Клавиша или свайп → handleMove → move(state, dir) → {ghosts, fresh, merged} → draw() → board.render + saveState
