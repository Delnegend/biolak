# Development

## Prerequisites

Install the following tools:

- [Docker Engine](https://docs.docker.com/engine/) or [Podman](https://podman.io/docs/installation).
- [VS Code](https://code.visualstudio.com/)
- [VS Code Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- [just](https://github.com/casey/just) (task runner)

## Setup

1.  Copy the environment template:

    ```bash
    cp .biolak.example.env .env
    ```

2.  Modify `.env`:
    - Generate secrets using `openssl rand -base64 32` for `PAYLOAD_SECRET`, `CRON_SECRET`, and `PREVIEW_SECRET`.
    - Set `DATABASE_URI=file:/workspaces/biolak/data.sqlite3`.

3.  Open the Command Palette (F1 or Ctrl+Shift+P) and select: "Dev Containers: Reopen in Container".

4.  (Optional) To use production data:
    - First, complete step 3 to enter the dev container.
    - To get a clean database file:
        - Option A: Stop the production instance to flush any pending WAL writes into the database, then copy the `data.sqlite3` file.
        - Option B (Recommended): Copy the latest backup from the production server (see [Deployment](./deployment.md) for how backups are created).
    - Place the copied `data.sqlite3` file into `/workspaces/biolak/data.sqlite3` (this can be done from the host or inside the container since the workspace is mounted).

## Useful Commands

These commands are executed using `just` (or its alias `j` inside the dev container):

- `j dev`: Start the development server with Turbo.
- `j build`: Test build the application.
- `j lint`: Run ESLint and Prettier to fix and format the code.
- `j gen-types`: Generate Payload types based on the schema.
- `j db-create-migrate`: Create a new database migration and minify it.
- `just docker-image-build`: Build the Docker image locally (run this outside the dev container).

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
