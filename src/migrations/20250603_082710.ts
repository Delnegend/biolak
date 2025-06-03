import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_best_seller_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_products_carousel_locales" (
  	"title" varchar,
  	"watch_more_btn_label" varchar,
  	"apb_type" "enum_pages_blocks_products_carousel_apb_type" DEFAULT 'reference',
  	"apb_new_tab" boolean,
  	"apb_url" varchar,
  	"apb_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_best_seller_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_products_carousel_locales" (
  	"title" varchar,
  	"watch_more_btn_label" varchar,
  	"apb_type" "enum__pages_v_blocks_products_carousel_apb_type" DEFAULT 'reference',
  	"apb_new_tab" boolean,
  	"apb_url" varchar,
  	"apb_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "posts_blocks_focus_right_large_image_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "posts_blocks_products_carousel_locales" (
  	"title" varchar,
  	"watch_more_btn_label" varchar,
  	"apb_type" "enum_posts_blocks_products_carousel_apb_type" DEFAULT 'reference',
  	"apb_new_tab" boolean,
  	"apb_url" varchar,
  	"apb_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_focus_right_large_image_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_products_carousel_locales" (
  	"title" varchar,
  	"watch_more_btn_label" varchar,
  	"apb_type" "enum__posts_v_blocks_products_carousel_apb_type" DEFAULT 'reference',
  	"apb_new_tab" boolean,
  	"apb_url" varchar,
  	"apb_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "products_blocks_how_to_use_product_locales" (
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "products_blocks_products_carousel_locales" (
  	"title" varchar NOT NULL,
  	"watch_more_btn_label" varchar NOT NULL,
  	"apb_type" "enum_products_blocks_products_carousel_apb_type" DEFAULT 'reference',
  	"apb_new_tab" boolean,
  	"apb_url" varchar,
  	"apb_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  DROP INDEX IF EXISTS "pages_rels_pages_id_idx";
  DROP INDEX IF EXISTS "pages_rels_post_categories_id_idx";
  DROP INDEX IF EXISTS "pages_rels_posts_id_idx";
  DROP INDEX IF EXISTS "pages_rels_product_categories_id_idx";
  DROP INDEX IF EXISTS "pages_rels_products_id_idx";
  DROP INDEX IF EXISTS "pages_rels_product_sub_categories_id_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_pages_id_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_post_categories_id_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_posts_id_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_product_categories_id_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_products_id_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_product_sub_categories_id_idx";
  DROP INDEX IF EXISTS "posts_rels_post_categories_id_idx";
  DROP INDEX IF EXISTS "posts_rels_posts_id_idx";
  DROP INDEX IF EXISTS "posts_rels_pages_id_idx";
  DROP INDEX IF EXISTS "posts_rels_product_categories_id_idx";
  DROP INDEX IF EXISTS "posts_rels_products_id_idx";
  DROP INDEX IF EXISTS "posts_rels_product_sub_categories_id_idx";
  DROP INDEX IF EXISTS "posts_rels_users_id_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_post_categories_id_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_posts_id_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_pages_id_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_product_categories_id_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_products_id_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_product_sub_categories_id_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_users_id_idx";
  DROP INDEX IF EXISTS "products_rels_product_categories_id_idx";
  DROP INDEX IF EXISTS "products_rels_product_sub_categories_id_idx";
  DROP INDEX IF EXISTS "products_rels_media_id_idx";
  DROP INDEX IF EXISTS "products_rels_post_categories_id_idx";
  DROP INDEX IF EXISTS "products_rels_posts_id_idx";
  DROP INDEX IF EXISTS "products_rels_pages_id_idx";
  DROP INDEX IF EXISTS "products_rels_products_id_idx";
  ALTER TABLE "pages_blocks_infinite_scroll" ALTER COLUMN "animation_duration" SET DEFAULT 10;
  ALTER TABLE "_pages_v_blocks_infinite_scroll" ALTER COLUMN "animation_duration" SET DEFAULT 10;
  ALTER TABLE "posts_blocks_infinite_scroll" ALTER COLUMN "animation_duration" SET DEFAULT 10;
  ALTER TABLE "_posts_v_blocks_infinite_scroll" ALTER COLUMN "animation_duration" SET DEFAULT 10;
  ALTER TABLE "products_blocks_infinite_scroll" ALTER COLUMN "animation_duration" SET DEFAULT 10;
  ALTER TABLE "orders" ALTER COLUMN "customers_id" SET NOT NULL;
  ALTER TABLE "forms_emails_locales" ALTER COLUMN "subject" SET DEFAULT 'You''ve received a new message.';
  ALTER TABLE "pages_blocks_buy_now" ADD COLUMN "products_id" integer;
  ALTER TABLE "pages_blocks_call_to_add_to_cart" ADD COLUMN "products_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "_pages_v_blocks_buy_now" ADD COLUMN "products_id" integer;
  ALTER TABLE "_pages_v_blocks_call_to_add_to_cart" ADD COLUMN "products_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "posts_blocks_buy_now" ADD COLUMN "products_id" integer;
  ALTER TABLE "posts_blocks_call_to_add_to_cart" ADD COLUMN "products_id" integer;
  ALTER TABLE "posts_locales" ADD COLUMN "title" varchar;
  ALTER TABLE "posts_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "_posts_v_blocks_buy_now" ADD COLUMN "products_id" integer;
  ALTER TABLE "_posts_v_blocks_call_to_add_to_cart" ADD COLUMN "products_id" integer;
  ALTER TABLE "_posts_v_locales" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_posts_v_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "products_blocks_buy_now" ADD COLUMN "products_id" integer;
  ALTER TABLE "products_blocks_call_to_add_to_cart" ADD COLUMN "products_id" integer;
  ALTER TABLE "products_blocks_how_to_use_product" ADD COLUMN "products_id" integer;
  ALTER TABLE "products_rels" ADD COLUMN "locale" "_locales";
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_best_seller_locales" ADD CONSTRAINT "pages_blocks_best_seller_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_best_seller"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_products_carousel_locales" ADD CONSTRAINT "pages_blocks_products_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_products_carousel"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_best_seller_locales" ADD CONSTRAINT "_pages_v_blocks_best_seller_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_best_seller"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_products_carousel_locales" ADD CONSTRAINT "_pages_v_blocks_products_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_products_carousel"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "posts_blocks_focus_right_large_image_locales" ADD CONSTRAINT "posts_blocks_focus_right_large_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_focus_right_large_image"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "posts_blocks_products_carousel_locales" ADD CONSTRAINT "posts_blocks_products_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_products_carousel"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_focus_right_large_image_locales" ADD CONSTRAINT "_posts_v_blocks_focus_right_large_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_focus_right_large_image"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_products_carousel_locales" ADD CONSTRAINT "_posts_v_blocks_products_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_products_carousel"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "products_blocks_how_to_use_product_locales" ADD CONSTRAINT "products_blocks_how_to_use_product_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_how_to_use_product"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "products_blocks_products_carousel_locales" ADD CONSTRAINT "products_blocks_products_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_products_carousel"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_best_seller_locales_locale_parent_id_unique" ON "pages_blocks_best_seller_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_products_carousel_locales_locale_parent_id_unique" ON "pages_blocks_products_carousel_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_best_seller_locales_locale_parent_id_unique" ON "_pages_v_blocks_best_seller_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_products_carousel_locales_locale_parent_id_unique" ON "_pages_v_blocks_products_carousel_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_blocks_focus_right_large_image_locales_locale_parent_id_unique" ON "posts_blocks_focus_right_large_image_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_blocks_products_carousel_locales_locale_parent_id_unique" ON "posts_blocks_products_carousel_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_posts_v_blocks_focus_right_large_image_locales_locale_parent_id_unique" ON "_posts_v_blocks_focus_right_large_image_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_posts_v_blocks_products_carousel_locales_locale_parent_id_unique" ON "_posts_v_blocks_products_carousel_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "products_blocks_how_to_use_product_locales_locale_parent_id_unique" ON "products_blocks_how_to_use_product_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "products_blocks_products_carousel_locales_locale_parent_id_unique" ON "products_blocks_products_carousel_locales" USING btree ("_locale","_parent_id");
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_buy_now" ADD CONSTRAINT "pages_blocks_buy_now_products_id_products_id_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_call_to_add_to_cart" ADD CONSTRAINT "pages_blocks_call_to_add_to_cart_products_id_products_id_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_buy_now" ADD CONSTRAINT "_pages_v_blocks_buy_now_products_id_products_id_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_call_to_add_to_cart" ADD CONSTRAINT "_pages_v_blocks_call_to_add_to_cart_products_id_products_id_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "posts_blocks_buy_now" ADD CONSTRAINT "posts_blocks_buy_now_products_id_products_id_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "posts_blocks_call_to_add_to_cart" ADD CONSTRAINT "posts_blocks_call_to_add_to_cart_products_id_products_id_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_buy_now" ADD CONSTRAINT "_posts_v_blocks_buy_now_products_id_products_id_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_call_to_add_to_cart" ADD CONSTRAINT "_posts_v_blocks_call_to_add_to_cart_products_id_products_id_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "products_blocks_buy_now" ADD CONSTRAINT "products_blocks_buy_now_products_id_products_id_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "products_blocks_call_to_add_to_cart" ADD CONSTRAINT "products_blocks_call_to_add_to_cart_products_id_products_id_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "products_blocks_how_to_use_product" ADD CONSTRAINT "products_blocks_how_to_use_product_products_id_products_id_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "pages_blocks_buy_now_products_idx" ON "pages_blocks_buy_now" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_add_to_cart_products_idx" ON "pages_blocks_call_to_add_to_cart" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_locale_idx" ON "pages_rels" USING btree ("locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_buy_now_products_idx" ON "_pages_v_blocks_buy_now" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_add_to_cart_products_idx" ON "_pages_v_blocks_call_to_add_to_cart" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_locale_idx" ON "_pages_v_rels" USING btree ("locale");
  CREATE INDEX IF NOT EXISTS "posts_blocks_buy_now_products_idx" ON "posts_blocks_buy_now" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_call_to_add_to_cart_products_idx" ON "posts_blocks_call_to_add_to_cart" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_locale_idx" ON "posts_rels" USING btree ("locale");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_buy_now_products_idx" ON "_posts_v_blocks_buy_now" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_call_to_add_to_cart_products_idx" ON "_posts_v_blocks_call_to_add_to_cart" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_locale_idx" ON "_posts_v_rels" USING btree ("locale");
  CREATE INDEX IF NOT EXISTS "products_blocks_buy_now_products_idx" ON "products_blocks_buy_now" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_call_to_add_to_cart_products_idx" ON "products_blocks_call_to_add_to_cart" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_how_to_use_product_products_idx" ON "products_blocks_how_to_use_product" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "products_rels_locale_idx" ON "products_rels" USING btree ("locale");
  CREATE INDEX IF NOT EXISTS "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id","locale");
  CREATE INDEX IF NOT EXISTS "pages_rels_post_categories_id_idx" ON "pages_rels" USING btree ("post_categories_id","locale");
  CREATE INDEX IF NOT EXISTS "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id","locale");
  CREATE INDEX IF NOT EXISTS "pages_rels_product_categories_id_idx" ON "pages_rels" USING btree ("product_categories_id","locale");
  CREATE INDEX IF NOT EXISTS "pages_rels_products_id_idx" ON "pages_rels" USING btree ("products_id","locale");
  CREATE INDEX IF NOT EXISTS "pages_rels_product_sub_categories_id_idx" ON "pages_rels" USING btree ("product_sub_categories_id","locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id","locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_post_categories_id_idx" ON "_pages_v_rels" USING btree ("post_categories_id","locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id","locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_product_categories_id_idx" ON "_pages_v_rels" USING btree ("product_categories_id","locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_products_id_idx" ON "_pages_v_rels" USING btree ("products_id","locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_product_sub_categories_id_idx" ON "_pages_v_rels" USING btree ("product_sub_categories_id","locale");
  CREATE INDEX IF NOT EXISTS "posts_rels_post_categories_id_idx" ON "posts_rels" USING btree ("post_categories_id","locale");
  CREATE INDEX IF NOT EXISTS "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id","locale");
  CREATE INDEX IF NOT EXISTS "posts_rels_pages_id_idx" ON "posts_rels" USING btree ("pages_id","locale");
  CREATE INDEX IF NOT EXISTS "posts_rels_product_categories_id_idx" ON "posts_rels" USING btree ("product_categories_id","locale");
  CREATE INDEX IF NOT EXISTS "posts_rels_products_id_idx" ON "posts_rels" USING btree ("products_id","locale");
  CREATE INDEX IF NOT EXISTS "posts_rels_product_sub_categories_id_idx" ON "posts_rels" USING btree ("product_sub_categories_id","locale");
  CREATE INDEX IF NOT EXISTS "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id","locale");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_post_categories_id_idx" ON "_posts_v_rels" USING btree ("post_categories_id","locale");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id","locale");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_pages_id_idx" ON "_posts_v_rels" USING btree ("pages_id","locale");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_product_categories_id_idx" ON "_posts_v_rels" USING btree ("product_categories_id","locale");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_products_id_idx" ON "_posts_v_rels" USING btree ("products_id","locale");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_product_sub_categories_id_idx" ON "_posts_v_rels" USING btree ("product_sub_categories_id","locale");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id","locale");
  CREATE INDEX IF NOT EXISTS "products_rels_product_categories_id_idx" ON "products_rels" USING btree ("product_categories_id","locale");
  CREATE INDEX IF NOT EXISTS "products_rels_product_sub_categories_id_idx" ON "products_rels" USING btree ("product_sub_categories_id","locale");
  CREATE INDEX IF NOT EXISTS "products_rels_media_id_idx" ON "products_rels" USING btree ("media_id","locale");
  CREATE INDEX IF NOT EXISTS "products_rels_post_categories_id_idx" ON "products_rels" USING btree ("post_categories_id","locale");
  CREATE INDEX IF NOT EXISTS "products_rels_posts_id_idx" ON "products_rels" USING btree ("posts_id","locale");
  CREATE INDEX IF NOT EXISTS "products_rels_pages_id_idx" ON "products_rels" USING btree ("pages_id","locale");
  CREATE INDEX IF NOT EXISTS "products_rels_products_id_idx" ON "products_rels" USING btree ("products_id","locale");
  ALTER TABLE "pages_blocks_best_seller" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_products_carousel" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_products_carousel" DROP COLUMN IF EXISTS "watch_more_btn_label";
  ALTER TABLE "pages_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_type";
  ALTER TABLE "pages_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_new_tab";
  ALTER TABLE "pages_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_url";
  ALTER TABLE "pages_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_label";
  ALTER TABLE "_pages_v_blocks_best_seller" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_products_carousel" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_products_carousel" DROP COLUMN IF EXISTS "watch_more_btn_label";
  ALTER TABLE "_pages_v_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_type";
  ALTER TABLE "_pages_v_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_new_tab";
  ALTER TABLE "_pages_v_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_url";
  ALTER TABLE "_pages_v_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_label";
  ALTER TABLE "posts_blocks_focus_right_large_image" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "posts_blocks_products_carousel" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "posts_blocks_products_carousel" DROP COLUMN IF EXISTS "watch_more_btn_label";
  ALTER TABLE "posts_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_type";
  ALTER TABLE "posts_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_new_tab";
  ALTER TABLE "posts_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_url";
  ALTER TABLE "posts_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_label";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_posts_v_blocks_focus_right_large_image" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "_posts_v_blocks_products_carousel" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_posts_v_blocks_products_carousel" DROP COLUMN IF EXISTS "watch_more_btn_label";
  ALTER TABLE "_posts_v_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_type";
  ALTER TABLE "_posts_v_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_new_tab";
  ALTER TABLE "_posts_v_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_url";
  ALTER TABLE "_posts_v_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_label";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_title";
  ALTER TABLE "products_blocks_how_to_use_product" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "products_blocks_how_to_use_product" DROP COLUMN IF EXISTS "subtitle";
  ALTER TABLE "products_blocks_products_carousel" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "products_blocks_products_carousel" DROP COLUMN IF EXISTS "watch_more_btn_label";
  ALTER TABLE "products_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_type";
  ALTER TABLE "products_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_new_tab";
  ALTER TABLE "products_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_url";
  ALTER TABLE "products_blocks_products_carousel" DROP COLUMN IF EXISTS "apb_label";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_best_seller_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_products_carousel_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_best_seller_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_products_carousel_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_focus_right_large_image_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_products_carousel_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_focus_right_large_image_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_products_carousel_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_how_to_use_product_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_products_carousel_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_best_seller_locales" CASCADE;
  DROP TABLE "pages_blocks_products_carousel_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_best_seller_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_products_carousel_locales" CASCADE;
  DROP TABLE "posts_blocks_focus_right_large_image_locales" CASCADE;
  DROP TABLE "posts_blocks_products_carousel_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_focus_right_large_image_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_products_carousel_locales" CASCADE;
  DROP TABLE "products_blocks_how_to_use_product_locales" CASCADE;
  DROP TABLE "products_blocks_products_carousel_locales" CASCADE;
  ALTER TABLE "pages_blocks_buy_now" DROP CONSTRAINT "pages_blocks_buy_now_products_id_products_id_fk";

  ALTER TABLE "pages_blocks_call_to_add_to_cart" DROP CONSTRAINT "pages_blocks_call_to_add_to_cart_products_id_products_id_fk";

  ALTER TABLE "_pages_v_blocks_buy_now" DROP CONSTRAINT "_pages_v_blocks_buy_now_products_id_products_id_fk";

  ALTER TABLE "_pages_v_blocks_call_to_add_to_cart" DROP CONSTRAINT "_pages_v_blocks_call_to_add_to_cart_products_id_products_id_fk";

  ALTER TABLE "posts_blocks_buy_now" DROP CONSTRAINT "posts_blocks_buy_now_products_id_products_id_fk";

  ALTER TABLE "posts_blocks_call_to_add_to_cart" DROP CONSTRAINT "posts_blocks_call_to_add_to_cart_products_id_products_id_fk";

  ALTER TABLE "_posts_v_blocks_buy_now" DROP CONSTRAINT "_posts_v_blocks_buy_now_products_id_products_id_fk";

  ALTER TABLE "_posts_v_blocks_call_to_add_to_cart" DROP CONSTRAINT "_posts_v_blocks_call_to_add_to_cart_products_id_products_id_fk";

  ALTER TABLE "products_blocks_buy_now" DROP CONSTRAINT "products_blocks_buy_now_products_id_products_id_fk";

  ALTER TABLE "products_blocks_call_to_add_to_cart" DROP CONSTRAINT "products_blocks_call_to_add_to_cart_products_id_products_id_fk";

  ALTER TABLE "products_blocks_how_to_use_product" DROP CONSTRAINT "products_blocks_how_to_use_product_products_id_products_id_fk";

  DROP INDEX IF EXISTS "pages_blocks_buy_now_products_idx";
  DROP INDEX IF EXISTS "pages_blocks_call_to_add_to_cart_products_idx";
  DROP INDEX IF EXISTS "pages_rels_locale_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_buy_now_products_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_call_to_add_to_cart_products_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_locale_idx";
  DROP INDEX IF EXISTS "posts_blocks_buy_now_products_idx";
  DROP INDEX IF EXISTS "posts_blocks_call_to_add_to_cart_products_idx";
  DROP INDEX IF EXISTS "posts_rels_locale_idx";
  DROP INDEX IF EXISTS "_posts_v_blocks_buy_now_products_idx";
  DROP INDEX IF EXISTS "_posts_v_blocks_call_to_add_to_cart_products_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_locale_idx";
  DROP INDEX IF EXISTS "products_blocks_buy_now_products_idx";
  DROP INDEX IF EXISTS "products_blocks_call_to_add_to_cart_products_idx";
  DROP INDEX IF EXISTS "products_blocks_how_to_use_product_products_idx";
  DROP INDEX IF EXISTS "products_rels_locale_idx";
  DROP INDEX IF EXISTS "pages_rels_pages_id_idx";
  DROP INDEX IF EXISTS "pages_rels_post_categories_id_idx";
  DROP INDEX IF EXISTS "pages_rels_posts_id_idx";
  DROP INDEX IF EXISTS "pages_rels_product_categories_id_idx";
  DROP INDEX IF EXISTS "pages_rels_products_id_idx";
  DROP INDEX IF EXISTS "pages_rels_product_sub_categories_id_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_pages_id_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_post_categories_id_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_posts_id_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_product_categories_id_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_products_id_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_product_sub_categories_id_idx";
  DROP INDEX IF EXISTS "posts_rels_post_categories_id_idx";
  DROP INDEX IF EXISTS "posts_rels_posts_id_idx";
  DROP INDEX IF EXISTS "posts_rels_pages_id_idx";
  DROP INDEX IF EXISTS "posts_rels_product_categories_id_idx";
  DROP INDEX IF EXISTS "posts_rels_products_id_idx";
  DROP INDEX IF EXISTS "posts_rels_product_sub_categories_id_idx";
  DROP INDEX IF EXISTS "posts_rels_users_id_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_post_categories_id_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_posts_id_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_pages_id_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_product_categories_id_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_products_id_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_product_sub_categories_id_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_users_id_idx";
  DROP INDEX IF EXISTS "products_rels_product_categories_id_idx";
  DROP INDEX IF EXISTS "products_rels_product_sub_categories_id_idx";
  DROP INDEX IF EXISTS "products_rels_media_id_idx";
  DROP INDEX IF EXISTS "products_rels_post_categories_id_idx";
  DROP INDEX IF EXISTS "products_rels_posts_id_idx";
  DROP INDEX IF EXISTS "products_rels_pages_id_idx";
  DROP INDEX IF EXISTS "products_rels_products_id_idx";
  ALTER TABLE "pages_blocks_infinite_scroll" ALTER COLUMN "animation_duration" SET DEFAULT 5;
  ALTER TABLE "_pages_v_blocks_infinite_scroll" ALTER COLUMN "animation_duration" SET DEFAULT 5;
  ALTER TABLE "posts_blocks_infinite_scroll" ALTER COLUMN "animation_duration" SET DEFAULT 5;
  ALTER TABLE "_posts_v_blocks_infinite_scroll" ALTER COLUMN "animation_duration" SET DEFAULT 5;
  ALTER TABLE "products_blocks_infinite_scroll" ALTER COLUMN "animation_duration" SET DEFAULT 5;
  ALTER TABLE "orders" ALTER COLUMN "customers_id" DROP NOT NULL;
  ALTER TABLE "forms_emails_locales" ALTER COLUMN "subject" SET DEFAULT 'You''''ve received a new message.';
  ALTER TABLE "pages_blocks_best_seller" ADD COLUMN "title" varchar DEFAULT 'Sản phẩm bán chạy';
  ALTER TABLE "pages_blocks_products_carousel" ADD COLUMN "title" varchar DEFAULT 'Sản phẩm bán chạy';
  ALTER TABLE "pages_blocks_products_carousel" ADD COLUMN "watch_more_btn_label" varchar DEFAULT 'XEM THÊM';
  ALTER TABLE "pages_blocks_products_carousel" ADD COLUMN "apb_type" "enum_pages_blocks_products_carousel_apb_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_products_carousel" ADD COLUMN "apb_new_tab" boolean;
  ALTER TABLE "pages_blocks_products_carousel" ADD COLUMN "apb_url" varchar;
  ALTER TABLE "pages_blocks_products_carousel" ADD COLUMN "apb_label" varchar;
  ALTER TABLE "_pages_v_blocks_best_seller" ADD COLUMN "title" varchar DEFAULT 'Sản phẩm bán chạy';
  ALTER TABLE "_pages_v_blocks_products_carousel" ADD COLUMN "title" varchar DEFAULT 'Sản phẩm bán chạy';
  ALTER TABLE "_pages_v_blocks_products_carousel" ADD COLUMN "watch_more_btn_label" varchar DEFAULT 'XEM THÊM';
  ALTER TABLE "_pages_v_blocks_products_carousel" ADD COLUMN "apb_type" "enum__pages_v_blocks_products_carousel_apb_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_products_carousel" ADD COLUMN "apb_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_products_carousel" ADD COLUMN "apb_url" varchar;
  ALTER TABLE "_pages_v_blocks_products_carousel" ADD COLUMN "apb_label" varchar;
  ALTER TABLE "posts_blocks_focus_right_large_image" ADD COLUMN "content" jsonb;
  ALTER TABLE "posts_blocks_products_carousel" ADD COLUMN "title" varchar DEFAULT 'Sản phẩm bán chạy';
  ALTER TABLE "posts_blocks_products_carousel" ADD COLUMN "watch_more_btn_label" varchar DEFAULT 'XEM THÊM';
  ALTER TABLE "posts_blocks_products_carousel" ADD COLUMN "apb_type" "enum_posts_blocks_products_carousel_apb_type" DEFAULT 'reference';
  ALTER TABLE "posts_blocks_products_carousel" ADD COLUMN "apb_new_tab" boolean;
  ALTER TABLE "posts_blocks_products_carousel" ADD COLUMN "apb_url" varchar;
  ALTER TABLE "posts_blocks_products_carousel" ADD COLUMN "apb_label" varchar;
  ALTER TABLE "posts" ADD COLUMN "title" varchar;
  ALTER TABLE "_posts_v_blocks_focus_right_large_image" ADD COLUMN "content" jsonb;
  ALTER TABLE "_posts_v_blocks_products_carousel" ADD COLUMN "title" varchar DEFAULT 'Sản phẩm bán chạy';
  ALTER TABLE "_posts_v_blocks_products_carousel" ADD COLUMN "watch_more_btn_label" varchar DEFAULT 'XEM THÊM';
  ALTER TABLE "_posts_v_blocks_products_carousel" ADD COLUMN "apb_type" "enum__posts_v_blocks_products_carousel_apb_type" DEFAULT 'reference';
  ALTER TABLE "_posts_v_blocks_products_carousel" ADD COLUMN "apb_new_tab" boolean;
  ALTER TABLE "_posts_v_blocks_products_carousel" ADD COLUMN "apb_url" varchar;
  ALTER TABLE "_posts_v_blocks_products_carousel" ADD COLUMN "apb_label" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "products_blocks_how_to_use_product" ADD COLUMN "title" varchar DEFAULT 'Hướng dẫn sử dụng' NOT NULL;
  ALTER TABLE "products_blocks_how_to_use_product" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "products_blocks_products_carousel" ADD COLUMN "title" varchar DEFAULT 'Sản phẩm bán chạy' NOT NULL;
  ALTER TABLE "products_blocks_products_carousel" ADD COLUMN "watch_more_btn_label" varchar DEFAULT 'XEM THÊM' NOT NULL;
  ALTER TABLE "products_blocks_products_carousel" ADD COLUMN "apb_type" "enum_products_blocks_products_carousel_apb_type" DEFAULT 'reference';
  ALTER TABLE "products_blocks_products_carousel" ADD COLUMN "apb_new_tab" boolean;
  ALTER TABLE "products_blocks_products_carousel" ADD COLUMN "apb_url" varchar;
  ALTER TABLE "products_blocks_products_carousel" ADD COLUMN "apb_label" varchar NOT NULL;
  CREATE INDEX IF NOT EXISTS "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_post_categories_id_idx" ON "pages_rels" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_product_categories_id_idx" ON "pages_rels" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_products_id_idx" ON "pages_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_product_sub_categories_id_idx" ON "pages_rels" USING btree ("product_sub_categories_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_post_categories_id_idx" ON "_pages_v_rels" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_product_categories_id_idx" ON "_pages_v_rels" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_products_id_idx" ON "_pages_v_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_product_sub_categories_id_idx" ON "_pages_v_rels" USING btree ("product_sub_categories_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_post_categories_id_idx" ON "posts_rels" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_pages_id_idx" ON "posts_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_product_categories_id_idx" ON "posts_rels" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_products_id_idx" ON "posts_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_product_sub_categories_id_idx" ON "posts_rels" USING btree ("product_sub_categories_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_post_categories_id_idx" ON "_posts_v_rels" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_pages_id_idx" ON "_posts_v_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_product_categories_id_idx" ON "_posts_v_rels" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_products_id_idx" ON "_posts_v_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_product_sub_categories_id_idx" ON "_posts_v_rels" USING btree ("product_sub_categories_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "products_rels_product_categories_id_idx" ON "products_rels" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "products_rels_product_sub_categories_id_idx" ON "products_rels" USING btree ("product_sub_categories_id");
  CREATE INDEX IF NOT EXISTS "products_rels_media_id_idx" ON "products_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "products_rels_post_categories_id_idx" ON "products_rels" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "products_rels_posts_id_idx" ON "products_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "products_rels_pages_id_idx" ON "products_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "products_rels_products_id_idx" ON "products_rels" USING btree ("products_id");
  ALTER TABLE "pages_blocks_buy_now" DROP COLUMN IF EXISTS "products_id";
  ALTER TABLE "pages_blocks_call_to_add_to_cart" DROP COLUMN IF EXISTS "products_id";
  ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "locale";
  ALTER TABLE "_pages_v_blocks_buy_now" DROP COLUMN IF EXISTS "products_id";
  ALTER TABLE "_pages_v_blocks_call_to_add_to_cart" DROP COLUMN IF EXISTS "products_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "locale";
  ALTER TABLE "posts_blocks_buy_now" DROP COLUMN IF EXISTS "products_id";
  ALTER TABLE "posts_blocks_call_to_add_to_cart" DROP COLUMN IF EXISTS "products_id";
  ALTER TABLE "posts_locales" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "posts_rels" DROP COLUMN IF EXISTS "locale";
  ALTER TABLE "_posts_v_blocks_buy_now" DROP COLUMN IF EXISTS "products_id";
  ALTER TABLE "_posts_v_blocks_call_to_add_to_cart" DROP COLUMN IF EXISTS "products_id";
  ALTER TABLE "_posts_v_locales" DROP COLUMN IF EXISTS "version_title";
  ALTER TABLE "_posts_v_rels" DROP COLUMN IF EXISTS "locale";
  ALTER TABLE "products_blocks_buy_now" DROP COLUMN IF EXISTS "products_id";
  ALTER TABLE "products_blocks_call_to_add_to_cart" DROP COLUMN IF EXISTS "products_id";
  ALTER TABLE "products_blocks_how_to_use_product" DROP COLUMN IF EXISTS "products_id";
  ALTER TABLE "products_rels" DROP COLUMN IF EXISTS "locale";`)
}
