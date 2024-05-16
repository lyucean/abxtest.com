.DEFAULT_GOAL := help
help:
	@grep -E '^[a-zA-Z-]+:.*?## .*$$' Makefile | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-17s\033[0m %s\n", $$1, $$2}'
.PHONY: help

include .env

mock: ## добавим, т.к. mock в jquery это тот ещё велосипед
	docker compose --profile mock_api up -d

down: ## Stop docker containers
	docker compose down --remove-orphans

build: ## Build docker images
	docker compose build

up: ## Up docker containers
	docker compose up -d

restart: ## Restart docker containers
restart: down up

