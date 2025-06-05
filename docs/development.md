# Development

## PostgreSQL server

It is advisable to:
- Stop the development server before changing collections, globals, or any elements that impact the database schema.
- Regularly execute `just db-dev-pg-backup`.

Drizzle-kit's `push` feature frequently causes issues with the database and leads to an inability to interact with the terminal to resolve conflicts. An alternative option would be disabling `push`, which is equally inconvenient.

The `postgres-dev-backup` directory is designated for storing backups of the development database server. Two scripts, `backup.sh` and `restore.sh`, are intended to be executed within its Docker container using `just db-dev-pg-backup` and `just db-dev-pg-restore`, rather than being run directly.

The PosgreSQL server must be accessible during build time.

## Migrations
`minify-json` is always called after creating migrations to minify the JSONs in the `src/migrations` directory.

ATTENTION: ALWAYS execute `just test-prod` to check whether the migrations will run successfully before committing the migration files.

## Workaround notes
- DO NOT modify/remove MULTIPLE fields in a global setting at once; do them individually.
- If there's a database conflict and you can't interact with Drizzle's conflict resolver:
   1. `Ctrl + C` then `j dev` to restart the dev server
   2. Go to `http://localhost:3000` for it to compile a layout, fetch the database schema, and ask to resolve the conflicts; it should not let you interact just yet (if it does, then congrats)
   3. Go to `http://localhost:3000/admin` for it to compile another layout, refetch the database schema, and now you should be able to interact with the conflict resolver

## Localization
- For the documents' fields and admin panel, refer to [Payload's documentation on localization](https://payloadcms.com/docs/configuration/localization).
- For the frontend:
   - `utilities/lang.ts` contains the reusable `Lang` enum.
   - Use `useClientLang()` to get/set the preferred language ON CLIENT-SIDE ONLY.
   - Use `getClientLang()` to get the preferred language ON SERVER-SIDE ONLY.

## Misc
- If a component is prefixed with `INTERNAL_`, the reason for it being a separated one instead of inline, (mainly) is because it needs to be a client component.
- Always fill in the `defaultValue` and `admin.placeholder` if possible.