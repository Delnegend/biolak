export NODE_OPTIONS := "--no-deprecation"

@default:
  just --choose

# Minify JSON files in the migrations directory & rm trailing spaces
minify-migrations:
  #!/usr/bin/env bash
  set -euo pipefail

  # Define a function to minify a single JSON file
  minify_single_json_file() {
    local file="$1"
    echo "Minifying JSON: $file..."
    # Use python to load and dump the json compactly, writing to a temp file first
    # The python script takes the input file path as its first argument (sys.argv[1])
    python3 -c "import json, sys; data = json.load(open(sys.argv[1])); json.dump(data, open(sys.argv[1]+'.tmp', 'w'), separators=(',', ':'))" "$file"
    # Replace the original file with the minified version
    mv "$file.tmp" "$file"
  }

  # Define a function to remove trailing spaces from a single TS file
  remove_trailing_spaces_single_ts_file() {
    local file="$1"
    echo "Processing TypeScript file: $file"
    # Use sed to remove trailing whitespace. -i edits files in-place.
    sed -i 's/[[:space:]]*$//' "$file"
  }

  # Export the functions so they are available to parallel's child processes
  export -f minify_single_json_file
  export -f remove_trailing_spaces_single_ts_file

  echo "Minifying JSON files in src/migrations/..."
  # Find all .json files in src/migrations/ and process them in parallel
  # -print0 and -0 handle filenames with spaces or special characters
  find src/migrations/ -name '*.json' -print0 | parallel -0 minify_single_json_file
  echo "JSON minification complete."

  echo "Removing trailing spaces from .ts files in src/migrations/..."
  # Find all .ts files in the src/migrations/ directory and its subdirectories
  # and remove trailing whitespace from each line in parallel.
  # -print0 and -0 handle filenames with spaces or special characters.
  find src/migrations/ -name '*.ts' -print0 | parallel -0 remove_trailing_spaces_single_ts_file
  echo "Trailing space removal from .ts files complete."

dev:
  bun x next dev --turbo

gen-importmap:
  bun x payload generate:importmap --disable-transpile

gen-types:
  bun x payload generate:types --disable-transpile

gen-db-schema:
  bun x payload generate:db-schema --disable-transpile

db-create-migrate:
  bun x payload migrate:create --disable-transpile
  just minify-migrations

lint:
  bun x next lint --fix && \
  bun x prettier --write --list-different \
    .devcontainer/devcontainer.json \
    .vscode \
    docs \
    public \
    src \
    *.{json,js,mjs,cjs,ts,md}

start:
  bun x next start

_prelude:
  #!/usr/bin/env bash
  mkdir -p data/pgdata
  mkdir -p data/media
  sudo chown -R 1000:1000 data

# check if the prod would build and run successfully
test-build: _prelude
  docker compose -f docker-compose.example.yml up --build biolak-postgres biolak-payload
  docker compose -f docker-compose.example.yml down biolak-postgres biolak-payload

docker-image-build:
  docker buildx build --load \
    -t ghcr.io/delnegend/biolak:$(git rev-parse --short HEAD) \
    -t ghcr.io/delnegend/biolak:latest .

docker-image-publish:
  docker buildx build \
    -t ghcr.io/delnegend/biolak:latest \
    -t ghcr.io/delnegend/biolak:$(git rev-parse --short HEAD) \
    -o type=image,push=true,compression=zstd .

docker-image-save:
  docker save ghcr.io/delnegend/biolak:latest | gzip > biolak-latest.tar.gz