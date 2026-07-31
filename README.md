# Woodo Store

Landing page for **Woodo Store** (`www.wodoo.store`) — a Next.js site with a registration waitlist backed by PostgreSQL.

The Medusa store (`store/`) is separate and not part of this Docker stack yet. This setup hosts the landing page only.

## Requirements

- [Docker](https://docs.docker.com/get-docker/) with Compose v2
- [Make](https://www.gnu.org/software/make/)

## Project layout

```
.
├── landing/                 # Next.js landing app
├── db/init/                 # Postgres schema (waitlist table)
├── deploy/Caddyfile         # Production reverse proxy + HTTPS
├── docker-compose.yml       # Local development stack
├── docker-compose.prod.yml  # Production stack (www.wodoo.store)
├── .env.example             # Local env template
├── .env.production.example  # Production env template
└── Makefile                 # Local + production commands
```

## Local development

### 1. Configure environment (optional)

```bash
cp .env.example .env
```

Defaults work out of the box:

| Variable | Default |
|----------|---------|
| `LANDING_PORT` | `3000` |
| `POSTGRES_USER` | `wodoo` |
| `POSTGRES_PASSWORD` | `wodoo` |
| `POSTGRES_DB` | `wodoo` |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` |

### 2. Start

```bash
make up
```

Open **http://localhost:3000**.

### 3. Useful local commands

```bash
make help       # List all commands
make logs       # Follow landing logs
make logs-db    # Follow Postgres logs
make ps         # Container status
make psql       # Open psql shell
make rebuild    # Rebuild images from scratch
make down       # Stop and remove containers
make clean      # Stop and remove local images
make open       # Open the site in a browser
```

### Waitlist (local)

Clicking **Start free** or **Start your store** opens a registration form (name, email, store name, optional website). On submit, the visitor is told they are on the waiting list due to high demand. Data is stored in Postgres:

```sql
SELECT * FROM waitlist ORDER BY created_at DESC;
```

```bash
make psql
# then run the query above
```

## Production deployment (www.wodoo.store)

Production runs three services:

| Service | Role |
|---------|------|
| **Caddy** | HTTP reverse proxy on host port **3013** (TLS handled by your existing reverse proxy on 443) |
| **landing** | Next.js app (internal only — not exposed on the host) |
| **postgres** | Waitlist database (internal only — not exposed on the host) |

`wodoo.store` permanently redirects to `https://www.wodoo.store`.

### 1. DNS

Point both domains at your server:

| Host | Type | Value |
|------|------|-------|
| `wodoo.store` | `A` / `AAAA` | Server IP |
| `www.wodoo.store` | `A` / `AAAA` | Server IP |

Host port **3013** must be free. Point your existing reverse proxy (the one already on 443) at `http://127.0.0.1:3013`.

### 2. Configure secrets

On the server, from the repo root:

```bash
make prod-init
```

This creates `.env.production` from `.env.production.example` (does not overwrite an existing file). Edit it before deploying:

```bash
# Host port for Caddy HTTP — proxy TLS traffic here
PROD_PORT=3013

# Required — use a strong password
POSTGRES_USER=wodoo
POSTGRES_PASSWORD=change-me-to-a-strong-password
POSTGRES_DB=wodoo

# Public site URL (baked into the Next.js build)
NEXT_PUBLIC_SITE_URL=https://www.wodoo.store

# Dashboard / login link (update when the store is live)
NEXT_PUBLIC_DASHBOARD_URL=https://www.wodoo.store
```

Example nginx upstream (TLS already on 443):

```nginx
location / {
    proxy_pass http://127.0.0.1:3013;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

`.env.production` is gitignored — never commit it.

### 3. Deploy

```bash
make prod-deploy
```

This builds images and starts (or recreates) the production stack.

First-time alternative:

```bash
make prod-up
```

### 4. Verify

```bash
make prod-ps
make prod-logs
```

Then open **https://www.wodoo.store**.

### Production commands

```bash
make prod-init      # Create .env.production from the example
make prod-up        # Start production stack
make prod-deploy    # Rebuild + recreate all services
make prod-build     # Build production images
make prod-rebuild   # Rebuild from scratch (no cache)
make prod-logs      # Follow all production logs
make prod-ps        # Container status
make prod-psql      # Open production psql shell
make prod-stop      # Stop without removing containers
make prod-down      # Stop and remove containers
```

### Waitlist (production)

```bash
make prod-psql
```

```sql
SELECT id, name, email, store_name, website, created_at
FROM waitlist
ORDER BY created_at DESC;
```

## Architecture notes

- **Local** (`docker-compose.yml`): landing on `localhost:3000`, Postgres on `localhost:5432`.
- **Production** (`docker-compose.prod.yml`): only Caddy is published on host port **3013**. Landing and Postgres stay internal. TLS stays on your existing reverse proxy.
- The `waitlist` table is created automatically on first Postgres start via `db/init/01-waitlist.sql`.
- `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_DASHBOARD_URL` are build args — rebuild after changing them (`make rebuild` or `make prod-deploy`).

## SEO

Static files are served from `landing/public/`:

| URL | File |
|-----|------|
| https://www.wodoo.store/robots.txt | `landing/public/robots.txt` |
| https://www.wodoo.store/sitemap.xml | `landing/public/sitemap.xml` |

When you add a blog post, update `landing/public/sitemap.xml` with the new `/blog/{slug}` URL.

## Stack

- Next.js 16 (landing)
- PostgreSQL 16 (waitlist)
- Caddy 2 (production TLS + reverse proxy)
- Docker Compose + Makefile
