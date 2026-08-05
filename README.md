# Wodoo Store

Landing page for **Wodoo Store** (`www.wodoo.store`) — a Next.js site with a registration waitlist backed by PostgreSQL.

The Medusa store (`store/`) is separate and not part of this Docker stack yet. This setup hosts the landing page only.

## Requirements

- [Docker](https://docs.docker.com/get-docker/) with Compose v2
- [Make](https://www.gnu.org/software/make/)

## Project layout

```
.
├── landing/                 # Next.js landing app
├── db/init/                 # Postgres schema (waitlist table)
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

Production runs two services. TLS and reverse proxy are handled by **Cloudpanel** on the VPS.

| Service | Role |
|---------|------|
| **landing** | Next.js app on host port **3013** |
| **postgres** | Waitlist database (internal only — not exposed on the host) |

### 1. DNS

Point both domains at your server:

| Host | Type | Value |
|------|------|-------|
| `wodoo.store` | `A` / `AAAA` | Server IP |
| `www.wodoo.store` | `A` / `AAAA` | Server IP |

### 2. Configure secrets

On the server, from the repo root:

```bash
make prod-init
```

This creates `.env.production` from `.env.production.example` (does not overwrite an existing file). Edit it before deploying:

```bash
# Host port for the landing app (Cloudpanel → this port)
PROD_PORT=3013

# Required — use a strong password
POSTGRES_USER=wodoo
POSTGRES_PASSWORD=change-me-to-a-strong-password
POSTGRES_DB=wodoo

# Public site URL (baked into the Next.js build)
NEXT_PUBLIC_SITE_URL=https://www.wodoo.store

# Dashboard / login link (update when the store is live)
NEXT_PUBLIC_DASHBOARD_URL=https://www.wodoo.store

# Private admin at /admin/registrations (HTTP Basic Auth)
ADMIN_USER=amar
ADMIN_PASSWORD=change-me-to-a-strong-password
```

`.env.production` is gitignored — never commit it.

After deploy, open `https://www.wodoo.store/admin/registrations` and sign in with `ADMIN_USER` / `ADMIN_PASSWORD` to view waitlist registration counts and details.

### 3. Deploy

```bash
make prod-deploy
```

This builds images and starts (or recreates) the production stack.

First-time alternative:

```bash
make prod-up
```

Confirm the app answers locally:

```bash
curl -I http://127.0.0.1:3013
```

### 4. Cloudpanel reverse proxy

In Cloudpanel, create (or edit) the site for `www.wodoo.store` and reverse-proxy to the Docker app:

- **Proxy URL:** `http://127.0.0.1:3013`
- Enable SSL for `www.wodoo.store` (and redirect `wodoo.store` → `www` if desired)

Cloudpanel / nginx should forward at least:

```nginx
proxy_pass http://127.0.0.1:3013;
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

### 5. Verify

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
- **Production** (`docker-compose.prod.yml`): landing published on host port **3013**; Postgres stays internal. TLS / proxy via Cloudpanel.
- The `waitlist` table is created automatically on first Postgres start via `db/init/01-waitlist.sql`.
- `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_DASHBOARD_URL` are build args — rebuild after changing them (`make rebuild` or `make prod-deploy`).

## Tools

Productivity tools live under `/tools`. Registry: `landing/lib/tools.ts`.

| Tool | URL |
|------|-----|
| Free shipping rate calculator | `/tools/free-shipping-calculator` |
| Shipping policy generator | `/tools/shipping-policy-generator` |
| Cheapest & fastest courier finder | `/tools/courier-carrier-finder` |
| Tax & duty calculator | `/tools/tax-duty-calculator` |
| HS tariff code lookup | `/tools/hs-tariff-code-lookup` |
| Address by ZIP / postcode finder | `/tools/postcode-address-finder` |
| SEO audit tool | `/tools/seo-audit` |
| SEO keyword explorer | `/tools/seo-keyword-explorer` |
| FBA fee & revenue calculator | `/tools/fba-fee-calculator` |
| Ecommerce profit margin calculator | `/tools/ecommerce-profit-margin-calculator` |
| Dimensional weight & volume calculator | `/tools/dimensional-weight-calculator` |
| Break-even units calculator | `/tools/break-even-units-calculator` |
| Landed product cost calculator | `/tools/landed-product-cost-calculator` |
| CAC payback calculator | `/tools/cac-payback-calculator` |
| Marketplace fee calculator (eBay & Etsy) | `/tools/marketplace-fee-calculator` |
| Volume discount vs unit margin planner | `/tools/volume-discount-planner` |

To add another tool: register it in `lib/tools.ts` and add `app/tools/<slug>/page.tsx`. The sitemap picks it up automatically.

## SEO

`/sitemap.xml` and `/robots.txt` are generated dynamically by Next.js (not static files in `public/`):

| URL | Source |
|-----|--------|
| https://www.wodoo.store/robots.txt | `landing/app/robots.ts` |
| https://www.wodoo.store/sitemap.xml | `landing/app/sitemap.xml/route.ts` → `lib/build-sitemap.ts` |

The sitemap includes home, all tools from `lib/tools.ts`, the blog index, static posts, and **admin-published DB posts**. Publishing or deleting a post via `/admin/blog` does not require a redeploy for SEO discovery.

## Stack

- Next.js 16 (landing)
- PostgreSQL 16 (waitlist)
- Cloudpanel (VPS reverse proxy + TLS)
- Docker Compose + Makefile
