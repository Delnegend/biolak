export NODE_OPTIONS := "--no-deprecation"

@default:
  just --choose

# Minify JSON files in the migrations directory
minify-json:
  #!/usr/bin/env bash
  set -euo pipefail

  find src/migrations/ -name '*.json' -print0 | while IFS= read -r -d $'\0' file; do
    echo "Minifying $file..."
    # Use python to load and dump the json compactly, writing to a temp file first
    python3 -c "import json, sys; data = json.load(open(sys.argv[1])); json.dump(data, open(sys.argv[1]+'.tmp', 'w'), separators=(',', ':'))" "$file"
    # Replace the original file with the minified version
    mv "$file.tmp" "$file"
  done

  echo "JSON minification complete."

dev:
  bun next dev --turbo
gen-importmap:
  bun payload generate:importmap
gen-types:
  bun payload generate:types
gen-db-schema:
  bun payload generate:db-schema
db-start-migrate:
  bun payload migrate
db-create-migrate:
  bun payload migrate:create
  just minify-json
db-dev-pg-start:
  docker compose up -d postgres-dev
db-dev-pg-backup:
  docker exec -it postgres-dev bash /postgres-dev-backup/backup.sh
db-dev-pg-restore:
  docker exec -it postgres-dev bash /postgres-dev-backup/restore.sh
lint:
  bun next lint --fix && bun prettier --write .
payload:
  bun payload
reinstall:
  bun rm -rf node_modules && rm bun-lock.yaml && bun --ignore-workspace install
start:
  bun next start