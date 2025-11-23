# Development

## Prerequisites

1. Install the following tools:

- [Docker Engine](https://docs.docker.com/engine/)
- [VSCode](https://code.visualstudio.com/)

2. Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) for VSCode.

3. Copy `.devcontainer/docker-compose.example.yml` to `.devcontainer/docker-compose.yml`.

4. Optionally, fill in the credentials for SMTP for email.

5. F1 or Ctrl + Shift + P > Dev Containers: Reopen in Container

## Workflow

- Start dev server: `j dev`.
- Make changes.
- Test build & migrations: `j test-build`.
- Commit & push.
- Always run `j test-build` **outside** of the devcontainer to make sure the app is building correctly before committing and updating in production.

## Production Update

Run `just update` to stop production, back up, pull changes, and restart.

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
- Use `cnsole` instead of `console` (search `cnsole` throughout the codebase to see examples).
