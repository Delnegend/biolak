# BioLAK — Agent Instructions

## Stack

Next.js 16 + Payload CMS 3 + React 19 + Tailwind 3 + shadcn/ui + SQLite (drizzle). Package manager: **pnpm**.

## Commands (dev container / `just`)

```bash
just dev           # run dev server (runs check first)
just build         # production build (uses data.ci.sqlite3, no compile flag)
just ci-db         # generate fresh CI database (schema + migrations)
just check         # eslint --fix → prettier → tsc --noEmit
just gen-stuffs    # generate payload types, db-schema, importmap
just db-create-migrate  # create DB migration
```

**No test framework is configured.** There is nothing to run for tests.

## Architecture

- **Admin panel**: `/admin` (no locale prefix) — Payload CMS routes under `src/app/(payload)/`
- **Frontend**: `/{locale}/...` (en/vi) — routes under `src/app/[locale]/`
- **Default locale**: Vietnamese (`vi`) — see `src/i18n/routing.ts:9`
- **Output mode**: `standalone` (for Docker deployment)

Three i18n layers:

- Admin UI labels: Payload `i18n`
- Dynamic content (pages, products): Payload `localization` (DB)
- Frontend static strings: `next-intl`, messages in `messages/{locale}.json`

Path aliases: `@/*` → `src/*`, `@payload-config` → `src/payload.config.ts`

## Auto-generated files — do not edit

- `src/payload-types.ts` — regenerate with `just gen-stuffs`
- `src/payload-generated-schema.ts` — regenerate with `just gen-stuffs`
- `src/app/(payload)/admin/importMap.js` — regenerate with `just gen-stuffs`
- `src/migrations/` — created by `just db-create-migrate`
- `src/app/(payload)/layout.tsx` — Payload-owned header

## Conventions

- Prettier: **tabs**, single quotes, no semicolons, printWidth 100
- ESLint: `no-console: error` — use `payload.logger` (Payload context) or import `newLogger` from `@/utilities/logger` (client-side).
- Imports are auto-sorted by `eslint-plugin-simple-import-sort` (enforced at error level)
- `env()` helper is **not** used — read env vars via `process.env` directly
- Use `src/utilities/getURL.ts:getServerSideURL()` not hardcoded URLs
- Components prefixed `INTERNAL_` are single-use client components intended for one place only

## Gotchas

- The repo and Dockerfile both use **pnpm**.
- Middleware for locale redirect: `proxy.ts` at the repo root (named this way, not `middleware.ts`).
- The `check` command runs eslint → prettier → tsc **in order**. tsc must pass for a clean run.
- Do **not** run production just commands (`just backup`, `just restore`, `just update`) outside `~/biolak` — they target production paths and may cause data loss.
- Dev container mounts workspace at `/biolak`; database URI in `.env` is `file:/workspaces/biolak/data.sqlite3`.
- Payload `db-sqlite` and drizzle types diverge at this version — expect `@ts-expect-error` on `prodMigrations`.
- `next-sitemap` runs as a `postbuild` script. It pulls URL from `NEXT_PUBLIC_SERVER_URL` env var.
- Tailwind IntelliSense recognizes `cn()` and `cva()` class strings via the devcontainer VS Code settings.
- The Dockerfile copies from `patches/` — this directory exists even if empty in the repo (`.gitignore`d).

## For more context

- `docs/development.md` — full dev setup, i18n guide, Drizzle conflict resolution
- `docs/deployment.md` — production deployment, backup/restore, Cloudflare tunnel
- `README.md` — project overview and i18n table
