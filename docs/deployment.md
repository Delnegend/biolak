# Deployment Guide

## Prerequisites

- Docker or Podman installed on the host.
- [`just`](https://github.com/casey/just) command runner installed.

## Overview

This stack consists of:
- **biolak-postgres**: PostgreSQL database
- **biolak-payload**: Node.js app (Payload CMS + Next.js)
- **cloudflared**: Cloudflare Tunnel for secure public access

## Steps

1. **Clone the repository** (NOT DOWNLOAD ZIP):
2. `cp docker-compose.prod.yml docker-compose.yml`
3. **Configure environment variables** (see below)
4. `docker compose up -d`

---

## Service Details

### biolak-postgres
- **Purpose**: PostgreSQL database for app data.
- **Key env vars**:
  - `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` (default: postgres/postgres/biolak)

### biolak-payload
- **Purpose**: Main application server.
- **Key env vars**:
  - `DATABASE_URI`: Connection string to Postgres (default: `postgres://postgres:postgres@biolak-postgres:5432/biolak`)
  - `NEXT_PUBLIC_SERVER_URL`: Public URL (e.g., `https://biolak.vn`)
  - `PAYLOAD_SECRET`, `CRON_SECRET`, `PREVIEW_SECRET`:
    **Generate strong secrets** using:
    ```
    openssl rand -base64 32
    ```
  - **SMTP configuration** (for email):
    - `SMTP_HOST`: `smtp.gmail.com`
    - `SMTP_PORT`: `465`
    - `SMTP_USER`: Your Gmail address
    - `SMTP_PASS`: [App password](https://myaccount.google.com/apppasswords) (not your Gmail password)
    - `SMTP_FROM`: Sender email (usually same as `SMTP_USER`)

### cloudflared
- **Purpose**: Exposes the app securely via Cloudflare Tunnel.
- **Key env vars**:
  - `TUNNEL_TOKEN`:
    1. Go to [Cloudflare Zero Trust dashboard](https://one.dash.cloudflare.com)
    2. Complete initial setup if needed.
    3. Navigate: Networks > Tunnels > Create a tunnel
    4. Follow setup steps and copy the token from the provided command.
    5. Also, create a **public hostname** (e.g., `biolak.vn`) that points to `http://biolak-payload:3000`
    6. More details: [Cloudflare Tunnel Docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
    7. Alternatively, reuse an existing tunnel if you have one.

---

## Backup & Restore

### Backup

To create a backup:
```
docker compose down
just backup-prod
docker compose up -d
```

### Restore

To restore from a backup:
```
docker compose down
just restore-prod  # Select the backup version when prompted
docker compose up -d
```

---

## Backup Recipe Details

- The backup script archives the entire PostgreSQL mounted volume (not a `.sql` export) and the `public` directory (for uploaded image assets).
- The resulting compressed backup file is saved in the `backup` directory.
- Each backup includes a file with the commit hash of the codebase at backup time.
- **Important:** This is why you must clone the repository (not download as ZIP), so the commit hash matches and restores are reliable.

---

## Notes

- **Secrets**: Always generate with `openssl rand -base64 32` for strong randomness.
- **Cloudflare**: If you already have a tunnel running, you can reuse it and just add a new public hostname.
- **Volumes**: Data is persisted via Docker volumes and `./postgres-data` directory.
