# Deployment Guide

## Prerequisites

- A Linux server (Debian 13+ or Ubuntu 24.04+ is recommended).
- [Docker Engine](https://docs.docker.com/engine/install) (with the `compose` plugin) or [Podman](https://podman.io/docs/installation).
- `just` (task runner) and `zstd` (compression tool).

To install the required packages on Debian/Ubuntu:

```bash
sudo apt update && sudo apt install -y curl ca-certificates zstd podman
# For 'just', you might need to install it via their official script if not in your repo:
curl --proto '=https' --tlsv1.2 -sSf https://just.systems/install.sh | sudo bash -s -- --to /usr/local/bin
```

## Service Directory Structure

We recommend using `/opt/biolak` to store everything related to the application. This ensures a clean and organized structure for backups and maintenance.

```text
/opt/biolak/
├── docker-compose.yml      # Service orchestration (contains environment vars for services)
└── data/                   # Persistent data
    ├── media/              # Uploaded media files
    └── data.sqlite3        # SQLite database
```

### Initial Setup

Create the directory structure and set correct ownership (the default UID/GID for the `node` user is `1000`):

```bash
sudo mkdir -p /opt/biolak/data/media
sudo chown -R 1000:1000 /opt/biolak
cd /opt/biolak
```

## Configuration

1. Download the latest configuration and automation templates directly into `/opt/biolak`:

    ```bash
    sudo curl -fsSL -o /opt/biolak/docker-compose.yml https://github.com/Delnegend/biolak/raw/refs/heads/main/docker-compose.example.yml
    sudo curl -fsSL -o /opt/biolak/.justfile https://github.com/Delnegend/biolak/raw/refs/heads/main/.prod.justfile
    ```

2. Modify the file permissions
    Ensure the current user owns the configuration files and restrict access to the compose file:

     ```bash
     sudo chown 1000:1000 /opt/biolak/docker-compose.yml /opt/biolak/.justfile
     sudo chmod 600 /opt/biolak/docker-compose.yml
     ```

3. Generate strong secrets and update `docker-compose.yml`:
   Use `openssl rand -base64 32` to generate unique values for:
    - `PAYLOAD_SECRET`
    - `CRON_SECRET`
    - `PREVIEW_SECRET`

4. Modify `docker-compose.yml`:
    - Ensure `DATABASE_URI` is set to `file:/home/node/app/data/data.sqlite3`.
    - Ensure `MEDIA_STORAGE_PATH` is set to `/home/node/app/data/media`.
    - Update `NEXT_PUBLIC_SERVER_URL` to your actual domain (e.g., `https://biolak.vn`).
    - Paste the generated secrets into the `environment` section for the `biolak` service.
    - If using Cloudflare Tunnel, set the `TUNNEL_TOKEN` value in the `cloudflared` service's `environment` section.

## Reverse Proxy & SSL/TLS

The application does not have built-in logic to handle SSL/TLS. You must use a reverse proxy to manage encryption and expose the service to the internet.

### Recommended: Cloudflare Tunnel

Cloudflare Tunnel is the recommended way to expose your service. It creates a secure outbound connection to Cloudflare, so you never have to directly allow internet traffic into your server.

1. Follow the [Cloudflare Tunnel Guide](https://developers.cloudflare.com/cloudflare-one/networks/routes/#add-a-published-application-route) to "Add a published application route".
2. Ensure you have completed Cloudflare's [prerequisites](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started-for-managed-tunnels/) section.
3. Configure the tunnel to point to `http://biolak:3000`.
4. If you used the `cloudflared` service in `docker-compose.yml`, provide your token in `.cloudflare.env`.

### Custom Reverse Proxy (Nginx, Caddy, etc.)

If you choose your own reverse proxy:

1. Comment out or remove the `cloudflared` section in `docker-compose.yml`.
2. Configure your proxy to handle SSL/TLS (e.g., via Let's Encrypt) and forward requests to the service.

**Note on service address:**

- If your reverse proxy runs in **Docker** and is in the same network (`biolak-network`), forward requests to `http://biolak:3000`.
- If your reverse proxy runs on the **host machine**, forward requests to `http://localhost:3000`. In this case, you **must un-comment** the `ports` section in `docker-compose.yml` to expose the port to the host.

## Deployment

Start the application stack:

```bash
cd /opt/biolak
docker compose up -d
```

Verify the service is running:

```bash
docker compose ps
curl -f http://localhost:3000/api/status
```

You can monitor real-time logs with:

```bash
docker compose logs -f
```

## Maintenance (Backup, Restore, Update)

We provide a `just` task runner configuration to simplify common maintenance tasks. **All commands below must be executed from within the service directory (`/opt/biolak`).**

### Backup

Back up the entire environment (configuration, database, media, and the current docker image):

```bash
cd /opt/biolak
just backup
```

The backup will be stored as `/opt/biolak-YYYY-MM-DD_HH-MM-SS.tzst`.

### Restore

Restore the environment from the latest backup file:

```bash
cd /opt/biolak
just restore
```

### Update

Update the application to the latest version safely (performs a backup first):

```bash
cd /opt/biolak
just update
```

## Migration to a New Server

To move your entire BioLAK instance to a brand new server:

1.  Complete the **Prerequisites** and **Initial Setup** (creating `/opt/biolak` and setting ownership) on the new server.
2.  Transfer your latest backup file (e.g., `biolak-2026-02-22_12-00-00.tzst`) to the `/tmp` directory of the new server.
3.  Extract the backup to the root directory (this will populate `/opt/biolak`):
    ```bash
    sudo tar -xf /tmp/biolak-*.tzst -C /
    ```
4.  Ensure the ownership is correct for the extracted files:
    ```bash
    sudo chown -R 1000:1000 /opt/biolak
    ```
5.  Navigate to the directory and start the stack:
    ```bash
    cd /opt/biolak
    docker compose up -d
    ```

## Latest Server Backup

You can download the latest production backup here: [Latest Backup Link](https://drive.google.com/file/d/186M2WAzDKtDGF27rO2ozAtVxkL8bnqL2/view?usp=sharing)
