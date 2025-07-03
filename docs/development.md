# Development

## Workflow
- Open in devcontainer
- Start DB: `j db-dev-pg-start`
- Start dev server: `j dev`
- Make changes
- Test build & migrations: `j test-build`
- Commit & push

## Production Update
Run `just update` to stop production, back up, pull changes, and restart.

## Migrations
- After creating migrations, run `minify-migrations` to minify `src/migrations` JSONs.
- Always run `j test-build` to verify migrations before committing.

## Drizzle Conflict Resolution
If you can't interact with the DB conflicts resolver in terminal:
1. `Ctrl+C`, then `j dev` to restart
2. Visit `http://localhost:3000` (triggers 1st schema fetch)
3. Visit `http://localhost:3000/admin` (triggers 2nd schema fetch, should now able to interact with the resolver)

## Localization
- Admin/docs: [Payload localization docs](https://payloadcms.com/docs/configuration/localization)
- Frontend:
  - Use `utilities/lang.ts` for `Lang` enum.
  - `setLocale()` for client-side, `getClientLang()` for server-side.

## Tips
- After creating the first admin, set `DEV_EMAIL` and `DEV_PASSWORD` in `.env` for auto-login.
- Components prefixed with `INTERNAL_` are single-use client components.
- Use `cnsole` instead of `console`.