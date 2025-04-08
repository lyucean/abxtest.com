# ABX Test Project

Этот проект помогает пользователям проверить свою способность различать форматы аудио разного качества.

## Инструкции по установке

### Требования
- Docker и Docker Compose
- Node.js (v14 или новее)
- npm (v6 или новее)

### Установка и запуск

#### Бэкенд
Для инициализации бэкенд-сервисов:

```bash
make init
```

Эта команда выполнит:

1. Остановку всех запущенных контейнеров
2. Загрузку необходимых Docker-образов
3. Сборку Docker-контейнеров
4. Запуск PHP-контейнера
5. Установку зависимостей Composer
6. Запуск Nginx-контейнера
7. Запуск фронтенд-сервера разработки

### Фронтенд
Перед запуском сервера разработки необходимо установить зависимости:

```bash
# Перейти в директорию frontend
cd frontend

# Установить зависимости
npm install
```

### Доступные команды
- Сборка проекта для продакшн:
  
  ```bash
  webpack --mode production
   ```
  
  или
  
  ```bash
  make realise
   ```
- Запуск сервера разработки:
  
  ```bash
  webpack serve --open --mode development
   ```
  
  или
  
  ```bash
  cd frontend && npm run dev
   ```
- Запуск мок-сервера для разработки:
  
  ```bash
  make mock
   ```
- Запуск бэкенда:
  
  ```bash
  make init
   ```

## Все доступные Make-команды
- make init - Инициализация всего проекта
- make down - Остановка всех Docker-контейнеров
- make build - Сборка Docker-образов
- make pull - Загрузка необходимых Docker-образов
- make up-php - Запуск PHP-контейнера
- make up-nginx - Запуск Nginx-контейнера
- make composer-install - Установка зависимостей Composer
- make devServer - Запуск фронтенд-сервера разработки
- make realise - Сборка фронтенда для продакшн
- make mock - Запуск мок-сервера для разработки
- make composer - Подключение к контейнеру PHP для работы с composer

## Рабочий процесс разработки
1. Запустите бэкенд: make init
2. В отдельном терминале запустите фронтенд-сервер разработки: cd frontend && npm run dev
3. Для тестирования без бэкенда используйте мок-сервер: make mock
4. Для сборки проекта в продакшн используйте: make realise
После запуска сервера разработки, сайт будет доступен по адресу: http://localhost:8080


Установленные пакеты node:

- npm i -D webpack webpack-cli
- npm i -D html-webpack-plugin плагин создает HTML-файл на основе шаблона
- npm i -D webpack-dev-server сервер для разработки
- npm i -D filemanager-webpack-plugin удаление, копирование и перемещение внутри проекта
- npm i -D style-loader css-loader сборка и добавление css к проекту
- npm i -D mini-css-extract-plugin извлечение CSS из файлов .js
- npm i -D favicons favicons-webpack-plugin добавляет favicons
- npm i jquery добавляет jquery
- npm i dotenv dotenv-webpack добавляет .env в проект