# abxtest.com

Platform for ABX Audio Testing https://abxtest.com

Установленные пакеты node:
- `npm i -D webpack webpack-cli`
- `npm i -D html-webpack-plugin` плагин создает HTML-файл на основе шаблона
- `npm i -D webpack-dev-server` сервер для разработки
- `npm i -D filemanager-webpack-plugin` удаление, копирование и перемещение внутри проекта
- `npm i -D style-loader css-loader` сборка и добавление css к проекту
- `npm i -D mini-css-extract-plugin` извлечение CSS из файлов .js
- `npm i -D favicons favicons-webpack-plugin` добавляет favicons
- `npm i jquery` добавляет jquery
- `npm i dotenv dotenv-webpack` добавляет .env в проект



- Сборка проекта - `webpack --mode production`
- Поднять дев - `webpack serve --open --mode development`
- Поднять мок для разработки `make mock`
- Поднять бек - `make init`