# Development

## Migrations
`minify-migrations` is always called after creating migrations to minify the JSONs in the `src/migrations` directory.

ATTENTION: Always execute `just test-build` to verify that the migrations will run successfully before committing the migration files.

## Workaround notes
- If there's a database conflict and you can't interact with Drizzle's conflict resolver in the terminal:
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
- If a component is prefixed with `INTERNAL_`, the reason it is a separate one instead of inline (mainly) is that it needs to be a client component.
- Always fill in the `defaultValue` and `admin.placeholder` if possible.
- Create the first admin account, then fill in the `.env` file `DEV_EMAIL` and `DEV_PASSWORD` so you don't have to re-login every single time.