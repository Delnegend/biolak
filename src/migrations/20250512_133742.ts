import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "product_sub_categories" RENAME COLUMN "category_id" TO "product_categories_id";
  ALTER TABLE "product_sub_categories" DROP CONSTRAINT "product_sub_categories_category_id_product_categories_id_fk";
  
  DROP INDEX IF EXISTS "product_sub_categories_category_idx";
  DO $$ BEGIN
   ALTER TABLE "product_sub_categories" ADD CONSTRAINT "product_sub_categories_product_categories_id_product_categories_id_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "product_sub_categories_product_categories_idx" ON "product_sub_categories" USING btree ("product_categories_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "product_sub_categories" RENAME COLUMN "product_categories_id" TO "category_id";
  ALTER TABLE "product_sub_categories" DROP CONSTRAINT "product_sub_categories_product_categories_id_product_categories_id_fk";
  
  DROP INDEX IF EXISTS "product_sub_categories_product_categories_idx";
  DO $$ BEGIN
   ALTER TABLE "product_sub_categories" ADD CONSTRAINT "product_sub_categories_category_id_product_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "product_sub_categories_category_idx" ON "product_sub_categories" USING btree ("category_id");`)
}
