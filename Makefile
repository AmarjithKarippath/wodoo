.PHONY: help up down build rebuild logs logs-db psql ps stop clean open \
	migrate migrate-prod \
	prod-init prod-up prod-down prod-build prod-rebuild prod-logs prod-ps \
	prod-psql prod-stop prod-pull prod-deploy

COMPOSE := docker compose
COMPOSE_PROD := docker compose -f docker-compose.prod.yml --env-file .env.production
SERVICE := landing
PORT ?= 3000

help: ## Show available commands
	@echo ""
	@echo "Local (docker-compose.yml)"
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | grep -v 'prod-' | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "Production (docker-compose.prod.yml → :3013, proxy via Cloudpanel)"
	@grep -E '^prod-[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'
	@echo ""

# ── Local ────────────────────────────────────────────────────────────────────

up: ## Build and start local stack in the background
	$(COMPOSE) up -d --build

down: ## Stop and remove local containers
	$(COMPOSE) down

build: ## Build local images
	$(COMPOSE) build

rebuild: ## Rebuild local images from scratch
	$(COMPOSE) build --no-cache

logs: ## Follow local landing logs
	$(COMPOSE) logs -f $(SERVICE)

logs-db: ## Follow local PostgreSQL logs
	$(COMPOSE) logs -f postgres

psql: ## Open psql shell (local)
	$(COMPOSE) exec postgres psql -U $${POSTGRES_USER:-wodoo} -d $${POSTGRES_DB:-wodoo}

migrate: ## Apply pending SQL migrations (local)
	@test -f db/migrations/002_waitlist_country.sql || (echo "Missing db/migrations/002_waitlist_country.sql — pull/commit latest code" && exit 1)
	@test -f db/migrations/003_blog_posts.sql || (echo "Missing db/migrations/003_blog_posts.sql — pull/commit latest code" && exit 1)
	$(COMPOSE) exec -T postgres psql -U $${POSTGRES_USER:-wodoo} -d $${POSTGRES_DB:-wodoo} < db/migrations/002_waitlist_country.sql
	$(COMPOSE) exec -T postgres psql -U $${POSTGRES_USER:-wodoo} -d $${POSTGRES_DB:-wodoo} < db/migrations/003_blog_posts.sql

ps: ## Show local container status
	$(COMPOSE) ps

stop: ## Stop local containers without removing them
	$(COMPOSE) stop

clean: ## Stop local stack and remove local images
	$(COMPOSE) down --rmi local

open: ## Open the local landing page in the browser
	@open http://localhost:$(PORT) 2>/dev/null || xdg-open http://localhost:$(PORT) 2>/dev/null || echo "Landing page: http://localhost:$(PORT)"

# ── Production (www.wodoo.store) ─────────────────────────────────────────────

prod-init: ## Create .env.production from the example (does not overwrite)
	@test -f .env.production \
		&& echo ".env.production already exists" \
		|| (cp .env.production.example .env.production && echo "Created .env.production — edit secrets before deploying")

prod-up: ## Start production stack (landing + postgres on :3013)
	@test -f .env.production || (echo "Missing .env.production — run: make prod-init" && exit 1)
	$(COMPOSE_PROD) up -d --build

prod-down: ## Stop and remove production containers
	$(COMPOSE_PROD) down

prod-build: ## Build production images
	@test -f .env.production || (echo "Missing .env.production — run: make prod-init" && exit 1)
	$(COMPOSE_PROD) build

prod-rebuild: ## Rebuild production images from scratch
	@test -f .env.production || (echo "Missing .env.production — run: make prod-init" && exit 1)
	$(COMPOSE_PROD) build --no-cache

prod-logs: ## Follow production logs (all services)
	$(COMPOSE_PROD) logs -f

prod-ps: ## Show production container status
	$(COMPOSE_PROD) ps

prod-psql: ## Open psql shell (production)
	@test -f .env.production || (echo "Missing .env.production — run: make prod-init" && exit 1)
	@set -a && . ./.env.production && set +a && \
		$(COMPOSE_PROD) exec postgres psql -U "$$POSTGRES_USER" -d "$${POSTGRES_DB:-wodoo}"

migrate-prod: ## Apply pending SQL migrations (production)
	@test -f .env.production || (echo "Missing .env.production — run: make prod-init" && exit 1)
	@test -f db/migrations/002_waitlist_country.sql || (echo "Missing db/migrations/002_waitlist_country.sql — git pull the latest commit that includes db/migrations/" && exit 1)
	@test -f db/migrations/003_blog_posts.sql || (echo "Missing db/migrations/003_blog_posts.sql — git pull the latest commit that includes db/migrations/" && exit 1)
	@set -a && . ./.env.production && set +a && \
		$(COMPOSE_PROD) exec -T postgres psql -U "$$POSTGRES_USER" -d "$${POSTGRES_DB:-wodoo}" < db/migrations/002_waitlist_country.sql && \
		$(COMPOSE_PROD) exec -T postgres psql -U "$$POSTGRES_USER" -d "$${POSTGRES_DB:-wodoo}" < db/migrations/003_blog_posts.sql

prod-stop: ## Stop production containers without removing them
	$(COMPOSE_PROD) stop

prod-deploy: ## Rebuild and restart production with zero-config recreate
	@test -f .env.production || (echo "Missing .env.production — run: make prod-init" && exit 1)
	$(COMPOSE_PROD) up -d --build --force-recreate --remove-orphans
