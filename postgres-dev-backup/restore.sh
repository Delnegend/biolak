#!/bin/bash
set -euo pipefail

DB_NAME="biolak"
DB_USER="postgres"
DB_PASS="postgres"
DB_HOST="localhost"
BACKUP_DIR="/postgres-dev-backup"

# Export password temporarily for psql, dropdb, createdb
export PGPASSWORD="$DB_PASS"

echo "Attempting to drop existing database '$DB_NAME'..."
# Drop database, ignore error if it doesn't exist
dropdb -U "$DB_USER" -h "$DB_HOST" "$DB_NAME" --if-exists

echo "Creating new database '$DB_NAME'..."
createdb -U "$DB_USER" -h "$DB_HOST" "$DB_NAME"

echo "Finding the latest backup file in $BACKUP_DIR..."
# Find the latest .sql.gz file
LATEST_BACKUP=$(ls -t "$BACKUP_DIR"/*.sql.gz | head -n 1)

if [ -z "$LATEST_BACKUP" ]; then
  echo "Error: No backup .sql.gz files found in $BACKUP_DIR"
  unset PGPASSWORD
  exit 1
fi

echo "Restoring database '$DB_NAME' from $LATEST_BACKUP..."
# Decompress the backup with gunzip and pipe it to psql
gunzip -c "$LATEST_BACKUP" | psql -U "$DB_USER" -h "$DB_HOST" -d "$DB_NAME"

# Unset password
unset PGPASSWORD

echo "Database restore completed successfully from $LATEST_BACKUP."

exit 0