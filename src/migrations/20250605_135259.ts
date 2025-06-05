import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cta_center_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_left_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_call_to_action_post_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_center_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_left_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_call_to_action_post_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_post_categories_blocks_call_to_action_post_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_blocks_cta_center_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_blocks_cta_left_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_center_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_left_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_products_blocks_cta_center_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_products_blocks_cta_left_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE IF NOT EXISTS "pages_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_buy_now_locales" (
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_cta_center_locales" (
  	"title" varchar,
  	"sub_title" varchar,
  	"description" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_cta_left_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_call_to_action_post_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_cta_right_gallery_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_cta_right_locales" (
  	"title" varchar,
  	"sub_title" varchar,
  	"description" jsonb,
  	"button_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_call_to_add_to_cart_locales" (
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_certificates_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_highlight_right_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_highlight_center_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_highlight_left_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_latest_posts_locales" (
  	"title" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_products_category_locales" (
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_buy_now_locales" (
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta_center_locales" (
  	"title" varchar,
  	"sub_title" varchar,
  	"description" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta_left_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_call_to_action_post_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta_right_gallery_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta_right_locales" (
  	"title" varchar,
  	"sub_title" varchar,
  	"description" jsonb,
  	"button_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_call_to_add_to_cart_locales" (
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_certificates_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_highlight_right_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_highlight_center_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_highlight_left_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_latest_posts_locales" (
  	"title" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_products_category_locales" (
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "post_categories_blocks_call_to_action_post_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "post_categories_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "post_categories_rels" (
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

  CREATE TABLE IF NOT EXISTS "posts_blocks_buy_now_locales" (
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "posts_blocks_cta_center_locales" (
  	"title" varchar,
  	"sub_title" varchar,
  	"description" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "posts_blocks_cta_left_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "posts_blocks_cta_right_gallery_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "posts_blocks_cta_right_locales" (
  	"title" varchar,
  	"sub_title" varchar,
  	"description" jsonb,
  	"button_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "posts_blocks_call_to_add_to_cart_locales" (
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "posts_blocks_certificates_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "posts_blocks_focus_left_small_image_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "posts_blocks_focus_right_small_image_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "posts_blocks_highlight_right_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "posts_blocks_highlight_center_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "posts_blocks_highlight_left_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "posts_blocks_products_category_locales" (
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_buy_now_locales" (
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_cta_center_locales" (
  	"title" varchar,
  	"sub_title" varchar,
  	"description" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_cta_left_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_cta_right_gallery_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_cta_right_locales" (
  	"title" varchar,
  	"sub_title" varchar,
  	"description" jsonb,
  	"button_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_call_to_add_to_cart_locales" (
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_certificates_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_focus_left_small_image_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_focus_right_small_image_locales" (
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_highlight_right_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_highlight_center_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_highlight_left_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_products_category_locales" (
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "products_blocks_buy_now_locales" (
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "products_blocks_cta_center_locales" (
  	"title" varchar NOT NULL,
  	"sub_title" varchar,
  	"description" jsonb,
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "products_blocks_cta_left_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "products_blocks_cta_right_gallery_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "products_blocks_cta_right_locales" (
  	"title" varchar NOT NULL,
  	"sub_title" varchar,
  	"description" jsonb,
  	"button_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "products_blocks_call_to_add_to_cart_locales" (
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "products_blocks_certificates_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "products_blocks_highlight_right_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "products_blocks_highlight_center_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "products_blocks_highlight_left_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "products_blocks_latest_posts_locales" (
  	"title" varchar,
  	"button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  ALTER TABLE "products_blocks_certificates_organizations" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "products_blocks_how_to_use_product_locales" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "products_blocks_products_carousel_locales" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "products_blocks_products_carousel_locales" ALTER COLUMN "watch_more_btn_label" DROP NOT NULL;
  ALTER TABLE "products_blocks_products_carousel_locales" ALTER COLUMN "apb_label" DROP NOT NULL;
  ALTER TABLE "products_locales" ALTER COLUMN "short_description" DROP NOT NULL;
  ALTER TABLE "checkout_page_global" ALTER COLUMN "address_phone_input_label" DROP NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "contacts_title" DROP NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "contacts_email_input_label" DROP NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "contacts_accept_newsletter" DROP NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "address_title" DROP NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "address_name_input_label" DROP NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "address_province_city_input_label" DROP NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "address_district_input_label" DROP NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "address_ward_input_label" DROP NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "address_details" DROP NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "address_save_for_next_time" DROP NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "shipping_title" DROP NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "shipping_standard_shipping_label" DROP NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "shipping_fast_shipping_label" DROP NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "payment_title" DROP NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "payment_cod_label" DROP NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "payment_bank_transfer_label" DROP NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "gift_title" DROP NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "gift_sender_input_label" DROP NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "gift_recipient_input_label" DROP NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "gift_message_input_label" DROP NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "order_title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_best_seller_locales" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_cta_center" ADD COLUMN "link_type" "enum_pages_blocks_cta_center_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_cta_center" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "pages_blocks_cta_center" ADD COLUMN "link_url" varchar;
  ALTER TABLE "pages_blocks_cta_left" ADD COLUMN "link_type" "enum_pages_blocks_cta_left_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_cta_left" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "pages_blocks_cta_left" ADD COLUMN "link_url" varchar;
  ALTER TABLE "pages_blocks_call_to_action_post" ADD COLUMN "link_type" "enum_pages_blocks_call_to_action_post_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_call_to_action_post" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "pages_blocks_call_to_action_post" ADD COLUMN "link_url" varchar;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_best_seller_locales" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_cta_center" ADD COLUMN "link_type" "enum__pages_v_blocks_cta_center_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_cta_center" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_cta_center" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_cta_left" ADD COLUMN "link_type" "enum__pages_v_blocks_cta_left_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_cta_left" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_cta_left" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_call_to_action_post" ADD COLUMN "link_type" "enum__pages_v_blocks_call_to_action_post_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_call_to_action_post" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_call_to_action_post" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "post_categories_blocks_call_to_action_post" ADD COLUMN "link_type" "enum_post_categories_blocks_call_to_action_post_link_type" DEFAULT 'reference';
  ALTER TABLE "post_categories_blocks_call_to_action_post" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "post_categories_blocks_call_to_action_post" ADD COLUMN "link_url" varchar;
  ALTER TABLE "posts_blocks_cta_center" ADD COLUMN "link_type" "enum_posts_blocks_cta_center_link_type" DEFAULT 'reference';
  ALTER TABLE "posts_blocks_cta_center" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "posts_blocks_cta_center" ADD COLUMN "link_url" varchar;
  ALTER TABLE "posts_blocks_cta_left" ADD COLUMN "link_type" "enum_posts_blocks_cta_left_link_type" DEFAULT 'reference';
  ALTER TABLE "posts_blocks_cta_left" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "posts_blocks_cta_left" ADD COLUMN "link_url" varchar;
  ALTER TABLE "posts_blocks_content_columns" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_posts_v_blocks_cta_center" ADD COLUMN "link_type" "enum__posts_v_blocks_cta_center_link_type" DEFAULT 'reference';
  ALTER TABLE "_posts_v_blocks_cta_center" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_posts_v_blocks_cta_center" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_posts_v_blocks_cta_left" ADD COLUMN "link_type" "enum__posts_v_blocks_cta_left_link_type" DEFAULT 'reference';
  ALTER TABLE "_posts_v_blocks_cta_left" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_posts_v_blocks_cta_left" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_posts_v_blocks_content_columns" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "products_blocks_cta_center" ADD COLUMN "link_type" "enum_products_blocks_cta_center_link_type" DEFAULT 'reference';
  ALTER TABLE "products_blocks_cta_center" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "products_blocks_cta_center" ADD COLUMN "link_url" varchar;
  ALTER TABLE "products_blocks_cta_left" ADD COLUMN "link_type" "enum_products_blocks_cta_left_link_type" DEFAULT 'reference';
  ALTER TABLE "products_blocks_cta_left" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "products_blocks_cta_left" ADD COLUMN "link_url" varchar;
  ALTER TABLE "products_blocks_content_columns" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ADD COLUMN "discount_title" varchar;
  ALTER TABLE "checkout_page_global_locales" ADD COLUMN "discount_input_placeholder" varchar;
  ALTER TABLE "checkout_page_global_locales" ADD COLUMN "discount_apply_button_label" varchar;
  ALTER TABLE "checkout_page_global_locales" ADD COLUMN "order_summary_provisional" varchar;
  ALTER TABLE "checkout_page_global_locales" ADD COLUMN "order_summary_discount" varchar;
  ALTER TABLE "checkout_page_global_locales" ADD COLUMN "order_summary_shipping" varchar;
  ALTER TABLE "checkout_page_global_locales" ADD COLUMN "order_summary_total" varchar;
  ALTER TABLE "checkout_page_global_locales" ADD COLUMN "order_summary_acknowledgment" varchar;
  ALTER TABLE "checkout_page_global_locales" ADD COLUMN "order_summary_order_button_label" varchar;
  ALTER TABLE "promo_global_locales" ADD COLUMN "link_label" varchar NOT NULL;
  ALTER TABLE "reviews_global_locales" ADD COLUMN "hearts_selection_label" varchar NOT NULL;
  ALTER TABLE "reviews_global_locales" ADD COLUMN "invoice_id_label" varchar NOT NULL;
  ALTER TABLE "reviews_global_locales" ADD COLUMN "content_label" varchar NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "pages_hero_links_locales" ADD CONSTRAINT "pages_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_buy_now_locales" ADD CONSTRAINT "pages_blocks_buy_now_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_buy_now"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta_center_locales" ADD CONSTRAINT "pages_blocks_cta_center_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_center"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta_left_locales" ADD CONSTRAINT "pages_blocks_cta_left_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_left"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_call_to_action_post_locales" ADD CONSTRAINT "pages_blocks_call_to_action_post_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_call_to_action_post"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta_right_gallery_locales" ADD CONSTRAINT "pages_blocks_cta_right_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_right_gallery"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta_right_locales" ADD CONSTRAINT "pages_blocks_cta_right_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_right"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_call_to_add_to_cart_locales" ADD CONSTRAINT "pages_blocks_call_to_add_to_cart_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_call_to_add_to_cart"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_certificates_locales" ADD CONSTRAINT "pages_blocks_certificates_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_certificates"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_highlight_right_locales" ADD CONSTRAINT "pages_blocks_highlight_right_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_highlight_right"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_highlight_center_locales" ADD CONSTRAINT "pages_blocks_highlight_center_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_highlight_center"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_highlight_left_locales" ADD CONSTRAINT "pages_blocks_highlight_left_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_highlight_left"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_latest_posts_locales" ADD CONSTRAINT "pages_blocks_latest_posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_latest_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_products_category_locales" ADD CONSTRAINT "pages_blocks_products_category_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_products_category"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_links_locales" ADD CONSTRAINT "_pages_v_version_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_buy_now_locales" ADD CONSTRAINT "_pages_v_blocks_buy_now_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_buy_now"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta_center_locales" ADD CONSTRAINT "_pages_v_blocks_cta_center_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_center"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta_left_locales" ADD CONSTRAINT "_pages_v_blocks_cta_left_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_left"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_call_to_action_post_locales" ADD CONSTRAINT "_pages_v_blocks_call_to_action_post_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_call_to_action_post"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta_right_gallery_locales" ADD CONSTRAINT "_pages_v_blocks_cta_right_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_right_gallery"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta_right_locales" ADD CONSTRAINT "_pages_v_blocks_cta_right_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_right"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_call_to_add_to_cart_locales" ADD CONSTRAINT "_pages_v_blocks_call_to_add_to_cart_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_call_to_add_to_cart"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_certificates_locales" ADD CONSTRAINT "_pages_v_blocks_certificates_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_certificates"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_highlight_right_locales" ADD CONSTRAINT "_pages_v_blocks_highlight_right_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_highlight_right"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_highlight_center_locales" ADD CONSTRAINT "_pages_v_blocks_highlight_center_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_highlight_center"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_highlight_left_locales" ADD CONSTRAINT "_pages_v_blocks_highlight_left_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_highlight_left"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_latest_posts_locales" ADD CONSTRAINT "_pages_v_blocks_latest_posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_latest_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_products_category_locales" ADD CONSTRAINT "_pages_v_blocks_products_category_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_products_category"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "post_categories_blocks_call_to_action_post_locales" ADD CONSTRAINT "post_categories_blocks_call_to_action_post_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."post_categories_blocks_call_to_action_post"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "post_categories_locales" ADD CONSTRAINT "post_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."post_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "post_categories_rels" ADD CONSTRAINT "post_categories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."post_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "post_categories_rels" ADD CONSTRAINT "post_categories_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "post_categories_rels" ADD CONSTRAINT "post_categories_rels_post_categories_fk" FOREIGN KEY ("post_categories_id") REFERENCES "public"."post_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "post_categories_rels" ADD CONSTRAINT "post_categories_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "post_categories_rels" ADD CONSTRAINT "post_categories_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "post_categories_rels" ADD CONSTRAINT "post_categories_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "post_categories_rels" ADD CONSTRAINT "post_categories_rels_product_sub_categories_fk" FOREIGN KEY ("product_sub_categories_id") REFERENCES "public"."product_sub_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "posts_blocks_buy_now_locales" ADD CONSTRAINT "posts_blocks_buy_now_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_buy_now"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "posts_blocks_cta_center_locales" ADD CONSTRAINT "posts_blocks_cta_center_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_cta_center"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "posts_blocks_cta_left_locales" ADD CONSTRAINT "posts_blocks_cta_left_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_cta_left"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "posts_blocks_cta_right_gallery_locales" ADD CONSTRAINT "posts_blocks_cta_right_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_cta_right_gallery"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "posts_blocks_cta_right_locales" ADD CONSTRAINT "posts_blocks_cta_right_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_cta_right"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "posts_blocks_call_to_add_to_cart_locales" ADD CONSTRAINT "posts_blocks_call_to_add_to_cart_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_call_to_add_to_cart"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "posts_blocks_certificates_locales" ADD CONSTRAINT "posts_blocks_certificates_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_certificates"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "posts_blocks_focus_left_small_image_locales" ADD CONSTRAINT "posts_blocks_focus_left_small_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_focus_left_small_image"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "posts_blocks_focus_right_small_image_locales" ADD CONSTRAINT "posts_blocks_focus_right_small_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_focus_right_small_image"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "posts_blocks_highlight_right_locales" ADD CONSTRAINT "posts_blocks_highlight_right_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_highlight_right"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "posts_blocks_highlight_center_locales" ADD CONSTRAINT "posts_blocks_highlight_center_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_highlight_center"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "posts_blocks_highlight_left_locales" ADD CONSTRAINT "posts_blocks_highlight_left_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_highlight_left"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "posts_blocks_products_category_locales" ADD CONSTRAINT "posts_blocks_products_category_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_products_category"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_buy_now_locales" ADD CONSTRAINT "_posts_v_blocks_buy_now_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_buy_now"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_cta_center_locales" ADD CONSTRAINT "_posts_v_blocks_cta_center_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_cta_center"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_cta_left_locales" ADD CONSTRAINT "_posts_v_blocks_cta_left_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_cta_left"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_cta_right_gallery_locales" ADD CONSTRAINT "_posts_v_blocks_cta_right_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_cta_right_gallery"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_cta_right_locales" ADD CONSTRAINT "_posts_v_blocks_cta_right_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_cta_right"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_call_to_add_to_cart_locales" ADD CONSTRAINT "_posts_v_blocks_call_to_add_to_cart_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_call_to_add_to_cart"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_certificates_locales" ADD CONSTRAINT "_posts_v_blocks_certificates_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_certificates"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_focus_left_small_image_locales" ADD CONSTRAINT "_posts_v_blocks_focus_left_small_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_focus_left_small_image"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_focus_right_small_image_locales" ADD CONSTRAINT "_posts_v_blocks_focus_right_small_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_focus_right_small_image"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_highlight_right_locales" ADD CONSTRAINT "_posts_v_blocks_highlight_right_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_highlight_right"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_highlight_center_locales" ADD CONSTRAINT "_posts_v_blocks_highlight_center_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_highlight_center"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_highlight_left_locales" ADD CONSTRAINT "_posts_v_blocks_highlight_left_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_highlight_left"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_products_category_locales" ADD CONSTRAINT "_posts_v_blocks_products_category_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_products_category"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "products_blocks_buy_now_locales" ADD CONSTRAINT "products_blocks_buy_now_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_buy_now"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "products_blocks_cta_center_locales" ADD CONSTRAINT "products_blocks_cta_center_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_cta_center"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "products_blocks_cta_left_locales" ADD CONSTRAINT "products_blocks_cta_left_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_cta_left"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "products_blocks_cta_right_gallery_locales" ADD CONSTRAINT "products_blocks_cta_right_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_cta_right_gallery"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "products_blocks_cta_right_locales" ADD CONSTRAINT "products_blocks_cta_right_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_cta_right"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "products_blocks_call_to_add_to_cart_locales" ADD CONSTRAINT "products_blocks_call_to_add_to_cart_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_call_to_add_to_cart"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "products_blocks_certificates_locales" ADD CONSTRAINT "products_blocks_certificates_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_certificates"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "products_blocks_highlight_right_locales" ADD CONSTRAINT "products_blocks_highlight_right_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_highlight_right"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "products_blocks_highlight_center_locales" ADD CONSTRAINT "products_blocks_highlight_center_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_highlight_center"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "products_blocks_highlight_left_locales" ADD CONSTRAINT "products_blocks_highlight_left_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_highlight_left"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "products_blocks_latest_posts_locales" ADD CONSTRAINT "products_blocks_latest_posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_latest_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE UNIQUE INDEX IF NOT EXISTS "pages_hero_links_locales_locale_parent_id_unique" ON "pages_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_buy_now_locales_locale_parent_id_unique" ON "pages_blocks_buy_now_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_cta_center_locales_locale_parent_id_unique" ON "pages_blocks_cta_center_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_cta_left_locales_locale_parent_id_unique" ON "pages_blocks_cta_left_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_call_to_action_post_locales_locale_parent_id_unique" ON "pages_blocks_call_to_action_post_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_cta_right_gallery_locales_locale_parent_id_unique" ON "pages_blocks_cta_right_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_cta_right_locales_locale_parent_id_unique" ON "pages_blocks_cta_right_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_call_to_add_to_cart_locales_locale_parent_id_unique" ON "pages_blocks_call_to_add_to_cart_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_certificates_locales_locale_parent_id_unique" ON "pages_blocks_certificates_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_highlight_right_locales_locale_parent_id_unique" ON "pages_blocks_highlight_right_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_highlight_center_locales_locale_parent_id_unique" ON "pages_blocks_highlight_center_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_highlight_left_locales_locale_parent_id_unique" ON "pages_blocks_highlight_left_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_latest_posts_locales_locale_parent_id_unique" ON "pages_blocks_latest_posts_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_products_category_locales_locale_parent_id_unique" ON "pages_blocks_products_category_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_version_hero_links_locales_locale_parent_id_unique" ON "_pages_v_version_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_buy_now_locales_locale_parent_id_unique" ON "_pages_v_blocks_buy_now_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_cta_center_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_center_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_cta_left_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_left_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_action_post_locales_locale_parent_id_unique" ON "_pages_v_blocks_call_to_action_post_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_cta_right_gallery_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_right_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_cta_right_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_right_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_add_to_cart_locales_locale_parent_id_unique" ON "_pages_v_blocks_call_to_add_to_cart_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_certificates_locales_locale_parent_id_unique" ON "_pages_v_blocks_certificates_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_right_locales_locale_parent_id_unique" ON "_pages_v_blocks_highlight_right_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_center_locales_locale_parent_id_unique" ON "_pages_v_blocks_highlight_center_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_left_locales_locale_parent_id_unique" ON "_pages_v_blocks_highlight_left_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_latest_posts_locales_locale_parent_id_unique" ON "_pages_v_blocks_latest_posts_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_products_category_locales_locale_parent_id_unique" ON "_pages_v_blocks_products_category_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "post_categories_blocks_call_to_action_post_locales_locale_parent_id_unique" ON "post_categories_blocks_call_to_action_post_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "post_categories_locales_locale_parent_id_unique" ON "post_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "post_categories_rels_order_idx" ON "post_categories_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "post_categories_rels_parent_idx" ON "post_categories_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "post_categories_rels_path_idx" ON "post_categories_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "post_categories_rels_pages_id_idx" ON "post_categories_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "post_categories_rels_post_categories_id_idx" ON "post_categories_rels" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "post_categories_rels_posts_id_idx" ON "post_categories_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "post_categories_rels_product_categories_id_idx" ON "post_categories_rels" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "post_categories_rels_products_id_idx" ON "post_categories_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "post_categories_rels_product_sub_categories_id_idx" ON "post_categories_rels" USING btree ("product_sub_categories_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_blocks_buy_now_locales_locale_parent_id_unique" ON "posts_blocks_buy_now_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_blocks_cta_center_locales_locale_parent_id_unique" ON "posts_blocks_cta_center_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_blocks_cta_left_locales_locale_parent_id_unique" ON "posts_blocks_cta_left_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_blocks_cta_right_gallery_locales_locale_parent_id_unique" ON "posts_blocks_cta_right_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_blocks_cta_right_locales_locale_parent_id_unique" ON "posts_blocks_cta_right_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_blocks_call_to_add_to_cart_locales_locale_parent_id_unique" ON "posts_blocks_call_to_add_to_cart_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_blocks_certificates_locales_locale_parent_id_unique" ON "posts_blocks_certificates_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_blocks_focus_left_small_image_locales_locale_parent_id_unique" ON "posts_blocks_focus_left_small_image_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_blocks_focus_right_small_image_locales_locale_parent_id_unique" ON "posts_blocks_focus_right_small_image_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_blocks_highlight_right_locales_locale_parent_id_unique" ON "posts_blocks_highlight_right_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_blocks_highlight_center_locales_locale_parent_id_unique" ON "posts_blocks_highlight_center_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_blocks_highlight_left_locales_locale_parent_id_unique" ON "posts_blocks_highlight_left_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_blocks_products_category_locales_locale_parent_id_unique" ON "posts_blocks_products_category_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_posts_v_blocks_buy_now_locales_locale_parent_id_unique" ON "_posts_v_blocks_buy_now_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_posts_v_blocks_cta_center_locales_locale_parent_id_unique" ON "_posts_v_blocks_cta_center_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_posts_v_blocks_cta_left_locales_locale_parent_id_unique" ON "_posts_v_blocks_cta_left_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_posts_v_blocks_cta_right_gallery_locales_locale_parent_id_unique" ON "_posts_v_blocks_cta_right_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_posts_v_blocks_cta_right_locales_locale_parent_id_unique" ON "_posts_v_blocks_cta_right_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_posts_v_blocks_call_to_add_to_cart_locales_locale_parent_id_unique" ON "_posts_v_blocks_call_to_add_to_cart_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_posts_v_blocks_certificates_locales_locale_parent_id_unique" ON "_posts_v_blocks_certificates_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_posts_v_blocks_focus_left_small_image_locales_locale_parent_id_unique" ON "_posts_v_blocks_focus_left_small_image_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_posts_v_blocks_focus_right_small_image_locales_locale_parent_id_unique" ON "_posts_v_blocks_focus_right_small_image_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_right_locales_locale_parent_id_unique" ON "_posts_v_blocks_highlight_right_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_center_locales_locale_parent_id_unique" ON "_posts_v_blocks_highlight_center_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_left_locales_locale_parent_id_unique" ON "_posts_v_blocks_highlight_left_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_posts_v_blocks_products_category_locales_locale_parent_id_unique" ON "_posts_v_blocks_products_category_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "products_blocks_buy_now_locales_locale_parent_id_unique" ON "products_blocks_buy_now_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "products_blocks_cta_center_locales_locale_parent_id_unique" ON "products_blocks_cta_center_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "products_blocks_cta_left_locales_locale_parent_id_unique" ON "products_blocks_cta_left_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "products_blocks_cta_right_gallery_locales_locale_parent_id_unique" ON "products_blocks_cta_right_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "products_blocks_cta_right_locales_locale_parent_id_unique" ON "products_blocks_cta_right_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "products_blocks_call_to_add_to_cart_locales_locale_parent_id_unique" ON "products_blocks_call_to_add_to_cart_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "products_blocks_certificates_locales_locale_parent_id_unique" ON "products_blocks_certificates_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "products_blocks_highlight_right_locales_locale_parent_id_unique" ON "products_blocks_highlight_right_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "products_blocks_highlight_center_locales_locale_parent_id_unique" ON "products_blocks_highlight_center_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "products_blocks_highlight_left_locales_locale_parent_id_unique" ON "products_blocks_highlight_left_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "products_blocks_latest_posts_locales_locale_parent_id_unique" ON "products_blocks_latest_posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_columns_locale_idx" ON "pages_blocks_content_columns" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_columns_locale_idx" ON "_pages_v_blocks_content_columns" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "posts_blocks_content_columns_locale_idx" ON "posts_blocks_content_columns" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_content_columns_locale_idx" ON "_posts_v_blocks_content_columns" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "products_blocks_content_columns_locale_idx" ON "products_blocks_content_columns" USING btree ("_locale");
  ALTER TABLE "pages_hero_links" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "pages_blocks_best_seller" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "pages_blocks_buy_now" DROP COLUMN IF EXISTS "button_label";
  ALTER TABLE "pages_blocks_cta_center" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_cta_center" DROP COLUMN IF EXISTS "sub_title";
  ALTER TABLE "pages_blocks_cta_center" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "pages_blocks_cta_center" DROP COLUMN IF EXISTS "button_text";
  ALTER TABLE "pages_blocks_cta_center" DROP COLUMN IF EXISTS "button_link_type";
  ALTER TABLE "pages_blocks_cta_center" DROP COLUMN IF EXISTS "button_link_new_tab";
  ALTER TABLE "pages_blocks_cta_center" DROP COLUMN IF EXISTS "button_link_url";
  ALTER TABLE "pages_blocks_cta_left" DROP COLUMN IF EXISTS "button_text";
  ALTER TABLE "pages_blocks_cta_left" DROP COLUMN IF EXISTS "button_link_type";
  ALTER TABLE "pages_blocks_cta_left" DROP COLUMN IF EXISTS "button_link_new_tab";
  ALTER TABLE "pages_blocks_cta_left" DROP COLUMN IF EXISTS "button_link_url";
  ALTER TABLE "pages_blocks_call_to_action_post" DROP COLUMN IF EXISTS "button_label";
  ALTER TABLE "pages_blocks_cta_right_gallery" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_cta_right" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_cta_right" DROP COLUMN IF EXISTS "sub_title";
  ALTER TABLE "pages_blocks_cta_right" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "pages_blocks_cta_right" DROP COLUMN IF EXISTS "button_text";
  ALTER TABLE "pages_blocks_call_to_add_to_cart" DROP COLUMN IF EXISTS "button_label";
  ALTER TABLE "pages_blocks_certificates" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_highlight_right" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_highlight_right" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "pages_blocks_highlight_center" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_highlight_center" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "pages_blocks_highlight_left" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_highlight_left" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN IF EXISTS "button_label";
  ALTER TABLE "pages_blocks_products_category" DROP COLUMN IF EXISTS "button_label";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_pages_v_blocks_best_seller" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_buy_now" DROP COLUMN IF EXISTS "button_label";
  ALTER TABLE "_pages_v_blocks_cta_center" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_cta_center" DROP COLUMN IF EXISTS "sub_title";
  ALTER TABLE "_pages_v_blocks_cta_center" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_cta_center" DROP COLUMN IF EXISTS "button_text";
  ALTER TABLE "_pages_v_blocks_cta_center" DROP COLUMN IF EXISTS "button_link_type";
  ALTER TABLE "_pages_v_blocks_cta_center" DROP COLUMN IF EXISTS "button_link_new_tab";
  ALTER TABLE "_pages_v_blocks_cta_center" DROP COLUMN IF EXISTS "button_link_url";
  ALTER TABLE "_pages_v_blocks_cta_left" DROP COLUMN IF EXISTS "button_text";
  ALTER TABLE "_pages_v_blocks_cta_left" DROP COLUMN IF EXISTS "button_link_type";
  ALTER TABLE "_pages_v_blocks_cta_left" DROP COLUMN IF EXISTS "button_link_new_tab";
  ALTER TABLE "_pages_v_blocks_cta_left" DROP COLUMN IF EXISTS "button_link_url";
  ALTER TABLE "_pages_v_blocks_call_to_action_post" DROP COLUMN IF EXISTS "button_label";
  ALTER TABLE "_pages_v_blocks_cta_right_gallery" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_cta_right" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_cta_right" DROP COLUMN IF EXISTS "sub_title";
  ALTER TABLE "_pages_v_blocks_cta_right" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_cta_right" DROP COLUMN IF EXISTS "button_text";
  ALTER TABLE "_pages_v_blocks_call_to_add_to_cart" DROP COLUMN IF EXISTS "button_label";
  ALTER TABLE "_pages_v_blocks_certificates" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_highlight_right" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_highlight_right" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_highlight_center" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_highlight_center" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_highlight_left" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_highlight_left" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN IF EXISTS "button_label";
  ALTER TABLE "_pages_v_blocks_products_category" DROP COLUMN IF EXISTS "button_label";
  ALTER TABLE "post_categories_blocks_call_to_action_post" DROP COLUMN IF EXISTS "button_label";
  ALTER TABLE "post_categories" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "posts_blocks_buy_now" DROP COLUMN IF EXISTS "button_label";
  ALTER TABLE "posts_blocks_cta_center" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "posts_blocks_cta_center" DROP COLUMN IF EXISTS "sub_title";
  ALTER TABLE "posts_blocks_cta_center" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "posts_blocks_cta_center" DROP COLUMN IF EXISTS "button_text";
  ALTER TABLE "posts_blocks_cta_center" DROP COLUMN IF EXISTS "button_link_type";
  ALTER TABLE "posts_blocks_cta_center" DROP COLUMN IF EXISTS "button_link_new_tab";
  ALTER TABLE "posts_blocks_cta_center" DROP COLUMN IF EXISTS "button_link_url";
  ALTER TABLE "posts_blocks_cta_left" DROP COLUMN IF EXISTS "button_text";
  ALTER TABLE "posts_blocks_cta_left" DROP COLUMN IF EXISTS "button_link_type";
  ALTER TABLE "posts_blocks_cta_left" DROP COLUMN IF EXISTS "button_link_new_tab";
  ALTER TABLE "posts_blocks_cta_left" DROP COLUMN IF EXISTS "button_link_url";
  ALTER TABLE "posts_blocks_cta_right_gallery" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "posts_blocks_cta_right" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "posts_blocks_cta_right" DROP COLUMN IF EXISTS "sub_title";
  ALTER TABLE "posts_blocks_cta_right" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "posts_blocks_cta_right" DROP COLUMN IF EXISTS "button_text";
  ALTER TABLE "posts_blocks_call_to_add_to_cart" DROP COLUMN IF EXISTS "button_label";
  ALTER TABLE "posts_blocks_certificates" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "posts_blocks_focus_left_small_image" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "posts_blocks_focus_right_small_image" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "posts_blocks_highlight_right" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "posts_blocks_highlight_right" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "posts_blocks_highlight_center" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "posts_blocks_highlight_center" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "posts_blocks_highlight_left" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "posts_blocks_highlight_left" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "posts_blocks_products_category" DROP COLUMN IF EXISTS "button_label";
  ALTER TABLE "_posts_v_blocks_buy_now" DROP COLUMN IF EXISTS "button_label";
  ALTER TABLE "_posts_v_blocks_cta_center" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_posts_v_blocks_cta_center" DROP COLUMN IF EXISTS "sub_title";
  ALTER TABLE "_posts_v_blocks_cta_center" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_posts_v_blocks_cta_center" DROP COLUMN IF EXISTS "button_text";
  ALTER TABLE "_posts_v_blocks_cta_center" DROP COLUMN IF EXISTS "button_link_type";
  ALTER TABLE "_posts_v_blocks_cta_center" DROP COLUMN IF EXISTS "button_link_new_tab";
  ALTER TABLE "_posts_v_blocks_cta_center" DROP COLUMN IF EXISTS "button_link_url";
  ALTER TABLE "_posts_v_blocks_cta_left" DROP COLUMN IF EXISTS "button_text";
  ALTER TABLE "_posts_v_blocks_cta_left" DROP COLUMN IF EXISTS "button_link_type";
  ALTER TABLE "_posts_v_blocks_cta_left" DROP COLUMN IF EXISTS "button_link_new_tab";
  ALTER TABLE "_posts_v_blocks_cta_left" DROP COLUMN IF EXISTS "button_link_url";
  ALTER TABLE "_posts_v_blocks_cta_right_gallery" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_posts_v_blocks_cta_right" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_posts_v_blocks_cta_right" DROP COLUMN IF EXISTS "sub_title";
  ALTER TABLE "_posts_v_blocks_cta_right" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_posts_v_blocks_cta_right" DROP COLUMN IF EXISTS "button_text";
  ALTER TABLE "_posts_v_blocks_call_to_add_to_cart" DROP COLUMN IF EXISTS "button_label";
  ALTER TABLE "_posts_v_blocks_certificates" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_posts_v_blocks_focus_left_small_image" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "_posts_v_blocks_focus_right_small_image" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "_posts_v_blocks_highlight_right" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_posts_v_blocks_highlight_right" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_posts_v_blocks_highlight_center" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_posts_v_blocks_highlight_center" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_posts_v_blocks_highlight_left" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_posts_v_blocks_highlight_left" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_posts_v_blocks_products_category" DROP COLUMN IF EXISTS "button_label";
  ALTER TABLE "products_blocks_buy_now" DROP COLUMN IF EXISTS "button_label";
  ALTER TABLE "products_blocks_cta_center" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "products_blocks_cta_center" DROP COLUMN IF EXISTS "sub_title";
  ALTER TABLE "products_blocks_cta_center" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "products_blocks_cta_center" DROP COLUMN IF EXISTS "button_text";
  ALTER TABLE "products_blocks_cta_center" DROP COLUMN IF EXISTS "button_link_type";
  ALTER TABLE "products_blocks_cta_center" DROP COLUMN IF EXISTS "button_link_new_tab";
  ALTER TABLE "products_blocks_cta_center" DROP COLUMN IF EXISTS "button_link_url";
  ALTER TABLE "products_blocks_cta_left" DROP COLUMN IF EXISTS "button_text";
  ALTER TABLE "products_blocks_cta_left" DROP COLUMN IF EXISTS "button_link_type";
  ALTER TABLE "products_blocks_cta_left" DROP COLUMN IF EXISTS "button_link_new_tab";
  ALTER TABLE "products_blocks_cta_left" DROP COLUMN IF EXISTS "button_link_url";
  ALTER TABLE "products_blocks_cta_right_gallery" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "products_blocks_cta_right" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "products_blocks_cta_right" DROP COLUMN IF EXISTS "sub_title";
  ALTER TABLE "products_blocks_cta_right" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "products_blocks_cta_right" DROP COLUMN IF EXISTS "button_text";
  ALTER TABLE "products_blocks_call_to_add_to_cart" DROP COLUMN IF EXISTS "button_label";
  ALTER TABLE "products_blocks_certificates" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "products_blocks_highlight_right" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "products_blocks_highlight_right" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "products_blocks_highlight_center" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "products_blocks_highlight_center" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "products_blocks_highlight_left" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "products_blocks_highlight_left" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "products_blocks_latest_posts" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "products_blocks_latest_posts" DROP COLUMN IF EXISTS "button_label";
  ALTER TABLE "promo_global" DROP COLUMN IF EXISTS "link_label";
  DROP TYPE "public"."enum_pages_blocks_cta_center_button_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_left_button_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_center_button_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_left_button_link_type";
  DROP TYPE "public"."enum_posts_blocks_cta_center_button_link_type";
  DROP TYPE "public"."enum_posts_blocks_cta_left_button_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_cta_center_button_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_cta_left_button_link_type";
  DROP TYPE "public"."enum_products_blocks_cta_center_button_link_type";
  DROP TYPE "public"."enum_products_blocks_cta_left_button_link_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cta_center_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_left_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_center_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_left_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_blocks_cta_center_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_blocks_cta_left_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_center_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_left_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_products_blocks_cta_center_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_products_blocks_cta_left_button_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "pages_hero_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_buy_now_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_center_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_left_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_call_to_action_post_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_right_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_right_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_call_to_add_to_cart_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_certificates_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_highlight_right_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_highlight_center_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_highlight_left_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_latest_posts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_products_category_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_hero_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_buy_now_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_center_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_left_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_call_to_action_post_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_right_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_right_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_call_to_add_to_cart_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_certificates_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_highlight_right_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_highlight_center_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_highlight_left_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_latest_posts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_products_category_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "post_categories_blocks_call_to_action_post_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "post_categories_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "post_categories_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_buy_now_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_cta_center_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_cta_left_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_cta_right_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_cta_right_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_call_to_add_to_cart_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_certificates_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_focus_left_small_image_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_focus_right_small_image_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_highlight_right_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_highlight_center_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_highlight_left_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_products_category_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_buy_now_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_cta_center_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_cta_left_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_cta_right_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_cta_right_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_call_to_add_to_cart_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_certificates_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_focus_left_small_image_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_focus_right_small_image_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_highlight_right_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_highlight_center_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_highlight_left_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_products_category_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_buy_now_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_cta_center_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_cta_left_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_cta_right_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_cta_right_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_call_to_add_to_cart_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_certificates_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_highlight_right_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_highlight_center_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_highlight_left_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_latest_posts_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_hero_links_locales" CASCADE;
  DROP TABLE "pages_blocks_buy_now_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_center_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_left_locales" CASCADE;
  DROP TABLE "pages_blocks_call_to_action_post_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_right_gallery_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_right_locales" CASCADE;
  DROP TABLE "pages_blocks_call_to_add_to_cart_locales" CASCADE;
  DROP TABLE "pages_blocks_certificates_locales" CASCADE;
  DROP TABLE "pages_blocks_highlight_right_locales" CASCADE;
  DROP TABLE "pages_blocks_highlight_center_locales" CASCADE;
  DROP TABLE "pages_blocks_highlight_left_locales" CASCADE;
  DROP TABLE "pages_blocks_latest_posts_locales" CASCADE;
  DROP TABLE "pages_blocks_products_category_locales" CASCADE;
  DROP TABLE "_pages_v_version_hero_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_buy_now_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_center_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_left_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_call_to_action_post_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_right_gallery_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_right_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_call_to_add_to_cart_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_certificates_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_highlight_right_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_highlight_center_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_highlight_left_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_latest_posts_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_products_category_locales" CASCADE;
  DROP TABLE "post_categories_blocks_call_to_action_post_locales" CASCADE;
  DROP TABLE "post_categories_locales" CASCADE;
  DROP TABLE "post_categories_rels" CASCADE;
  DROP TABLE "posts_blocks_buy_now_locales" CASCADE;
  DROP TABLE "posts_blocks_cta_center_locales" CASCADE;
  DROP TABLE "posts_blocks_cta_left_locales" CASCADE;
  DROP TABLE "posts_blocks_cta_right_gallery_locales" CASCADE;
  DROP TABLE "posts_blocks_cta_right_locales" CASCADE;
  DROP TABLE "posts_blocks_call_to_add_to_cart_locales" CASCADE;
  DROP TABLE "posts_blocks_certificates_locales" CASCADE;
  DROP TABLE "posts_blocks_focus_left_small_image_locales" CASCADE;
  DROP TABLE "posts_blocks_focus_right_small_image_locales" CASCADE;
  DROP TABLE "posts_blocks_highlight_right_locales" CASCADE;
  DROP TABLE "posts_blocks_highlight_center_locales" CASCADE;
  DROP TABLE "posts_blocks_highlight_left_locales" CASCADE;
  DROP TABLE "posts_blocks_products_category_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_buy_now_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_cta_center_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_cta_left_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_cta_right_gallery_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_cta_right_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_call_to_add_to_cart_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_certificates_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_focus_left_small_image_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_focus_right_small_image_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_highlight_right_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_highlight_center_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_highlight_left_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_products_category_locales" CASCADE;
  DROP TABLE "products_blocks_buy_now_locales" CASCADE;
  DROP TABLE "products_blocks_cta_center_locales" CASCADE;
  DROP TABLE "products_blocks_cta_left_locales" CASCADE;
  DROP TABLE "products_blocks_cta_right_gallery_locales" CASCADE;
  DROP TABLE "products_blocks_cta_right_locales" CASCADE;
  DROP TABLE "products_blocks_call_to_add_to_cart_locales" CASCADE;
  DROP TABLE "products_blocks_certificates_locales" CASCADE;
  DROP TABLE "products_blocks_highlight_right_locales" CASCADE;
  DROP TABLE "products_blocks_highlight_center_locales" CASCADE;
  DROP TABLE "products_blocks_highlight_left_locales" CASCADE;
  DROP TABLE "products_blocks_latest_posts_locales" CASCADE;
  DROP INDEX IF EXISTS "pages_blocks_content_columns_locale_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_content_columns_locale_idx";
  DROP INDEX IF EXISTS "posts_blocks_content_columns_locale_idx";
  DROP INDEX IF EXISTS "_posts_v_blocks_content_columns_locale_idx";
  DROP INDEX IF EXISTS "products_blocks_content_columns_locale_idx";
  ALTER TABLE "products_blocks_certificates_organizations" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "products_blocks_how_to_use_product_locales" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "products_blocks_products_carousel_locales" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "products_blocks_products_carousel_locales" ALTER COLUMN "watch_more_btn_label" SET NOT NULL;
  ALTER TABLE "products_blocks_products_carousel_locales" ALTER COLUMN "apb_label" SET NOT NULL;
  ALTER TABLE "products_locales" ALTER COLUMN "short_description" SET NOT NULL;
  ALTER TABLE "checkout_page_global" ALTER COLUMN "address_phone_input_label" SET NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "contacts_title" SET NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "contacts_email_input_label" SET NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "contacts_accept_newsletter" SET NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "address_title" SET NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "address_name_input_label" SET NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "address_province_city_input_label" SET NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "address_district_input_label" SET NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "address_ward_input_label" SET NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "address_details" SET NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "address_save_for_next_time" SET NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "shipping_title" SET NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "shipping_standard_shipping_label" SET NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "shipping_fast_shipping_label" SET NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "payment_title" SET NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "payment_cod_label" SET NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "payment_bank_transfer_label" SET NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "gift_title" SET NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "gift_sender_input_label" SET NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "gift_recipient_input_label" SET NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "gift_message_input_label" SET NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ALTER COLUMN "order_title" SET NOT NULL;
  ALTER TABLE "pages_hero_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_best_seller" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_buy_now" ADD COLUMN "button_label" varchar DEFAULT 'MUA NGAY';
  ALTER TABLE "pages_blocks_cta_center" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_cta_center" ADD COLUMN "sub_title" varchar;
  ALTER TABLE "pages_blocks_cta_center" ADD COLUMN "description" jsonb;
  ALTER TABLE "pages_blocks_cta_center" ADD COLUMN "button_text" varchar;
  ALTER TABLE "pages_blocks_cta_center" ADD COLUMN "button_link_type" "enum_pages_blocks_cta_center_button_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_cta_center" ADD COLUMN "button_link_new_tab" boolean;
  ALTER TABLE "pages_blocks_cta_center" ADD COLUMN "button_link_url" varchar;
  ALTER TABLE "pages_blocks_cta_left" ADD COLUMN "button_text" varchar;
  ALTER TABLE "pages_blocks_cta_left" ADD COLUMN "button_link_type" "enum_pages_blocks_cta_left_button_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_cta_left" ADD COLUMN "button_link_new_tab" boolean;
  ALTER TABLE "pages_blocks_cta_left" ADD COLUMN "button_link_url" varchar;
  ALTER TABLE "pages_blocks_call_to_action_post" ADD COLUMN "button_label" varchar DEFAULT 'ĐỌC BÀI VIẾT';
  ALTER TABLE "pages_blocks_cta_right_gallery" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_cta_right" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_cta_right" ADD COLUMN "sub_title" varchar;
  ALTER TABLE "pages_blocks_cta_right" ADD COLUMN "description" jsonb;
  ALTER TABLE "pages_blocks_cta_right" ADD COLUMN "button_text" varchar;
  ALTER TABLE "pages_blocks_call_to_add_to_cart" ADD COLUMN "button_label" varchar DEFAULT 'MUA NGAY';
  ALTER TABLE "pages_blocks_certificates" ADD COLUMN "title" varchar DEFAULT 'Chứng nhận bởi các tổ chức quốc tế';
  ALTER TABLE "pages_blocks_highlight_right" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_highlight_right" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_highlight_center" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_highlight_center" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_highlight_left" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_highlight_left" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "title" varchar DEFAULT 'Bài viết mới nhất';
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "button_label" varchar DEFAULT 'TẤT CẢ BÀI VIẾT';
  ALTER TABLE "pages_blocks_products_category" ADD COLUMN "button_label" varchar DEFAULT 'XEM TẤT CẢ CÁC SẢN PHẨM';
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_best_seller" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_buy_now" ADD COLUMN "button_label" varchar DEFAULT 'MUA NGAY';
  ALTER TABLE "_pages_v_blocks_cta_center" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_cta_center" ADD COLUMN "sub_title" varchar;
  ALTER TABLE "_pages_v_blocks_cta_center" ADD COLUMN "description" jsonb;
  ALTER TABLE "_pages_v_blocks_cta_center" ADD COLUMN "button_text" varchar;
  ALTER TABLE "_pages_v_blocks_cta_center" ADD COLUMN "button_link_type" "enum__pages_v_blocks_cta_center_button_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_cta_center" ADD COLUMN "button_link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_cta_center" ADD COLUMN "button_link_url" varchar;
  ALTER TABLE "_pages_v_blocks_cta_left" ADD COLUMN "button_text" varchar;
  ALTER TABLE "_pages_v_blocks_cta_left" ADD COLUMN "button_link_type" "enum__pages_v_blocks_cta_left_button_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_cta_left" ADD COLUMN "button_link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_cta_left" ADD COLUMN "button_link_url" varchar;
  ALTER TABLE "_pages_v_blocks_call_to_action_post" ADD COLUMN "button_label" varchar DEFAULT 'ĐỌC BÀI VIẾT';
  ALTER TABLE "_pages_v_blocks_cta_right_gallery" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_cta_right" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_cta_right" ADD COLUMN "sub_title" varchar;
  ALTER TABLE "_pages_v_blocks_cta_right" ADD COLUMN "description" jsonb;
  ALTER TABLE "_pages_v_blocks_cta_right" ADD COLUMN "button_text" varchar;
  ALTER TABLE "_pages_v_blocks_call_to_add_to_cart" ADD COLUMN "button_label" varchar DEFAULT 'MUA NGAY';
  ALTER TABLE "_pages_v_blocks_certificates" ADD COLUMN "title" varchar DEFAULT 'Chứng nhận bởi các tổ chức quốc tế';
  ALTER TABLE "_pages_v_blocks_highlight_right" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_highlight_right" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_highlight_center" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_highlight_center" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_highlight_left" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_highlight_left" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "title" varchar DEFAULT 'Bài viết mới nhất';
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "button_label" varchar DEFAULT 'TẤT CẢ BÀI VIẾT';
  ALTER TABLE "_pages_v_blocks_products_category" ADD COLUMN "button_label" varchar DEFAULT 'XEM TẤT CẢ CÁC SẢN PHẨM';
  ALTER TABLE "post_categories_blocks_call_to_action_post" ADD COLUMN "button_label" varchar DEFAULT 'ĐỌC BÀI VIẾT' NOT NULL;
  ALTER TABLE "post_categories" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "posts_blocks_buy_now" ADD COLUMN "button_label" varchar DEFAULT 'MUA NGAY';
  ALTER TABLE "posts_blocks_cta_center" ADD COLUMN "title" varchar;
  ALTER TABLE "posts_blocks_cta_center" ADD COLUMN "sub_title" varchar;
  ALTER TABLE "posts_blocks_cta_center" ADD COLUMN "description" jsonb;
  ALTER TABLE "posts_blocks_cta_center" ADD COLUMN "button_text" varchar;
  ALTER TABLE "posts_blocks_cta_center" ADD COLUMN "button_link_type" "enum_posts_blocks_cta_center_button_link_type" DEFAULT 'reference';
  ALTER TABLE "posts_blocks_cta_center" ADD COLUMN "button_link_new_tab" boolean;
  ALTER TABLE "posts_blocks_cta_center" ADD COLUMN "button_link_url" varchar;
  ALTER TABLE "posts_blocks_cta_left" ADD COLUMN "button_text" varchar;
  ALTER TABLE "posts_blocks_cta_left" ADD COLUMN "button_link_type" "enum_posts_blocks_cta_left_button_link_type" DEFAULT 'reference';
  ALTER TABLE "posts_blocks_cta_left" ADD COLUMN "button_link_new_tab" boolean;
  ALTER TABLE "posts_blocks_cta_left" ADD COLUMN "button_link_url" varchar;
  ALTER TABLE "posts_blocks_cta_right_gallery" ADD COLUMN "title" varchar;
  ALTER TABLE "posts_blocks_cta_right" ADD COLUMN "title" varchar;
  ALTER TABLE "posts_blocks_cta_right" ADD COLUMN "sub_title" varchar;
  ALTER TABLE "posts_blocks_cta_right" ADD COLUMN "description" jsonb;
  ALTER TABLE "posts_blocks_cta_right" ADD COLUMN "button_text" varchar;
  ALTER TABLE "posts_blocks_call_to_add_to_cart" ADD COLUMN "button_label" varchar DEFAULT 'MUA NGAY';
  ALTER TABLE "posts_blocks_certificates" ADD COLUMN "title" varchar DEFAULT 'Chứng nhận bởi các tổ chức quốc tế';
  ALTER TABLE "posts_blocks_focus_left_small_image" ADD COLUMN "content" jsonb;
  ALTER TABLE "posts_blocks_focus_right_small_image" ADD COLUMN "content" jsonb;
  ALTER TABLE "posts_blocks_highlight_right" ADD COLUMN "title" varchar;
  ALTER TABLE "posts_blocks_highlight_right" ADD COLUMN "description" varchar;
  ALTER TABLE "posts_blocks_highlight_center" ADD COLUMN "title" varchar;
  ALTER TABLE "posts_blocks_highlight_center" ADD COLUMN "description" varchar;
  ALTER TABLE "posts_blocks_highlight_left" ADD COLUMN "title" varchar;
  ALTER TABLE "posts_blocks_highlight_left" ADD COLUMN "description" varchar;
  ALTER TABLE "posts_blocks_products_category" ADD COLUMN "button_label" varchar DEFAULT 'XEM TẤT CẢ CÁC SẢN PHẨM';
  ALTER TABLE "_posts_v_blocks_buy_now" ADD COLUMN "button_label" varchar DEFAULT 'MUA NGAY';
  ALTER TABLE "_posts_v_blocks_cta_center" ADD COLUMN "title" varchar;
  ALTER TABLE "_posts_v_blocks_cta_center" ADD COLUMN "sub_title" varchar;
  ALTER TABLE "_posts_v_blocks_cta_center" ADD COLUMN "description" jsonb;
  ALTER TABLE "_posts_v_blocks_cta_center" ADD COLUMN "button_text" varchar;
  ALTER TABLE "_posts_v_blocks_cta_center" ADD COLUMN "button_link_type" "enum__posts_v_blocks_cta_center_button_link_type" DEFAULT 'reference';
  ALTER TABLE "_posts_v_blocks_cta_center" ADD COLUMN "button_link_new_tab" boolean;
  ALTER TABLE "_posts_v_blocks_cta_center" ADD COLUMN "button_link_url" varchar;
  ALTER TABLE "_posts_v_blocks_cta_left" ADD COLUMN "button_text" varchar;
  ALTER TABLE "_posts_v_blocks_cta_left" ADD COLUMN "button_link_type" "enum__posts_v_blocks_cta_left_button_link_type" DEFAULT 'reference';
  ALTER TABLE "_posts_v_blocks_cta_left" ADD COLUMN "button_link_new_tab" boolean;
  ALTER TABLE "_posts_v_blocks_cta_left" ADD COLUMN "button_link_url" varchar;
  ALTER TABLE "_posts_v_blocks_cta_right_gallery" ADD COLUMN "title" varchar;
  ALTER TABLE "_posts_v_blocks_cta_right" ADD COLUMN "title" varchar;
  ALTER TABLE "_posts_v_blocks_cta_right" ADD COLUMN "sub_title" varchar;
  ALTER TABLE "_posts_v_blocks_cta_right" ADD COLUMN "description" jsonb;
  ALTER TABLE "_posts_v_blocks_cta_right" ADD COLUMN "button_text" varchar;
  ALTER TABLE "_posts_v_blocks_call_to_add_to_cart" ADD COLUMN "button_label" varchar DEFAULT 'MUA NGAY';
  ALTER TABLE "_posts_v_blocks_certificates" ADD COLUMN "title" varchar DEFAULT 'Chứng nhận bởi các tổ chức quốc tế';
  ALTER TABLE "_posts_v_blocks_focus_left_small_image" ADD COLUMN "content" jsonb;
  ALTER TABLE "_posts_v_blocks_focus_right_small_image" ADD COLUMN "content" jsonb;
  ALTER TABLE "_posts_v_blocks_highlight_right" ADD COLUMN "title" varchar;
  ALTER TABLE "_posts_v_blocks_highlight_right" ADD COLUMN "description" varchar;
  ALTER TABLE "_posts_v_blocks_highlight_center" ADD COLUMN "title" varchar;
  ALTER TABLE "_posts_v_blocks_highlight_center" ADD COLUMN "description" varchar;
  ALTER TABLE "_posts_v_blocks_highlight_left" ADD COLUMN "title" varchar;
  ALTER TABLE "_posts_v_blocks_highlight_left" ADD COLUMN "description" varchar;
  ALTER TABLE "_posts_v_blocks_products_category" ADD COLUMN "button_label" varchar DEFAULT 'XEM TẤT CẢ CÁC SẢN PHẨM';
  ALTER TABLE "products_blocks_buy_now" ADD COLUMN "button_label" varchar DEFAULT 'MUA NGAY';
  ALTER TABLE "products_blocks_cta_center" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "products_blocks_cta_center" ADD COLUMN "sub_title" varchar;
  ALTER TABLE "products_blocks_cta_center" ADD COLUMN "description" jsonb;
  ALTER TABLE "products_blocks_cta_center" ADD COLUMN "button_text" varchar NOT NULL;
  ALTER TABLE "products_blocks_cta_center" ADD COLUMN "button_link_type" "enum_products_blocks_cta_center_button_link_type" DEFAULT 'reference';
  ALTER TABLE "products_blocks_cta_center" ADD COLUMN "button_link_new_tab" boolean;
  ALTER TABLE "products_blocks_cta_center" ADD COLUMN "button_link_url" varchar;
  ALTER TABLE "products_blocks_cta_left" ADD COLUMN "button_text" varchar NOT NULL;
  ALTER TABLE "products_blocks_cta_left" ADD COLUMN "button_link_type" "enum_products_blocks_cta_left_button_link_type" DEFAULT 'reference';
  ALTER TABLE "products_blocks_cta_left" ADD COLUMN "button_link_new_tab" boolean;
  ALTER TABLE "products_blocks_cta_left" ADD COLUMN "button_link_url" varchar;
  ALTER TABLE "products_blocks_cta_right_gallery" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "products_blocks_cta_right" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "products_blocks_cta_right" ADD COLUMN "sub_title" varchar;
  ALTER TABLE "products_blocks_cta_right" ADD COLUMN "description" jsonb;
  ALTER TABLE "products_blocks_cta_right" ADD COLUMN "button_text" varchar NOT NULL;
  ALTER TABLE "products_blocks_call_to_add_to_cart" ADD COLUMN "button_label" varchar DEFAULT 'MUA NGAY' NOT NULL;
  ALTER TABLE "products_blocks_certificates" ADD COLUMN "title" varchar DEFAULT 'Chứng nhận bởi các tổ chức quốc tế' NOT NULL;
  ALTER TABLE "products_blocks_highlight_right" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "products_blocks_highlight_right" ADD COLUMN "description" varchar NOT NULL;
  ALTER TABLE "products_blocks_highlight_center" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "products_blocks_highlight_center" ADD COLUMN "description" varchar NOT NULL;
  ALTER TABLE "products_blocks_highlight_left" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "products_blocks_highlight_left" ADD COLUMN "description" varchar NOT NULL;
  ALTER TABLE "products_blocks_latest_posts" ADD COLUMN "title" varchar DEFAULT 'Bài viết mới nhất' NOT NULL;
  ALTER TABLE "products_blocks_latest_posts" ADD COLUMN "button_label" varchar DEFAULT 'TẤT CẢ BÀI VIẾT' NOT NULL;
  ALTER TABLE "promo_global" ADD COLUMN "link_label" varchar NOT NULL;
  ALTER TABLE "pages_blocks_best_seller_locales" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "pages_blocks_cta_center" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "pages_blocks_cta_center" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "pages_blocks_cta_center" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "pages_blocks_cta_left" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "pages_blocks_cta_left" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "pages_blocks_cta_left" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "pages_blocks_call_to_action_post" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "pages_blocks_call_to_action_post" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "pages_blocks_call_to_action_post" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN IF EXISTS "_locale";
  ALTER TABLE "_pages_v_blocks_best_seller_locales" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_cta_center" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "_pages_v_blocks_cta_center" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "_pages_v_blocks_cta_center" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "_pages_v_blocks_cta_left" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "_pages_v_blocks_cta_left" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "_pages_v_blocks_cta_left" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "_pages_v_blocks_call_to_action_post" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "_pages_v_blocks_call_to_action_post" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "_pages_v_blocks_call_to_action_post" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN IF EXISTS "_locale";
  ALTER TABLE "post_categories_blocks_call_to_action_post" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "post_categories_blocks_call_to_action_post" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "post_categories_blocks_call_to_action_post" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "posts_blocks_cta_center" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "posts_blocks_cta_center" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "posts_blocks_cta_center" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "posts_blocks_cta_left" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "posts_blocks_cta_left" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "posts_blocks_cta_left" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "posts_blocks_content_columns" DROP COLUMN IF EXISTS "_locale";
  ALTER TABLE "_posts_v_blocks_cta_center" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "_posts_v_blocks_cta_center" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "_posts_v_blocks_cta_center" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "_posts_v_blocks_cta_left" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "_posts_v_blocks_cta_left" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "_posts_v_blocks_cta_left" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "_posts_v_blocks_content_columns" DROP COLUMN IF EXISTS "_locale";
  ALTER TABLE "products_blocks_cta_center" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "products_blocks_cta_center" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "products_blocks_cta_center" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "products_blocks_cta_left" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "products_blocks_cta_left" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "products_blocks_cta_left" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "products_blocks_content_columns" DROP COLUMN IF EXISTS "_locale";
  ALTER TABLE "checkout_page_global_locales" DROP COLUMN IF EXISTS "discount_title";
  ALTER TABLE "checkout_page_global_locales" DROP COLUMN IF EXISTS "discount_input_placeholder";
  ALTER TABLE "checkout_page_global_locales" DROP COLUMN IF EXISTS "discount_apply_button_label";
  ALTER TABLE "checkout_page_global_locales" DROP COLUMN IF EXISTS "order_summary_provisional";
  ALTER TABLE "checkout_page_global_locales" DROP COLUMN IF EXISTS "order_summary_discount";
  ALTER TABLE "checkout_page_global_locales" DROP COLUMN IF EXISTS "order_summary_shipping";
  ALTER TABLE "checkout_page_global_locales" DROP COLUMN IF EXISTS "order_summary_total";
  ALTER TABLE "checkout_page_global_locales" DROP COLUMN IF EXISTS "order_summary_acknowledgment";
  ALTER TABLE "checkout_page_global_locales" DROP COLUMN IF EXISTS "order_summary_order_button_label";
  ALTER TABLE "promo_global_locales" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "reviews_global_locales" DROP COLUMN IF EXISTS "hearts_selection_label";
  ALTER TABLE "reviews_global_locales" DROP COLUMN IF EXISTS "invoice_id_label";
  ALTER TABLE "reviews_global_locales" DROP COLUMN IF EXISTS "content_label";
  DROP TYPE "public"."enum_pages_blocks_cta_center_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_left_link_type";
  DROP TYPE "public"."enum_pages_blocks_call_to_action_post_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_center_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_left_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_call_to_action_post_link_type";
  DROP TYPE "public"."enum_post_categories_blocks_call_to_action_post_link_type";
  DROP TYPE "public"."enum_posts_blocks_cta_center_link_type";
  DROP TYPE "public"."enum_posts_blocks_cta_left_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_cta_center_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_cta_left_link_type";
  DROP TYPE "public"."enum_products_blocks_cta_center_link_type";
  DROP TYPE "public"."enum_products_blocks_cta_left_link_type";`)
}
