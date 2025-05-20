import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_products_reviews_visible" AS ENUM('show', 'hide');
  ALTER TYPE "public"."enum_promo_link_type" RENAME TO "enum_promo_global_link_type";
  CREATE TABLE IF NOT EXISTS "customers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"email" varchar,
  	"phone_number" varchar,
  	"address" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_products_category" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_label" varchar DEFAULT 'XEM TẤT CẢ CÁC SẢN PHẨM',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_products_category" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_label" varchar DEFAULT 'XEM TẤT CẢ CÁC SẢN PHẨM',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_how_to_use_product" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Hướng dẫn sử dụng' NOT NULL,
  	"content" jsonb NOT NULL,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "orders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"review_rating" numeric NOT NULL,
  	"review_content" varchar NOT NULL,
  	"review_approved" boolean DEFAULT false,
  	"products_id" integer NOT NULL,
  	"customers_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "floating_global_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar NOT NULL,
  	"icon_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "floating_global" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Liên hệ' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "popup_banner_global" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "promo_global" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"message" varchar DEFAULT '',
  	"link_type" "enum_promo_global_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "promo_global_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"post_categories_id" integer,
  	"posts_id" integer,
  	"product_categories_id" integer,
  	"products_id" integer,
  	"product_sub_categories_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "reviews_global" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Đánh giá từ khách hàng' NOT NULL,
  	"btn_label" varchar DEFAULT 'VIẾT ĐÁNH GIÁ' NOT NULL,
  	"review_dialog_title" varchar DEFAULT 'Viết đánh giá của bạn' NOT NULL,
  	"send_review_btn_label" varchar DEFAULT 'GỬI ĐÁNH GIÁ' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "promo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "promo_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "promo" CASCADE;
  DROP TABLE "promo_rels" CASCADE;
  ALTER TABLE "products" ADD COLUMN "reviews_visible" "enum_products_reviews_visible" DEFAULT 'show';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "customers_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "orders_id" integer;
  ALTER TABLE "checkout_page_global" ADD COLUMN "address_details" varchar DEFAULT 'Số nhà, đường, khu vực' NOT NULL;
  ALTER TABLE "checkout_page_global" ADD COLUMN "address_save_for_next_time" varchar DEFAULT 'Lưu thông tin thanh toán cho những lần tiếp theo' NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_products_category" ADD CONSTRAINT "posts_blocks_products_category_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_products_category" ADD CONSTRAINT "_posts_v_blocks_products_category_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_how_to_use_product" ADD CONSTRAINT "products_blocks_how_to_use_product_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_how_to_use_product" ADD CONSTRAINT "products_blocks_how_to_use_product_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "orders" ADD CONSTRAINT "orders_products_id_products_id_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "orders" ADD CONSTRAINT "orders_customers_id_customers_id_fk" FOREIGN KEY ("customers_id") REFERENCES "public"."customers"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "floating_global_links" ADD CONSTRAINT "floating_global_links_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "floating_global_links" ADD CONSTRAINT "floating_global_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."floating_global"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "promo_global_rels" ADD CONSTRAINT "promo_global_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."promo_global"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "promo_global_rels" ADD CONSTRAINT "promo_global_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "promo_global_rels" ADD CONSTRAINT "promo_global_rels_post_categories_fk" FOREIGN KEY ("post_categories_id") REFERENCES "public"."post_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "promo_global_rels" ADD CONSTRAINT "promo_global_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "promo_global_rels" ADD CONSTRAINT "promo_global_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "promo_global_rels" ADD CONSTRAINT "promo_global_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "promo_global_rels" ADD CONSTRAINT "promo_global_rels_product_sub_categories_fk" FOREIGN KEY ("product_sub_categories_id") REFERENCES "public"."product_sub_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "customers_updated_at_idx" ON "customers" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "customers_created_at_idx" ON "customers" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "posts_blocks_products_category_order_idx" ON "posts_blocks_products_category" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_products_category_parent_id_idx" ON "posts_blocks_products_category" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_products_category_path_idx" ON "posts_blocks_products_category" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_products_category_order_idx" ON "_posts_v_blocks_products_category" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_products_category_parent_id_idx" ON "_posts_v_blocks_products_category" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_products_category_path_idx" ON "_posts_v_blocks_products_category" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_how_to_use_product_order_idx" ON "products_blocks_how_to_use_product" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_how_to_use_product_parent_id_idx" ON "products_blocks_how_to_use_product" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_how_to_use_product_path_idx" ON "products_blocks_how_to_use_product" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_how_to_use_product_image_idx" ON "products_blocks_how_to_use_product" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "orders_products_idx" ON "orders" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "orders_customers_idx" ON "orders" USING btree ("customers_id");
  CREATE INDEX IF NOT EXISTS "orders_updated_at_idx" ON "orders" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "orders_created_at_idx" ON "orders" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "floating_global_links_order_idx" ON "floating_global_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "floating_global_links_parent_id_idx" ON "floating_global_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "floating_global_links_icon_idx" ON "floating_global_links" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "promo_global_rels_order_idx" ON "promo_global_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "promo_global_rels_parent_idx" ON "promo_global_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "promo_global_rels_path_idx" ON "promo_global_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "promo_global_rels_pages_id_idx" ON "promo_global_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "promo_global_rels_post_categories_id_idx" ON "promo_global_rels" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "promo_global_rels_posts_id_idx" ON "promo_global_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "promo_global_rels_product_categories_id_idx" ON "promo_global_rels" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "promo_global_rels_products_id_idx" ON "promo_global_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "promo_global_rels_product_sub_categories_id_idx" ON "promo_global_rels" USING btree ("product_sub_categories_id");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_customers_fk" FOREIGN KEY ("customers_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_orders_fk" FOREIGN KEY ("orders_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_customers_id_idx" ON "payload_locked_documents_rels" USING btree ("customers_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_orders_id_idx" ON "payload_locked_documents_rels" USING btree ("orders_id");
  ALTER TABLE "pages_hero_links" DROP COLUMN IF EXISTS "link_appearance";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN IF EXISTS "link_appearance";
  ALTER TABLE "pages_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_appearance";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN IF EXISTS "link_appearance";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN IF EXISTS "link_appearance";
  ALTER TABLE "_pages_v_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_appearance";
  ALTER TABLE "posts_blocks_content_columns" DROP COLUMN IF EXISTS "link_appearance";
  ALTER TABLE "posts_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_appearance";
  ALTER TABLE "_posts_v_blocks_content_columns" DROP COLUMN IF EXISTS "link_appearance";
  ALTER TABLE "_posts_v_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_appearance";
  ALTER TABLE "products_blocks_content_columns" DROP COLUMN IF EXISTS "link_appearance";
  ALTER TABLE "products_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_appearance";
  ALTER TABLE "public"."users" ALTER COLUMN "role" SET DATA TYPE text;
  DROP TYPE "public"."enum_users_role";
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'sales-manager', 'content-manager');
  ALTER TABLE "public"."users" ALTER COLUMN "role" SET DATA TYPE "public"."enum_users_role" USING "role"::"public"."enum_users_role";
  DROP TYPE "public"."enum_pages_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_products_carousel_apb_appearance";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_products_carousel_apb_appearance";
  DROP TYPE "public"."enum_posts_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_posts_blocks_products_carousel_apb_appearance";
  DROP TYPE "public"."enum__posts_v_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__posts_v_blocks_products_carousel_apb_appearance";
  DROP TYPE "public"."enum_products_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_products_blocks_products_carousel_apb_appearance";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_products_carousel_apb_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_products_carousel_apb_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_posts_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_posts_blocks_products_carousel_apb_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__posts_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__posts_v_blocks_products_carousel_apb_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_products_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_products_blocks_products_carousel_apb_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_promo_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE IF NOT EXISTS "promo" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"message" varchar DEFAULT '',
  	"link_type" "enum_promo_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "promo_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"post_categories_id" integer,
  	"products_id" integer,
  	"product_categories_id" integer,
  	"product_sub_categories_id" integer
  );
  
  ALTER TABLE "customers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_products_category" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_products_category" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_how_to_use_product" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "orders" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "floating_global_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "floating_global" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "popup_banner_global" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "promo_global" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "promo_global_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reviews_global" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "customers" CASCADE;
  DROP TABLE "posts_blocks_products_category" CASCADE;
  DROP TABLE "_posts_v_blocks_products_category" CASCADE;
  DROP TABLE "products_blocks_how_to_use_product" CASCADE;
  DROP TABLE "orders" CASCADE;
  DROP TABLE "floating_global_links" CASCADE;
  DROP TABLE "floating_global" CASCADE;
  DROP TABLE "popup_banner_global" CASCADE;
  DROP TABLE "promo_global" CASCADE;
  DROP TABLE "promo_global_rels" CASCADE;
  DROP TABLE "reviews_global" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_customers_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_orders_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_customers_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_orders_id_idx";
  ALTER TABLE "pages_hero_links" ADD COLUMN "link_appearance" "enum_pages_hero_links_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_appearance" "enum_pages_blocks_content_columns_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages_blocks_products_carousel" ADD COLUMN "apb_appearance" "enum_pages_blocks_products_carousel_apb_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_appearance" "enum__pages_v_version_hero_links_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_appearance" "enum__pages_v_blocks_content_columns_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_products_carousel" ADD COLUMN "apb_appearance" "enum__pages_v_blocks_products_carousel_apb_appearance" DEFAULT 'default';
  ALTER TABLE "posts_blocks_content_columns" ADD COLUMN "link_appearance" "enum_posts_blocks_content_columns_link_appearance" DEFAULT 'default';
  ALTER TABLE "posts_blocks_products_carousel" ADD COLUMN "apb_appearance" "enum_posts_blocks_products_carousel_apb_appearance" DEFAULT 'default';
  ALTER TABLE "_posts_v_blocks_content_columns" ADD COLUMN "link_appearance" "enum__posts_v_blocks_content_columns_link_appearance" DEFAULT 'default';
  ALTER TABLE "_posts_v_blocks_products_carousel" ADD COLUMN "apb_appearance" "enum__posts_v_blocks_products_carousel_apb_appearance" DEFAULT 'default';
  ALTER TABLE "products_blocks_content_columns" ADD COLUMN "link_appearance" "enum_products_blocks_content_columns_link_appearance" DEFAULT 'default';
  ALTER TABLE "products_blocks_products_carousel" ADD COLUMN "apb_appearance" "enum_products_blocks_products_carousel_apb_appearance" DEFAULT 'default';
  DO $$ BEGIN
   ALTER TABLE "promo_rels" ADD CONSTRAINT "promo_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."promo"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "promo_rels" ADD CONSTRAINT "promo_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "promo_rels" ADD CONSTRAINT "promo_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
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
  
  CREATE INDEX IF NOT EXISTS "promo_rels_order_idx" ON "promo_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "promo_rels_parent_idx" ON "promo_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "promo_rels_path_idx" ON "promo_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "promo_rels_pages_id_idx" ON "promo_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "promo_rels_posts_id_idx" ON "promo_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "promo_rels_post_categories_id_idx" ON "promo_rels" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "promo_rels_products_id_idx" ON "promo_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "promo_rels_product_categories_id_idx" ON "promo_rels" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "promo_rels_product_sub_categories_id_idx" ON "promo_rels" USING btree ("product_sub_categories_id");
  ALTER TABLE "products" DROP COLUMN IF EXISTS "reviews_visible";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "customers_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "orders_id";
  ALTER TABLE "checkout_page_global" DROP COLUMN IF EXISTS "address_details";
  ALTER TABLE "checkout_page_global" DROP COLUMN IF EXISTS "address_save_for_next_time";
  ALTER TABLE "public"."users" ALTER COLUMN "role" SET DATA TYPE text;
  DROP TYPE "public"."enum_users_role";
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'customer');
  ALTER TABLE "public"."users" ALTER COLUMN "role" SET DATA TYPE "public"."enum_users_role" USING "role"::"public"."enum_users_role";
  DROP TYPE "public"."enum_products_reviews_visible";
  DROP TYPE "public"."enum_promo_global_link_type";`)
}
