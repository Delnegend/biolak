import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products_rels" ADD COLUMN "product_categories_id" integer;
  DO $$ BEGIN
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "products_rels_product_categories_id_idx" ON "products_rels" USING btree ("product_categories_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products_rels" DROP CONSTRAINT "products_rels_product_categories_fk";
  
  DROP INDEX IF EXISTS "products_rels_product_categories_id_idx";
  ALTER TABLE "products_rels" DROP COLUMN IF EXISTS "product_categories_id";`)
}
