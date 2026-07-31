.PHONY: help up down build rebuild logs ps stop clean

COMPOSE := docker compose
SERVICE := landing
PORT ?= 3000

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

up: ## Build and start the landing page in the background
	$(COMPOSE) up -d --build

down: ## Stop and remove containers
	$(COMPOSE) down

build: ## Build the landing page image
	$(COMPOSE) build

rebuild: ## Rebuild the landing page image from scratch
	$(COMPOSE) build --no-cache

logs: ## Follow landing page logs
	$(COMPOSE) logs -f $(SERVICE)

logs-db: ## Follow PostgreSQL logs
	$(COMPOSE) logs -f postgres

psql: ## Open psql shell to the waitlist database
	$(COMPOSE) exec postgres psql -U $${POSTGRES_USER:-wodoo} -d $${POSTGRES_DB:-wodoo}

ps: ## Show container status
	$(COMPOSE) ps

stop: ## Stop containers without removing them
	$(COMPOSE) stop

clean: ## Stop containers and remove local images
	$(COMPOSE) down --rmi local

open: ## Open the landing page in the default browser
	@open http://localhost:$(PORT) 2>/dev/null || xdg-open http://localhost:$(PORT) 2>/dev/null || echo "Landing page: http://localhost:$(PORT)"
