# Development

## Prerequisites

Install the following tools:

- Docker Engine (https://docs.docker.com/engine/)
- VS Code (https://code.visualstudio.com/)
- VS Code Dev Containers extension (https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- just (task runner) (https://github.com/casey/just)

## Setup

1. Copy the environment example file:

   ```
   cp .env.example .env
   ```

2. Follow the same environment variable configuration steps as in [Deployment](./deployment.md#method-1-use-prebuilt-image-recommended). You can skip `CLOUDFLARE_TUNNEL_TOKEN` for local development.

3. Open the Command Palette (F1 or Ctrl+Shift+P) and select: "Dev Containers: Reopen in Container".

## Workflow

- Start dev server: `j dev`
- Make changes
- Test build & migrations: `j test-build`
- Commit & push

Always run `j test-build` **outside** of the dev container to ensure the app builds correctly before committing and deploying.

## Update

### If you're using the prebuilt image with the latest tag:

1. Stop the running containers:

   ```
   docker compose down
   ```

2. Pull the latest image:

   ```
   docker compose pull ghcr.io/delnegend/biolak:latest
   ```

3. Start the stack:
   ```
   docker compose up -d
   ```

### If you're using the prebuilt image with a custom tag:

1. Stop the running containers:

   ```
   docker compose down
   ```

2. Change the image tag in `docker-compose.yml` to the desired version.

3. Start the stack:
   ```
   docker compose up -d
   ```

### If you're building from source:

1. Stop the running containers:

   ```
   docker compose down
   ```

2. Rebuild the image:

   ```
   j build-latest-image
   ```

3. Start the stack:
   ```
   docker compose up -d
   ```

## Drizzle Conflict Resolution

If you can't interact with the DB conflicts resolver in the terminal:

1. Press `Ctrl+C`, then run `j dev` to restart.
2. Visit `http://localhost:3000` (triggers the first schema fetch).
3. Visit `http://localhost:3000/admin` (triggers the second schema fetch). You should now be able to interact with the resolver.

## Localization

- Admin/docs: Payload localization docs — https://payloadcms.com/docs/configuration/localization
- Frontend:
   - Use `utilities/lang.ts` for the `Lang` enum.
   - Use `setLocale()` for client-side locale changes.
   - Use `getClientLang()` for server-side detection.

## Tips

- After creating the first admin, set `DEV_EMAIL` and `DEV_PASSWORD` in `.env` for auto-login.
- Components prefixed with `INTERNAL_` are single-use client components.
- Use `cnsole` (intentional project helper) instead of `console` — search for `cnsole` throughout the codebase to see examples.
