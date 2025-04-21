#!/bin/bash
set -euo pipefail

# Define backup directory (relative to the script location inside the container)
BACKUP_DIR="/postgres-dev-backup"
DB_NAME="biolak"
DB_USER="postgres"
DB_PASS="postgres"

TIMESTAMP=$(date +"%Y-%m-%d-%H-%M-%S")
BACKUP_FILE="$BACKUP_DIR/$TIMESTAMP.sql.gz"

# Ensure backup directory exists
mkdir -p "$BACKUP_DIR"

# Export password temporarily for pg_dump
export PGPASSWORD="$DB_PASS"

echo "Starting compressed backup of database '$DB_NAME' to $BACKUP_FILE..."

# Run pg_dump and pipe output to gzip with maximum compression (-9)
pg_dump -U "$DB_USER" -h localhost -d "$DB_NAME" -b -v | gzip -9 > "$BACKUP_FILE"

# Unset password
unset PGPASSWORD

echo "Compressed backup completed successfully."

exit 0