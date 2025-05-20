import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_pages_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum_pages_blocks_banner_style" AS ENUM('info', 'warning', 'error', 'success');
  CREATE TYPE "public"."enum_pages_blocks_cta_center_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_left_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_right_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_font" AS ENUM('default', 'serif', 'sans-serif', 'monospace');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_products_carousel_apb_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum_pages_footer_size" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum__pages_v_blocks_banner_style" AS ENUM('info', 'warning', 'error', 'success');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_center_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_left_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_right_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_font" AS ENUM('default', 'serif', 'sans-serif', 'monospace');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_products_carousel_apb_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum__pages_v_version_footer_size" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_post_categories_footer_size" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum_posts_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_posts_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum_posts_blocks_cta_center_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_blocks_cta_left_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_blocks_cta_right_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_posts_blocks_content_columns_font" AS ENUM('default', 'serif', 'sans-serif', 'monospace');
  CREATE TYPE "public"."enum_posts_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_blocks_products_carousel_apb_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_footer_size" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__posts_v_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_center_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_left_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_right_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__posts_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__posts_v_blocks_content_columns_font" AS ENUM('default', 'serif', 'sans-serif', 'monospace');
  CREATE TYPE "public"."enum__posts_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__posts_v_blocks_products_carousel_apb_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__posts_v_version_footer_size" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_product_categories_footer_size" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum_products_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_products_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum_products_blocks_cta_center_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_products_blocks_cta_left_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_products_blocks_cta_right_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_products_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_products_blocks_content_columns_font" AS ENUM('default', 'serif', 'sans-serif', 'monospace');
  CREATE TYPE "public"."enum_products_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_products_blocks_products_carousel_apb_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_products_reviews_visible" AS ENUM('show', 'hide');
  CREATE TYPE "public"."enum_products_footer_size" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum_product_sub_categories_footer_size" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'sales-manager', 'content-manager');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_header_global_header_items_left_kind" AS ENUM('prebuilt', 'internalUrl', 'customUrl');
  CREATE TYPE "public"."enum_header_global_header_items_left_prebuilt" AS ENUM('search', 'products', 'about', 'events', 'contact', 'vie-en', 'cart');
  CREATE TYPE "public"."enum_header_global_header_items_right_kind" AS ENUM('prebuilt', 'internalUrl', 'customUrl');
  CREATE TYPE "public"."enum_header_global_header_items_right_prebuilt" AS ENUM('search', 'products', 'about', 'events', 'contact', 'vie-en', 'cart');
  CREATE TYPE "public"."enum_promo_global_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE IF NOT EXISTS "customers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"email" varchar,
  	"phone_number" varchar,
  	"address" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "contact_form" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"username" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone_number" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum_pages_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_pages_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_pages_blocks_banner_style" DEFAULT 'info',
  	"content" jsonb,
  	"block_name" varchar
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
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_buy_now" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_label" varchar DEFAULT 'MUA NGAY',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_cta_center" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub_title" varchar,
  	"description" jsonb,
  	"background_id" integer,
  	"button_text" varchar,
  	"button_link_type" "enum_pages_blocks_cta_center_button_link_type" DEFAULT 'reference',
  	"button_link_new_tab" boolean,
  	"button_link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_cta_left" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub_title" varchar,
  	"description" jsonb,
  	"background_id" integer,
  	"button_text" varchar,
  	"button_link_type" "enum_pages_blocks_cta_left_button_link_type" DEFAULT 'reference',
  	"button_link_new_tab" boolean,
  	"button_link_url" varchar,
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
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_cta_right_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_cta_right" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub_title" varchar,
  	"description" jsonb,
  	"button_text" varchar,
  	"button_link_type" "enum_pages_blocks_cta_right_button_link_type" DEFAULT 'reference',
  	"button_link_new_tab" boolean,
  	"button_link_url" varchar,
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
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_certificates_organizations" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"logo_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_certificates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Chứng nhận bởi các tổ chức quốc tế',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_blocks_content_columns_size" DEFAULT 'full',
  	"font" "enum_pages_blocks_content_columns_font" DEFAULT 'default',
  	"custom_css" varchar DEFAULT '',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_pages_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
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
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_infinite_scroll" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"graphic_id" integer,
  	"animation_duration" numeric DEFAULT 5,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_latest_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Bài viết mới nhất',
  	"button_label" varchar DEFAULT 'TẤT CẢ BÀI VIẾT',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_posts_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"post_categories_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_products_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Sản phẩm bán chạy',
  	"watch_more_btn_label" varchar DEFAULT 'XEM THÊM',
  	"apb_type" "enum_pages_blocks_products_carousel_apb_type" DEFAULT 'reference',
  	"apb_new_tab" boolean,
  	"apb_url" varchar,
  	"apb_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_products_category" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_label" varchar DEFAULT 'XEM TẤT CẢ CÁC SẢN PHẨM',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_three_photo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_left_id" integer,
  	"photo_center_id" integer,
  	"photo_right_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_type" "enum_pages_hero_type" DEFAULT 'lowImpact',
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"hero_description" jsonb,
  	"hero_media_id" integer,
  	"meta_meta_title" varchar,
  	"meta_meta_image_id" integer,
  	"meta_meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"footer_size" "enum_pages_footer_size" DEFAULT 'small',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_rels" (
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
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum__pages_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__pages_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__pages_v_blocks_banner_style" DEFAULT 'info',
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
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
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_buy_now" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_label" varchar DEFAULT 'MUA NGAY',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta_center" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub_title" varchar,
  	"description" jsonb,
  	"background_id" integer,
  	"button_text" varchar,
  	"button_link_type" "enum__pages_v_blocks_cta_center_button_link_type" DEFAULT 'reference',
  	"button_link_new_tab" boolean,
  	"button_link_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta_left" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub_title" varchar,
  	"description" jsonb,
  	"background_id" integer,
  	"button_text" varchar,
  	"button_link_type" "enum__pages_v_blocks_cta_left_button_link_type" DEFAULT 'reference',
  	"button_link_new_tab" boolean,
  	"button_link_url" varchar,
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
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta_right_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta_right" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub_title" varchar,
  	"description" jsonb,
  	"button_text" varchar,
  	"button_link_type" "enum__pages_v_blocks_cta_right_button_link_type" DEFAULT 'reference',
  	"button_link_new_tab" boolean,
  	"button_link_url" varchar,
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
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_certificates_organizations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"logo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_certificates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Chứng nhận bởi các tổ chức quốc tế',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__pages_v_blocks_content_columns_size" DEFAULT 'full',
  	"font" "enum__pages_v_blocks_content_columns_font" DEFAULT 'default',
  	"custom_css" varchar DEFAULT '',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum__pages_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_form_block" (
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
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_infinite_scroll" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"graphic_id" integer,
  	"animation_duration" numeric DEFAULT 5,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_latest_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Bài viết mới nhất',
  	"button_label" varchar DEFAULT 'TẤT CẢ BÀI VIẾT',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_posts_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"post_categories_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_products_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Sản phẩm bán chạy',
  	"watch_more_btn_label" varchar DEFAULT 'XEM THÊM',
  	"apb_type" "enum__pages_v_blocks_products_carousel_apb_type" DEFAULT 'reference',
  	"apb_new_tab" boolean,
  	"apb_url" varchar,
  	"apb_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
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
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_three_photo" (
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
  
  CREATE TABLE IF NOT EXISTS "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_type" "enum__pages_v_version_hero_type" DEFAULT 'lowImpact',
  	"version_hero_title" varchar,
  	"version_hero_subtitle" varchar,
  	"version_hero_description" jsonb,
  	"version_hero_media_id" integer,
  	"version_meta_meta_title" varchar,
  	"version_meta_meta_image_id" integer,
  	"version_meta_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_footer_size" "enum__pages_v_version_footer_size" DEFAULT 'small',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_rels" (
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
  
  CREATE TABLE IF NOT EXISTS "post_categories_blocks_call_to_action_post" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"post_id" integer NOT NULL,
  	"overwrite_title" varchar,
  	"overwrite_description" varchar,
  	"button_label" varchar DEFAULT 'ĐỌC BÀI VIẾT' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "post_categories_blocks_posts_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"post_categories_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "post_categories_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "post_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"footer_size" "enum_post_categories_footer_size" DEFAULT 'small',
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
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
  	"link_label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_focus_left_small_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_focus_right_large_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_focus_right_small_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"content" jsonb,
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
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_products_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Sản phẩm bán chạy',
  	"watch_more_btn_label" varchar DEFAULT 'XEM THÊM',
  	"apb_type" "enum_posts_blocks_products_carousel_apb_type" DEFAULT 'reference',
  	"apb_new_tab" boolean,
  	"apb_url" varchar,
  	"apb_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_products_category" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_label" varchar DEFAULT 'XEM TẤT CẢ CÁC SẢN PHẨM',
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
  
  CREATE TABLE IF NOT EXISTS "posts_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_image_id" integer,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"footer_size" "enum_posts_footer_size" DEFAULT 'small',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"post_categories_id" integer,
  	"posts_id" integer,
  	"pages_id" integer,
  	"product_categories_id" integer,
  	"products_id" integer,
  	"product_sub_categories_id" integer,
  	"users_id" integer
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
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_focus_left_small_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_focus_right_large_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_focus_right_small_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"content" jsonb,
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
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_products_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Sản phẩm bán chạy',
  	"watch_more_btn_label" varchar DEFAULT 'XEM THÊM',
  	"apb_type" "enum__posts_v_blocks_products_carousel_apb_type" DEFAULT 'reference',
  	"apb_new_tab" boolean,
  	"apb_url" varchar,
  	"apb_label" varchar,
  	"_uuid" varchar,
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
  
  CREATE TABLE IF NOT EXISTS "_posts_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_image_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_footer_size" "enum__posts_v_version_footer_size" DEFAULT 'small',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"post_categories_id" integer,
  	"posts_id" integer,
  	"pages_id" integer,
  	"product_categories_id" integer,
  	"products_id" integer,
  	"product_sub_categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "product_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"footer_size" "enum_product_categories_footer_size" DEFAULT 'small',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
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
  	"link_label" varchar
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
  
  CREATE TABLE IF NOT EXISTS "products_blocks_infinite_scroll" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"graphic_id" integer NOT NULL,
  	"animation_duration" numeric DEFAULT 5,
  	"block_name" varchar
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
  
  CREATE TABLE IF NOT EXISTS "products_blocks_products_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Sản phẩm bán chạy' NOT NULL,
  	"watch_more_btn_label" varchar DEFAULT 'XEM THÊM' NOT NULL,
  	"apb_type" "enum_products_blocks_products_carousel_apb_type" DEFAULT 'reference',
  	"apb_new_tab" boolean,
  	"apb_url" varchar,
  	"apb_label" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_three_photo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_left_id" integer,
  	"photo_center_id" integer,
  	"photo_right_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"short_description" varchar NOT NULL,
  	"long_description" jsonb,
  	"price" numeric NOT NULL,
  	"icon_id" integer,
  	"reviews_visible" "enum_products_reviews_visible" DEFAULT 'show',
  	"hero_subtitle" varchar,
  	"hero_title" varchar,
  	"hero_description" jsonb,
  	"hero_media_id" integer,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"footer_size" "enum_products_footer_size" DEFAULT 'small',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"product_categories_id" integer,
  	"product_sub_categories_id" integer,
  	"media_id" integer,
  	"post_categories_id" integer,
  	"posts_id" integer,
  	"pages_id" integer,
  	"products_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "product_sub_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"product_categories_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"footer_size" "enum_product_sub_categories_footer_size" DEFAULT 'small',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
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
  
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" "enum_users_role" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''''ve received a new message.' NOT NULL,
  	"message" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"submit_button_label" varchar,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "search_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"relation_to" varchar,
  	"title" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "search" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"priority" numeric,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "search_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"customers_id" integer,
  	"contact_form_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"post_categories_id" integer,
  	"posts_id" integer,
  	"product_categories_id" integer,
  	"products_id" integer,
  	"product_sub_categories_id" integer,
  	"orders_id" integer,
  	"users_id" integer,
  	"redirects_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"search_id" integer,
  	"payload_jobs_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "checkout_page_global" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"contacts_title" varchar DEFAULT 'Thông tin liên hệ của bạn' NOT NULL,
  	"contacts_email_input_label" varchar DEFAULT 'Nhập địa chỉ email' NOT NULL,
  	"contacts_accept_newsletter" varchar DEFAULT 'Tôi đồng ý nhận mọi thông tin khuyến mãi' NOT NULL,
  	"address_title" varchar DEFAULT 'Địa chỉ giao hàng' NOT NULL,
  	"address_name_input_label" varchar DEFAULT 'Họ và tên' NOT NULL,
  	"address_phone_input_label" varchar DEFAULT 'Số điện thoại' NOT NULL,
  	"address_province_city_input_label" varchar DEFAULT 'Chọn Tỉnh/Thành phố' NOT NULL,
  	"address_district_input_label" varchar DEFAULT 'Chọn Quận/Huyện' NOT NULL,
  	"address_ward_input_label" varchar DEFAULT 'Chọn Phuờng/Xã' NOT NULL,
  	"address_details" varchar DEFAULT 'Số nhà, đường, khu vực' NOT NULL,
  	"address_save_for_next_time" varchar DEFAULT 'Lưu thông tin thanh toán cho những lần tiếp theo' NOT NULL,
  	"shipping_title" varchar DEFAULT 'Phuơng thức vận chuyển' NOT NULL,
  	"shipping_standard_shipping_label" varchar DEFAULT 'Giao hàng tiêu chuẩn (2-3 ngày)' NOT NULL,
  	"shipping_fast_shipping_label" varchar DEFAULT 'Giao hàng nhanh (1-2 ngày)' NOT NULL,
  	"payment_title" varchar DEFAULT 'Phương thức thanh toán' NOT NULL,
  	"payment_cod_label" varchar DEFAULT 'Thanh toán khi nhận hàng (COD)' NOT NULL,
  	"payment_bank_transfer_label" varchar DEFAULT 'Chuyển khoản ngân hàng (QR)' NOT NULL,
  	"gift_title" varchar DEFAULT 'Tặng quà' NOT NULL,
  	"gift_sender_input_label" varchar DEFAULT 'Tên người gửi' NOT NULL,
  	"gift_recipient_input_label" varchar DEFAULT 'Tên người nhận' NOT NULL,
  	"gift_message_input_label" varchar DEFAULT 'Thông điệp. Giới hạn 1000 chữ.' NOT NULL,
  	"order_title" varchar DEFAULT 'Chi tiết đơn hàng' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "contact_form_global" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Liên hệ với BioLAK' NOT NULL,
  	"name" varchar DEFAULT 'Nhập tên của bạn' NOT NULL,
  	"phone_number" varchar DEFAULT 'Nhập số điện thoại' NOT NULL,
  	"email" varchar DEFAULT 'Nhập địa chỉ email' NOT NULL,
  	"question" varchar DEFAULT 'Câu hỏi của bạn tới chúng tôi' NOT NULL,
  	"action_send" varchar DEFAULT 'GỬI BIOLAK' NOT NULL,
  	"biolak_phone_number" varchar DEFAULT '0987654321',
  	"action_call" varchar DEFAULT 'GỌI BIOLAK' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
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
  
  CREATE TABLE IF NOT EXISTS "footer_global" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_image_id" integer,
  	"contact_us_title" varchar DEFAULT 'Đăng kí để nhận thông tin khuyến mãi sớm nhất từ BioLAK' NOT NULL,
  	"contact_us_email_input_label" varchar DEFAULT 'Nhập địa chỉ Email' NOT NULL,
  	"contact_us_description" varchar DEFAULT 'Đăng kí để nhận thông tin liên lạc về các sản phẩm, dịch vụ, cửa hàng, sự kiện và các vấn đề đáng quan tâm của BioLAK.' NOT NULL,
  	"legal_title" varchar DEFAULT 'Website thuộc quyền của công ty trách nhiệm hữu hạn ELAK' NOT NULL,
  	"legal_content" varchar DEFAULT 'GCNDKKD 0107874681 | Sở kế hoạch và đầu tư TP. Hà Nội
  cấp ngày 05/06/2017,
  đăng ký thay đổi lần 2 ngày 12/01/2024
  Địa chỉ: Xóm 5 thôn Long Phú, xã Hòa Thạch, huyện Quốc Oai,
  TP Hà Nội, Việt Nam.
  Điện thoại: 0983335596 - Email: info@biolak.vn' NOT NULL,
  	"legal_stamp_id" integer NOT NULL,
  	"legal_copyright" varchar DEFAULT '© 2025 BioLAK Vietnam. All rights reserved.' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "header_global_header_items_left" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_header_global_header_items_left_kind" DEFAULT 'internalUrl',
  	"prebuilt" "enum_header_global_header_items_left_prebuilt",
  	"custom_url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "header_global_header_items_right" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_header_global_header_items_right_kind" DEFAULT 'internalUrl',
  	"prebuilt" "enum_header_global_header_items_right_prebuilt",
  	"custom_url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "header_global" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "header_global_rels" (
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
  
  DO $$ BEGIN
   ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_archive" ADD CONSTRAINT "pages_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_banner" ADD CONSTRAINT "pages_blocks_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_best_seller" ADD CONSTRAINT "pages_blocks_best_seller_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_buy_now" ADD CONSTRAINT "pages_blocks_buy_now_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta_center" ADD CONSTRAINT "pages_blocks_cta_center_background_id_media_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta_center" ADD CONSTRAINT "pages_blocks_cta_center_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta_left" ADD CONSTRAINT "pages_blocks_cta_left_background_id_media_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta_left" ADD CONSTRAINT "pages_blocks_cta_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "pages_blocks_cta_right_gallery" ADD CONSTRAINT "pages_blocks_cta_right_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta_right_gallery" ADD CONSTRAINT "pages_blocks_cta_right_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_right"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta_right" ADD CONSTRAINT "pages_blocks_cta_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "pages_blocks_certificates_organizations" ADD CONSTRAINT "pages_blocks_certificates_organizations_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_certificates_organizations" ADD CONSTRAINT "pages_blocks_certificates_organizations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_certificates"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_certificates" ADD CONSTRAINT "pages_blocks_certificates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_content" ADD CONSTRAINT "pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "pages_blocks_infinite_scroll" ADD CONSTRAINT "pages_blocks_infinite_scroll_graphic_id_media_id_fk" FOREIGN KEY ("graphic_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_infinite_scroll" ADD CONSTRAINT "pages_blocks_infinite_scroll_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_latest_posts" ADD CONSTRAINT "pages_blocks_latest_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_media" ADD CONSTRAINT "pages_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_media" ADD CONSTRAINT "pages_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_posts_grid" ADD CONSTRAINT "pages_blocks_posts_grid_post_categories_id_post_categories_id_fk" FOREIGN KEY ("post_categories_id") REFERENCES "public"."post_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_posts_grid" ADD CONSTRAINT "pages_blocks_posts_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_products_carousel" ADD CONSTRAINT "pages_blocks_products_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_products_category" ADD CONSTRAINT "pages_blocks_products_category_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_three_photo" ADD CONSTRAINT "pages_blocks_three_photo_photo_left_id_media_id_fk" FOREIGN KEY ("photo_left_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_three_photo" ADD CONSTRAINT "pages_blocks_three_photo_photo_center_id_media_id_fk" FOREIGN KEY ("photo_center_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_three_photo" ADD CONSTRAINT "pages_blocks_three_photo_photo_right_id_media_id_fk" FOREIGN KEY ("photo_right_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_three_photo" ADD CONSTRAINT "pages_blocks_three_photo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_meta_image_id_media_id_fk" FOREIGN KEY ("meta_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_post_categories_fk" FOREIGN KEY ("post_categories_id") REFERENCES "public"."post_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_product_sub_categories_fk" FOREIGN KEY ("product_sub_categories_id") REFERENCES "public"."product_sub_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_archive" ADD CONSTRAINT "_pages_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_banner" ADD CONSTRAINT "_pages_v_blocks_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_best_seller" ADD CONSTRAINT "_pages_v_blocks_best_seller_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_buy_now" ADD CONSTRAINT "_pages_v_blocks_buy_now_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta_center" ADD CONSTRAINT "_pages_v_blocks_cta_center_background_id_media_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta_center" ADD CONSTRAINT "_pages_v_blocks_cta_center_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta_left" ADD CONSTRAINT "_pages_v_blocks_cta_left_background_id_media_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta_left" ADD CONSTRAINT "_pages_v_blocks_cta_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "_pages_v_blocks_cta_right_gallery" ADD CONSTRAINT "_pages_v_blocks_cta_right_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta_right_gallery" ADD CONSTRAINT "_pages_v_blocks_cta_right_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_right"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta_right" ADD CONSTRAINT "_pages_v_blocks_cta_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "_pages_v_blocks_certificates_organizations" ADD CONSTRAINT "_pages_v_blocks_certificates_organizations_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_certificates_organizations" ADD CONSTRAINT "_pages_v_blocks_certificates_organizations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_certificates"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_certificates" ADD CONSTRAINT "_pages_v_blocks_certificates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_content" ADD CONSTRAINT "_pages_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "_pages_v_blocks_infinite_scroll" ADD CONSTRAINT "_pages_v_blocks_infinite_scroll_graphic_id_media_id_fk" FOREIGN KEY ("graphic_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_infinite_scroll" ADD CONSTRAINT "_pages_v_blocks_infinite_scroll_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_latest_posts" ADD CONSTRAINT "_pages_v_blocks_latest_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_media" ADD CONSTRAINT "_pages_v_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_media" ADD CONSTRAINT "_pages_v_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_posts_grid" ADD CONSTRAINT "_pages_v_blocks_posts_grid_post_categories_id_post_categories_id_fk" FOREIGN KEY ("post_categories_id") REFERENCES "public"."post_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_posts_grid" ADD CONSTRAINT "_pages_v_blocks_posts_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_products_carousel" ADD CONSTRAINT "_pages_v_blocks_products_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_products_category" ADD CONSTRAINT "_pages_v_blocks_products_category_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_three_photo" ADD CONSTRAINT "_pages_v_blocks_three_photo_photo_left_id_media_id_fk" FOREIGN KEY ("photo_left_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_three_photo" ADD CONSTRAINT "_pages_v_blocks_three_photo_photo_center_id_media_id_fk" FOREIGN KEY ("photo_center_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_three_photo" ADD CONSTRAINT "_pages_v_blocks_three_photo_photo_right_id_media_id_fk" FOREIGN KEY ("photo_right_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_three_photo" ADD CONSTRAINT "_pages_v_blocks_three_photo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_post_categories_fk" FOREIGN KEY ("post_categories_id") REFERENCES "public"."post_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_product_sub_categories_fk" FOREIGN KEY ("product_sub_categories_id") REFERENCES "public"."product_sub_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "post_categories_blocks_call_to_action_post" ADD CONSTRAINT "post_categories_blocks_call_to_action_post_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "post_categories_blocks_call_to_action_post" ADD CONSTRAINT "post_categories_blocks_call_to_action_post_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."post_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "post_categories_blocks_posts_grid" ADD CONSTRAINT "post_categories_blocks_posts_grid_post_categories_id_post_categories_id_fk" FOREIGN KEY ("post_categories_id") REFERENCES "public"."post_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "post_categories_blocks_posts_grid" ADD CONSTRAINT "post_categories_blocks_posts_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."post_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "post_categories_breadcrumbs" ADD CONSTRAINT "post_categories_breadcrumbs_doc_id_post_categories_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."post_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "post_categories_breadcrumbs" ADD CONSTRAINT "post_categories_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."post_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "post_categories" ADD CONSTRAINT "post_categories_parent_id_post_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."post_categories"("id") ON DELETE set null ON UPDATE no action;
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
   ALTER TABLE "posts_blocks_focus_left_small_image" ADD CONSTRAINT "posts_blocks_focus_left_small_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_focus_left_small_image" ADD CONSTRAINT "posts_blocks_focus_left_small_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_focus_right_large_image" ADD CONSTRAINT "posts_blocks_focus_right_large_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_focus_right_large_image" ADD CONSTRAINT "posts_blocks_focus_right_large_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_focus_right_small_image" ADD CONSTRAINT "posts_blocks_focus_right_small_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_focus_right_small_image" ADD CONSTRAINT "posts_blocks_focus_right_small_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "posts_blocks_products_carousel" ADD CONSTRAINT "posts_blocks_products_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_products_category" ADD CONSTRAINT "posts_blocks_products_category_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_post_categories_fk" FOREIGN KEY ("post_categories_id") REFERENCES "public"."post_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_product_sub_categories_fk" FOREIGN KEY ("product_sub_categories_id") REFERENCES "public"."product_sub_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "_posts_v_blocks_focus_left_small_image" ADD CONSTRAINT "_posts_v_blocks_focus_left_small_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_focus_left_small_image" ADD CONSTRAINT "_posts_v_blocks_focus_left_small_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_focus_right_large_image" ADD CONSTRAINT "_posts_v_blocks_focus_right_large_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_focus_right_large_image" ADD CONSTRAINT "_posts_v_blocks_focus_right_large_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_focus_right_small_image" ADD CONSTRAINT "_posts_v_blocks_focus_right_small_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_focus_right_small_image" ADD CONSTRAINT "_posts_v_blocks_focus_right_small_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "_posts_v_blocks_products_carousel" ADD CONSTRAINT "_posts_v_blocks_products_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_products_category" ADD CONSTRAINT "_posts_v_blocks_products_category_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_post_categories_fk" FOREIGN KEY ("post_categories_id") REFERENCES "public"."post_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_product_sub_categories_fk" FOREIGN KEY ("product_sub_categories_id") REFERENCES "public"."product_sub_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "products" ADD CONSTRAINT "products_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
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
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_product_sub_categories_fk" FOREIGN KEY ("product_sub_categories_id") REFERENCES "public"."product_sub_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_post_categories_fk" FOREIGN KEY ("post_categories_id") REFERENCES "public"."post_categories"("id") ON DELETE cascade ON UPDATE no action;
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
  
  DO $$ BEGIN
   ALTER TABLE "product_sub_categories" ADD CONSTRAINT "product_sub_categories_product_categories_id_product_categories_id_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
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
   ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_categories" ADD CONSTRAINT "search_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search" ADD CONSTRAINT "search_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_customers_fk" FOREIGN KEY ("customers_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_form_fk" FOREIGN KEY ("contact_form_id") REFERENCES "public"."contact_form"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_post_categories_fk" FOREIGN KEY ("post_categories_id") REFERENCES "public"."post_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_sub_categories_fk" FOREIGN KEY ("product_sub_categories_id") REFERENCES "public"."product_sub_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_orders_fk" FOREIGN KEY ("orders_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_fk" FOREIGN KEY ("search_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_jobs_fk" FOREIGN KEY ("payload_jobs_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "footer_global" ADD CONSTRAINT "footer_global_image_image_id_media_id_fk" FOREIGN KEY ("image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_global" ADD CONSTRAINT "footer_global_legal_stamp_id_media_id_fk" FOREIGN KEY ("legal_stamp_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_global_header_items_left" ADD CONSTRAINT "header_global_header_items_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_global"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_global_header_items_right" ADD CONSTRAINT "header_global_header_items_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_global"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
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
   ALTER TABLE "header_global_rels" ADD CONSTRAINT "header_global_rels_post_categories_fk" FOREIGN KEY ("post_categories_id") REFERENCES "public"."post_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_global_rels" ADD CONSTRAINT "header_global_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_global_rels" ADD CONSTRAINT "header_global_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_global_rels" ADD CONSTRAINT "header_global_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_global_rels" ADD CONSTRAINT "header_global_rels_product_sub_categories_fk" FOREIGN KEY ("product_sub_categories_id") REFERENCES "public"."product_sub_categories"("id") ON DELETE cascade ON UPDATE no action;
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
  CREATE INDEX IF NOT EXISTS "contact_form_updated_at_idx" ON "contact_form" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "contact_form_created_at_idx" ON "contact_form" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX IF NOT EXISTS "pages_hero_links_order_idx" ON "pages_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_hero_links_parent_id_idx" ON "pages_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_archive_order_idx" ON "pages_blocks_archive" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_archive_parent_id_idx" ON "pages_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_archive_path_idx" ON "pages_blocks_archive" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_banner_order_idx" ON "pages_blocks_banner" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_banner_parent_id_idx" ON "pages_blocks_banner" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_banner_path_idx" ON "pages_blocks_banner" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_best_seller_order_idx" ON "pages_blocks_best_seller" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_best_seller_parent_id_idx" ON "pages_blocks_best_seller" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_best_seller_path_idx" ON "pages_blocks_best_seller" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_buy_now_order_idx" ON "pages_blocks_buy_now" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_buy_now_parent_id_idx" ON "pages_blocks_buy_now" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_buy_now_path_idx" ON "pages_blocks_buy_now" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_center_order_idx" ON "pages_blocks_cta_center" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_center_parent_id_idx" ON "pages_blocks_cta_center" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_center_path_idx" ON "pages_blocks_cta_center" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_center_background_idx" ON "pages_blocks_cta_center" USING btree ("background_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_left_order_idx" ON "pages_blocks_cta_left" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_left_parent_id_idx" ON "pages_blocks_cta_left" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_left_path_idx" ON "pages_blocks_cta_left" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_left_background_idx" ON "pages_blocks_cta_left" USING btree ("background_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_action_post_order_idx" ON "pages_blocks_call_to_action_post" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_action_post_parent_id_idx" ON "pages_blocks_call_to_action_post" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_action_post_path_idx" ON "pages_blocks_call_to_action_post" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_action_post_post_idx" ON "pages_blocks_call_to_action_post" USING btree ("post_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_right_gallery_order_idx" ON "pages_blocks_cta_right_gallery" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_right_gallery_parent_id_idx" ON "pages_blocks_cta_right_gallery" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_right_gallery_image_idx" ON "pages_blocks_cta_right_gallery" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_right_order_idx" ON "pages_blocks_cta_right" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_right_parent_id_idx" ON "pages_blocks_cta_right" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_right_path_idx" ON "pages_blocks_cta_right" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_add_to_cart_order_idx" ON "pages_blocks_call_to_add_to_cart" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_add_to_cart_parent_id_idx" ON "pages_blocks_call_to_add_to_cart" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_add_to_cart_path_idx" ON "pages_blocks_call_to_add_to_cart" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_add_to_cart_image_idx" ON "pages_blocks_call_to_add_to_cart" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_certificates_organizations_order_idx" ON "pages_blocks_certificates_organizations" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_certificates_organizations_parent_id_idx" ON "pages_blocks_certificates_organizations" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_certificates_organizations_logo_idx" ON "pages_blocks_certificates_organizations" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_certificates_order_idx" ON "pages_blocks_certificates" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_certificates_parent_id_idx" ON "pages_blocks_certificates" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_certificates_path_idx" ON "pages_blocks_certificates" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_columns_order_idx" ON "pages_blocks_content_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_columns_parent_id_idx" ON "pages_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_order_idx" ON "pages_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_parent_id_idx" ON "pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_path_idx" ON "pages_blocks_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_order_idx" ON "pages_blocks_form_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_parent_id_idx" ON "pages_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_path_idx" ON "pages_blocks_form_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_form_idx" ON "pages_blocks_form_block" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_highlight_right_order_idx" ON "pages_blocks_highlight_right" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_highlight_right_parent_id_idx" ON "pages_blocks_highlight_right" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_highlight_right_path_idx" ON "pages_blocks_highlight_right" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_highlight_right_image_idx" ON "pages_blocks_highlight_right" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_highlight_center_order_idx" ON "pages_blocks_highlight_center" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_highlight_center_parent_id_idx" ON "pages_blocks_highlight_center" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_highlight_center_path_idx" ON "pages_blocks_highlight_center" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_highlight_center_image_idx" ON "pages_blocks_highlight_center" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_highlight_left_order_idx" ON "pages_blocks_highlight_left" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_highlight_left_parent_id_idx" ON "pages_blocks_highlight_left" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_highlight_left_path_idx" ON "pages_blocks_highlight_left" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_highlight_left_image_idx" ON "pages_blocks_highlight_left" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_infinite_scroll_order_idx" ON "pages_blocks_infinite_scroll" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_infinite_scroll_parent_id_idx" ON "pages_blocks_infinite_scroll" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_infinite_scroll_path_idx" ON "pages_blocks_infinite_scroll" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_infinite_scroll_graphic_idx" ON "pages_blocks_infinite_scroll" USING btree ("graphic_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_latest_posts_order_idx" ON "pages_blocks_latest_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_latest_posts_parent_id_idx" ON "pages_blocks_latest_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_latest_posts_path_idx" ON "pages_blocks_latest_posts" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_order_idx" ON "pages_blocks_media" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_parent_id_idx" ON "pages_blocks_media" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_path_idx" ON "pages_blocks_media" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_media_idx" ON "pages_blocks_media" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_posts_grid_order_idx" ON "pages_blocks_posts_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_posts_grid_parent_id_idx" ON "pages_blocks_posts_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_posts_grid_path_idx" ON "pages_blocks_posts_grid" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_posts_grid_post_categories_idx" ON "pages_blocks_posts_grid" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_products_carousel_order_idx" ON "pages_blocks_products_carousel" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_products_carousel_parent_id_idx" ON "pages_blocks_products_carousel" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_products_carousel_path_idx" ON "pages_blocks_products_carousel" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_products_category_order_idx" ON "pages_blocks_products_category" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_products_category_parent_id_idx" ON "pages_blocks_products_category" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_products_category_path_idx" ON "pages_blocks_products_category" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_three_photo_order_idx" ON "pages_blocks_three_photo" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_three_photo_parent_id_idx" ON "pages_blocks_three_photo" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_three_photo_path_idx" ON "pages_blocks_three_photo" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_three_photo_photo_left_idx" ON "pages_blocks_three_photo" USING btree ("photo_left_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_three_photo_photo_center_idx" ON "pages_blocks_three_photo" USING btree ("photo_center_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_three_photo_photo_right_idx" ON "pages_blocks_three_photo" USING btree ("photo_right_id");
  CREATE INDEX IF NOT EXISTS "pages_hero_hero_media_idx" ON "pages" USING btree ("hero_media_id");
  CREATE INDEX IF NOT EXISTS "pages_meta_meta_meta_meta_image_idx" ON "pages" USING btree ("meta_meta_image_id");
  CREATE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_post_categories_id_idx" ON "pages_rels" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_product_categories_id_idx" ON "pages_rels" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_products_id_idx" ON "pages_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_product_sub_categories_id_idx" ON "pages_rels" USING btree ("product_sub_categories_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_order_idx" ON "_pages_v_version_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_parent_id_idx" ON "_pages_v_version_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_archive_order_idx" ON "_pages_v_blocks_archive" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_archive_parent_id_idx" ON "_pages_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_archive_path_idx" ON "_pages_v_blocks_archive" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_banner_order_idx" ON "_pages_v_blocks_banner" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_banner_parent_id_idx" ON "_pages_v_blocks_banner" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_banner_path_idx" ON "_pages_v_blocks_banner" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_best_seller_order_idx" ON "_pages_v_blocks_best_seller" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_best_seller_parent_id_idx" ON "_pages_v_blocks_best_seller" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_best_seller_path_idx" ON "_pages_v_blocks_best_seller" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_buy_now_order_idx" ON "_pages_v_blocks_buy_now" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_buy_now_parent_id_idx" ON "_pages_v_blocks_buy_now" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_buy_now_path_idx" ON "_pages_v_blocks_buy_now" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_center_order_idx" ON "_pages_v_blocks_cta_center" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_center_parent_id_idx" ON "_pages_v_blocks_cta_center" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_center_path_idx" ON "_pages_v_blocks_cta_center" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_center_background_idx" ON "_pages_v_blocks_cta_center" USING btree ("background_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_left_order_idx" ON "_pages_v_blocks_cta_left" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_left_parent_id_idx" ON "_pages_v_blocks_cta_left" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_left_path_idx" ON "_pages_v_blocks_cta_left" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_left_background_idx" ON "_pages_v_blocks_cta_left" USING btree ("background_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_action_post_order_idx" ON "_pages_v_blocks_call_to_action_post" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_action_post_parent_id_idx" ON "_pages_v_blocks_call_to_action_post" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_action_post_path_idx" ON "_pages_v_blocks_call_to_action_post" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_action_post_post_idx" ON "_pages_v_blocks_call_to_action_post" USING btree ("post_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_right_gallery_order_idx" ON "_pages_v_blocks_cta_right_gallery" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_right_gallery_parent_id_idx" ON "_pages_v_blocks_cta_right_gallery" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_right_gallery_image_idx" ON "_pages_v_blocks_cta_right_gallery" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_right_order_idx" ON "_pages_v_blocks_cta_right" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_right_parent_id_idx" ON "_pages_v_blocks_cta_right" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_right_path_idx" ON "_pages_v_blocks_cta_right" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_add_to_cart_order_idx" ON "_pages_v_blocks_call_to_add_to_cart" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_add_to_cart_parent_id_idx" ON "_pages_v_blocks_call_to_add_to_cart" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_add_to_cart_path_idx" ON "_pages_v_blocks_call_to_add_to_cart" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_call_to_add_to_cart_image_idx" ON "_pages_v_blocks_call_to_add_to_cart" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_certificates_organizations_order_idx" ON "_pages_v_blocks_certificates_organizations" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_certificates_organizations_parent_id_idx" ON "_pages_v_blocks_certificates_organizations" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_certificates_organizations_logo_idx" ON "_pages_v_blocks_certificates_organizations" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_certificates_order_idx" ON "_pages_v_blocks_certificates" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_certificates_parent_id_idx" ON "_pages_v_blocks_certificates" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_certificates_path_idx" ON "_pages_v_blocks_certificates" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_columns_order_idx" ON "_pages_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_columns_parent_id_idx" ON "_pages_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_order_idx" ON "_pages_v_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_parent_id_idx" ON "_pages_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_path_idx" ON "_pages_v_blocks_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_order_idx" ON "_pages_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_parent_id_idx" ON "_pages_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_path_idx" ON "_pages_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_form_idx" ON "_pages_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_right_order_idx" ON "_pages_v_blocks_highlight_right" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_right_parent_id_idx" ON "_pages_v_blocks_highlight_right" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_right_path_idx" ON "_pages_v_blocks_highlight_right" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_right_image_idx" ON "_pages_v_blocks_highlight_right" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_center_order_idx" ON "_pages_v_blocks_highlight_center" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_center_parent_id_idx" ON "_pages_v_blocks_highlight_center" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_center_path_idx" ON "_pages_v_blocks_highlight_center" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_center_image_idx" ON "_pages_v_blocks_highlight_center" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_left_order_idx" ON "_pages_v_blocks_highlight_left" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_left_parent_id_idx" ON "_pages_v_blocks_highlight_left" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_left_path_idx" ON "_pages_v_blocks_highlight_left" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_highlight_left_image_idx" ON "_pages_v_blocks_highlight_left" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_infinite_scroll_order_idx" ON "_pages_v_blocks_infinite_scroll" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_infinite_scroll_parent_id_idx" ON "_pages_v_blocks_infinite_scroll" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_infinite_scroll_path_idx" ON "_pages_v_blocks_infinite_scroll" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_infinite_scroll_graphic_idx" ON "_pages_v_blocks_infinite_scroll" USING btree ("graphic_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_latest_posts_order_idx" ON "_pages_v_blocks_latest_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_latest_posts_parent_id_idx" ON "_pages_v_blocks_latest_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_latest_posts_path_idx" ON "_pages_v_blocks_latest_posts" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_order_idx" ON "_pages_v_blocks_media" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_parent_id_idx" ON "_pages_v_blocks_media" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_path_idx" ON "_pages_v_blocks_media" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_media_idx" ON "_pages_v_blocks_media" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_posts_grid_order_idx" ON "_pages_v_blocks_posts_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_posts_grid_parent_id_idx" ON "_pages_v_blocks_posts_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_posts_grid_path_idx" ON "_pages_v_blocks_posts_grid" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_posts_grid_post_categories_idx" ON "_pages_v_blocks_posts_grid" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_products_carousel_order_idx" ON "_pages_v_blocks_products_carousel" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_products_carousel_parent_id_idx" ON "_pages_v_blocks_products_carousel" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_products_carousel_path_idx" ON "_pages_v_blocks_products_carousel" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_products_category_order_idx" ON "_pages_v_blocks_products_category" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_products_category_parent_id_idx" ON "_pages_v_blocks_products_category" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_products_category_path_idx" ON "_pages_v_blocks_products_category" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_three_photo_order_idx" ON "_pages_v_blocks_three_photo" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_three_photo_parent_id_idx" ON "_pages_v_blocks_three_photo" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_three_photo_path_idx" ON "_pages_v_blocks_three_photo" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_three_photo_photo_left_idx" ON "_pages_v_blocks_three_photo" USING btree ("photo_left_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_three_photo_photo_center_idx" ON "_pages_v_blocks_three_photo" USING btree ("photo_center_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_three_photo_photo_right_idx" ON "_pages_v_blocks_three_photo" USING btree ("photo_right_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_version_hero_media_idx" ON "_pages_v" USING btree ("version_hero_media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_meta_meta_version_meta_meta_image_idx" ON "_pages_v" USING btree ("version_meta_meta_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_post_categories_id_idx" ON "_pages_v_rels" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_product_categories_id_idx" ON "_pages_v_rels" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_products_id_idx" ON "_pages_v_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_product_sub_categories_id_idx" ON "_pages_v_rels" USING btree ("product_sub_categories_id");
  CREATE INDEX IF NOT EXISTS "post_categories_blocks_call_to_action_post_order_idx" ON "post_categories_blocks_call_to_action_post" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "post_categories_blocks_call_to_action_post_parent_id_idx" ON "post_categories_blocks_call_to_action_post" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "post_categories_blocks_call_to_action_post_path_idx" ON "post_categories_blocks_call_to_action_post" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "post_categories_blocks_call_to_action_post_post_idx" ON "post_categories_blocks_call_to_action_post" USING btree ("post_id");
  CREATE INDEX IF NOT EXISTS "post_categories_blocks_posts_grid_order_idx" ON "post_categories_blocks_posts_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "post_categories_blocks_posts_grid_parent_id_idx" ON "post_categories_blocks_posts_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "post_categories_blocks_posts_grid_path_idx" ON "post_categories_blocks_posts_grid" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "post_categories_blocks_posts_grid_post_categories_idx" ON "post_categories_blocks_posts_grid" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "post_categories_breadcrumbs_order_idx" ON "post_categories_breadcrumbs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "post_categories_breadcrumbs_parent_id_idx" ON "post_categories_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "post_categories_breadcrumbs_doc_idx" ON "post_categories_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX IF NOT EXISTS "post_categories_slug_idx" ON "post_categories" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "post_categories_parent_idx" ON "post_categories" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "post_categories_updated_at_idx" ON "post_categories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "post_categories_created_at_idx" ON "post_categories" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "posts_blocks_archive_order_idx" ON "posts_blocks_archive" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_archive_parent_id_idx" ON "posts_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_archive_path_idx" ON "posts_blocks_archive" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_buy_now_order_idx" ON "posts_blocks_buy_now" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_buy_now_parent_id_idx" ON "posts_blocks_buy_now" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_buy_now_path_idx" ON "posts_blocks_buy_now" USING btree ("_path");
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
  CREATE INDEX IF NOT EXISTS "posts_blocks_call_to_add_to_cart_order_idx" ON "posts_blocks_call_to_add_to_cart" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_call_to_add_to_cart_parent_id_idx" ON "posts_blocks_call_to_add_to_cart" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_call_to_add_to_cart_path_idx" ON "posts_blocks_call_to_add_to_cart" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_call_to_add_to_cart_image_idx" ON "posts_blocks_call_to_add_to_cart" USING btree ("image_id");
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
  CREATE INDEX IF NOT EXISTS "posts_blocks_focus_left_small_image_order_idx" ON "posts_blocks_focus_left_small_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_focus_left_small_image_parent_id_idx" ON "posts_blocks_focus_left_small_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_focus_left_small_image_path_idx" ON "posts_blocks_focus_left_small_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_focus_left_small_image_image_idx" ON "posts_blocks_focus_left_small_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_focus_right_large_image_order_idx" ON "posts_blocks_focus_right_large_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_focus_right_large_image_parent_id_idx" ON "posts_blocks_focus_right_large_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_focus_right_large_image_path_idx" ON "posts_blocks_focus_right_large_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_focus_right_large_image_image_idx" ON "posts_blocks_focus_right_large_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_focus_right_small_image_order_idx" ON "posts_blocks_focus_right_small_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_focus_right_small_image_parent_id_idx" ON "posts_blocks_focus_right_small_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_focus_right_small_image_path_idx" ON "posts_blocks_focus_right_small_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_focus_right_small_image_image_idx" ON "posts_blocks_focus_right_small_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_form_block_order_idx" ON "posts_blocks_form_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_form_block_parent_id_idx" ON "posts_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_form_block_path_idx" ON "posts_blocks_form_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_form_block_form_idx" ON "posts_blocks_form_block" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_highlight_right_order_idx" ON "posts_blocks_highlight_right" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_highlight_right_parent_id_idx" ON "posts_blocks_highlight_right" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_highlight_right_path_idx" ON "posts_blocks_highlight_right" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_highlight_right_image_idx" ON "posts_blocks_highlight_right" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_highlight_center_order_idx" ON "posts_blocks_highlight_center" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_highlight_center_parent_id_idx" ON "posts_blocks_highlight_center" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_highlight_center_path_idx" ON "posts_blocks_highlight_center" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_highlight_center_image_idx" ON "posts_blocks_highlight_center" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_highlight_left_order_idx" ON "posts_blocks_highlight_left" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_highlight_left_parent_id_idx" ON "posts_blocks_highlight_left" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_highlight_left_path_idx" ON "posts_blocks_highlight_left" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_highlight_left_image_idx" ON "posts_blocks_highlight_left" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_infinite_scroll_order_idx" ON "posts_blocks_infinite_scroll" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_infinite_scroll_parent_id_idx" ON "posts_blocks_infinite_scroll" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_infinite_scroll_path_idx" ON "posts_blocks_infinite_scroll" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_infinite_scroll_graphic_idx" ON "posts_blocks_infinite_scroll" USING btree ("graphic_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_media_order_idx" ON "posts_blocks_media" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_media_parent_id_idx" ON "posts_blocks_media" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_media_path_idx" ON "posts_blocks_media" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_media_media_idx" ON "posts_blocks_media" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_products_carousel_order_idx" ON "posts_blocks_products_carousel" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_products_carousel_parent_id_idx" ON "posts_blocks_products_carousel" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_products_carousel_path_idx" ON "posts_blocks_products_carousel" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_products_category_order_idx" ON "posts_blocks_products_category" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_products_category_parent_id_idx" ON "posts_blocks_products_category" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_products_category_path_idx" ON "posts_blocks_products_category" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_three_photo_order_idx" ON "posts_blocks_three_photo" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_three_photo_parent_id_idx" ON "posts_blocks_three_photo" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_three_photo_path_idx" ON "posts_blocks_three_photo" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_three_photo_photo_left_idx" ON "posts_blocks_three_photo" USING btree ("photo_left_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_three_photo_photo_center_idx" ON "posts_blocks_three_photo" USING btree ("photo_center_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_three_photo_photo_right_idx" ON "posts_blocks_three_photo" USING btree ("photo_right_id");
  CREATE INDEX IF NOT EXISTS "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_hero_image_idx" ON "posts" USING btree ("hero_image_id");
  CREATE INDEX IF NOT EXISTS "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "posts_rels_post_categories_id_idx" ON "posts_rels" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_pages_id_idx" ON "posts_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_product_categories_id_idx" ON "posts_rels" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_products_id_idx" ON "posts_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_product_sub_categories_id_idx" ON "posts_rels" USING btree ("product_sub_categories_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_archive_order_idx" ON "_posts_v_blocks_archive" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_archive_parent_id_idx" ON "_posts_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_archive_path_idx" ON "_posts_v_blocks_archive" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_buy_now_order_idx" ON "_posts_v_blocks_buy_now" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_buy_now_parent_id_idx" ON "_posts_v_blocks_buy_now" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_buy_now_path_idx" ON "_posts_v_blocks_buy_now" USING btree ("_path");
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
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_call_to_add_to_cart_order_idx" ON "_posts_v_blocks_call_to_add_to_cart" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_call_to_add_to_cart_parent_id_idx" ON "_posts_v_blocks_call_to_add_to_cart" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_call_to_add_to_cart_path_idx" ON "_posts_v_blocks_call_to_add_to_cart" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_call_to_add_to_cart_image_idx" ON "_posts_v_blocks_call_to_add_to_cart" USING btree ("image_id");
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
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_focus_left_small_image_order_idx" ON "_posts_v_blocks_focus_left_small_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_focus_left_small_image_parent_id_idx" ON "_posts_v_blocks_focus_left_small_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_focus_left_small_image_path_idx" ON "_posts_v_blocks_focus_left_small_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_focus_left_small_image_image_idx" ON "_posts_v_blocks_focus_left_small_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_focus_right_large_image_order_idx" ON "_posts_v_blocks_focus_right_large_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_focus_right_large_image_parent_id_idx" ON "_posts_v_blocks_focus_right_large_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_focus_right_large_image_path_idx" ON "_posts_v_blocks_focus_right_large_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_focus_right_large_image_image_idx" ON "_posts_v_blocks_focus_right_large_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_focus_right_small_image_order_idx" ON "_posts_v_blocks_focus_right_small_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_focus_right_small_image_parent_id_idx" ON "_posts_v_blocks_focus_right_small_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_focus_right_small_image_path_idx" ON "_posts_v_blocks_focus_right_small_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_focus_right_small_image_image_idx" ON "_posts_v_blocks_focus_right_small_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_form_block_order_idx" ON "_posts_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_form_block_parent_id_idx" ON "_posts_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_form_block_path_idx" ON "_posts_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_form_block_form_idx" ON "_posts_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_right_order_idx" ON "_posts_v_blocks_highlight_right" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_right_parent_id_idx" ON "_posts_v_blocks_highlight_right" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_right_path_idx" ON "_posts_v_blocks_highlight_right" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_right_image_idx" ON "_posts_v_blocks_highlight_right" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_center_order_idx" ON "_posts_v_blocks_highlight_center" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_center_parent_id_idx" ON "_posts_v_blocks_highlight_center" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_center_path_idx" ON "_posts_v_blocks_highlight_center" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_center_image_idx" ON "_posts_v_blocks_highlight_center" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_left_order_idx" ON "_posts_v_blocks_highlight_left" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_left_parent_id_idx" ON "_posts_v_blocks_highlight_left" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_left_path_idx" ON "_posts_v_blocks_highlight_left" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_highlight_left_image_idx" ON "_posts_v_blocks_highlight_left" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_infinite_scroll_order_idx" ON "_posts_v_blocks_infinite_scroll" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_infinite_scroll_parent_id_idx" ON "_posts_v_blocks_infinite_scroll" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_infinite_scroll_path_idx" ON "_posts_v_blocks_infinite_scroll" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_infinite_scroll_graphic_idx" ON "_posts_v_blocks_infinite_scroll" USING btree ("graphic_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_media_order_idx" ON "_posts_v_blocks_media" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_media_parent_id_idx" ON "_posts_v_blocks_media" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_media_path_idx" ON "_posts_v_blocks_media" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_media_media_idx" ON "_posts_v_blocks_media" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_products_carousel_order_idx" ON "_posts_v_blocks_products_carousel" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_products_carousel_parent_id_idx" ON "_posts_v_blocks_products_carousel" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_products_carousel_path_idx" ON "_posts_v_blocks_products_carousel" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_products_category_order_idx" ON "_posts_v_blocks_products_category" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_products_category_parent_id_idx" ON "_posts_v_blocks_products_category" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_products_category_path_idx" ON "_posts_v_blocks_products_category" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_three_photo_order_idx" ON "_posts_v_blocks_three_photo" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_three_photo_parent_id_idx" ON "_posts_v_blocks_three_photo" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_three_photo_path_idx" ON "_posts_v_blocks_three_photo" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_three_photo_photo_left_idx" ON "_posts_v_blocks_three_photo" USING btree ("photo_left_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_three_photo_photo_center_idx" ON "_posts_v_blocks_three_photo" USING btree ("photo_center_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_three_photo_photo_right_idx" ON "_posts_v_blocks_three_photo" USING btree ("photo_right_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_populated_authors_order_idx" ON "_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_populated_authors_parent_id_idx" ON "_posts_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_hero_image_idx" ON "_posts_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_post_categories_id_idx" ON "_posts_v_rels" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_pages_id_idx" ON "_posts_v_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_product_categories_id_idx" ON "_posts_v_rels" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_products_id_idx" ON "_posts_v_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_product_sub_categories_id_idx" ON "_posts_v_rels" USING btree ("product_sub_categories_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "product_categories_slug_idx" ON "product_categories" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "product_categories_updated_at_idx" ON "product_categories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "product_categories_created_at_idx" ON "product_categories" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "products_blocks_archive_order_idx" ON "products_blocks_archive" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_archive_parent_id_idx" ON "products_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_archive_path_idx" ON "products_blocks_archive" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_buy_now_order_idx" ON "products_blocks_buy_now" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_buy_now_parent_id_idx" ON "products_blocks_buy_now" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_buy_now_path_idx" ON "products_blocks_buy_now" USING btree ("_path");
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
  CREATE INDEX IF NOT EXISTS "products_blocks_call_to_add_to_cart_order_idx" ON "products_blocks_call_to_add_to_cart" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_call_to_add_to_cart_parent_id_idx" ON "products_blocks_call_to_add_to_cart" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_call_to_add_to_cart_path_idx" ON "products_blocks_call_to_add_to_cart" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_call_to_add_to_cart_image_idx" ON "products_blocks_call_to_add_to_cart" USING btree ("image_id");
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
  CREATE INDEX IF NOT EXISTS "products_blocks_highlight_right_order_idx" ON "products_blocks_highlight_right" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_highlight_right_parent_id_idx" ON "products_blocks_highlight_right" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_highlight_right_path_idx" ON "products_blocks_highlight_right" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_highlight_right_image_idx" ON "products_blocks_highlight_right" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_highlight_center_order_idx" ON "products_blocks_highlight_center" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_highlight_center_parent_id_idx" ON "products_blocks_highlight_center" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_highlight_center_path_idx" ON "products_blocks_highlight_center" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_highlight_center_image_idx" ON "products_blocks_highlight_center" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_highlight_left_order_idx" ON "products_blocks_highlight_left" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_highlight_left_parent_id_idx" ON "products_blocks_highlight_left" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_highlight_left_path_idx" ON "products_blocks_highlight_left" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_highlight_left_image_idx" ON "products_blocks_highlight_left" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_how_to_use_product_order_idx" ON "products_blocks_how_to_use_product" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_how_to_use_product_parent_id_idx" ON "products_blocks_how_to_use_product" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_how_to_use_product_path_idx" ON "products_blocks_how_to_use_product" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_how_to_use_product_image_idx" ON "products_blocks_how_to_use_product" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_infinite_scroll_order_idx" ON "products_blocks_infinite_scroll" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_infinite_scroll_parent_id_idx" ON "products_blocks_infinite_scroll" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_infinite_scroll_path_idx" ON "products_blocks_infinite_scroll" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_infinite_scroll_graphic_idx" ON "products_blocks_infinite_scroll" USING btree ("graphic_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_latest_posts_order_idx" ON "products_blocks_latest_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_latest_posts_parent_id_idx" ON "products_blocks_latest_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_latest_posts_path_idx" ON "products_blocks_latest_posts" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_media_order_idx" ON "products_blocks_media" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_media_parent_id_idx" ON "products_blocks_media" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_media_path_idx" ON "products_blocks_media" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_media_media_idx" ON "products_blocks_media" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_products_carousel_order_idx" ON "products_blocks_products_carousel" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_products_carousel_parent_id_idx" ON "products_blocks_products_carousel" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_products_carousel_path_idx" ON "products_blocks_products_carousel" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_three_photo_order_idx" ON "products_blocks_three_photo" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_three_photo_parent_id_idx" ON "products_blocks_three_photo" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_three_photo_path_idx" ON "products_blocks_three_photo" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "products_blocks_three_photo_photo_left_idx" ON "products_blocks_three_photo" USING btree ("photo_left_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_three_photo_photo_center_idx" ON "products_blocks_three_photo" USING btree ("photo_center_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_three_photo_photo_right_idx" ON "products_blocks_three_photo" USING btree ("photo_right_id");
  CREATE INDEX IF NOT EXISTS "products_icon_idx" ON "products" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "products_hero_media_idx" ON "products" USING btree ("hero_media_id");
  CREATE INDEX IF NOT EXISTS "products_meta_meta_image_idx" ON "products" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "products_rels_product_categories_id_idx" ON "products_rels" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "products_rels_product_sub_categories_id_idx" ON "products_rels" USING btree ("product_sub_categories_id");
  CREATE INDEX IF NOT EXISTS "products_rels_media_id_idx" ON "products_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "products_rels_post_categories_id_idx" ON "products_rels" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "products_rels_posts_id_idx" ON "products_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "products_rels_pages_id_idx" ON "products_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "products_rels_products_id_idx" ON "products_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "product_sub_categories_product_categories_idx" ON "product_sub_categories" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "product_sub_categories_slug_idx" ON "product_sub_categories" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "product_sub_categories_updated_at_idx" ON "product_sub_categories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "product_sub_categories_created_at_idx" ON "product_sub_categories" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "orders_products_idx" ON "orders" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "orders_customers_idx" ON "orders" USING btree ("customers_id");
  CREATE INDEX IF NOT EXISTS "orders_updated_at_idx" ON "orders" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "orders_created_at_idx" ON "orders" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX IF NOT EXISTS "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "search_categories_order_idx" ON "search_categories" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "search_categories_parent_id_idx" ON "search_categories" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "search_slug_idx" ON "search" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "search_meta_meta_image_idx" ON "search" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "search_updated_at_idx" ON "search" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "search_created_at_idx" ON "search" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "search_rels_order_idx" ON "search_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "search_rels_parent_idx" ON "search_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "search_rels_path_idx" ON "search_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "search_rels_posts_id_idx" ON "search_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX IF NOT EXISTS "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX IF NOT EXISTS "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX IF NOT EXISTS "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX IF NOT EXISTS "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX IF NOT EXISTS "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX IF NOT EXISTS "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX IF NOT EXISTS "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_customers_id_idx" ON "payload_locked_documents_rels" USING btree ("customers_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_contact_form_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_form_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_post_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_product_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_product_sub_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("product_sub_categories_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_orders_id_idx" ON "payload_locked_documents_rels" USING btree ("orders_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_search_id_idx" ON "payload_locked_documents_rels" USING btree ("search_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_payload_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_jobs_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "floating_global_links_order_idx" ON "floating_global_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "floating_global_links_parent_id_idx" ON "floating_global_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "floating_global_links_icon_idx" ON "floating_global_links" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "footer_global_image_image_image_idx" ON "footer_global" USING btree ("image_image_id");
  CREATE INDEX IF NOT EXISTS "footer_global_legal_legal_stamp_idx" ON "footer_global" USING btree ("legal_stamp_id");
  CREATE INDEX IF NOT EXISTS "header_global_header_items_left_order_idx" ON "header_global_header_items_left" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_global_header_items_left_parent_id_idx" ON "header_global_header_items_left" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_global_header_items_right_order_idx" ON "header_global_header_items_right" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_global_header_items_right_parent_id_idx" ON "header_global_header_items_right" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_global_rels_order_idx" ON "header_global_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "header_global_rels_parent_idx" ON "header_global_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "header_global_rels_path_idx" ON "header_global_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "header_global_rels_pages_id_idx" ON "header_global_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "header_global_rels_post_categories_id_idx" ON "header_global_rels" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "header_global_rels_posts_id_idx" ON "header_global_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "header_global_rels_product_categories_id_idx" ON "header_global_rels" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "header_global_rels_products_id_idx" ON "header_global_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "header_global_rels_product_sub_categories_id_idx" ON "header_global_rels" USING btree ("product_sub_categories_id");
  CREATE INDEX IF NOT EXISTS "promo_global_rels_order_idx" ON "promo_global_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "promo_global_rels_parent_idx" ON "promo_global_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "promo_global_rels_path_idx" ON "promo_global_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "promo_global_rels_pages_id_idx" ON "promo_global_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "promo_global_rels_post_categories_id_idx" ON "promo_global_rels" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "promo_global_rels_posts_id_idx" ON "promo_global_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "promo_global_rels_product_categories_id_idx" ON "promo_global_rels" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "promo_global_rels_products_id_idx" ON "promo_global_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "promo_global_rels_product_sub_categories_id_idx" ON "promo_global_rels" USING btree ("product_sub_categories_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "customers" CASCADE;
  DROP TABLE "contact_form" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages_hero_links" CASCADE;
  DROP TABLE "pages_blocks_archive" CASCADE;
  DROP TABLE "pages_blocks_banner" CASCADE;
  DROP TABLE "pages_blocks_best_seller" CASCADE;
  DROP TABLE "pages_blocks_buy_now" CASCADE;
  DROP TABLE "pages_blocks_cta_center" CASCADE;
  DROP TABLE "pages_blocks_cta_left" CASCADE;
  DROP TABLE "pages_blocks_call_to_action_post" CASCADE;
  DROP TABLE "pages_blocks_cta_right_gallery" CASCADE;
  DROP TABLE "pages_blocks_cta_right" CASCADE;
  DROP TABLE "pages_blocks_call_to_add_to_cart" CASCADE;
  DROP TABLE "pages_blocks_certificates_organizations" CASCADE;
  DROP TABLE "pages_blocks_certificates" CASCADE;
  DROP TABLE "pages_blocks_content_columns" CASCADE;
  DROP TABLE "pages_blocks_content" CASCADE;
  DROP TABLE "pages_blocks_form_block" CASCADE;
  DROP TABLE "pages_blocks_highlight_right" CASCADE;
  DROP TABLE "pages_blocks_highlight_center" CASCADE;
  DROP TABLE "pages_blocks_highlight_left" CASCADE;
  DROP TABLE "pages_blocks_infinite_scroll" CASCADE;
  DROP TABLE "pages_blocks_latest_posts" CASCADE;
  DROP TABLE "pages_blocks_media" CASCADE;
  DROP TABLE "pages_blocks_posts_grid" CASCADE;
  DROP TABLE "pages_blocks_products_carousel" CASCADE;
  DROP TABLE "pages_blocks_products_category" CASCADE;
  DROP TABLE "pages_blocks_three_photo" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_version_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_archive" CASCADE;
  DROP TABLE "_pages_v_blocks_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_best_seller" CASCADE;
  DROP TABLE "_pages_v_blocks_buy_now" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_center" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_left" CASCADE;
  DROP TABLE "_pages_v_blocks_call_to_action_post" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_right_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_right" CASCADE;
  DROP TABLE "_pages_v_blocks_call_to_add_to_cart" CASCADE;
  DROP TABLE "_pages_v_blocks_certificates_organizations" CASCADE;
  DROP TABLE "_pages_v_blocks_certificates" CASCADE;
  DROP TABLE "_pages_v_blocks_content_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_content" CASCADE;
  DROP TABLE "_pages_v_blocks_form_block" CASCADE;
  DROP TABLE "_pages_v_blocks_highlight_right" CASCADE;
  DROP TABLE "_pages_v_blocks_highlight_center" CASCADE;
  DROP TABLE "_pages_v_blocks_highlight_left" CASCADE;
  DROP TABLE "_pages_v_blocks_infinite_scroll" CASCADE;
  DROP TABLE "_pages_v_blocks_latest_posts" CASCADE;
  DROP TABLE "_pages_v_blocks_media" CASCADE;
  DROP TABLE "_pages_v_blocks_posts_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_products_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_products_category" CASCADE;
  DROP TABLE "_pages_v_blocks_three_photo" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "post_categories_blocks_call_to_action_post" CASCADE;
  DROP TABLE "post_categories_blocks_posts_grid" CASCADE;
  DROP TABLE "post_categories_breadcrumbs" CASCADE;
  DROP TABLE "post_categories" CASCADE;
  DROP TABLE "posts_blocks_archive" CASCADE;
  DROP TABLE "posts_blocks_buy_now" CASCADE;
  DROP TABLE "posts_blocks_cta_center" CASCADE;
  DROP TABLE "posts_blocks_cta_left" CASCADE;
  DROP TABLE "posts_blocks_cta_right_gallery" CASCADE;
  DROP TABLE "posts_blocks_cta_right" CASCADE;
  DROP TABLE "posts_blocks_call_to_add_to_cart" CASCADE;
  DROP TABLE "posts_blocks_certificates_organizations" CASCADE;
  DROP TABLE "posts_blocks_certificates" CASCADE;
  DROP TABLE "posts_blocks_content_columns" CASCADE;
  DROP TABLE "posts_blocks_content" CASCADE;
  DROP TABLE "posts_blocks_focus_left_small_image" CASCADE;
  DROP TABLE "posts_blocks_focus_right_large_image" CASCADE;
  DROP TABLE "posts_blocks_focus_right_small_image" CASCADE;
  DROP TABLE "posts_blocks_form_block" CASCADE;
  DROP TABLE "posts_blocks_highlight_right" CASCADE;
  DROP TABLE "posts_blocks_highlight_center" CASCADE;
  DROP TABLE "posts_blocks_highlight_left" CASCADE;
  DROP TABLE "posts_blocks_infinite_scroll" CASCADE;
  DROP TABLE "posts_blocks_media" CASCADE;
  DROP TABLE "posts_blocks_products_carousel" CASCADE;
  DROP TABLE "posts_blocks_products_category" CASCADE;
  DROP TABLE "posts_blocks_three_photo" CASCADE;
  DROP TABLE "posts_populated_authors" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_blocks_archive" CASCADE;
  DROP TABLE "_posts_v_blocks_buy_now" CASCADE;
  DROP TABLE "_posts_v_blocks_cta_center" CASCADE;
  DROP TABLE "_posts_v_blocks_cta_left" CASCADE;
  DROP TABLE "_posts_v_blocks_cta_right_gallery" CASCADE;
  DROP TABLE "_posts_v_blocks_cta_right" CASCADE;
  DROP TABLE "_posts_v_blocks_call_to_add_to_cart" CASCADE;
  DROP TABLE "_posts_v_blocks_certificates_organizations" CASCADE;
  DROP TABLE "_posts_v_blocks_certificates" CASCADE;
  DROP TABLE "_posts_v_blocks_content_columns" CASCADE;
  DROP TABLE "_posts_v_blocks_content" CASCADE;
  DROP TABLE "_posts_v_blocks_focus_left_small_image" CASCADE;
  DROP TABLE "_posts_v_blocks_focus_right_large_image" CASCADE;
  DROP TABLE "_posts_v_blocks_focus_right_small_image" CASCADE;
  DROP TABLE "_posts_v_blocks_form_block" CASCADE;
  DROP TABLE "_posts_v_blocks_highlight_right" CASCADE;
  DROP TABLE "_posts_v_blocks_highlight_center" CASCADE;
  DROP TABLE "_posts_v_blocks_highlight_left" CASCADE;
  DROP TABLE "_posts_v_blocks_infinite_scroll" CASCADE;
  DROP TABLE "_posts_v_blocks_media" CASCADE;
  DROP TABLE "_posts_v_blocks_products_carousel" CASCADE;
  DROP TABLE "_posts_v_blocks_products_category" CASCADE;
  DROP TABLE "_posts_v_blocks_three_photo" CASCADE;
  DROP TABLE "_posts_v_version_populated_authors" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "product_categories" CASCADE;
  DROP TABLE "products_blocks_archive" CASCADE;
  DROP TABLE "products_blocks_buy_now" CASCADE;
  DROP TABLE "products_blocks_cta_center" CASCADE;
  DROP TABLE "products_blocks_cta_left" CASCADE;
  DROP TABLE "products_blocks_cta_right_gallery" CASCADE;
  DROP TABLE "products_blocks_cta_right" CASCADE;
  DROP TABLE "products_blocks_call_to_add_to_cart" CASCADE;
  DROP TABLE "products_blocks_certificates_organizations" CASCADE;
  DROP TABLE "products_blocks_certificates" CASCADE;
  DROP TABLE "products_blocks_content_columns" CASCADE;
  DROP TABLE "products_blocks_content" CASCADE;
  DROP TABLE "products_blocks_form_block" CASCADE;
  DROP TABLE "products_blocks_highlight_right" CASCADE;
  DROP TABLE "products_blocks_highlight_center" CASCADE;
  DROP TABLE "products_blocks_highlight_left" CASCADE;
  DROP TABLE "products_blocks_how_to_use_product" CASCADE;
  DROP TABLE "products_blocks_infinite_scroll" CASCADE;
  DROP TABLE "products_blocks_latest_posts" CASCADE;
  DROP TABLE "products_blocks_media" CASCADE;
  DROP TABLE "products_blocks_products_carousel" CASCADE;
  DROP TABLE "products_blocks_three_photo" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_rels" CASCADE;
  DROP TABLE "product_sub_categories" CASCADE;
  DROP TABLE "orders" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "search_categories" CASCADE;
  DROP TABLE "search" CASCADE;
  DROP TABLE "search_rels" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "checkout_page_global" CASCADE;
  DROP TABLE "contact_form_global" CASCADE;
  DROP TABLE "floating_global_links" CASCADE;
  DROP TABLE "floating_global" CASCADE;
  DROP TABLE "footer_global" CASCADE;
  DROP TABLE "header_global_header_items_left" CASCADE;
  DROP TABLE "header_global_header_items_right" CASCADE;
  DROP TABLE "header_global" CASCADE;
  DROP TABLE "header_global_rels" CASCADE;
  DROP TABLE "popup_banner_global" CASCADE;
  DROP TABLE "promo_global" CASCADE;
  DROP TABLE "promo_global_rels" CASCADE;
  DROP TABLE "reviews_global" CASCADE;
  DROP TYPE "public"."enum_pages_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_archive_populate_by";
  DROP TYPE "public"."enum_pages_blocks_archive_relation_to";
  DROP TYPE "public"."enum_pages_blocks_banner_style";
  DROP TYPE "public"."enum_pages_blocks_cta_center_button_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_left_button_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_right_button_link_type";
  DROP TYPE "public"."enum_pages_blocks_content_columns_size";
  DROP TYPE "public"."enum_pages_blocks_content_columns_font";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_pages_blocks_products_carousel_apb_type";
  DROP TYPE "public"."enum_pages_hero_type";
  DROP TYPE "public"."enum_pages_footer_size";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__pages_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__pages_v_blocks_banner_style";
  DROP TYPE "public"."enum__pages_v_blocks_cta_center_button_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_left_button_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_right_button_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_font";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_products_carousel_apb_type";
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  DROP TYPE "public"."enum__pages_v_version_footer_size";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_post_categories_footer_size";
  DROP TYPE "public"."enum_posts_blocks_archive_populate_by";
  DROP TYPE "public"."enum_posts_blocks_archive_relation_to";
  DROP TYPE "public"."enum_posts_blocks_cta_center_button_link_type";
  DROP TYPE "public"."enum_posts_blocks_cta_left_button_link_type";
  DROP TYPE "public"."enum_posts_blocks_cta_right_button_link_type";
  DROP TYPE "public"."enum_posts_blocks_content_columns_size";
  DROP TYPE "public"."enum_posts_blocks_content_columns_font";
  DROP TYPE "public"."enum_posts_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_posts_blocks_products_carousel_apb_type";
  DROP TYPE "public"."enum_posts_footer_size";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__posts_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__posts_v_blocks_cta_center_button_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_cta_left_button_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_cta_right_button_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__posts_v_blocks_content_columns_font";
  DROP TYPE "public"."enum__posts_v_blocks_content_columns_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_products_carousel_apb_type";
  DROP TYPE "public"."enum__posts_v_version_footer_size";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_product_categories_footer_size";
  DROP TYPE "public"."enum_products_blocks_archive_populate_by";
  DROP TYPE "public"."enum_products_blocks_archive_relation_to";
  DROP TYPE "public"."enum_products_blocks_cta_center_button_link_type";
  DROP TYPE "public"."enum_products_blocks_cta_left_button_link_type";
  DROP TYPE "public"."enum_products_blocks_cta_right_button_link_type";
  DROP TYPE "public"."enum_products_blocks_content_columns_size";
  DROP TYPE "public"."enum_products_blocks_content_columns_font";
  DROP TYPE "public"."enum_products_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_products_blocks_products_carousel_apb_type";
  DROP TYPE "public"."enum_products_reviews_visible";
  DROP TYPE "public"."enum_products_footer_size";
  DROP TYPE "public"."enum_product_sub_categories_footer_size";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_header_global_header_items_left_kind";
  DROP TYPE "public"."enum_header_global_header_items_left_prebuilt";
  DROP TYPE "public"."enum_header_global_header_items_right_kind";
  DROP TYPE "public"."enum_header_global_header_items_right_prebuilt";
  DROP TYPE "public"."enum_promo_global_link_type";`)
}
