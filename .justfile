export NODE_OPTIONS := "--no-deprecation"

@default:
    just --choose

dev:
    pnpm next dev

build:
    DATABASE_URI='file:{{justfile_directory()}}/data.ci.sqlite3' pnpm next build
    pnpm exec next-sitemap --config next-sitemap.config.cjs

build-fast:
    pnpm next build
    pnpm exec next-sitemap --config next-sitemap.config.cjs

ci-db:
    rm -f data.ci.sqlite3 data.ci.sqlite3-wal data.ci.sqlite3-shm
    touch data.ci.sqlite3
    sqlite3 data.ci.sqlite3 "PRAGMA journal_mode=WAL;"
    DATABASE_URI="file:{{justfile_directory()}}/data.ci.sqlite3" pnpm exec payload migrate

gen-stuffs:
    #!/bin/sh
    pnpm payload generate:types
    pnpm payload generate:db-schema
    pnpm payload generate:importmap

db-create-migrate:
    pnpm run payload migrate:create

check:
    #!/bin/sh
    start_time=$(date +%s)

    pnpm eslint . --fix
    pnpm prettier --write --list-different \
        .devcontainer/devcontainer.json \
        .vscode \
        docs \
        public \
        src \
        *.{json,js,mjs,cjs,ts,md}
    pnpm tsc --noEmit

    end_time=$(date +%s)
    duration=$((end_time - start_time))
    echo "Linting, formatting, and type-checking completed in ${duration}s."

build-image:
    docker build \
        -t ghcr.io/delnegend/biolak:$(git rev-parse --short HEAD) \
        -t ghcr.io/delnegend/biolak:latest .

publish-image:
    #!/bin/sh
    TAG=$(git rev-parse --short HEAD)
    docker push --compression-format zstd --compression-level 9 ghcr.io/delnegend/biolak:latest
    docker push --compression-format zstd --compression-level 9 ghcr.io/delnegend/biolak:$TAG

save-image:
    docker save ghcr.io/delnegend/biolak:latest | zstd -T0 -9 - > biolak-latest.tzst
