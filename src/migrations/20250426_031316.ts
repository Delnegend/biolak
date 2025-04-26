import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_best_seller_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_best_seller" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Sản phẩm bán chạy',
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_best_seller_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"product_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_best_seller" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Sản phẩm bán chạy',
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_best_seller_products" ADD CONSTRAINT "pages_blocks_best_seller_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_best_seller_products" ADD CONSTRAINT "pages_blocks_best_seller_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_best_seller"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_best_seller" ADD CONSTRAINT "pages_blocks_best_seller_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_best_seller_products" ADD CONSTRAINT "_pages_v_blocks_best_seller_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_best_seller_products" ADD CONSTRAINT "_pages_v_blocks_best_seller_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_best_seller"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_best_seller" ADD CONSTRAINT "_pages_v_blocks_best_seller_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_best_seller_products_order_idx" ON "pages_blocks_best_seller_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_best_seller_products_parent_id_idx" ON "pages_blocks_best_seller_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_best_seller_products_product_idx" ON "pages_blocks_best_seller_products" USING btree ("product_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_best_seller_order_idx" ON "pages_blocks_best_seller" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_best_seller_parent_id_idx" ON "pages_blocks_best_seller" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_best_seller_path_idx" ON "pages_blocks_best_seller" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_best_seller_products_order_idx" ON "_pages_v_blocks_best_seller_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_best_seller_products_parent_id_idx" ON "_pages_v_blocks_best_seller_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_best_seller_products_product_idx" ON "_pages_v_blocks_best_seller_products" USING btree ("product_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_best_seller_order_idx" ON "_pages_v_blocks_best_seller" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_best_seller_parent_id_idx" ON "_pages_v_blocks_best_seller" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_best_seller_path_idx" ON "_pages_v_blocks_best_seller" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_best_seller_products" CASCADE;
  DROP TABLE "pages_blocks_best_seller" CASCADE;
  DROP TABLE "_pages_v_blocks_best_seller_products" CASCADE;
  DROP TABLE "_pages_v_blocks_best_seller" CASCADE;`)
}
