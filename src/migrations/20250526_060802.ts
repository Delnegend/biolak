import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'vi');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'vi');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'vi');
  CREATE TABLE IF NOT EXISTS "pages_locales" (
  	"meta_meta_title" varchar,
  	"meta_meta_image_id" integer,
  	"meta_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_locales" (
  	"version_meta_meta_title" varchar,
  	"version_meta_meta_image_id" integer,
  	"version_meta_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "posts_locales" (
  	"meta_meta_title" varchar,
  	"meta_meta_image_id" integer,
  	"meta_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_locales" (
  	"version_meta_meta_title" varchar,
  	"version_meta_meta_image_id" integer,
  	"version_meta_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "product_categories_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "products_locales" (
  	"title" varchar NOT NULL,
  	"short_description" varchar NOT NULL,
  	"long_description" jsonb,
  	"hero_subtitle" varchar,
  	"hero_title" varchar,
  	"hero_description" jsonb,
  	"meta_meta_title" varchar,
  	"meta_meta_image_id" integer,
  	"meta_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "product_sub_categories_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_checkbox_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_country_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_email_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_message_locales" (
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_number_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_select_options_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_select_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_state_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_text_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_textarea_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_emails_locales" (
  	"subject" varchar DEFAULT 'You''''ve received a new message.' NOT NULL,
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_locales" (
  	"submit_button_label" varchar,
  	"confirmation_message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "search_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "checkout_page_global_locales" (
  	"contacts_title" varchar NOT NULL,
  	"contacts_email_input_label" varchar NOT NULL,
  	"contacts_accept_newsletter" varchar NOT NULL,
  	"address_title" varchar NOT NULL,
  	"address_name_input_label" varchar NOT NULL,
  	"address_province_city_input_label" varchar NOT NULL,
  	"address_district_input_label" varchar NOT NULL,
  	"address_ward_input_label" varchar NOT NULL,
  	"address_details" varchar NOT NULL,
  	"address_save_for_next_time" varchar NOT NULL,
  	"shipping_title" varchar NOT NULL,
  	"shipping_standard_shipping_label" varchar NOT NULL,
  	"shipping_fast_shipping_label" varchar NOT NULL,
  	"payment_title" varchar NOT NULL,
  	"payment_cod_label" varchar NOT NULL,
  	"payment_bank_transfer_label" varchar NOT NULL,
  	"gift_title" varchar NOT NULL,
  	"gift_sender_input_label" varchar NOT NULL,
  	"gift_recipient_input_label" varchar NOT NULL,
  	"gift_message_input_label" varchar NOT NULL,
  	"order_title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "contact_form_global_locales" (
  	"title" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"phone_number" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"question" varchar NOT NULL,
  	"action_send" varchar NOT NULL,
  	"action_call" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "floating_global_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_global_locales" (
  	"contact_us_title" varchar NOT NULL,
  	"contact_us_email_input_label" varchar NOT NULL,
  	"contact_us_description" varchar NOT NULL,
  	"legal_title" varchar NOT NULL,
  	"legal_content" varchar NOT NULL,
  	"legal_copyright" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "header_global_header_items_left_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "header_global_header_items_right_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "promo_global_locales" (
  	"message" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "reviews_global_locales" (
  	"title" varchar NOT NULL,
  	"btn_label" varchar NOT NULL,
  	"review_dialog_title" varchar NOT NULL,
  	"send_review_btn_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_meta_meta_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_meta_meta_image_id_media_id_fk";
  
  ALTER TABLE "posts" DROP CONSTRAINT "posts_meta_image_id_media_id_fk";
  
  ALTER TABLE "_posts_v" DROP CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "products" DROP CONSTRAINT "products_meta_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_meta_meta_meta_meta_image_idx";
  DROP INDEX IF EXISTS "_pages_v_version_meta_meta_version_meta_meta_image_idx";
  DROP INDEX IF EXISTS "posts_meta_meta_image_idx";
  DROP INDEX IF EXISTS "_posts_v_version_meta_version_meta_image_idx";
  DROP INDEX IF EXISTS "products_meta_meta_image_idx";
  ALTER TABLE "checkout_page_global" ALTER COLUMN "address_phone_input_label" DROP DEFAULT;
  ALTER TABLE "_pages_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_pages_v" ADD COLUMN "published_locale" "enum__pages_v_published_locale";
  ALTER TABLE "post_categories_breadcrumbs" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_posts_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_posts_v" ADD COLUMN "published_locale" "enum__posts_v_published_locale";
  DO $$ BEGIN
   ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_meta_meta_image_id_media_id_fk" FOREIGN KEY ("meta_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_meta_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_meta_meta_image_id_media_id_fk" FOREIGN KEY ("meta_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_version_meta_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "product_categories_locales" ADD CONSTRAINT "product_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_meta_meta_image_id_media_id_fk" FOREIGN KEY ("meta_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "product_sub_categories_locales" ADD CONSTRAINT "product_sub_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_sub_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_checkbox_locales" ADD CONSTRAINT "forms_blocks_checkbox_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_checkbox"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_country_locales" ADD CONSTRAINT "forms_blocks_country_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_country"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_email_locales" ADD CONSTRAINT "forms_blocks_email_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_email"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_message_locales" ADD CONSTRAINT "forms_blocks_message_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_message"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_number_locales" ADD CONSTRAINT "forms_blocks_number_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_number"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_select_options_locales" ADD CONSTRAINT "forms_blocks_select_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select_options"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_select_locales" ADD CONSTRAINT "forms_blocks_select_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_state_locales" ADD CONSTRAINT "forms_blocks_state_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_state"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_text_locales" ADD CONSTRAINT "forms_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_textarea_locales" ADD CONSTRAINT "forms_blocks_textarea_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_textarea"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_emails_locales" ADD CONSTRAINT "forms_emails_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_emails"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_locales" ADD CONSTRAINT "forms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_locales" ADD CONSTRAINT "search_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "checkout_page_global_locales" ADD CONSTRAINT "checkout_page_global_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."checkout_page_global"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_form_global_locales" ADD CONSTRAINT "contact_form_global_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_form_global"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "floating_global_locales" ADD CONSTRAINT "floating_global_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."floating_global"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_global_locales" ADD CONSTRAINT "footer_global_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_global"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_global_header_items_left_locales" ADD CONSTRAINT "header_global_header_items_left_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_global_header_items_left"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_global_header_items_right_locales" ADD CONSTRAINT "header_global_header_items_right_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_global_header_items_right"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "promo_global_locales" ADD CONSTRAINT "promo_global_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."promo_global"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "reviews_global_locales" ADD CONSTRAINT "reviews_global_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reviews_global"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_meta_meta_meta_meta_image_idx" ON "pages_locales" USING btree ("meta_meta_image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_meta_meta_version_meta_meta_image_idx" ON "_pages_v_locales" USING btree ("version_meta_meta_image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_meta_meta_meta_meta_image_idx" ON "posts_locales" USING btree ("meta_meta_image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_meta_meta_version_meta_meta_image_idx" ON "_posts_v_locales" USING btree ("version_meta_meta_image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "product_categories_locales_locale_parent_id_unique" ON "product_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "products_meta_meta_meta_meta_image_idx" ON "products_locales" USING btree ("meta_meta_image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "products_locales_locale_parent_id_unique" ON "products_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "product_sub_categories_locales_locale_parent_id_unique" ON "product_sub_categories_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_checkbox_locales_locale_parent_id_unique" ON "forms_blocks_checkbox_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_country_locales_locale_parent_id_unique" ON "forms_blocks_country_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_email_locales_locale_parent_id_unique" ON "forms_blocks_email_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_message_locales_locale_parent_id_unique" ON "forms_blocks_message_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_number_locales_locale_parent_id_unique" ON "forms_blocks_number_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_select_options_locales_locale_parent_id_unique" ON "forms_blocks_select_options_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_select_locales_locale_parent_id_unique" ON "forms_blocks_select_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_state_locales_locale_parent_id_unique" ON "forms_blocks_state_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_text_locales_locale_parent_id_unique" ON "forms_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_blocks_textarea_locales_locale_parent_id_unique" ON "forms_blocks_textarea_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_emails_locales_locale_parent_id_unique" ON "forms_emails_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "forms_locales_locale_parent_id_unique" ON "forms_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "search_locales_locale_parent_id_unique" ON "search_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "checkout_page_global_locales_locale_parent_id_unique" ON "checkout_page_global_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "contact_form_global_locales_locale_parent_id_unique" ON "contact_form_global_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "floating_global_locales_locale_parent_id_unique" ON "floating_global_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "footer_global_locales_locale_parent_id_unique" ON "footer_global_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "header_global_header_items_left_locales_locale_parent_id_unique" ON "header_global_header_items_left_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "header_global_header_items_right_locales_locale_parent_id_unique" ON "header_global_header_items_right_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "promo_global_locales_locale_parent_id_unique" ON "promo_global_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "reviews_global_locales_locale_parent_id_unique" ON "reviews_global_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX IF NOT EXISTS "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX IF NOT EXISTS "post_categories_breadcrumbs_locale_idx" ON "post_categories_breadcrumbs" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX IF NOT EXISTS "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_meta_title";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_meta_image_id";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_meta_description";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_meta_meta_title";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_meta_meta_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_meta_meta_description";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "meta_title";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "meta_image_id";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "meta_description";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_meta_title";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_meta_image_id";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_meta_description";
  ALTER TABLE "product_categories" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "short_description";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "long_description";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "hero_subtitle";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "hero_title";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "hero_description";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "meta_title";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "meta_image_id";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "meta_description";
  ALTER TABLE "product_sub_categories" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "forms_blocks_checkbox" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "forms_blocks_country" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "forms_blocks_email" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "forms_blocks_message" DROP COLUMN IF EXISTS "message";
  ALTER TABLE "forms_blocks_number" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "forms_blocks_select_options" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "forms_blocks_select" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "forms_blocks_select" DROP COLUMN IF EXISTS "default_value";
  ALTER TABLE "forms_blocks_state" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "forms_blocks_text" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "forms_blocks_text" DROP COLUMN IF EXISTS "default_value";
  ALTER TABLE "forms_blocks_textarea" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "forms_blocks_textarea" DROP COLUMN IF EXISTS "default_value";
  ALTER TABLE "forms_emails" DROP COLUMN IF EXISTS "subject";
  ALTER TABLE "forms_emails" DROP COLUMN IF EXISTS "message";
  ALTER TABLE "forms" DROP COLUMN IF EXISTS "submit_button_label";
  ALTER TABLE "forms" DROP COLUMN IF EXISTS "confirmation_message";
  ALTER TABLE "search" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "checkout_page_global" DROP COLUMN IF EXISTS "contacts_title";
  ALTER TABLE "checkout_page_global" DROP COLUMN IF EXISTS "contacts_email_input_label";
  ALTER TABLE "checkout_page_global" DROP COLUMN IF EXISTS "contacts_accept_newsletter";
  ALTER TABLE "checkout_page_global" DROP COLUMN IF EXISTS "address_title";
  ALTER TABLE "checkout_page_global" DROP COLUMN IF EXISTS "address_name_input_label";
  ALTER TABLE "checkout_page_global" DROP COLUMN IF EXISTS "address_province_city_input_label";
  ALTER TABLE "checkout_page_global" DROP COLUMN IF EXISTS "address_district_input_label";
  ALTER TABLE "checkout_page_global" DROP COLUMN IF EXISTS "address_ward_input_label";
  ALTER TABLE "checkout_page_global" DROP COLUMN IF EXISTS "address_details";
  ALTER TABLE "checkout_page_global" DROP COLUMN IF EXISTS "address_save_for_next_time";
  ALTER TABLE "checkout_page_global" DROP COLUMN IF EXISTS "shipping_title";
  ALTER TABLE "checkout_page_global" DROP COLUMN IF EXISTS "shipping_standard_shipping_label";
  ALTER TABLE "checkout_page_global" DROP COLUMN IF EXISTS "shipping_fast_shipping_label";
  ALTER TABLE "checkout_page_global" DROP COLUMN IF EXISTS "payment_title";
  ALTER TABLE "checkout_page_global" DROP COLUMN IF EXISTS "payment_cod_label";
  ALTER TABLE "checkout_page_global" DROP COLUMN IF EXISTS "payment_bank_transfer_label";
  ALTER TABLE "checkout_page_global" DROP COLUMN IF EXISTS "gift_title";
  ALTER TABLE "checkout_page_global" DROP COLUMN IF EXISTS "gift_sender_input_label";
  ALTER TABLE "checkout_page_global" DROP COLUMN IF EXISTS "gift_recipient_input_label";
  ALTER TABLE "checkout_page_global" DROP COLUMN IF EXISTS "gift_message_input_label";
  ALTER TABLE "checkout_page_global" DROP COLUMN IF EXISTS "order_title";
  ALTER TABLE "contact_form_global" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "contact_form_global" DROP COLUMN IF EXISTS "name";
  ALTER TABLE "contact_form_global" DROP COLUMN IF EXISTS "phone_number";
  ALTER TABLE "contact_form_global" DROP COLUMN IF EXISTS "email";
  ALTER TABLE "contact_form_global" DROP COLUMN IF EXISTS "question";
  ALTER TABLE "contact_form_global" DROP COLUMN IF EXISTS "action_send";
  ALTER TABLE "contact_form_global" DROP COLUMN IF EXISTS "action_call";
  ALTER TABLE "floating_global" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "footer_global" DROP COLUMN IF EXISTS "contact_us_title";
  ALTER TABLE "footer_global" DROP COLUMN IF EXISTS "contact_us_email_input_label";
  ALTER TABLE "footer_global" DROP COLUMN IF EXISTS "contact_us_description";
  ALTER TABLE "footer_global" DROP COLUMN IF EXISTS "legal_title";
  ALTER TABLE "footer_global" DROP COLUMN IF EXISTS "legal_content";
  ALTER TABLE "footer_global" DROP COLUMN IF EXISTS "legal_copyright";
  ALTER TABLE "header_global_header_items_left" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "header_global_header_items_right" DROP COLUMN IF EXISTS "label";
  ALTER TABLE "promo_global" DROP COLUMN IF EXISTS "message";
  ALTER TABLE "reviews_global" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "reviews_global" DROP COLUMN IF EXISTS "btn_label";
  ALTER TABLE "reviews_global" DROP COLUMN IF EXISTS "review_dialog_title";
  ALTER TABLE "reviews_global" DROP COLUMN IF EXISTS "send_review_btn_label";
  ALTER TABLE "public"."header_global_header_items_left" ALTER COLUMN "prebuilt" SET DATA TYPE text;
  DROP TYPE "public"."enum_header_global_header_items_left_prebuilt";
  CREATE TYPE "public"."enum_header_global_header_items_left_prebuilt" AS ENUM('search', 'products', 'about', 'contact', 'vie-en', 'cart');
  ALTER TABLE "public"."header_global_header_items_left" ALTER COLUMN "prebuilt" SET DATA TYPE "public"."enum_header_global_header_items_left_prebuilt" USING "prebuilt"::"public"."enum_header_global_header_items_left_prebuilt";
  ALTER TABLE "public"."header_global_header_items_right" ALTER COLUMN "prebuilt" SET DATA TYPE text;
  DROP TYPE "public"."enum_header_global_header_items_right_prebuilt";
  CREATE TYPE "public"."enum_header_global_header_items_right_prebuilt" AS ENUM('search', 'products', 'about', 'contact', 'vie-en', 'cart');
  ALTER TABLE "public"."header_global_header_items_right" ALTER COLUMN "prebuilt" SET DATA TYPE "public"."enum_header_global_header_items_right_prebuilt" USING "prebuilt"::"public"."enum_header_global_header_items_right_prebuilt";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_header_global_header_items_left_prebuilt" ADD VALUE 'events' BEFORE 'contact';
  ALTER TYPE "public"."enum_header_global_header_items_right_prebuilt" ADD VALUE 'events' BEFORE 'contact';
  ALTER TABLE "pages_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_categories_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_sub_categories_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_checkbox_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_country_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_email_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_message_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_number_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_select_options_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_select_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_state_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_textarea_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_emails_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "search_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "checkout_page_global_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_form_global_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "floating_global_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_global_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_global_header_items_left_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_global_header_items_right_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "promo_global_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reviews_global_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  DROP TABLE "product_categories_locales" CASCADE;
  DROP TABLE "products_locales" CASCADE;
  DROP TABLE "product_sub_categories_locales" CASCADE;
  DROP TABLE "forms_blocks_checkbox_locales" CASCADE;
  DROP TABLE "forms_blocks_country_locales" CASCADE;
  DROP TABLE "forms_blocks_email_locales" CASCADE;
  DROP TABLE "forms_blocks_message_locales" CASCADE;
  DROP TABLE "forms_blocks_number_locales" CASCADE;
  DROP TABLE "forms_blocks_select_options_locales" CASCADE;
  DROP TABLE "forms_blocks_select_locales" CASCADE;
  DROP TABLE "forms_blocks_state_locales" CASCADE;
  DROP TABLE "forms_blocks_text_locales" CASCADE;
  DROP TABLE "forms_blocks_textarea_locales" CASCADE;
  DROP TABLE "forms_emails_locales" CASCADE;
  DROP TABLE "forms_locales" CASCADE;
  DROP TABLE "search_locales" CASCADE;
  DROP TABLE "checkout_page_global_locales" CASCADE;
  DROP TABLE "contact_form_global_locales" CASCADE;
  DROP TABLE "floating_global_locales" CASCADE;
  DROP TABLE "footer_global_locales" CASCADE;
  DROP TABLE "header_global_header_items_left_locales" CASCADE;
  DROP TABLE "header_global_header_items_right_locales" CASCADE;
  DROP TABLE "promo_global_locales" CASCADE;
  DROP TABLE "reviews_global_locales" CASCADE;
  DROP INDEX IF EXISTS "_pages_v_snapshot_idx";
  DROP INDEX IF EXISTS "_pages_v_published_locale_idx";
  DROP INDEX IF EXISTS "post_categories_breadcrumbs_locale_idx";
  DROP INDEX IF EXISTS "_posts_v_snapshot_idx";
  DROP INDEX IF EXISTS "_posts_v_published_locale_idx";
  ALTER TABLE "checkout_page_global" ALTER COLUMN "address_phone_input_label" SET DEFAULT 'Số điện thoại';
  ALTER TABLE "pages" ADD COLUMN "meta_meta_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_meta_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "meta_meta_description" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_meta_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_meta_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_meta_description" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "posts" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "product_categories" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "products" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "products" ADD COLUMN "short_description" varchar NOT NULL;
  ALTER TABLE "products" ADD COLUMN "long_description" jsonb;
  ALTER TABLE "products" ADD COLUMN "hero_subtitle" varchar;
  ALTER TABLE "products" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "products" ADD COLUMN "hero_description" jsonb;
  ALTER TABLE "products" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "products" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "products" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "product_sub_categories" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "forms_blocks_checkbox" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_country" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_email" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_message" ADD COLUMN "message" jsonb;
  ALTER TABLE "forms_blocks_number" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_select_options" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "forms_blocks_select" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_select" ADD COLUMN "default_value" varchar;
  ALTER TABLE "forms_blocks_state" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_text" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_text" ADD COLUMN "default_value" varchar;
  ALTER TABLE "forms_blocks_textarea" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_textarea" ADD COLUMN "default_value" varchar;
  ALTER TABLE "forms_emails" ADD COLUMN "subject" varchar DEFAULT 'You''''ve received a new message.' NOT NULL;
  ALTER TABLE "forms_emails" ADD COLUMN "message" jsonb;
  ALTER TABLE "forms" ADD COLUMN "submit_button_label" varchar;
  ALTER TABLE "forms" ADD COLUMN "confirmation_message" jsonb;
  ALTER TABLE "search" ADD COLUMN "title" varchar;
  ALTER TABLE "checkout_page_global" ADD COLUMN "contacts_title" varchar DEFAULT 'Thông tin liên hệ của bạn' NOT NULL;
  ALTER TABLE "checkout_page_global" ADD COLUMN "contacts_email_input_label" varchar DEFAULT 'Nhập địa chỉ email' NOT NULL;
  ALTER TABLE "checkout_page_global" ADD COLUMN "contacts_accept_newsletter" varchar DEFAULT 'Tôi đồng ý nhận mọi thông tin khuyến mãi' NOT NULL;
  ALTER TABLE "checkout_page_global" ADD COLUMN "address_title" varchar DEFAULT 'Địa chỉ giao hàng' NOT NULL;
  ALTER TABLE "checkout_page_global" ADD COLUMN "address_name_input_label" varchar DEFAULT 'Họ và tên' NOT NULL;
  ALTER TABLE "checkout_page_global" ADD COLUMN "address_province_city_input_label" varchar DEFAULT 'Chọn Tỉnh/Thành phố' NOT NULL;
  ALTER TABLE "checkout_page_global" ADD COLUMN "address_district_input_label" varchar DEFAULT 'Chọn Quận/Huyện' NOT NULL;
  ALTER TABLE "checkout_page_global" ADD COLUMN "address_ward_input_label" varchar DEFAULT 'Chọn Phuờng/Xã' NOT NULL;
  ALTER TABLE "checkout_page_global" ADD COLUMN "address_details" varchar DEFAULT 'Số nhà, đường, khu vực' NOT NULL;
  ALTER TABLE "checkout_page_global" ADD COLUMN "address_save_for_next_time" varchar DEFAULT 'Lưu thông tin thanh toán cho những lần tiếp theo' NOT NULL;
  ALTER TABLE "checkout_page_global" ADD COLUMN "shipping_title" varchar DEFAULT 'Phuơng thức vận chuyển' NOT NULL;
  ALTER TABLE "checkout_page_global" ADD COLUMN "shipping_standard_shipping_label" varchar DEFAULT 'Giao hàng tiêu chuẩn (2-3 ngày)' NOT NULL;
  ALTER TABLE "checkout_page_global" ADD COLUMN "shipping_fast_shipping_label" varchar DEFAULT 'Giao hàng nhanh (1-2 ngày)' NOT NULL;
  ALTER TABLE "checkout_page_global" ADD COLUMN "payment_title" varchar DEFAULT 'Phương thức thanh toán' NOT NULL;
  ALTER TABLE "checkout_page_global" ADD COLUMN "payment_cod_label" varchar DEFAULT 'Thanh toán khi nhận hàng (COD)' NOT NULL;
  ALTER TABLE "checkout_page_global" ADD COLUMN "payment_bank_transfer_label" varchar DEFAULT 'Chuyển khoản ngân hàng (QR)' NOT NULL;
  ALTER TABLE "checkout_page_global" ADD COLUMN "gift_title" varchar DEFAULT 'Tặng quà' NOT NULL;
  ALTER TABLE "checkout_page_global" ADD COLUMN "gift_sender_input_label" varchar DEFAULT 'Tên người gửi' NOT NULL;
  ALTER TABLE "checkout_page_global" ADD COLUMN "gift_recipient_input_label" varchar DEFAULT 'Tên người nhận' NOT NULL;
  ALTER TABLE "checkout_page_global" ADD COLUMN "gift_message_input_label" varchar DEFAULT 'Thông điệp. Giới hạn 1000 chữ.' NOT NULL;
  ALTER TABLE "checkout_page_global" ADD COLUMN "order_title" varchar DEFAULT 'Chi tiết đơn hàng' NOT NULL;
  ALTER TABLE "contact_form_global" ADD COLUMN "title" varchar DEFAULT 'Liên hệ với BioLAK' NOT NULL;
  ALTER TABLE "contact_form_global" ADD COLUMN "name" varchar DEFAULT 'Nhập tên của bạn' NOT NULL;
  ALTER TABLE "contact_form_global" ADD COLUMN "phone_number" varchar DEFAULT 'Nhập số điện thoại' NOT NULL;
  ALTER TABLE "contact_form_global" ADD COLUMN "email" varchar DEFAULT 'Nhập địa chỉ email' NOT NULL;
  ALTER TABLE "contact_form_global" ADD COLUMN "question" varchar DEFAULT 'Câu hỏi của bạn tới chúng tôi' NOT NULL;
  ALTER TABLE "contact_form_global" ADD COLUMN "action_send" varchar DEFAULT 'GỬI BIOLAK' NOT NULL;
  ALTER TABLE "contact_form_global" ADD COLUMN "action_call" varchar DEFAULT 'GỌI BIOLAK' NOT NULL;
  ALTER TABLE "floating_global" ADD COLUMN "label" varchar DEFAULT 'Liên hệ' NOT NULL;
  ALTER TABLE "footer_global" ADD COLUMN "contact_us_title" varchar DEFAULT 'Đăng kí để nhận thông tin khuyến mãi sớm nhất từ BioLAK' NOT NULL;
  ALTER TABLE "footer_global" ADD COLUMN "contact_us_email_input_label" varchar DEFAULT 'Nhập địa chỉ Email' NOT NULL;
  ALTER TABLE "footer_global" ADD COLUMN "contact_us_description" varchar DEFAULT 'Đăng kí để nhận thông tin liên lạc về các sản phẩm, dịch vụ, cửa hàng, sự kiện và các vấn đề đáng quan tâm của BioLAK.' NOT NULL;
  ALTER TABLE "footer_global" ADD COLUMN "legal_title" varchar DEFAULT 'Website thuộc quyền của công ty trách nhiệm hữu hạn ELAK' NOT NULL;
  ALTER TABLE "footer_global" ADD COLUMN "legal_content" varchar DEFAULT 'GCNDKKD 0107874681 | Sở kế hoạch và đầu tư TP. Hà Nội
  cấp ngày 05/06/2017,
  đăng ký thay đổi lần 2 ngày 12/01/2024
  Địa chỉ: Xóm 5 thôn Long Phú, xã Hòa Thạch, huyện Quốc Oai,
  TP Hà Nội, Việt Nam.
  Điện thoại: 0983335596 - Email: info@biolak.vn' NOT NULL;
  ALTER TABLE "footer_global" ADD COLUMN "legal_copyright" varchar DEFAULT '© 2025 BioLAK Vietnam. All rights reserved.' NOT NULL;
  ALTER TABLE "header_global_header_items_left" ADD COLUMN "label" varchar;
  ALTER TABLE "header_global_header_items_right" ADD COLUMN "label" varchar;
  ALTER TABLE "promo_global" ADD COLUMN "message" varchar DEFAULT '';
  ALTER TABLE "reviews_global" ADD COLUMN "title" varchar DEFAULT 'Đánh giá từ khách hàng' NOT NULL;
  ALTER TABLE "reviews_global" ADD COLUMN "btn_label" varchar DEFAULT 'VIẾT ĐÁNH GIÁ' NOT NULL;
  ALTER TABLE "reviews_global" ADD COLUMN "review_dialog_title" varchar DEFAULT 'Viết đánh giá của bạn' NOT NULL;
  ALTER TABLE "reviews_global" ADD COLUMN "send_review_btn_label" varchar DEFAULT 'GỬI ĐÁNH GIÁ' NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_meta_image_id_media_id_fk" FOREIGN KEY ("meta_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_meta_meta_meta_meta_image_idx" ON "pages" USING btree ("meta_meta_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_meta_meta_version_meta_meta_image_idx" ON "_pages_v" USING btree ("version_meta_meta_image_id");
  CREATE INDEX IF NOT EXISTS "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX IF NOT EXISTS "products_meta_meta_image_idx" ON "products" USING btree ("meta_image_id");
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "snapshot";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "published_locale";
  ALTER TABLE "post_categories_breadcrumbs" DROP COLUMN IF EXISTS "_locale";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "snapshot";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "published_locale";
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum__posts_v_published_locale";`)
}
