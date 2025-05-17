# Development

## PostgreSQL server

It is advisable to:
- Stop the development server before changing collections, globals, or any elements that impact the database schema.
- Regularly execute `just db-dev-pg-backup`.

Drizzle-kit's `push` feature frequently causes issues with the database and leads to an inability to interact with the terminal to resolve conflicts. An alternative option would be disabling `push`, which is equally inconvenient.

The `postgres-dev-backup` directory is designated for storing backups of the development database server. Two scripts, `backup.sh` and `restore.sh`, are intended to be executed within its Docker container using `just db-dev-pg-backup` and `just db-dev-pg-restore`, rather than being run directly.

The PosgreSQL server must be accessible during build time.

## Migrations

Before committing or after creating migrations, execute `just minify-json` to compress the JSON files within the migrations directory and reduce their file sizes.

## Workaround notes
- DO NOT modify/remove MULTIPLE fields in a global setting at once; do them individually.
- If there's a database conflict and you can't interact with Drizzle's conflict resolver:
   1. `Ctrl + C` then `j dev` to restart the dev server
   2. Go to `http://localhost:3000` for it to compile a layout, fetch the database schema, and ask to resolve the conflicts; it should not let you interact just yet (if it does, then congrats)
   3. Go to `http://localhost:3000/admin` for it to compile another layout, refetch the database schema, and now you should be able to interact with the conflict resolver