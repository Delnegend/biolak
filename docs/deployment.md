# Deployment Guide

## Prerequisites

- A Linux server (Debian or an Ubuntu LTS release is recommended).
- [Docker Engine](https://docs.docker.com/engine/install) and Docker Compose (modern CLI: `docker compose`).

## Method 1: Use Prebuilt Image (Recommended)

1. Download the docker compose file template:

   ```
   curl -fsSL -o docker-compose.yml https://github.com/Delnegend/biolak/raw/refs/heads/main/docker-compose.example.yml
   ```

2. Modify the environment variables in `docker-compose.yml`:
   - `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `NEXT_PUBLIC_SERVER_URL`: these can remain at their defaults for a quick test, but change them for production.

   - `PAYLOAD_SECRET`, `CRON_SECRET`, `PREVIEW_SECRET`:
     Generate strong secrets, for example:

      ```
      openssl rand -base64 32
      ```

      Store these securely (do not commit them to git).

   - `CLOUDFLARE_TUNNEL_TOKEN`:
      - Sign in to the Cloudflare dashboard: https://one.dash.cloudflare.com
      - Create or reuse a Cloudflare Tunnel (Networks → Connectors → Create a tunnel → Cloudflared).
      - Follow the tunnel setup instructions and copy the token from the `cloudflared tunnel run` output or the Cloudflare dashboard.
      - When configuring routes, set the Published application domain (e.g., `biolak.example.com`) and point the service to `http://biolak-payload:3000`.
      - Alternatively, use an existing tunnel if you already have one.

   - SMTP environment variables (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`) are optional — configure them if you need email functionality.

3. Create data directories and set ownership. The example uses UID/GID 1000 (commonly the `node` or first non-root user). Adjust if needed:

   ```
   mkdir -p data/pgdata
   mkdir -p data/media
   sudo chown -R 1000:1000 data
   ```

4. Start the stack:
   ```
   docker compose up -d
   ```
   Check logs if needed:
   ```
   docker compose logs -f
   ```

## Method 2: Build from Source

1. Clone this repository:

   ```
   git clone https://github.com/Delnegend/biolak.git
   cd biolak
   ```

2. Copy the example docker compose file:

   ```
   cp docker-compose.example.yml docker-compose.yml
   ```

3. Build the docker image:

   ```
   docker build -t ghcr.io/delnegend/biolak:latest .
   ```

4. Continue from step 2 of Method 1 (edit env vars, create data dirs, then start the stack).

## Troubleshooting & Notes

- If containers fail to start, inspect logs with `docker compose logs <service>` or `docker compose logs -f`.
- Ensure ports or firewall rules allow access if you expect external connectivity.
- For production deployments, keep secrets out of version control and consider using a secrets manager or environment-specific overrides.
