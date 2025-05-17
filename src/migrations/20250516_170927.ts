import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_products_carousel_apb_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_products_carousel_apb_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_products_carousel_apb_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_products_carousel_apb_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_posts_blocks_products_carousel_apb_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_blocks_products_carousel_apb_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__posts_v_blocks_products_carousel_apb_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__posts_v_blocks_products_carousel_apb_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_products_blocks_products_carousel_apb_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_products_blocks_products_carousel_apb_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_header_global_header_items_left_kind" AS ENUM('prebuilt', 'postCategories', 'productCategories', 'productSubCategories');
  CREATE TYPE "public"."enum_header_global_header_items_left_prebuilt" AS ENUM('search', 'products', 'about', 'events', 'contact', 'vie-en', 'cart');
  CREATE TYPE "public"."enum_header_global_header_items_right_kind" AS ENUM('prebuilt', 'postCategories', 'productCategories', 'productSubCategories');
  CREATE TYPE "public"."enum_header_global_header_items_right_prebuilt" AS ENUM('search', 'products', 'about', 'events', 'contact', 'vie-en', 'cart');
  CREATE TABLE IF NOT EXISTS "header_global_header_items_left" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_header_global_header_items_left_kind" DEFAULT 'postCategories',
  	"prebuilt" "enum_header_global_header_items_left_prebuilt",
  	"post_categories_id" integer,
  	"product_categories_id" integer,
  	"product_sub_categories_id" integer,
  	"button_label_override" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "header_global_header_items_right" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_header_global_header_items_right_kind" DEFAULT 'postCategories',
  	"prebuilt" "enum_header_global_header_items_right_prebuilt",
  	"post_categories_id" integer,
  	"product_categories_id" integer,
  	"product_sub_categories_id" integer,
  	"button_label_override" varchar
  );
  
  ALTER TABLE "header_global_nav_items_left" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_global_nav_items_right" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "header_global_nav_items_left" CASCADE;
  DROP TABLE "header_global_nav_items_right" CASCADE;
  ALTER TABLE "pages_blocks_products_carousel" ADD COLUMN "apb_type" "enum_pages_blocks_products_carousel_apb_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_products_carousel" ADD COLUMN "apb_new_tab" boolean;
  ALTER TABLE "pages_blocks_products_carousel" ADD COLUMN "apb_url" varchar;
  ALTER TABLE "pages_blocks_products_carousel" ADD COLUMN "apb_label" varchar;
  ALTER TABLE "pages_blocks_products_carousel" ADD COLUMN "apb_appearance" "enum_pages_blocks_products_carousel_apb_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_products_carousel" ADD COLUMN "apb_type" "enum__pages_v_blocks_products_carousel_apb_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_products_carousel" ADD COLUMN "apb_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_products_carousel" ADD COLUMN "apb_url" varchar;
  ALTER TABLE "_pages_v_blocks_products_carousel" ADD COLUMN "apb_label" varchar;
  ALTER TABLE "_pages_v_blocks_products_carousel" ADD COLUMN "apb_appearance" "enum__pages_v_blocks_products_carousel_apb_appearance" DEFAULT 'default';
  ALTER TABLE "posts_blocks_products_carousel" ADD COLUMN "apb_type" "enum_posts_blocks_products_carousel_apb_type" DEFAULT 'reference';
  ALTER TABLE "posts_blocks_products_carousel" ADD COLUMN "apb_new_tab" boolean;
  ALTER TABLE "posts_blocks_products_carousel" ADD COLUMN "apb_url" varchar;
  ALTER TABLE "posts_blocks_products_carousel" ADD COLUMN "apb_label" varchar;
  ALTER TABLE "posts_blocks_products_carousel" ADD COLUMN "apb_appearance" "enum_posts_blocks_products_carousel_apb_appearance" DEFAULT 'default';
  ALTER TABLE "posts_rels" ADD COLUMN "product_categories_id" integer;
  ALTER TABLE "posts_rels" ADD COLUMN "product_sub_categories_id" integer;
  ALTER TABLE "_posts_v_blocks_products_carousel" ADD COLUMN "apb_type" "enum__posts_v_blocks_products_carousel_apb_type" DEFAULT 'reference';
  ALTER TABLE "_posts_v_blocks_products_carousel" ADD COLUMN "apb_new_tab" boolean;
  ALTER TABLE "_posts_v_blocks_products_carousel" ADD COLUMN "apb_url" varchar;
  ALTER TABLE "_posts_v_blocks_products_carousel" ADD COLUMN "apb_label" varchar;
  ALTER TABLE "_posts_v_blocks_products_carousel" ADD COLUMN "apb_appearance" "enum__posts_v_blocks_products_carousel_apb_appearance" DEFAULT 'default';
  ALTER TABLE "_posts_v_rels" ADD COLUMN "product_categories_id" integer;
  ALTER TABLE "_posts_v_rels" ADD COLUMN "product_sub_categories_id" integer;
  ALTER TABLE "products_blocks_products_carousel" ADD COLUMN "apb_type" "enum_products_blocks_products_carousel_apb_type" DEFAULT 'reference';
  ALTER TABLE "products_blocks_products_carousel" ADD COLUMN "apb_new_tab" boolean;
  ALTER TABLE "products_blocks_products_carousel" ADD COLUMN "apb_url" varchar;
  ALTER TABLE "products_blocks_products_carousel" ADD COLUMN "apb_label" varchar NOT NULL;
  ALTER TABLE "products_blocks_products_carousel" ADD COLUMN "apb_appearance" "enum_products_blocks_products_carousel_apb_appearance" DEFAULT 'default';
  ALTER TABLE "promo_rels" ADD COLUMN "post_categories_id" integer;
  ALTER TABLE "promo_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "promo_rels" ADD COLUMN "product_categories_id" integer;
  ALTER TABLE "promo_rels" ADD COLUMN "product_sub_categories_id" integer;
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
   ALTER TABLE "header_global_header_items_left" ADD CONSTRAINT "header_global_header_items_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_global"("id") ON DELETE cascade ON UPDATE no action;
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
  
  DO $$ BEGIN
   ALTER TABLE "header_global_header_items_right" ADD CONSTRAINT "header_global_header_items_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_global"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "header_global_header_items_left_order_idx" ON "header_global_header_items_left" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_global_header_items_left_parent_id_idx" ON "header_global_header_items_left" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_global_header_items_left_post_categories_idx" ON "header_global_header_items_left" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "header_global_header_items_left_product_categories_idx" ON "header_global_header_items_left" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "header_global_header_items_left_product_sub_categories_idx" ON "header_global_header_items_left" USING btree ("product_sub_categories_id");
  CREATE INDEX IF NOT EXISTS "header_global_header_items_right_order_idx" ON "header_global_header_items_right" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_global_header_items_right_parent_id_idx" ON "header_global_header_items_right" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_global_header_items_right_post_categories_idx" ON "header_global_header_items_right" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "header_global_header_items_right_product_categories_idx" ON "header_global_header_items_right" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "header_global_header_items_right_product_sub_categories_idx" ON "header_global_header_items_right" USING btree ("product_sub_categories_id");
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_product_sub_categories_fk" FOREIGN KEY ("product_sub_categories_id") REFERENCES "public"."product_sub_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_product_sub_categories_fk" FOREIGN KEY ("product_sub_categories_id") REFERENCES "public"."product_sub_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "promo_rels" ADD CONSTRAINT "promo_rels_post_categories_fk" FOREIGN KEY ("post_categories_id") REFERENCES "public"."post_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "promo_rels" ADD CONSTRAINT "promo_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "promo_rels" ADD CONSTRAINT "promo_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "promo_rels" ADD CONSTRAINT "promo_rels_product_sub_categories_fk" FOREIGN KEY ("product_sub_categories_id") REFERENCES "public"."product_sub_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "posts_rels_product_categories_id_idx" ON "posts_rels" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_product_sub_categories_id_idx" ON "posts_rels" USING btree ("product_sub_categories_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_product_categories_id_idx" ON "_posts_v_rels" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_product_sub_categories_id_idx" ON "_posts_v_rels" USING btree ("product_sub_categories_id");
  CREATE INDEX IF NOT EXISTS "promo_rels_post_categories_id_idx" ON "promo_rels" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "promo_rels_products_id_idx" ON "promo_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "promo_rels_product_categories_id_idx" ON "promo_rels" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "promo_rels_product_sub_categories_id_idx" ON "promo_rels" USING btree ("product_sub_categories_id");
  DROP TYPE "public"."enum_header_global_nav_items_left_item";
  DROP TYPE "public"."enum_header_global_nav_items_right_item";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_global_nav_items_left_item" AS ENUM('search', 'products', 'about', 'events', 'contact', 'vie-en', 'cart');
  CREATE TYPE "public"."enum_header_global_nav_items_right_item" AS ENUM('search', 'products', 'about', 'events', 'contact', 'vie-en', 'cart');
  CREATE TABLE IF NOT EXISTS "header_global_nav_items_left" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" "enum_header_global_nav_items_left_item"
  );
  
  CREATE TABLE IF NOT EXISTS "header_global_nav_items_right" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" "enum_header_global_nav_items_right_item"
  );
  
  ALTER TABLE "header_global_header_items_left" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_global_header_items_right" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "header_global_header_items_left" CASCADE;
  DROP TABLE "header_global_header_items_right" CASCADE;
  ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_product_categories_fk";
  
  ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_product_sub_categories_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_product_categories_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_product_sub_categories_fk";
  
  ALTER TABLE "promo_rels" DROP CONSTRAINT "promo_rels_post_categories_fk";
  
  ALTER TABLE "promo_rels" DROP CONSTRAINT "promo_rels_products_fk";
  
  ALTER TABLE "promo_rels" DROP CONSTRAINT "promo_rels_product_categories_fk";
  
  ALTER TABLE "promo_rels" DROP CONSTRAINT "promo_rels_product_sub_categories_fk";
  
  DROP INDEX IF EXISTS "posts_rels_product_categories_id_idx";
  DROP INDEX IF EXISTS "posts_rels_product_sub_categories_id_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_product_categories_id_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_product_sub_categories_id_idx";
  DROP INDEX IF EXISTS "promo_rels_post_categories_id_idx";
  DROP INDEX IF EXISTS "promo_rels_products_id_idx";
  DROP INDEX IF EXISTS "promo_rels_product_categories_id_idx";
  DROP INDEX IF EXISTS "promo_rels_product_sub_categories_id_idx";
  DO $$ BEGIN
   ALTER TABLE "header_global_nav_items_left" ADD CONSTRAINT "header_global_nav_items_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_global"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_global_nav_items_right" ADD CONSTRAINT "header_global_nav_items_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_global"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "header_global_nav_items_left_order_idx" ON "header_global_nav_items_left" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_global_nav_items_left_parent_id_idx" ON "header_global_nav_items_left" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_global_nav_items_right_order_idx" ON "header_global_nav_items_right" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_global_nav_items_right_parent_id_idx" ON "header_global_nav_items_right" USING btree ("_parent_id");
  ALTER TABLE "pages_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_type";
  ALTER TABLE "pages_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_new_tab";
  ALTER TABLE "pages_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_url";
  ALTER TABLE "pages_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_label";
  ALTER TABLE "pages_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_appearance";
  ALTER TABLE "_pages_v_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_type";
  ALTER TABLE "_pages_v_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_new_tab";
  ALTER TABLE "_pages_v_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_url";
  ALTER TABLE "_pages_v_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_label";
  ALTER TABLE "_pages_v_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_appearance";
  ALTER TABLE "posts_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_type";
  ALTER TABLE "posts_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_new_tab";
  ALTER TABLE "posts_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_url";
  ALTER TABLE "posts_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_label";
  ALTER TABLE "posts_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_appearance";
  ALTER TABLE "posts_rels" DROP COLUMN IF EXISTS "product_categories_id";
  ALTER TABLE "posts_rels" DROP COLUMN IF EXISTS "product_sub_categories_id";
  ALTER TABLE "_posts_v_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_type";
  ALTER TABLE "_posts_v_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_new_tab";
  ALTER TABLE "_posts_v_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_url";
  ALTER TABLE "_posts_v_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_label";
  ALTER TABLE "_posts_v_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_appearance";
  ALTER TABLE "_posts_v_rels" DROP COLUMN IF EXISTS "product_categories_id";
  ALTER TABLE "_posts_v_rels" DROP COLUMN IF EXISTS "product_sub_categories_id";
  ALTER TABLE "products_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_type";
  ALTER TABLE "products_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_new_tab";
  ALTER TABLE "products_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_url";
  ALTER TABLE "products_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_label";
  ALTER TABLE "products_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_appearance";
  ALTER TABLE "promo_rels" DROP COLUMN IF EXISTS "post_categories_id";
  ALTER TABLE "promo_rels" DROP COLUMN IF EXISTS "products_id";
  ALTER TABLE "promo_rels" DROP COLUMN IF EXISTS "product_categories_id";
  ALTER TABLE "promo_rels" DROP COLUMN IF EXISTS "product_sub_categories_id";
  DROP TYPE "public"."enum_pages_blocks_products_carousel_apb_type";
  DROP TYPE "public"."enum_pages_blocks_products_carousel_apb_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_products_carousel_apb_type";
  DROP TYPE "public"."enum__pages_v_blocks_products_carousel_apb_appearance";
  DROP TYPE "public"."enum_posts_blocks_products_carousel_apb_type";
  DROP TYPE "public"."enum_posts_blocks_products_carousel_apb_appearance";
  DROP TYPE "public"."enum__posts_v_blocks_products_carousel_apb_type";
  DROP TYPE "public"."enum__posts_v_blocks_products_carousel_apb_appearance";
  DROP TYPE "public"."enum_products_blocks_products_carousel_apb_type";
  DROP TYPE "public"."enum_products_blocks_products_carousel_apb_appearance";
  DROP TYPE "public"."enum_header_global_header_items_left_kind";
  DROP TYPE "public"."enum_header_global_header_items_left_prebuilt";
  DROP TYPE "public"."enum_header_global_header_items_right_kind";
  DROP TYPE "public"."enum_header_global_header_items_right_prebuilt";`)
}
