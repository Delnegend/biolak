import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_cta_left" DROP COLUMN IF EXISTS "sub_title";
  ALTER TABLE "_pages_v_blocks_cta_left" DROP COLUMN IF EXISTS "sub_title";
  ALTER TABLE "posts_blocks_cta_left" DROP COLUMN IF EXISTS "sub_title";
  ALTER TABLE "_posts_v_blocks_cta_left" DROP COLUMN IF EXISTS "sub_title";
  ALTER TABLE "products_blocks_cta_left" DROP COLUMN IF EXISTS "sub_title";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_cta_left" ADD COLUMN "sub_title" varchar;
  ALTER TABLE "_pages_v_blocks_cta_left" ADD COLUMN "sub_title" varchar;
  ALTER TABLE "posts_blocks_cta_left" ADD COLUMN "sub_title" varchar;
  ALTER TABLE "_posts_v_blocks_cta_left" ADD COLUMN "sub_title" varchar;
  ALTER TABLE "products_blocks_cta_left" ADD COLUMN "sub_title" varchar;`)
}
