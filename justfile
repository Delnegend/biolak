export NODE_OPTIONS := "--no-deprecation"

@default:
  just --choose

build:
  pnpm next build --turbo

postbuild:
  pnpm next-sitemap --config next-sitemap.config.cjs

dev:
  pnpm next dev --turbo

dev-prod:
  rm -rf .next && pnpm build && pnpm start

generate-importmap:
  pnpm payload generate:importmap

generate-types:
  pnpm payload generate:types

generate-db-schema:
  pnpm payload generate:db-schema

migrate-create:
  pnpm payload migrate:create

migrate:
  pnpm payload migrate

lint:
  pnpm next lint --fix && prettier --write .

reinstall:
  rm -rf node_modules && rm pnpm-lock.yaml && pnpm --ignore-workspace install

postgres-dev:
  docker compose up -d postgres-dev