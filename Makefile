.DEFAULT_GOAL := help
help:
	@grep -E '^[a-zA-Z-]+:.*?## .*$$' Makefile | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-17s\033[0m %s\n", $$1, $$2}'
.PHONY: help

mock: ## добавим mock_api
	docker compose --profile mock_api up -d

down: ## Stop docker containers
	docker compose down --remove-orphans

build: ## Build docker images
	docker compose --profile=dev_frontend build

up: ## Up docker containers
	docker compose --profile=dev_frontend up -d

restart: ## Restart docker containers
restart: down up

