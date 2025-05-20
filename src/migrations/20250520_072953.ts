import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "orders" ALTER COLUMN "review_rating" DROP NOT NULL;
  ALTER TABLE "orders" ALTER COLUMN "review_content" DROP NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "orders" ALTER COLUMN "review_rating" SET NOT NULL;
  ALTER TABLE "orders" ALTER COLUMN "review_content" SET NOT NULL;`)
}
