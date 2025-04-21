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
  pnpm next dev --turbo
gen-importmap:
  pnpm payload generate:importmap
gen-types:
  pnpm payload generate:types
gen-db-schema:
  pnpm payload generate:db-schema
db-start-migrate:
  pnpm payload migrate
db-create-migrate:
  pnpm payload migrate:create
db-dev-pg-start:
  docker compose up -d postgres-dev
db-dev-pg-backup:
  docker exec -it postgres-dev bash /postgres-dev-backup/backup.sh
db-dev-pg-restore:
  docker exec -it postgres-dev bash /postgres-dev-backup/restore.sh
lint:
  pnpm next lint --fix && pnpm prettier --write .
payload:
  pnpm payload
reinstall:
  pnpm rm -rf node_modules && rm pnpm-lock.yaml && pnpm --ignore-workspace install
start:
  pnpm next start