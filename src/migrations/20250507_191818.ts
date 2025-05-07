import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products_blocks_three_photo" ALTER COLUMN "photo_left_id" DROP NOT NULL;
  ALTER TABLE "products_blocks_three_photo" ALTER COLUMN "photo_center_id" DROP NOT NULL;
  ALTER TABLE "products_blocks_three_photo" ALTER COLUMN "photo_right_id" DROP NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products_blocks_three_photo" ALTER COLUMN "photo_left_id" SET NOT NULL;
  ALTER TABLE "products_blocks_three_photo" ALTER COLUMN "photo_center_id" SET NOT NULL;
  ALTER TABLE "products_blocks_three_photo" ALTER COLUMN "photo_right_id" SET NOT NULL;`)
}
