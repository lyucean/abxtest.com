.DEFAULT_GOAL := help
help:
	@grep -E '^[a-zA-Z-]+:.*?## .*$$' Makefile | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-17s\033[0m %s\n", $$1, $$2}'
.PHONY: help

# Добавим красоты и чтоб наши команды было видно в теле скрипта
PURPLE = \033[1;35m $(shell date +"%H:%M:%S") --
RESET = --\033[0m

init: ## Инициализация проекта
init: down pull build up-back-php composer-install up-nginx-loc

down: ## Stop docker containers
	@echo "$(PURPLE) Останавливаем контейнеры $(RESET)"
	docker compose down --remove-orphans

build: ## Build docker images
	@echo "$(PURPLE) Соберем контейнеры $(RESET)"
	docker compose build

pull: ## Pull docker images
	@echo "$(PURPLE) Загрузим необходимые Docker-образы $(RESET)"
	docker compose pull

composer: ## Подключается к контейнеру PHP и работаем с composer
	@echo "$(PURPLE) Запуск композера $(RESET)"
	docker compose exec php bash -c "composer -V; bash"

up-back-php: ## поднять backend php
	@echo "$(PURPLE) Поднимем php $(RESET)"
	docker compose up -d abx-php

composer-install: ## Установим пакеты composer
	@echo "$(PURPLE) Запуск композера $(RESET)"
	docker compose exec abx-php bash -c "composer install --no-interaction"

up-nginx-loc: ## поднять backend nginx
	@echo "$(PURPLE) Поднимем backend nginx $(RESET)"
	docker compose up -d abx-nginx-loc
