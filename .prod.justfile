# BiLAK Production Task Runner

# Backup the entire environment
backup:
    docker compose down
    # Save the docker image to avoid redownloading
    docker save ghcr.io/delnegend/biolak:latest | zstd -T0 -9 > biolak-image.zst
    # Compress the whole /opt/biolak directory
    # Note: Using absolute path might include /opt in the archive, which is fine
    tar -c -I 'zstd -T0 -9' -f /opt/biolak-$(date +%Y-%m-%d_%H-%M-%S).tar.zst /opt/biolak
    docker compose up -d

# Restore from the latest backup
restore:
    docker compose down
    # Restore the most recent backup file
    # We find the latest one based on name (date)
    @latest=$(ls -1 /opt/biolak-*.tar.zst | tail -n 1); \
    if [ -z "$latest" ]; then echo "No backup found"; exit 1; fi; \
    echo "Restoring from $latest..."; \
    tar -x -I zstd -f "$latest" -C /
    # Load the docker image back
    if [ -f biolak-image.zst ]; then \
        zstd -dc biolak-image.zst | docker load; \
    fi
    docker compose up -d

# Update to the latest version with safety backup
update: backup
    docker pull ghcr.io/delnegend/biolak:latest
    docker compose down
    docker compose up -d
