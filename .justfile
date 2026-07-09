export NODE_OPTIONS := "--no-deprecation"

@default:
    just --choose

dev:
    pnpm next dev

build:
    DB=/tmp/biolak-ci.sqlite3 && \
    rm -f $DB $DB-wal $DB-shm && \
    DATABASE_URI="file:$DB" pnpm exec payload migrate && \
    DATABASE_URI="file:$DB" pnpm next build && \
    pnpm exec next-sitemap --config next-sitemap.config.cjs && \
    rm -f $DB $DB-wal $DB-shm

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


