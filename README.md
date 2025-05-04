# ABX Audio Test

ABX Audio Test - это веб-приложение для проведения слепого тестирования способности различать качество аудио. Проект помогает пользователям определить, какое минимальное качество аудио они способны отличить от lossless-формата.

## Технологический стек

### Frontend
- HTML5/CSS3
- JavaScript (jQuery)
- Bootstrap для стилизации
- Webpack для сборки
- Custom audio player implementation

### Backend
- PHP 8.2
- Slim Framework 4.0
- Composer для управления зависимостями
- Telegram Bot API для отправки результатов

### Инфраструктура
- Docker & Docker Compose
- Nginx
- PHP-FPM
- Traefik для маршрутизации и SSL
- Make для автоматизации

## Структура проекта

```
project-root/
├── backend/                    # Backend PHP приложение
│   ├── index.php              # Основной файл с API endpoints
│   ├── vendor/                # Composer зависимости
│   └── composer.json          # Конфигурация Composer
│
├── docker/                    # Docker конфигурации
│   ├── nginx/                 # Конфигурация Nginx
│   │   └── default.conf      # Основной конфиг Nginx
│   └── php/                   # Конфигурация PHP
│       ├── Dockerfile        # Dockerfile для PHP
│       └── conf.d/           # Дополнительные конфиги PHP
│           ├── xdebug.ini    # Конфигурация Xdebug
│           └── error_reporting.ini  # Настройки отчетов об ошибках
│
├── frontend/                  # Frontend исходники
│   ├── js/                   # JavaScript файлы
│   │   ├── jquery.js        # Основная логика приложения
│   │   └── translations.js  # Файл с переводами
│   ├── css/                  # Стили
│   │   └── style.css       # Основные стили
│   └── index.html           # Главная страница
│
├── dist/                     # Собранные файлы для production
│   ├── js/                  # Скомпилированные JS файлы
│   ├── css/                 # Скомпилированные CSS файлы
│   └── index.html          # Production версия HTML
│
├── files/                    # Аудио файлы для тестирования
│   ├── DaftPunk_OneMoreTime_96kbps.mp3
│   ├── DaftPunk_OneMoreTime_128kbps.mp3
│   ├── DaftPunk_OneMoreTime_256kbps.mp3
│   ├── DaftPunk_OneMoreTime_320kbps.mp3
│   ├── DaftPunk_OneMoreTime_wav.wav
│   └── ... (другие аудио файлы)
│
├── .env                      # Переменные окружения
├── .gitignore               # Git игнорируемые файлы
├── docker-compose.yml       # Docker Compose конфигурация
├── Makefile                 # Make команды для автоматизации
├── package.json             # npm зависимости и скрипты
├── webpack.config.js        # Конфигурация Webpack
└── README.md               # Документация проекта
```

## Установка и настройка окружения

### Предварительные требования
- Docker & Docker Compose
- Node.js и npm
- Make
- Git

### Первоначальная настройка

1. Клонируйте репозиторий:
```bash
git clone [repository-url]
cd [project-directory]
```

2. Создайте файл .env в корне проекта:
```env
API_DOMAIN=https://your-domain/
ENVIRONMENT=Production
TELEGRAM_TOKEN=your-telegram-bot-token
TELEGRAM_CHAT_ID=your-telegram-chat-id
```

3. Установите npm зависимости:
```bash
npm install
```

## Разработка

### Запуск dev-сервера

1. Инициализация проекта (первый запуск):
```bash
make init
```

Эта команда:
- Остановит существующие контейнеры
- Загрузит необходимые Docker образы
- Соберет контейнеры
- Запустит PHP контейнер
- Установит Composer зависимости
- Запустит Nginx
- Поднимет Webpack dev server

2. Для последующей разработки достаточно:
```bash
make devServer
```

### Доступные make команды

| Команда | Описание |
|---------|----------|
| `make init` | Полная инициализация проекта |
| `make down` | Остановка всех контейнеров |
| `make build` | Сборка Docker контейнеров |
| `make pull` | Загрузка Docker образов |
| `make composer` | Доступ к Composer в PHP контейнере |
| `make up-php` | Запуск PHP контейнера |
| `make up-nginx` | Запуск Nginx контейнера |
| `make devServer` | Запуск Webpack dev server |
| `make realise` | Сборка production версии |

## Деплой

### Подготовка релиза

1. Соберите production версию:
```bash
make realise
```

Это создаст оптимизированную сборку в директории `dist/`

### Production окружение

В production используется Traefik для:
- Маршрутизации запросов
- Автоматического получения SSL сертификатов
- Балансировки нагрузки

Конфигурация находится в `docker-compose.yml` в секции labels сервиса `abx-nginx`.

## Контакты

Telegram: [t.me/lyucean](https://t.me/lyucean)