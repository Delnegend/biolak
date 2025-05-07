import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_posts_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum_posts_blocks_cta_center_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_blocks_cta_left_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_blocks_cta_right_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_posts_blocks_content_columns_font" AS ENUM('default', 'serif', 'sans-serif', 'monospace');
  CREATE TYPE "public"."enum_posts_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__posts_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__posts_v_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_center_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_left_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_right_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__posts_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__posts_v_blocks_content_columns_font" AS ENUM('default', 'serif', 'sans-serif', 'monospace');
  CREATE TYPE "public"."enum__posts_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__posts_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_products_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_products_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum_products_blocks_cta_center_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_products_blocks_cta_left_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_products_blocks_cta_right_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_products_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_products_blocks_content_columns_font" AS ENUM('default', 'serif', 'sans-serif', 'monospace');
  CREATE TYPE "public"."enum_products_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_products_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TABLE IF NOT EXISTS "pages_blocks_buy_now" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_label" varchar DEFAULT 'MUA NGAY',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_call_to_add_to_cart" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"content" jsonb,
  	"button_label" varchar DEFAULT 'MUA NGAY',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_call_to_action_post" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"post_id" integer,
  	"overwrite_title" varchar,
  	"overwrite_description" varchar,
  	"button_label" varchar DEFAULT 'ĐỌC BÀI VIẾT',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_highlight_center" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"order" numeric,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_highlight_left" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"order" numeric,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_highlight_right" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"order" numeric,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_posts_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_products_category_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_products_category" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_label" varchar DEFAULT 'XEM TẤT CẢ CÁC SẢN PHẨM',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_buy_now" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_label" varchar DEFAULT 'MUA NGAY',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_call_to_add_to_cart" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"content" jsonb,
  	"button_label" varchar DEFAULT 'MUA NGAY',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_call_to_action_post" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"post_id" integer,
  	"overwrite_title" varchar,
  	"overwrite_description" varchar,
  	"button_label" varchar DEFAULT 'ĐỌC BÀI VIẾT',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_highlight_center" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" numeric,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_highlight_left" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" numeric,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_highlight_right" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" numeric,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_posts_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_products_category_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"product_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_products_category" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_label" varchar DEFAULT 'XEM TẤT CẢ CÁC SẢN PHẨM',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum_posts_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_posts_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_buy_now" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_label" varchar DEFAULT 'MUA NGAY',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_call_to_add_to_cart" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"content" jsonb,
  	"button_label" varchar DEFAULT 'MUA NGAY',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_cta_center" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub_title" varchar,
  	"description" jsonb,
  	"background_id" integer,
  	"button_text" varchar,
  	"button_link_type" "enum_posts_blocks_cta_center_button_link_type" DEFAULT 'reference',
  	"button_link_new_tab" boolean,
  	"button_link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_cta_left" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub_title" varchar,
  	"description" jsonb,
  	"background_id" integer,
  	"button_text" varchar,
  	"button_link_type" "enum_posts_blocks_cta_left_button_link_type" DEFAULT 'reference',
  	"button_link_new_tab" boolean,
  	"button_link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_cta_right_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_cta_right" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub_title" varchar,
  	"description" jsonb,
  	"button_text" varchar,
  	"button_link_type" "enum_posts_blocks_cta_right_button_link_type" DEFAULT 'reference',
  	"button_link_new_tab" boolean,
  	"button_link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_certificates_organizations" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"logo_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_certificates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Chứng nhận bởi các tổ chức quốc tế',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_posts_blocks_content_columns_size" DEFAULT 'full',
  	"font" "enum_posts_blocks_content_columns_font" DEFAULT 'default',
  	"custom_css" varchar DEFAULT '',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_posts_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_posts_blocks_content_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_highlight_center" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"order" numeric,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_highlight_left" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"order" numeric,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_highlight_right" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"order" numeric,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_infinite_scroll" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"graphic_id" integer,
  	"animation_duration" numeric DEFAULT 5,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_products_carousel_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_products_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_three_photo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_left_id" integer,
  	"photo_center_id" integer,
  	"photo_right_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum__posts_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__posts_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_buy_now" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_label" varchar DEFAULT 'MUA NGAY',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_call_to_add_to_cart" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"content" jsonb,
  	"button_label" varchar DEFAULT 'MUA NGAY',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_cta_center" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub_title" varchar,
  	"description" jsonb,
  	"background_id" integer,
  	"button_text" varchar,
  	"button_link_type" "enum__posts_v_blocks_cta_center_button_link_type" DEFAULT 'reference',
  	"button_link_new_tab" boolean,
  	"button_link_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_cta_left" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub_title" varchar,
  	"description" jsonb,
  	"background_id" integer,
  	"button_text" varchar,
  	"button_link_type" "enum__posts_v_blocks_cta_left_button_link_type" DEFAULT 'reference',
  	"button_link_new_tab" boolean,
  	"button_link_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_cta_right_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_cta_right" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub_title" varchar,
  	"description" jsonb,
  	"button_text" varchar,
  	"button_link_type" "enum__posts_v_blocks_cta_right_button_link_type" DEFAULT 'reference',
  	"button_link_new_tab" boolean,
  	"button_link_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_certificates_organizations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"logo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_certificates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Chứng nhận bởi các tổ chức quốc tế',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__posts_v_blocks_content_columns_size" DEFAULT 'full',
  	"font" "enum__posts_v_blocks_content_columns_font" DEFAULT 'default',
  	"custom_css" varchar DEFAULT '',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum__posts_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__posts_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_highlight_center" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" numeric,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_highlight_left" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" numeric,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_highlight_right" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" numeric,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_infinite_scroll" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"graphic_id" integer,
  	"animation_duration" numeric DEFAULT 5,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_products_carousel_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"product_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_products_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_three_photo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_left_id" integer,
  	"photo_center_id" integer,
  	"photo_right_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum_products_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_products_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_buy_now" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_label" varchar DEFAULT 'MUA NGAY',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_call_to_add_to_cart" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"content" jsonb,
  	"button_label" varchar DEFAULT 'MUA NGAY' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_cta_center" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"sub_title" varchar,
  	"description" jsonb,
  	"background_id" integer,
  	"button_text" varchar NOT NULL,
  	"button_link_type" "enum_products_blocks_cta_center_button_link_type" DEFAULT 'reference',
  	"button_link_new_tab" boolean,
  	"button_link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_cta_left" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"sub_title" varchar,
  	"description" jsonb,
  	"background_id" integer,
  	"button_text" varchar NOT NULL,
  	"button_link_type" "enum_products_blocks_cta_left_button_link_type" DEFAULT 'reference',
  	"button_link_new_tab" boolean,
  	"button_link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_cta_right_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_cta_right" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"sub_title" varchar,
  	"description" jsonb,
  	"button_text" varchar NOT NULL,
  	"button_link_type" "enum_products_blocks_cta_right_button_link_type" DEFAULT 'reference',
  	"button_link_new_tab" boolean,
  	"button_link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_certificates_organizations" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"logo_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_certificates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Chứng nhận bởi các tổ chức quốc tế' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_products_blocks_content_columns_size" DEFAULT 'full',
  	"font" "enum_products_blocks_content_columns_font" DEFAULT 'default',
  	"custom_css" varchar DEFAULT '',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_products_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_products_blocks_content_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_highlight_center" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"order" numeric NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_highlight_left" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"order" numeric NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_highlight_right" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"order" numeric NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_infinite_scroll" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"graphic_id" integer NOT NULL,
  	"animation_duration" numeric DEFAULT 5,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_latest_posts_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"post_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_latest_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Bài viết mới nhất' NOT NULL,
  	"button_label" varchar DEFAULT 'TẤT CẢ BÀI VIẾT' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_products_carousel_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_products_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_three_photo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_left_id" integer NOT NULL,
  	"photo_center_id" integer NOT NULL,
  	"photo_right_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"post_categories_id" integer,
  	"product_sub_categories_id" integer,
  	"posts_id" integer,
  	"pages_id" integer,
  	"products_id" integer
  );
  
  ALTER TABLE "pages_blocks_best_seller_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_best_seller_products" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_best_seller_products" CASCADE;
  DROP TABLE "_pages_v_blocks_best_seller_products" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_meta_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "products" DROP CONSTRAINT "products_product_categories_id_product_categories_id_fk";
  
  ALTER TABLE "products" DROP CONSTRAINT "products_product_sub_categories_id_product_sub_categories_id_fk";
  
  ALTER TABLE "product_sub_categories" DROP CONSTRAINT "product_sub_categories_product_categories_id_product_categories_id_fk";
  
  DROP INDEX IF EXISTS "pages_meta_meta_image_idx";
  DROP INDEX IF EXISTS "_pages_v_version_meta_version_meta_image_idx";
  DROP INDEX IF EXISTS "products_product_categories_idx";
  DROP INDEX IF EXISTS "products_product_sub_categories_idx";
  DROP INDEX IF EXISTS "product_sub_categories_product_categories_idx";
  ALTER TABLE "pages" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_subtitle" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_description" jsonb;
  ALTER TABLE "pages" ADD COLUMN "meta_meta_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_meta_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "meta_meta_description" varchar;
  ALTER TABLE "pages_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "product_categories_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "product_sub_categories_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_subtitle" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_description" jsonb;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_meta_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_meta_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_meta_description" varchar;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "product_categories_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "product_sub_categories_id" integer;
  ALTER TABLE "posts_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "posts_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "_posts_v_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "_posts_v_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "products" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "products" ADD COLUMN "hero_subtitle" varchar;
  ALTER TABLE "products" ADD COLUMN "hero_description" jsonb;
  ALTER TABLE "products" ADD COLUMN "hero_media_id" integer;
  ALTER TABLE "products" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "products" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "products" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "products" ADD COLUMN "slug" varchar;
  ALTER TABLE "products" ADD COLUMN "slug_lock" boolean DEFAULT true;
  ALTER TABLE "product_sub_categories" ADD COLUMN "category_id" integer NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_buy_now" ADD CONSTRAINT "pages_blocks_buy_now_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_call_to_add_to_cart" ADD CONSTRAINT "pages_blocks_call_to_add_to_cart_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_call_to_add_to_cart" ADD CONSTRAINT "pages_blocks_call_to_add_to_cart_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_call_to_action_post" ADD CONSTRAINT "pages_blocks_call_to_action_post_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_call_to_action_post" ADD CONSTRAINT "pages_blocks_call_to_action_post_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_highlight_center" ADD CONSTRAINT "pages_blocks_highlight_center_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_highlight_center" ADD CONSTRAINT "pages_blocks_highlight_center_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_highlight_left" ADD CONSTRAINT "pages_blocks_highlight_left_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_highlight_left" ADD CONSTRAINT "pages_blocks_highlight_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_highlight_right" ADD CONSTRAINT "pages_blocks_highlight_right_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_highlight_right" ADD CONSTRAINT "pages_blocks_highlight_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_posts_grid" ADD CONSTRAINT "pages_blocks_posts_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_products_category_products" ADD CONSTRAINT "pages_blocks_products_category_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_products_category_products" ADD CONSTRAINT "pages_blocks_products_category_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_products_category"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_products_category" ADD CONSTRAINT "pages_blocks_products_category_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_buy_now" ADD CONSTRAINT "_pages_v_blocks_buy_now_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_call_to_add_to_cart" ADD CONSTRAINT "_pages_v_blocks_call_to_add_to_cart_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_call_to_add_to_cart" ADD CONSTRAINT "_pages_v_blocks_call_to_add_to_cart_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_call_to_action_post" ADD CONSTRAINT "_pages_v_blocks_call_to_action_post_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_call_to_action_post" ADD CONSTRAINT "_pages_v_blocks_call_to_action_post_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_highlight_center" ADD CONSTRAINT "_pages_v_blocks_highlight_center_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_highlight_center" ADD CONSTRAINT "_pages_v_blocks_highlight_center_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_highlight_left" ADD CONSTRAINT "_pages_v_blocks_highlight_left_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_highlight_left" ADD CONSTRAINT "_pages_v_blocks_highlight_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_highlight_right" ADD CONSTRAINT "_pages_v_blocks_highlight_right_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_highlight_right" ADD CONSTRAINT "_pages_v_blocks_highlight_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_posts_grid" ADD CONSTRAINT "_pages_v_blocks_posts_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_products_category_products" ADD CONSTRAINT "_pages_v_blocks_products_category_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_products_category_products" ADD CONSTRAINT "_pages_v_blocks_products_category_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_products_category"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_products_category" ADD CONSTRAINT "_pages_v_blocks_products_category_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_archive" ADD CONSTRAINT "posts_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_buy_now" ADD CONSTRAINT "posts_blocks_buy_now_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_call_to_add_to_cart" ADD CONSTRAINT "posts_blocks_call_to_add_to_cart_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_call_to_add_to_cart" ADD CONSTRAINT "posts_blocks_call_to_add_to_cart_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_cta_center" ADD CONSTRAINT "posts_blocks_cta_center_background_id_media_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_cta_center" ADD CONSTRAINT "posts_blocks_cta_center_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_cta_left" ADD CONSTRAINT "posts_blocks_cta_left_background_id_media_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_cta_left" ADD CONSTRAINT "posts_blocks_cta_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_cta_right_gallery" ADD CONSTRAINT "posts_blocks_cta_right_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_cta_right_gallery" ADD CONSTRAINT "posts_blocks_cta_right_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_cta_right"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_cta_right" ADD CONSTRAINT "posts_blocks_cta_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_certificates_organizations" ADD CONSTRAINT "posts_blocks_certificates_organizations_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_certificates_organizations" ADD CONSTRAINT "posts_blocks_certificates_organizations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_certificates"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_certificates" ADD CONSTRAINT "posts_blocks_certificates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_content_columns" ADD CONSTRAINT "posts_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_content" ADD CONSTRAINT "posts_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_form_block" ADD CONSTRAINT "posts_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_form_block" ADD CONSTRAINT "posts_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_highlight_center" ADD CONSTRAINT "posts_blocks_highlight_center_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_highlight_center" ADD CONSTRAINT "posts_blocks_highlight_center_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_highlight_left" ADD CONSTRAINT "posts_blocks_highlight_left_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_highlight_left" ADD CONSTRAINT "posts_blocks_highlight_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_highlight_right" ADD CONSTRAINT "posts_blocks_highlight_right_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_highlight_right" ADD CONSTRAINT "posts_blocks_highlight_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_infinite_scroll" ADD CONSTRAINT "posts_blocks_infinite_scroll_graphic_id_media_id_fk" FOREIGN KEY ("graphic_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_infinite_scroll" ADD CONSTRAINT "posts_blocks_infinite_scroll_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_media" ADD CONSTRAINT "posts_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_media" ADD CONSTRAINT "posts_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_products_carousel_products" ADD CONSTRAINT "posts_blocks_products_carousel_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_products_carousel_products" ADD CONSTRAINT "posts_blocks_products_carousel_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_products_carousel"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_products_carousel" ADD CONSTRAINT "posts_blocks_products_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_three_photo" ADD CONSTRAINT "posts_blocks_three_photo_photo_left_id_media_id_fk" FOREIGN KEY ("photo_left_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_three_photo" ADD CONSTRAINT "posts_blocks_three_photo_photo_center_id_media_id_fk" FOREIGN KEY ("photo_center_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_three_photo" ADD CONSTRAINT "posts_blocks_three_photo_photo_right_id_media_id_fk" FOREIGN KEY ("photo_right_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_three_photo" ADD CONSTRAINT "posts_blocks_three_photo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_archive" ADD CONSTRAINT "_posts_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_buy_now" ADD CONSTRAINT "_posts_v_blocks_buy_now_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_call_to_add_to_cart" ADD CONSTRAINT "_posts_v_blocks_call_to_add_to_cart_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_call_to_add_to_cart" ADD CONSTRAINT "_posts_v_blocks_call_to_add_to_cart_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_cta_center" ADD CONSTRAINT "_posts_v_blocks_cta_center_background_id_media_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_cta_center" ADD CONSTRAINT "_posts_v_blocks_cta_center_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_cta_left" ADD CONSTRAINT "_posts_v_blocks_cta_left_background_id_media_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_cta_left" ADD CONSTRAINT "_posts_v_blocks_cta_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_cta_right_gallery" ADD CONSTRAINT "_posts_v_blocks_cta_right_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_cta_right_gallery" ADD CONSTRAINT "_posts_v_blocks_cta_right_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_cta_right"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_cta_right" ADD CONSTRAINT "_posts_v_blocks_cta_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_certificates_organizations" ADD CONSTRAINT "_posts_v_blocks_certificates_organizations_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_certificates_organizations" ADD CONSTRAINT "_posts_v_blocks_certificates_organizations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_certificates"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_certificates" ADD CONSTRAINT "_posts_v_blocks_certificates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_content_columns" ADD CONSTRAINT "_posts_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_content" ADD CONSTRAINT "_posts_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_form_block" ADD CONSTRAINT "_posts_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_form_block" ADD CONSTRAINT "_posts_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_highlight_center" ADD CONSTRAINT "_posts_v_blocks_highlight_center_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_highlight_center" ADD CONSTRAINT "_posts_v_blocks_highlight_center_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_highlight_left" ADD CONSTRAINT "_posts_v_blocks_highlight_left_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_highlight_left" ADD CONSTRAINT "_posts_v_blocks_highlight_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_highlight_right" ADD CONSTRAINT "_posts_v_blocks_highlight_right_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_highlight_right" ADD CONSTRAINT "_posts_v_blocks_highlight_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_infinite_scroll" ADD CONSTRAINT "_posts_v_blocks_infinite_scroll_graphic_id_media_id_fk" FOREIGN KEY ("graphic_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_infinite_scroll" ADD CONSTRAINT "_posts_v_blocks_infinite_scroll_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_media" ADD CONSTRAINT "_posts_v_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_media" ADD CONSTRAINT "_posts_v_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_products_carousel_products" ADD CONSTRAINT "_posts_v_blocks_products_carousel_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_products_carousel_products" ADD CONSTRAINT "_posts_v_blocks_products_carousel_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_products_carousel"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_products_carousel" ADD CONSTRAINT "_posts_v_blocks_products_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_three_photo" ADD CONSTRAINT "_posts_v_blocks_three_photo_photo_left_id_media_id_fk" FOREIGN KEY ("photo_left_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_three_photo" ADD CONSTRAINT "_posts_v_blocks_three_photo_photo_center_id_media_id_fk" FOREIGN KEY ("photo_center_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_three_photo" ADD CONSTRAINT "_posts_v_blocks_three_photo_photo_right_id_media_id_fk" FOREIGN KEY ("photo_right_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_three_photo" ADD CONSTRAINT "_posts_v_blocks_three_photo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_archive" ADD CONSTRAINT "products_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_buy_now" ADD CONSTRAINT "products_blocks_buy_now_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_call_to_add_to_cart" ADD CONSTRAINT "products_blocks_call_to_add_to_cart_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_call_to_add_to_cart" ADD CONSTRAINT "products_blocks_call_to_add_to_cart_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_cta_center" ADD CONSTRAINT "products_blocks_cta_center_background_id_media_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_cta_center" ADD CONSTRAINT "products_blocks_cta_center_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_cta_left" ADD CONSTRAINT "products_blocks_cta_left_background_id_media_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_cta_left" ADD CONSTRAINT "products_blocks_cta_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_cta_right_gallery" ADD CONSTRAINT "products_blocks_cta_right_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_cta_right_gallery" ADD CONSTRAINT "products_blocks_cta_right_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_cta_right"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_cta_right" ADD CONSTRAINT "products_blocks_cta_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_certificates_organizations" ADD CONSTRAINT "products_blocks_certificates_organizations_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_certificates_organizations" ADD CONSTRAINT "products_blocks_certificates_organizations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_certificates"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_certificates" ADD CONSTRAINT "products_blocks_certificates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_content_columns" ADD CONSTRAINT "products_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_content" ADD CONSTRAINT "products_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_form_block" ADD CONSTRAINT "products_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_form_block" ADD CONSTRAINT "products_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_highlight_center" ADD CONSTRAINT "products_blocks_highlight_center_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_highlight_center" ADD CONSTRAINT "products_blocks_highlight_center_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_highlight_left" ADD CONSTRAINT "products_blocks_highlight_left_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_highlight_left" ADD CONSTRAINT "products_blocks_highlight_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_highlight_right" ADD CONSTRAINT "products_blocks_highlight_right_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_highlight_right" ADD CONSTRAINT "products_blocks_highlight_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_infinite_scroll" ADD CONSTRAINT "products_blocks_infinite_scroll_graphic_id_media_id_fk" FOREIGN KEY ("graphic_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_infinite_scroll" ADD CONSTRAINT "products_blocks_infinite_scroll_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_latest_posts_posts" ADD CONSTRAINT "products_blocks_latest_posts_posts_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_latest_posts_posts" ADD CONSTRAINT "products_blocks_latest_posts_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_latest_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_latest_posts" ADD CONSTRAINT "products_blocks_latest_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_media" ADD CONSTRAINT "products_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_media" ADD CONSTRAINT "products_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_products_carousel_products" ADD CONSTRAINT "products_blocks_products_carousel_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_products_carousel_products" ADD CONSTRAINT "products_blocks_products_carousel_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_products_carousel"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_products_carousel" ADD CONSTRAINT "products_blocks_products_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_three_photo" ADD CONSTRAINT "products_blocks_three_photo_photo_left_id_media_id_fk" FOREIGN KEY ("photo_left_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_three_photo" ADD CONSTRAINT "products_blocks_three_photo_photo_center_id_media_id_fk" FOREIGN KEY ("photo_center_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_three_photo" ADD CONSTRAINT "products_blocks_three_photo_photo_right_id_media_id_fk" FOREIGN KEY ("photo_right_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_three_photo" ADD CONSTRAINT "products_blocks_three_photo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_post_categories_fk" FOREIGN KEY ("post_categories_id") REFERENCES "public"."post_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_product_sub_categories_fk" FOREIGN KEY ("product_sub_categories_id") REFERENCES "public"."product_sub_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_buy_now_order_idx" ON "pages_blocks_buy_now" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_buy_now_parent_id_idx" ON "pages_blocks_buy_now" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_buy_now_path_idx" ON "pages_blocks_buy_now" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_add_to_cart_order_idx" ON "pages_blocks_call_to_add_to_cart" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_add_to_cart_parent_id_idx" ON "pages_blocks_call_to_add_to_cart" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_add_to_cart_path_idx" ON "pages_blocks_call_to_add_to_cart" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_add_to_cart_image_idx" ON "pages_blocks_call_to_add_to_cart" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_action_post_order_idx" ON "pages_blocks_call_to_action_post" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_action_post_parent_id_idx" ON "pages_blocks_call_to_action_post" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_action_post_path_idx" ON "pages_blocks_call_to_action_post" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_action_post_post_idx" ON "pages_blocks_call_to_action_post" USING btree ("post_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_highlight_center_order_idx" ON "pages_blocks_highlight_center" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_highlight_center_parent_id_idx" ON "pages_blocks_highlight_center" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_highlight_center_path_idx" ON "pages_blocks_highlight_center" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_highlight_center_image_idx" ON "pages_blocks_highlight_center" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_highlight_left_order_idx" ON "pages_blocks_highlight_left" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_highlight_left_parent_id_idx" ON "pages_blocks_highlight_left" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_highlight_left_path_idx" ON "pages_blocks_highlight_left" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_highlight_left_image_idx" ON "pages_blocks_highlight_left" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_highlight_right_order_idx" ON "pages_blocks_highlight_right" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_highlight_right_parent_id_idx" ON "pages_blocks_highlight_right" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_highlight_right_path_idx" ON "pages_blocks_highlight_right" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_highlight_right_image_idx" ON "pages_blocks_highlight_right" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_posts_grid_order_idx" ON "pages_blocks_posts_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_posts_grid_parent_id_idx" ON "pages_blocks_posts_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_posts_grid_path_idx" ON "pages_blocks_posts_grid" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_products_category_products_order_idx" ON "pages_blocks_products_category_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_products_category_products_parent_id_idx" ON "pages_blocks_products_category_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_products_category_products_product_idx" ON "pages_blocks_products_category_products" USING btree ("product_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_products_category_order_idx" ON "pages_blocks_products_category" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_products_category_parent_id_idx" ON "pages_blocks_products_category" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_products_category_path_idx" ON "pages_blocks_products_category" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_buy_now_order_idx" ON "_pages_v_blocks_buy_now" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_buy_now_parent_id_idx" ON "_pages_v_blocks_buy_now" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_buy_now_path_idx" ON "_pages_v_blocks_buy_now" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_add_to_cart_order_idx" ON "_pages_v_blocks_call_to_add_to_cart" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_add_to_cart_parent_id_idx" ON "_pages_v_blocks_call_to_add_to_cart" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_add_to_cart_path_idx" ON "_pages_v_blocks_call_to_add_to_cart" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_add_to_cart_image_idx" ON "_pages_v_blocks_call_to_add_to_cart" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_action_post_order_idx" ON "_pages_v_blocks_call_to_action_post" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_action_post_parent_id_idx" ON "_pages_v_blocks_call_to_action_post" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_action_post_path_idx" ON "_pages_v_blocks_call_to_action_post" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_action_post_post_idx" ON "_pages_v_blocks_call_to_action_post" USING btree ("post_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_center_order_idx" ON "_pages_v_blocks_highlight_center" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_center_parent_id_idx" ON "_pages_v_blocks_highlight_center" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_center_path_idx" ON "_pages_v_blocks_highlight_center" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_center_image_idx" ON "_pages_v_blocks_highlight_center" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_left_order_idx" ON "_pages_v_blocks_highlight_left" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_left_parent_id_idx" ON "_pages_v_blocks_highlight_left" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_left_path_idx" ON "_pages_v_blocks_highlight_left" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_left_image_idx" ON "_pages_v_blocks_highlight_left" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_right_order_idx" ON "_pages_v_blocks_highlight_right" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_right_parent_id_idx" ON "_pages_v_blocks_highlight_right" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_right_path_idx" ON "_pages_v_blocks_highlight_right" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_right_image_idx" ON "_pages_v_blocks_highlight_right" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_posts_grid_order_idx" ON "_pages_v_blocks_posts_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_posts_grid_parent_id_idx" ON "_pages_v_blocks_posts_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_posts_grid_path_idx" ON "_pages_v_blocks_posts_grid" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_products_category_products_order_idx" ON "_pages_v_blocks_products_category_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_products_category_products_parent_id_idx" ON "_pages_v_blocks_products_category_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_products_category_products_product_idx" ON "_pages_v_blocks_products_category_products" USING btree ("product_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_products_category_order_idx" ON "_pages_v_blocks_products_category" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_products_category_parent_id_idx" ON "_pages_v_blocks_products_category" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_products_category_path_idx" ON "_pages_v_blocks_products_category" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_archive_order_idx" ON "posts_blocks_archive" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_archive_parent_id_idx" ON "posts_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_archive_path_idx" ON "posts_blocks_archive" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_buy_now_order_idx" ON "posts_blocks_buy_now" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_buy_now_parent_id_idx" ON "posts_blocks_buy_now" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_buy_now_path_idx" ON "posts_blocks_buy_now" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_call_to_add_to_cart_order_idx" ON "posts_blocks_call_to_add_to_cart" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_call_to_add_to_cart_parent_id_idx" ON "posts_blocks_call_to_add_to_cart" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_call_to_add_to_cart_path_idx" ON "posts_blocks_call_to_add_to_cart" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_call_to_add_to_cart_image_idx" ON "posts_blocks_call_to_add_to_cart" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_cta_center_order_idx" ON "posts_blocks_cta_center" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_cta_center_parent_id_idx" ON "posts_blocks_cta_center" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_cta_center_path_idx" ON "posts_blocks_cta_center" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_cta_center_background_idx" ON "posts_blocks_cta_center" USING btree ("background_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_cta_left_order_idx" ON "posts_blocks_cta_left" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_cta_left_parent_id_idx" ON "posts_blocks_cta_left" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_cta_left_path_idx" ON "posts_blocks_cta_left" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_cta_left_background_idx" ON "posts_blocks_cta_left" USING btree ("background_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_cta_right_gallery_order_idx" ON "posts_blocks_cta_right_gallery" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_cta_right_gallery_parent_id_idx" ON "posts_blocks_cta_right_gallery" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_cta_right_gallery_image_idx" ON "posts_blocks_cta_right_gallery" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_cta_right_order_idx" ON "posts_blocks_cta_right" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_cta_right_parent_id_idx" ON "posts_blocks_cta_right" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_cta_right_path_idx" ON "posts_blocks_cta_right" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_certificates_organizations_order_idx" ON "posts_blocks_certificates_organizations" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_certificates_organizations_parent_id_idx" ON "posts_blocks_certificates_organizations" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_certificates_organizations_logo_idx" ON "posts_blocks_certificates_organizations" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_certificates_order_idx" ON "posts_blocks_certificates" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_certificates_parent_id_idx" ON "posts_blocks_certificates" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_certificates_path_idx" ON "posts_blocks_certificates" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_content_columns_order_idx" ON "posts_blocks_content_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_content_columns_parent_id_idx" ON "posts_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_content_order_idx" ON "posts_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_content_parent_id_idx" ON "posts_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_content_path_idx" ON "posts_blocks_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_form_block_order_idx" ON "posts_blocks_form_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_form_block_parent_id_idx" ON "posts_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_form_block_path_idx" ON "posts_blocks_form_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_form_block_form_idx" ON "posts_blocks_form_block" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_highlight_center_order_idx" ON "posts_blocks_highlight_center" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_highlight_center_parent_id_idx" ON "posts_blocks_highlight_center" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_highlight_center_path_idx" ON "posts_blocks_highlight_center" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_highlight_center_image_idx" ON "posts_blocks_highlight_center" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_highlight_left_order_idx" ON "posts_blocks_highlight_left" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_highlight_left_parent_id_idx" ON "posts_blocks_highlight_left" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_highlight_left_path_idx" ON "posts_blocks_highlight_left" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_highlight_left_image_idx" ON "posts_blocks_highlight_left" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_highlight_right_order_idx" ON "posts_blocks_highlight_right" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_highlight_right_parent_id_idx" ON "posts_blocks_highlight_right" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_highlight_right_path_idx" ON "posts_blocks_highlight_right" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_highlight_right_image_idx" ON "posts_blocks_highlight_right" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_infinite_scroll_order_idx" ON "posts_blocks_infinite_scroll" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_infinite_scroll_parent_id_idx" ON "posts_blocks_infinite_scroll" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_infinite_scroll_path_idx" ON "posts_blocks_infinite_scroll" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_infinite_scroll_graphic_idx" ON "posts_blocks_infinite_scroll" USING btree ("graphic_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_media_order_idx" ON "posts_blocks_media" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_media_parent_id_idx" ON "posts_blocks_media" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_media_path_idx" ON "posts_blocks_media" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_media_media_idx" ON "posts_blocks_media" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_products_carousel_products_order_idx" ON "posts_blocks_products_carousel_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_products_carousel_products_parent_id_idx" ON "posts_blocks_products_carousel_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_products_carousel_products_product_idx" ON "posts_blocks_products_carousel_products" USING btree ("product_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_products_carousel_order_idx" ON "posts_blocks_products_carousel" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_products_carousel_parent_id_idx" ON "posts_blocks_products_carousel" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_products_carousel_path_idx" ON "posts_blocks_products_carousel" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_three_photo_order_idx" ON "posts_blocks_three_photo" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_three_photo_parent_id_idx" ON "posts_blocks_three_photo" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_three_photo_path_idx" ON "posts_blocks_three_photo" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_three_photo_photo_left_idx" ON "posts_blocks_three_photo" USING btree ("photo_left_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_three_photo_photo_center_idx" ON "posts_blocks_three_photo" USING btree ("photo_center_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_three_photo_photo_right_idx" ON "posts_blocks_three_photo" USING btree ("photo_right_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_archive_order_idx" ON "_posts_v_blocks_archive" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_archive_parent_id_idx" ON "_posts_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_archive_path_idx" ON "_posts_v_blocks_archive" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_buy_now_order_idx" ON "_posts_v_blocks_buy_now" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_buy_now_parent_id_idx" ON "_posts_v_blocks_buy_now" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_buy_now_path_idx" ON "_posts_v_blocks_buy_now" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_call_to_add_to_cart_order_idx" ON "_posts_v_blocks_call_to_add_to_cart" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_call_to_add_to_cart_parent_id_idx" ON "_posts_v_blocks_call_to_add_to_cart" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_call_to_add_to_cart_path_idx" ON "_posts_v_blocks_call_to_add_to_cart" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_call_to_add_to_cart_image_idx" ON "_posts_v_blocks_call_to_add_to_cart" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_cta_center_order_idx" ON "_posts_v_blocks_cta_center" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_cta_center_parent_id_idx" ON "_posts_v_blocks_cta_center" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_cta_center_path_idx" ON "_posts_v_blocks_cta_center" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_cta_center_background_idx" ON "_posts_v_blocks_cta_center" USING btree ("background_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_cta_left_order_idx" ON "_posts_v_blocks_cta_left" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_cta_left_parent_id_idx" ON "_posts_v_blocks_cta_left" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_cta_left_path_idx" ON "_posts_v_blocks_cta_left" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_cta_left_background_idx" ON "_posts_v_blocks_cta_left" USING btree ("background_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_cta_right_gallery_order_idx" ON "_posts_v_blocks_cta_right_gallery" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_cta_right_gallery_parent_id_idx" ON "_posts_v_blocks_cta_right_gallery" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_cta_right_gallery_image_idx" ON "_posts_v_blocks_cta_right_gallery" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_cta_right_order_idx" ON "_posts_v_blocks_cta_right" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_cta_right_parent_id_idx" ON "_posts_v_blocks_cta_right" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_cta_right_path_idx" ON "_posts_v_blocks_cta_right" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_certificates_organizations_order_idx" ON "_posts_v_blocks_certificates_organizations" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_certificates_organizations_parent_id_idx" ON "_posts_v_blocks_certificates_organizations" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_certificates_organizations_logo_idx" ON "_posts_v_blocks_certificates_organizations" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_certificates_order_idx" ON "_posts_v_blocks_certificates" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_certificates_parent_id_idx" ON "_posts_v_blocks_certificates" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_certificates_path_idx" ON "_posts_v_blocks_certificates" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_content_columns_order_idx" ON "_posts_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_content_columns_parent_id_idx" ON "_posts_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_content_order_idx" ON "_posts_v_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_content_parent_id_idx" ON "_posts_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_content_path_idx" ON "_posts_v_blocks_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_form_block_order_idx" ON "_posts_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_form_block_parent_id_idx" ON "_posts_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_form_block_path_idx" ON "_posts_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_form_block_form_idx" ON "_posts_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_center_order_idx" ON "_posts_v_blocks_highlight_center" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_center_parent_id_idx" ON "_posts_v_blocks_highlight_center" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_center_path_idx" ON "_posts_v_blocks_highlight_center" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_center_image_idx" ON "_posts_v_blocks_highlight_center" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_left_order_idx" ON "_posts_v_blocks_highlight_left" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_left_parent_id_idx" ON "_posts_v_blocks_highlight_left" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_left_path_idx" ON "_posts_v_blocks_highlight_left" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_left_image_idx" ON "_posts_v_blocks_highlight_left" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_right_order_idx" ON "_posts_v_blocks_highlight_right" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_right_parent_id_idx" ON "_posts_v_blocks_highlight_right" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_right_path_idx" ON "_posts_v_blocks_highlight_right" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_right_image_idx" ON "_posts_v_blocks_highlight_right" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_infinite_scroll_order_idx" ON "_posts_v_blocks_infinite_scroll" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_infinite_scroll_parent_id_idx" ON "_posts_v_blocks_infinite_scroll" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_infinite_scroll_path_idx" ON "_posts_v_blocks_infinite_scroll" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_infinite_scroll_graphic_idx" ON "_posts_v_blocks_infinite_scroll" USING btree ("graphic_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_media_order_idx" ON "_posts_v_blocks_media" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_media_parent_id_idx" ON "_posts_v_blocks_media" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_media_path_idx" ON "_posts_v_blocks_media" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_media_media_idx" ON "_posts_v_blocks_media" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_products_carousel_products_order_idx" ON "_posts_v_blocks_products_carousel_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_products_carousel_products_parent_id_idx" ON "_posts_v_blocks_products_carousel_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_products_carousel_products_product_idx" ON "_posts_v_blocks_products_carousel_products" USING btree ("product_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_products_carousel_order_idx" ON "_posts_v_blocks_products_carousel" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_products_carousel_parent_id_idx" ON "_posts_v_blocks_products_carousel" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_products_carousel_path_idx" ON "_posts_v_blocks_products_carousel" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_three_photo_order_idx" ON "_posts_v_blocks_three_photo" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_three_photo_parent_id_idx" ON "_posts_v_blocks_three_photo" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_three_photo_path_idx" ON "_posts_v_blocks_three_photo" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_three_photo_photo_left_idx" ON "_posts_v_blocks_three_photo" USING btree ("photo_left_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_three_photo_photo_center_idx" ON "_posts_v_blocks_three_photo" USING btree ("photo_center_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_three_photo_photo_right_idx" ON "_posts_v_blocks_three_photo" USING btree ("photo_right_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_archive_order_idx" ON "products_blocks_archive" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_archive_parent_id_idx" ON "products_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_archive_path_idx" ON "products_blocks_archive" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_buy_now_order_idx" ON "products_blocks_buy_now" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_buy_now_parent_id_idx" ON "products_blocks_buy_now" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_buy_now_path_idx" ON "products_blocks_buy_now" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_call_to_add_to_cart_order_idx" ON "products_blocks_call_to_add_to_cart" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_call_to_add_to_cart_parent_id_idx" ON "products_blocks_call_to_add_to_cart" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_call_to_add_to_cart_path_idx" ON "products_blocks_call_to_add_to_cart" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_call_to_add_to_cart_image_idx" ON "products_blocks_call_to_add_to_cart" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_cta_center_order_idx" ON "products_blocks_cta_center" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_cta_center_parent_id_idx" ON "products_blocks_cta_center" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_cta_center_path_idx" ON "products_blocks_cta_center" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_cta_center_background_idx" ON "products_blocks_cta_center" USING btree ("background_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_cta_left_order_idx" ON "products_blocks_cta_left" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_cta_left_parent_id_idx" ON "products_blocks_cta_left" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_cta_left_path_idx" ON "products_blocks_cta_left" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_cta_left_background_idx" ON "products_blocks_cta_left" USING btree ("background_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_cta_right_gallery_order_idx" ON "products_blocks_cta_right_gallery" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_cta_right_gallery_parent_id_idx" ON "products_blocks_cta_right_gallery" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_cta_right_gallery_image_idx" ON "products_blocks_cta_right_gallery" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_cta_right_order_idx" ON "products_blocks_cta_right" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_cta_right_parent_id_idx" ON "products_blocks_cta_right" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_cta_right_path_idx" ON "products_blocks_cta_right" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_certificates_organizations_order_idx" ON "products_blocks_certificates_organizations" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_certificates_organizations_parent_id_idx" ON "products_blocks_certificates_organizations" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_certificates_organizations_logo_idx" ON "products_blocks_certificates_organizations" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_certificates_order_idx" ON "products_blocks_certificates" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_certificates_parent_id_idx" ON "products_blocks_certificates" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_certificates_path_idx" ON "products_blocks_certificates" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_content_columns_order_idx" ON "products_blocks_content_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_content_columns_parent_id_idx" ON "products_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_content_order_idx" ON "products_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_content_parent_id_idx" ON "products_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_content_path_idx" ON "products_blocks_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_form_block_order_idx" ON "products_blocks_form_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_form_block_parent_id_idx" ON "products_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_form_block_path_idx" ON "products_blocks_form_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_form_block_form_idx" ON "products_blocks_form_block" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_highlight_center_order_idx" ON "products_blocks_highlight_center" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_highlight_center_parent_id_idx" ON "products_blocks_highlight_center" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_highlight_center_path_idx" ON "products_blocks_highlight_center" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_highlight_center_image_idx" ON "products_blocks_highlight_center" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_highlight_left_order_idx" ON "products_blocks_highlight_left" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_highlight_left_parent_id_idx" ON "products_blocks_highlight_left" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_highlight_left_path_idx" ON "products_blocks_highlight_left" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_highlight_left_image_idx" ON "products_blocks_highlight_left" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_highlight_right_order_idx" ON "products_blocks_highlight_right" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_highlight_right_parent_id_idx" ON "products_blocks_highlight_right" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_highlight_right_path_idx" ON "products_blocks_highlight_right" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_highlight_right_image_idx" ON "products_blocks_highlight_right" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_infinite_scroll_order_idx" ON "products_blocks_infinite_scroll" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_infinite_scroll_parent_id_idx" ON "products_blocks_infinite_scroll" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_infinite_scroll_path_idx" ON "products_blocks_infinite_scroll" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_infinite_scroll_graphic_idx" ON "products_blocks_infinite_scroll" USING btree ("graphic_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_latest_posts_posts_order_idx" ON "products_blocks_latest_posts_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_latest_posts_posts_parent_id_idx" ON "products_blocks_latest_posts_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_latest_posts_posts_post_idx" ON "products_blocks_latest_posts_posts" USING btree ("post_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_latest_posts_order_idx" ON "products_blocks_latest_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_latest_posts_parent_id_idx" ON "products_blocks_latest_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_latest_posts_path_idx" ON "products_blocks_latest_posts" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_media_order_idx" ON "products_blocks_media" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_media_parent_id_idx" ON "products_blocks_media" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_media_path_idx" ON "products_blocks_media" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_media_media_idx" ON "products_blocks_media" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_products_carousel_products_order_idx" ON "products_blocks_products_carousel_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_products_carousel_products_parent_id_idx" ON "products_blocks_products_carousel_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_products_carousel_products_product_idx" ON "products_blocks_products_carousel_products" USING btree ("product_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_products_carousel_order_idx" ON "products_blocks_products_carousel" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_products_carousel_parent_id_idx" ON "products_blocks_products_carousel" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_products_carousel_path_idx" ON "products_blocks_products_carousel" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_three_photo_order_idx" ON "products_blocks_three_photo" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_three_photo_parent_id_idx" ON "products_blocks_three_photo" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_three_photo_path_idx" ON "products_blocks_three_photo" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_three_photo_photo_left_idx" ON "products_blocks_three_photo" USING btree ("photo_left_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_three_photo_photo_center_idx" ON "products_blocks_three_photo" USING btree ("photo_center_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_three_photo_photo_right_idx" ON "products_blocks_three_photo" USING btree ("photo_right_id");
  CREATE INDEX IF NOT EXISTS "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "products_rels_post_categories_id_idx" ON "products_rels" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "products_rels_product_sub_categories_id_idx" ON "products_rels" USING btree ("product_sub_categories_id");
  CREATE INDEX IF NOT EXISTS "products_rels_posts_id_idx" ON "products_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "products_rels_pages_id_idx" ON "products_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "products_rels_products_id_idx" ON "products_rels" USING btree ("products_id");
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_meta_image_id_media_id_fk" FOREIGN KEY ("meta_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_product_sub_categories_fk" FOREIGN KEY ("product_sub_categories_id") REFERENCES "public"."product_sub_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_product_sub_categories_fk" FOREIGN KEY ("product_sub_categories_id") REFERENCES "public"."product_sub_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "product_sub_categories" ADD CONSTRAINT "product_sub_categories_category_id_product_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_meta_meta_meta_meta_image_idx" ON "pages" USING btree ("meta_meta_image_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_products_id_idx" ON "pages_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_product_categories_id_idx" ON "pages_rels" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_product_sub_categories_id_idx" ON "pages_rels" USING btree ("product_sub_categories_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_meta_meta_version_meta_meta_image_idx" ON "_pages_v" USING btree ("version_meta_meta_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_products_id_idx" ON "_pages_v_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_product_categories_id_idx" ON "_pages_v_rels" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_product_sub_categories_id_idx" ON "_pages_v_rels" USING btree ("product_sub_categories_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_pages_id_idx" ON "posts_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_products_id_idx" ON "posts_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_pages_id_idx" ON "_posts_v_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_products_id_idx" ON "_posts_v_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "products_hero_media_idx" ON "products" USING btree ("hero_media_id");
  CREATE INDEX IF NOT EXISTS "products_meta_meta_image_idx" ON "products" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "product_sub_categories_category_idx" ON "product_sub_categories" USING btree ("category_id");
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_rich_text";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_title";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_image_id";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_description";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_rich_text";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_meta_title";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_meta_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_meta_description";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_content";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "product_categories_id";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "product_sub_categories_id";
  ALTER TABLE "product_sub_categories" DROP COLUMN IF EXISTS "product_categories_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_best_seller_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_best_seller_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"product_id" integer,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_buy_now" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_call_to_add_to_cart" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_call_to_action_post" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_highlight_center" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_highlight_left" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_highlight_right" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_posts_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_products_category_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_products_category" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_buy_now" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_call_to_add_to_cart" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_call_to_action_post" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_highlight_center" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_highlight_left" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_highlight_right" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_posts_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_products_category_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_products_category" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_buy_now" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_call_to_add_to_cart" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_cta_center" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_cta_left" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_cta_right_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_cta_right" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_certificates_organizations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_certificates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_form_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_highlight_center" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_highlight_left" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_highlight_right" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_infinite_scroll" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_products_carousel_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_products_carousel" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_three_photo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_buy_now" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_call_to_add_to_cart" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_cta_center" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_cta_left" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_cta_right_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_cta_right" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_certificates_organizations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_certificates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_form_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_highlight_center" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_highlight_left" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_highlight_right" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_infinite_scroll" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_products_carousel_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_products_carousel" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_three_photo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_buy_now" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_call_to_add_to_cart" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_cta_center" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_cta_left" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_cta_right_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_cta_right" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_certificates_organizations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_certificates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_form_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_highlight_center" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_highlight_left" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_highlight_right" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_infinite_scroll" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_latest_posts_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_latest_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_products_carousel_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_products_carousel" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_three_photo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_buy_now" CASCADE;
  DROP TABLE "pages_blocks_call_to_add_to_cart" CASCADE;
  DROP TABLE "pages_blocks_call_to_action_post" CASCADE;
  DROP TABLE "pages_blocks_highlight_center" CASCADE;
  DROP TABLE "pages_blocks_highlight_left" CASCADE;
  DROP TABLE "pages_blocks_highlight_right" CASCADE;
  DROP TABLE "pages_blocks_posts_grid" CASCADE;
  DROP TABLE "pages_blocks_products_category_products" CASCADE;
  DROP TABLE "pages_blocks_products_category" CASCADE;
  DROP TABLE "_pages_v_blocks_buy_now" CASCADE;
  DROP TABLE "_pages_v_blocks_call_to_add_to_cart" CASCADE;
  DROP TABLE "_pages_v_blocks_call_to_action_post" CASCADE;
  DROP TABLE "_pages_v_blocks_highlight_center" CASCADE;
  DROP TABLE "_pages_v_blocks_highlight_left" CASCADE;
  DROP TABLE "_pages_v_blocks_highlight_right" CASCADE;
  DROP TABLE "_pages_v_blocks_posts_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_products_category_products" CASCADE;
  DROP TABLE "_pages_v_blocks_products_category" CASCADE;
  DROP TABLE "posts_blocks_archive" CASCADE;
  DROP TABLE "posts_blocks_buy_now" CASCADE;
  DROP TABLE "posts_blocks_call_to_add_to_cart" CASCADE;
  DROP TABLE "posts_blocks_cta_center" CASCADE;
  DROP TABLE "posts_blocks_cta_left" CASCADE;
  DROP TABLE "posts_blocks_cta_right_gallery" CASCADE;
  DROP TABLE "posts_blocks_cta_right" CASCADE;
  DROP TABLE "posts_blocks_certificates_organizations" CASCADE;
  DROP TABLE "posts_blocks_certificates" CASCADE;
  DROP TABLE "posts_blocks_content_columns" CASCADE;
  DROP TABLE "posts_blocks_content" CASCADE;
  DROP TABLE "posts_blocks_form_block" CASCADE;
  DROP TABLE "posts_blocks_highlight_center" CASCADE;
  DROP TABLE "posts_blocks_highlight_left" CASCADE;
  DROP TABLE "posts_blocks_highlight_right" CASCADE;
  DROP TABLE "posts_blocks_infinite_scroll" CASCADE;
  DROP TABLE "posts_blocks_media" CASCADE;
  DROP TABLE "posts_blocks_products_carousel_products" CASCADE;
  DROP TABLE "posts_blocks_products_carousel" CASCADE;
  DROP TABLE "posts_blocks_three_photo" CASCADE;
  DROP TABLE "_posts_v_blocks_archive" CASCADE;
  DROP TABLE "_posts_v_blocks_buy_now" CASCADE;
  DROP TABLE "_posts_v_blocks_call_to_add_to_cart" CASCADE;
  DROP TABLE "_posts_v_blocks_cta_center" CASCADE;
  DROP TABLE "_posts_v_blocks_cta_left" CASCADE;
  DROP TABLE "_posts_v_blocks_cta_right_gallery" CASCADE;
  DROP TABLE "_posts_v_blocks_cta_right" CASCADE;
  DROP TABLE "_posts_v_blocks_certificates_organizations" CASCADE;
  DROP TABLE "_posts_v_blocks_certificates" CASCADE;
  DROP TABLE "_posts_v_blocks_content_columns" CASCADE;
  DROP TABLE "_posts_v_blocks_content" CASCADE;
  DROP TABLE "_posts_v_blocks_form_block" CASCADE;
  DROP TABLE "_posts_v_blocks_highlight_center" CASCADE;
  DROP TABLE "_posts_v_blocks_highlight_left" CASCADE;
  DROP TABLE "_posts_v_blocks_highlight_right" CASCADE;
  DROP TABLE "_posts_v_blocks_infinite_scroll" CASCADE;
  DROP TABLE "_posts_v_blocks_media" CASCADE;
  DROP TABLE "_posts_v_blocks_products_carousel_products" CASCADE;
  DROP TABLE "_posts_v_blocks_products_carousel" CASCADE;
  DROP TABLE "_posts_v_blocks_three_photo" CASCADE;
  DROP TABLE "products_blocks_archive" CASCADE;
  DROP TABLE "products_blocks_buy_now" CASCADE;
  DROP TABLE "products_blocks_call_to_add_to_cart" CASCADE;
  DROP TABLE "products_blocks_cta_center" CASCADE;
  DROP TABLE "products_blocks_cta_left" CASCADE;
  DROP TABLE "products_blocks_cta_right_gallery" CASCADE;
  DROP TABLE "products_blocks_cta_right" CASCADE;
  DROP TABLE "products_blocks_certificates_organizations" CASCADE;
  DROP TABLE "products_blocks_certificates" CASCADE;
  DROP TABLE "products_blocks_content_columns" CASCADE;
  DROP TABLE "products_blocks_content" CASCADE;
  DROP TABLE "products_blocks_form_block" CASCADE;
  DROP TABLE "products_blocks_highlight_center" CASCADE;
  DROP TABLE "products_blocks_highlight_left" CASCADE;
  DROP TABLE "products_blocks_highlight_right" CASCADE;
  DROP TABLE "products_blocks_infinite_scroll" CASCADE;
  DROP TABLE "products_blocks_latest_posts_posts" CASCADE;
  DROP TABLE "products_blocks_latest_posts" CASCADE;
  DROP TABLE "products_blocks_media" CASCADE;
  DROP TABLE "products_blocks_products_carousel_products" CASCADE;
  DROP TABLE "products_blocks_products_carousel" CASCADE;
  DROP TABLE "products_blocks_three_photo" CASCADE;
  DROP TABLE "products_rels" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_meta_meta_image_id_media_id_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_products_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_product_categories_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_product_sub_categories_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_meta_meta_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_products_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_product_categories_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_product_sub_categories_fk";
  
  ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_pages_fk";
  
  ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_products_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_pages_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_products_fk";
  
  ALTER TABLE "products" DROP CONSTRAINT "products_hero_media_id_media_id_fk";
  
  ALTER TABLE "products" DROP CONSTRAINT "products_meta_image_id_media_id_fk";
  
  ALTER TABLE "product_sub_categories" DROP CONSTRAINT "product_sub_categories_category_id_product_categories_id_fk";
  
  DROP INDEX IF EXISTS "pages_meta_meta_meta_meta_image_idx";
  DROP INDEX IF EXISTS "pages_rels_products_id_idx";
  DROP INDEX IF EXISTS "pages_rels_product_categories_id_idx";
  DROP INDEX IF EXISTS "pages_rels_product_sub_categories_id_idx";
  DROP INDEX IF EXISTS "_pages_v_version_meta_meta_version_meta_meta_image_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_products_id_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_product_categories_id_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_product_sub_categories_id_idx";
  DROP INDEX IF EXISTS "posts_rels_pages_id_idx";
  DROP INDEX IF EXISTS "posts_rels_products_id_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_pages_id_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_products_id_idx";
  DROP INDEX IF EXISTS "products_hero_media_idx";
  DROP INDEX IF EXISTS "products_meta_meta_image_idx";
  DROP INDEX IF EXISTS "products_slug_idx";
  DROP INDEX IF EXISTS "product_sub_categories_category_idx";
  ALTER TABLE "pages" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "pages" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_rich_text" jsonb;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "posts" ADD COLUMN "content" jsonb;
  ALTER TABLE "_posts_v" ADD COLUMN "version_content" jsonb;
  ALTER TABLE "products" ADD COLUMN "product_categories_id" integer;
  ALTER TABLE "products" ADD COLUMN "product_sub_categories_id" integer;
  ALTER TABLE "product_sub_categories" ADD COLUMN "product_categories_id" integer NOT NULL;
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
   ALTER TABLE "_pages_v_blocks_best_seller_products" ADD CONSTRAINT "_pages_v_blocks_best_seller_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_best_seller_products" ADD CONSTRAINT "_pages_v_blocks_best_seller_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_best_seller"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_best_seller_products_order_idx" ON "pages_blocks_best_seller_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_best_seller_products_parent_id_idx" ON "pages_blocks_best_seller_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_best_seller_products_product_idx" ON "pages_blocks_best_seller_products" USING btree ("product_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_best_seller_products_order_idx" ON "_pages_v_blocks_best_seller_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_best_seller_products_parent_id_idx" ON "_pages_v_blocks_best_seller_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_best_seller_products_product_idx" ON "_pages_v_blocks_best_seller_products" USING btree ("product_id");
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_product_categories_id_product_categories_id_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_product_sub_categories_id_product_sub_categories_id_fk" FOREIGN KEY ("product_sub_categories_id") REFERENCES "public"."product_sub_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "product_sub_categories" ADD CONSTRAINT "product_sub_categories_product_categories_id_product_categories_id_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX IF NOT EXISTS "products_product_categories_idx" ON "products" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "products_product_sub_categories_idx" ON "products" USING btree ("product_sub_categories_id");
  CREATE INDEX IF NOT EXISTS "product_sub_categories_product_categories_idx" ON "product_sub_categories" USING btree ("product_categories_id");
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_title";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_subtitle";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_description";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_meta_title";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_meta_image_id";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_meta_description";
  ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "products_id";
  ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "product_categories_id";
  ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "product_sub_categories_id";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_title";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_subtitle";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_description";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_meta_meta_title";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_meta_meta_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_meta_meta_description";
  ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "products_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "product_categories_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "product_sub_categories_id";
  ALTER TABLE "posts_rels" DROP COLUMN IF EXISTS "pages_id";
  ALTER TABLE "posts_rels" DROP COLUMN IF EXISTS "products_id";
  ALTER TABLE "_posts_v_rels" DROP COLUMN IF EXISTS "pages_id";
  ALTER TABLE "_posts_v_rels" DROP COLUMN IF EXISTS "products_id";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "hero_title";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "hero_subtitle";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "hero_description";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "hero_media_id";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "meta_title";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "meta_image_id";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "meta_description";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "slug_lock";
  ALTER TABLE "product_sub_categories" DROP COLUMN IF EXISTS "category_id";
  DROP TYPE "public"."enum_posts_blocks_archive_populate_by";
  DROP TYPE "public"."enum_posts_blocks_archive_relation_to";
  DROP TYPE "public"."enum_posts_blocks_cta_center_button_link_type";
  DROP TYPE "public"."enum_posts_blocks_cta_left_button_link_type";
  DROP TYPE "public"."enum_posts_blocks_cta_right_button_link_type";
  DROP TYPE "public"."enum_posts_blocks_content_columns_size";
  DROP TYPE "public"."enum_posts_blocks_content_columns_font";
  DROP TYPE "public"."enum_posts_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_posts_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__posts_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__posts_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__posts_v_blocks_cta_center_button_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_cta_left_button_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_cta_right_button_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__posts_v_blocks_content_columns_font";
  DROP TYPE "public"."enum__posts_v_blocks_content_columns_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_products_blocks_archive_populate_by";
  DROP TYPE "public"."enum_products_blocks_archive_relation_to";
  DROP TYPE "public"."enum_products_blocks_cta_center_button_link_type";
  DROP TYPE "public"."enum_products_blocks_cta_left_button_link_type";
  DROP TYPE "public"."enum_products_blocks_cta_right_button_link_type";
  DROP TYPE "public"."enum_products_blocks_content_columns_size";
  DROP TYPE "public"."enum_products_blocks_content_columns_font";
  DROP TYPE "public"."enum_products_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_products_blocks_content_columns_link_appearance";`)
}
