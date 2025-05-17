import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "header_global_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"products_id" integer,
  	"posts_id" integer,
  	"post_categories_id" integer,
  	"product_categories_id" integer,
  	"product_sub_categories_id" integer
  );
  
  ALTER TABLE "header_global_header_items_left" DROP CONSTRAINT "header_global_header_items_left_post_categories_id_post_categories_id_fk";
  
  ALTER TABLE "header_global_header_items_left" DROP CONSTRAINT "header_global_header_items_left_product_categories_id_product_categories_id_fk";
  
  ALTER TABLE "header_global_header_items_left" DROP CONSTRAINT "header_global_header_items_left_product_sub_categories_id_product_sub_categories_id_fk";
  
  ALTER TABLE "header_global_header_items_right" DROP CONSTRAINT "header_global_header_items_right_post_categories_id_post_categories_id_fk";
  
  ALTER TABLE "header_global_header_items_right" DROP CONSTRAINT "header_global_header_items_right_product_categories_id_product_categories_id_fk";
  
  ALTER TABLE "header_global_header_items_right" DROP CONSTRAINT "header_global_header_items_right_product_sub_categories_id_product_sub_categories_id_fk";
  
  DROP INDEX IF EXISTS "header_global_header_items_left_post_categories_idx";
  DROP INDEX IF EXISTS "header_global_header_items_left_product_categories_idx";
  DROP INDEX IF EXISTS "header_global_header_items_left_product_sub_categories_idx";
  DROP INDEX IF EXISTS "header_global_header_items_right_post_categories_idx";
  DROP INDEX IF EXISTS "header_global_header_items_right_product_categories_idx";
  DROP INDEX IF EXISTS "header_global_header_items_right_product_sub_categories_idx";
  ALTER TABLE "header_global_header_items_left" ALTER COLUMN "kind" SET DEFAULT 'internalUrl';
  ALTER TABLE "header_global_header_items_right" ALTER COLUMN "kind" SET DEFAULT 'internalUrl';
  ALTER TABLE "pages_blocks_products_carousel" ADD COLUMN "watch_more_btn_label" varchar DEFAULT 'XEM THÊM';
  ALTER TABLE "_pages_v_blocks_products_carousel" ADD COLUMN "watch_more_btn_label" varchar DEFAULT 'XEM THÊM';
  ALTER TABLE "posts_blocks_products_carousel" ADD COLUMN "watch_more_btn_label" varchar DEFAULT 'XEM THÊM';
  ALTER TABLE "_posts_v_blocks_products_carousel" ADD COLUMN "watch_more_btn_label" varchar DEFAULT 'XEM THÊM';
  ALTER TABLE "products_blocks_products_carousel" ADD COLUMN "watch_more_btn_label" varchar DEFAULT 'XEM THÊM' NOT NULL;
  ALTER TABLE "header_global_header_items_left" ADD COLUMN "custom_url" varchar;
  ALTER TABLE "header_global_header_items_left" ADD COLUMN "label" varchar;
  ALTER TABLE "header_global_header_items_right" ADD COLUMN "custom_url" varchar;
  ALTER TABLE "header_global_header_items_right" ADD COLUMN "label" varchar;
  DO $$ BEGIN
   ALTER TABLE "header_global_rels" ADD CONSTRAINT "header_global_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header_global"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_global_rels" ADD CONSTRAINT "header_global_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_global_rels" ADD CONSTRAINT "header_global_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_global_rels" ADD CONSTRAINT "header_global_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_global_rels" ADD CONSTRAINT "header_global_rels_post_categories_fk" FOREIGN KEY ("post_categories_id") REFERENCES "public"."post_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_global_rels" ADD CONSTRAINT "header_global_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_global_rels" ADD CONSTRAINT "header_global_rels_product_sub_categories_fk" FOREIGN KEY ("product_sub_categories_id") REFERENCES "public"."product_sub_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "header_global_rels_order_idx" ON "header_global_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "header_global_rels_parent_idx" ON "header_global_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "header_global_rels_path_idx" ON "header_global_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "header_global_rels_pages_id_idx" ON "header_global_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "header_global_rels_products_id_idx" ON "header_global_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "header_global_rels_posts_id_idx" ON "header_global_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "header_global_rels_post_categories_id_idx" ON "header_global_rels" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "header_global_rels_product_categories_id_idx" ON "header_global_rels" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "header_global_rels_product_sub_categories_id_idx" ON "header_global_rels" USING btree ("product_sub_categories_id");
  ALTER TABLE "header_global_header_items_left" DROP COLUMN IF EXISTS "post_categories_id";
  ALTER TABLE "header_global_header_items_left" DROP COLUMN IF EXISTS "product_categories_id";
  ALTER TABLE "header_global_header_items_left" DROP COLUMN IF EXISTS "product_sub_categories_id";
  ALTER TABLE "header_global_header_items_left" DROP COLUMN IF EXISTS "button_label_override";
  ALTER TABLE "header_global_header_items_right" DROP COLUMN IF EXISTS "post_categories_id";
  ALTER TABLE "header_global_header_items_right" DROP COLUMN IF EXISTS "product_categories_id";
  ALTER TABLE "header_global_header_items_right" DROP COLUMN IF EXISTS "product_sub_categories_id";
  ALTER TABLE "header_global_header_items_right" DROP COLUMN IF EXISTS "button_label_override";
  ALTER TABLE "public"."header_global_header_items_left" ALTER COLUMN "kind" SET DATA TYPE text;
  DROP TYPE "public"."enum_header_global_header_items_left_kind";
  CREATE TYPE "public"."enum_header_global_header_items_left_kind" AS ENUM('prebuilt', 'internalUrl', 'customUrl');
  ALTER TABLE "public"."header_global_header_items_left" ALTER COLUMN "kind" SET DATA TYPE "public"."enum_header_global_header_items_left_kind" USING "kind"::"public"."enum_header_global_header_items_left_kind";
  ALTER TABLE "public"."header_global_header_items_right" ALTER COLUMN "kind" SET DATA TYPE text;
  DROP TYPE "public"."enum_header_global_header_items_right_kind";
  CREATE TYPE "public"."enum_header_global_header_items_right_kind" AS ENUM('prebuilt', 'internalUrl', 'customUrl');
  ALTER TABLE "public"."header_global_header_items_right" ALTER COLUMN "kind" SET DATA TYPE "public"."enum_header_global_header_items_right_kind" USING "kind"::"public"."enum_header_global_header_items_right_kind";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_global_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "header_global_rels" CASCADE;
  ALTER TABLE "header_global_header_items_left" ALTER COLUMN "kind" SET DEFAULT 'postCategories';
  ALTER TABLE "header_global_header_items_right" ALTER COLUMN "kind" SET DEFAULT 'postCategories';
  ALTER TABLE "header_global_header_items_left" ADD COLUMN "post_categories_id" integer;
  ALTER TABLE "header_global_header_items_left" ADD COLUMN "product_categories_id" integer;
  ALTER TABLE "header_global_header_items_left" ADD COLUMN "product_sub_categories_id" integer;
  ALTER TABLE "header_global_header_items_left" ADD COLUMN "button_label_override" varchar;
  ALTER TABLE "header_global_header_items_right" ADD COLUMN "post_categories_id" integer;
  ALTER TABLE "header_global_header_items_right" ADD COLUMN "product_categories_id" integer;
  ALTER TABLE "header_global_header_items_right" ADD COLUMN "product_sub_categories_id" integer;
  ALTER TABLE "header_global_header_items_right" ADD COLUMN "button_label_override" varchar;
  DO $$ BEGIN
   ALTER TABLE "header_global_header_items_left" ADD CONSTRAINT "header_global_header_items_left_post_categories_id_post_categories_id_fk" FOREIGN KEY ("post_categories_id") REFERENCES "public"."post_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_global_header_items_left" ADD CONSTRAINT "header_global_header_items_left_product_categories_id_product_categories_id_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_global_header_items_left" ADD CONSTRAINT "header_global_header_items_left_product_sub_categories_id_product_sub_categories_id_fk" FOREIGN KEY ("product_sub_categories_id") REFERENCES "public"."product_sub_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_global_header_items_right" ADD CONSTRAINT "header_global_header_items_right_post_categories_id_post_categories_id_fk" FOREIGN KEY ("post_categories_id") REFERENCES "public"."post_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_global_header_items_right" ADD CONSTRAINT "header_global_header_items_right_product_categories_id_product_categories_id_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_global_header_items_right" ADD CONSTRAINT "header_global_header_items_right_product_sub_categories_id_product_sub_categories_id_fk" FOREIGN KEY ("product_sub_categories_id") REFERENCES "public"."product_sub_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "header_global_header_items_left_post_categories_idx" ON "header_global_header_items_left" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "header_global_header_items_left_product_categories_idx" ON "header_global_header_items_left" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "header_global_header_items_left_product_sub_categories_idx" ON "header_global_header_items_left" USING btree ("product_sub_categories_id");
  CREATE INDEX IF NOT EXISTS "header_global_header_items_right_post_categories_idx" ON "header_global_header_items_right" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "header_global_header_items_right_product_categories_idx" ON "header_global_header_items_right" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "header_global_header_items_right_product_sub_categories_idx" ON "header_global_header_items_right" USING btree ("product_sub_categories_id");
  ALTER TABLE "pages_blocks_products_carousel" DROP COLUMN IF EXISTS "watch_more_btn_label";
  ALTER TABLE "_pages_v_blocks_products_carousel" DROP COLUMN IF EXISTS "watch_more_btn_label";
  ALTER TABLE "posts_blocks_products_carousel" DROP COLUMN IF EXISTS "watch_more_btn_label";
  ALTER TABLE "_posts_v_blocks_products_carousel" DROP COLUMN IF EXISTS "watch_more_btn_label";
  ALTER TABLE "products_blocks_products_carousel" DROP COLUMN IF EXISTS "watch_more_btn_label";
  ALTER TABLE "header_global_header_items_left" DROP COLUMN IF EXISTS "custom_url";
  ALTER TABLE "header_global_header_items_left" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "header_global_header_items_right" DROP COLUMN IF EXISTS "custom_url";
  ALTER TABLE "header_global_header_items_right" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "public"."header_global_header_items_left" ALTER COLUMN "kind" SET DATA TYPE text;
  DROP TYPE "public"."enum_header_global_header_items_left_kind";
  CREATE TYPE "public"."enum_header_global_header_items_left_kind" AS ENUM('prebuilt', 'postCategories', 'productCategories', 'productSubCategories');
  ALTER TABLE "public"."header_global_header_items_left" ALTER COLUMN "kind" SET DATA TYPE "public"."enum_header_global_header_items_left_kind" USING "kind"::"public"."enum_header_global_header_items_left_kind";
  ALTER TABLE "public"."header_global_header_items_right" ALTER COLUMN "kind" SET DATA TYPE text;
  DROP TYPE "public"."enum_header_global_header_items_right_kind";
  CREATE TYPE "public"."enum_header_global_header_items_right_kind" AS ENUM('prebuilt', 'postCategories', 'productCategories', 'productSubCategories');
  ALTER TABLE "public"."header_global_header_items_right" ALTER COLUMN "kind" SET DATA TYPE "public"."enum_header_global_header_items_right_kind" USING "kind"::"public"."enum_header_global_header_items_right_kind";`)
}
