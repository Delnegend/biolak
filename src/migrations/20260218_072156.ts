import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`customers\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`email\` text,
  	\`receive_promotions\` integer,
  	\`phone_number\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`customers_email_idx\` ON \`customers\` (\`email\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`customers_phone_number_idx\` ON \`customers\` (\`phone_number\`);`)
  await db.run(sql`CREATE INDEX \`customers_updated_at_idx\` ON \`customers\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`customers_created_at_idx\` ON \`customers\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`contact_form\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`username\` text NOT NULL,
  	\`email\` text,
  	\`phone_number\` text NOT NULL,
  	\`message\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_form_updated_at_idx\` ON \`contact_form\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`contact_form_created_at_idx\` ON \`contact_form\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`discount_codes\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`code\` text NOT NULL,
  	\`amount\` numeric,
  	\`is_active\` integer DEFAULT true,
  	\`discount_type\` text DEFAULT 'percentage' NOT NULL,
  	\`value\` numeric DEFAULT 0 NOT NULL,
  	\`max_discount\` numeric,
  	\`expiration_date\` text,
  	\`all_products\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`discount_codes_code_idx\` ON \`discount_codes\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`discount_codes_updated_at_idx\` ON \`discount_codes\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`discount_codes_created_at_idx\` ON \`discount_codes\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`discount_codes_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`products_id\` integer,
  	\`product_categories_id\` integer,
  	\`product_sub_categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`discount_codes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`product_categories_id\`) REFERENCES \`product_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`product_sub_categories_id\`) REFERENCES \`product_sub_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`discount_codes_rels_order_idx\` ON \`discount_codes_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`discount_codes_rels_parent_idx\` ON \`discount_codes_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`discount_codes_rels_path_idx\` ON \`discount_codes_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`discount_codes_rels_products_id_idx\` ON \`discount_codes_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`discount_codes_rels_product_categories_id_idx\` ON \`discount_codes_rels\` (\`product_categories_id\`);`)
  await db.run(sql`CREATE INDEX \`discount_codes_rels_product_sub_categories_id_idx\` ON \`discount_codes_rels\` (\`product_sub_categories_id\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text,
  	\`caption\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text,
  	\`sizes_square_url\` text,
  	\`sizes_square_width\` numeric,
  	\`sizes_square_height\` numeric,
  	\`sizes_square_mime_type\` text,
  	\`sizes_square_filesize\` numeric,
  	\`sizes_square_filename\` text,
  	\`sizes_small_url\` text,
  	\`sizes_small_width\` numeric,
  	\`sizes_small_height\` numeric,
  	\`sizes_small_mime_type\` text,
  	\`sizes_small_filesize\` numeric,
  	\`sizes_small_filename\` text,
  	\`sizes_medium_url\` text,
  	\`sizes_medium_width\` numeric,
  	\`sizes_medium_height\` numeric,
  	\`sizes_medium_mime_type\` text,
  	\`sizes_medium_filesize\` numeric,
  	\`sizes_medium_filename\` text,
  	\`sizes_large_url\` text,
  	\`sizes_large_width\` numeric,
  	\`sizes_large_height\` numeric,
  	\`sizes_large_mime_type\` text,
  	\`sizes_large_filesize\` numeric,
  	\`sizes_large_filename\` text,
  	\`sizes_xlarge_url\` text,
  	\`sizes_xlarge_width\` numeric,
  	\`sizes_xlarge_height\` numeric,
  	\`sizes_xlarge_mime_type\` text,
  	\`sizes_xlarge_filesize\` numeric,
  	\`sizes_xlarge_filename\` text,
  	\`sizes_og_url\` text,
  	\`sizes_og_width\` numeric,
  	\`sizes_og_height\` numeric,
  	\`sizes_og_mime_type\` text,
  	\`sizes_og_filesize\` numeric,
  	\`sizes_og_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_square_sizes_square_filename_idx\` ON \`media\` (\`sizes_square_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_small_sizes_small_filename_idx\` ON \`media\` (\`sizes_small_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_medium_sizes_medium_filename_idx\` ON \`media\` (\`sizes_medium_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_large_sizes_large_filename_idx\` ON \`media\` (\`sizes_large_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_xlarge_sizes_xlarge_filename_idx\` ON \`media\` (\`sizes_xlarge_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_og_sizes_og_filename_idx\` ON \`media\` (\`sizes_og_filename\`);`)
  await db.run(sql`CREATE TABLE \`pages_hero_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_hero_links_order_idx\` ON \`pages_hero_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_links_parent_id_idx\` ON \`pages_hero_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_hero_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_hero_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_hero_links_locales_locale_parent_id_unique\` ON \`pages_hero_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_archive\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro_content\` text,
  	\`populate_by\` text DEFAULT 'collection',
  	\`relation_to\` text DEFAULT 'posts',
  	\`limit\` numeric DEFAULT 10,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_archive_order_idx\` ON \`pages_blocks_archive\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_archive_parent_id_idx\` ON \`pages_blocks_archive\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_archive_path_idx\` ON \`pages_blocks_archive\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_banner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'info',
  	\`content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_banner_order_idx\` ON \`pages_blocks_banner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_banner_parent_id_idx\` ON \`pages_blocks_banner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_banner_path_idx\` ON \`pages_blocks_banner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_best_seller\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_best_seller_order_idx\` ON \`pages_blocks_best_seller\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_best_seller_parent_id_idx\` ON \`pages_blocks_best_seller\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_best_seller_path_idx\` ON \`pages_blocks_best_seller\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_best_seller_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_best_seller\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_best_seller_locales_locale_parent_id_unique\` ON \`pages_blocks_best_seller_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_buy_now\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`products_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_buy_now_order_idx\` ON \`pages_blocks_buy_now\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_buy_now_parent_id_idx\` ON \`pages_blocks_buy_now\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_buy_now_path_idx\` ON \`pages_blocks_buy_now\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_buy_now_products_idx\` ON \`pages_blocks_buy_now\` (\`products_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_buy_now_locales\` (
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_buy_now\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_buy_now_locales_locale_parent_id_unique\` ON \`pages_blocks_buy_now_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta_center\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`background_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_center_order_idx\` ON \`pages_blocks_cta_center\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_center_parent_id_idx\` ON \`pages_blocks_cta_center\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_center_path_idx\` ON \`pages_blocks_cta_center\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_center_background_idx\` ON \`pages_blocks_cta_center\` (\`background_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta_center_locales\` (
  	\`title\` text,
  	\`sub_title\` text,
  	\`description\` text,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_cta_center\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_cta_center_locales_locale_parent_id_unique\` ON \`pages_blocks_cta_center_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta_left\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`background_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_left_order_idx\` ON \`pages_blocks_cta_left\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_left_parent_id_idx\` ON \`pages_blocks_cta_left\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_left_path_idx\` ON \`pages_blocks_cta_left\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_left_background_idx\` ON \`pages_blocks_cta_left\` (\`background_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta_left_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_cta_left\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_cta_left_locales_locale_parent_id_unique\` ON \`pages_blocks_cta_left_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_call_to_action_post\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`post_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`post_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_call_to_action_post_order_idx\` ON \`pages_blocks_call_to_action_post\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_call_to_action_post_parent_id_idx\` ON \`pages_blocks_call_to_action_post\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_call_to_action_post_path_idx\` ON \`pages_blocks_call_to_action_post\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_call_to_action_post_post_idx\` ON \`pages_blocks_call_to_action_post\` (\`post_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_call_to_action_post_locales\` (
  	\`overwrite_title\` text,
  	\`overwrite_description\` text,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_call_to_action_post\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_call_to_action_post_locales_locale_parent_id_unique\` ON \`pages_blocks_call_to_action_post_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta_right_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_cta_right\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_right_gallery_order_idx\` ON \`pages_blocks_cta_right_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_right_gallery_parent_id_idx\` ON \`pages_blocks_cta_right_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_right_gallery_image_idx\` ON \`pages_blocks_cta_right_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta_right_gallery_locales\` (
  	\`title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_cta_right_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_cta_right_gallery_locales_locale_parent_id_unique\` ON \`pages_blocks_cta_right_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta_right\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_right_order_idx\` ON \`pages_blocks_cta_right\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_right_parent_id_idx\` ON \`pages_blocks_cta_right\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_right_path_idx\` ON \`pages_blocks_cta_right\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta_right_locales\` (
  	\`title\` text,
  	\`sub_title\` text,
  	\`description\` text,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_cta_right\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_cta_right_locales_locale_parent_id_unique\` ON \`pages_blocks_cta_right_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_call_to_add_to_cart\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`products_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_call_to_add_to_cart_order_idx\` ON \`pages_blocks_call_to_add_to_cart\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_call_to_add_to_cart_parent_id_idx\` ON \`pages_blocks_call_to_add_to_cart\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_call_to_add_to_cart_path_idx\` ON \`pages_blocks_call_to_add_to_cart\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_call_to_add_to_cart_image_idx\` ON \`pages_blocks_call_to_add_to_cart\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_call_to_add_to_cart_products_idx\` ON \`pages_blocks_call_to_add_to_cart\` (\`products_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_call_to_add_to_cart_locales\` (
  	\`content\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_call_to_add_to_cart\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_call_to_add_to_cart_locales_locale_parent_id_unique\` ON \`pages_blocks_call_to_add_to_cart_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_certificates_organizations\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_certificates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_certificates_organizations_order_idx\` ON \`pages_blocks_certificates_organizations\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_certificates_organizations_parent_id_idx\` ON \`pages_blocks_certificates_organizations\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_certificates_organizations_logo_idx\` ON \`pages_blocks_certificates_organizations\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_certificates_organizations_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_certificates_organizations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_certificates_organizations_locales_locale_parent_id_unique\` ON \`pages_blocks_certificates_organizations_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_certificates\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_certificates_order_idx\` ON \`pages_blocks_certificates\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_certificates_parent_id_idx\` ON \`pages_blocks_certificates\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_certificates_path_idx\` ON \`pages_blocks_certificates\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_certificates_locales\` (
  	\`title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_certificates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_certificates_locales_locale_parent_id_unique\` ON \`pages_blocks_certificates_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_content_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'full',
  	\`font\` text DEFAULT 'default',
  	\`custom_css\` text DEFAULT '',
  	\`rich_text\` text,
  	\`enable_link\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_columns_order_idx\` ON \`pages_blocks_content_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_columns_parent_id_idx\` ON \`pages_blocks_content_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_columns_locale_idx\` ON \`pages_blocks_content_columns\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_order_idx\` ON \`pages_blocks_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_parent_id_idx\` ON \`pages_blocks_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_path_idx\` ON \`pages_blocks_content\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`form_id\` integer,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_order_idx\` ON \`pages_blocks_form_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_parent_id_idx\` ON \`pages_blocks_form_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_path_idx\` ON \`pages_blocks_form_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_form_idx\` ON \`pages_blocks_form_block\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_highlight_right\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`order\` numeric,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_highlight_right_order_idx\` ON \`pages_blocks_highlight_right\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_highlight_right_parent_id_idx\` ON \`pages_blocks_highlight_right\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_highlight_right_path_idx\` ON \`pages_blocks_highlight_right\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_highlight_right_image_idx\` ON \`pages_blocks_highlight_right\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_highlight_right_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_highlight_right\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_highlight_right_locales_locale_parent_id_unique\` ON \`pages_blocks_highlight_right_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_highlight_center\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`order\` numeric,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_highlight_center_order_idx\` ON \`pages_blocks_highlight_center\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_highlight_center_parent_id_idx\` ON \`pages_blocks_highlight_center\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_highlight_center_path_idx\` ON \`pages_blocks_highlight_center\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_highlight_center_image_idx\` ON \`pages_blocks_highlight_center\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_highlight_center_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_highlight_center\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_highlight_center_locales_locale_parent_id_unique\` ON \`pages_blocks_highlight_center_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_highlight_left\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`order\` numeric,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_highlight_left_order_idx\` ON \`pages_blocks_highlight_left\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_highlight_left_parent_id_idx\` ON \`pages_blocks_highlight_left\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_highlight_left_path_idx\` ON \`pages_blocks_highlight_left\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_highlight_left_image_idx\` ON \`pages_blocks_highlight_left\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_highlight_left_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_highlight_left\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_highlight_left_locales_locale_parent_id_unique\` ON \`pages_blocks_highlight_left_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_infinite_scroll\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_infinite_scroll_order_idx\` ON \`pages_blocks_infinite_scroll\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_infinite_scroll_parent_id_idx\` ON \`pages_blocks_infinite_scroll\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_infinite_scroll_path_idx\` ON \`pages_blocks_infinite_scroll\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_infinite_scroll_locales\` (
  	\`graphic_id\` integer,
  	\`animation_duration\` numeric DEFAULT 10,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`graphic_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_infinite_scroll\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_infinite_scroll_graphic_idx\` ON \`pages_blocks_infinite_scroll_locales\` (\`graphic_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_infinite_scroll_locales_locale_parent_id_unique\` ON \`pages_blocks_infinite_scroll_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_latest_posts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_latest_posts_order_idx\` ON \`pages_blocks_latest_posts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_latest_posts_parent_id_idx\` ON \`pages_blocks_latest_posts\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_latest_posts_path_idx\` ON \`pages_blocks_latest_posts\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_latest_posts_locales\` (
  	\`title\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_latest_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_latest_posts_locales_locale_parent_id_unique\` ON \`pages_blocks_latest_posts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_media\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_media_order_idx\` ON \`pages_blocks_media\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_media_parent_id_idx\` ON \`pages_blocks_media\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_media_path_idx\` ON \`pages_blocks_media\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_media_media_idx\` ON \`pages_blocks_media\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_posts_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`show_title\` integer DEFAULT false,
  	\`post_categories_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`post_categories_id\`) REFERENCES \`post_categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_posts_grid_order_idx\` ON \`pages_blocks_posts_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_posts_grid_parent_id_idx\` ON \`pages_blocks_posts_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_posts_grid_path_idx\` ON \`pages_blocks_posts_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_posts_grid_post_categories_idx\` ON \`pages_blocks_posts_grid\` (\`post_categories_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_products_carousel\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_products_carousel_order_idx\` ON \`pages_blocks_products_carousel\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_products_carousel_parent_id_idx\` ON \`pages_blocks_products_carousel\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_products_carousel_path_idx\` ON \`pages_blocks_products_carousel\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_products_carousel_locales\` (
  	\`title\` text,
  	\`watch_more_btn_label\` text,
  	\`apb_type\` text DEFAULT 'reference',
  	\`apb_new_tab\` integer,
  	\`apb_url\` text,
  	\`apb_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_products_carousel\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_products_carousel_locales_locale_parent_id_unique\` ON \`pages_blocks_products_carousel_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_products_category\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_products_category_order_idx\` ON \`pages_blocks_products_category\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_products_category_parent_id_idx\` ON \`pages_blocks_products_category\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_products_category_path_idx\` ON \`pages_blocks_products_category\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_products_category_locales\` (
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_products_category\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_products_category_locales_locale_parent_id_unique\` ON \`pages_blocks_products_category_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_three_photo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`photo_left_id\` integer,
  	\`photo_center_id\` integer,
  	\`photo_right_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`photo_left_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`photo_center_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`photo_right_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_three_photo_order_idx\` ON \`pages_blocks_three_photo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_three_photo_parent_id_idx\` ON \`pages_blocks_three_photo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_three_photo_path_idx\` ON \`pages_blocks_three_photo\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_three_photo_photo_left_idx\` ON \`pages_blocks_three_photo\` (\`photo_left_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_three_photo_photo_center_idx\` ON \`pages_blocks_three_photo\` (\`photo_center_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_three_photo_photo_right_idx\` ON \`pages_blocks_three_photo\` (\`photo_right_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_video_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`video_url\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_embed_order_idx\` ON \`pages_blocks_video_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_embed_parent_id_idx\` ON \`pages_blocks_video_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_embed_path_idx\` ON \`pages_blocks_video_embed\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`hero_type\` text DEFAULT 'lowImpact',
  	\`hero_title\` text,
  	\`hero_subtitle\` text,
  	\`hero_description\` text,
  	\`hero_media_id\` integer,
  	\`published_at\` text,
  	\`slug\` text,
  	\`slug_lock\` integer DEFAULT true,
  	\`footer_size\` text DEFAULT 'small',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_hero_hero_media_idx\` ON \`pages\` (\`hero_media_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`pages_locales\` (
  	\`meta_meta_title\` text,
  	\`meta_meta_image_id\` integer,
  	\`meta_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_meta_meta_meta_meta_image_idx\` ON \`pages_locales\` (\`meta_meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_locales_locale_parent_id_unique\` ON \`pages_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`locale\` text,
  	\`pages_id\` integer,
  	\`post_categories_id\` integer,
  	\`posts_id\` integer,
  	\`product_categories_id\` integer,
  	\`products_id\` integer,
  	\`product_sub_categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`post_categories_id\`) REFERENCES \`post_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`product_categories_id\`) REFERENCES \`product_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`product_sub_categories_id\`) REFERENCES \`product_sub_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_locale_idx\` ON \`pages_rels\` (\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_pages_id_idx\` ON \`pages_rels\` (\`pages_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_post_categories_id_idx\` ON \`pages_rels\` (\`post_categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_posts_id_idx\` ON \`pages_rels\` (\`posts_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_product_categories_id_idx\` ON \`pages_rels\` (\`product_categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_products_id_idx\` ON \`pages_rels\` (\`products_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_product_sub_categories_id_idx\` ON \`pages_rels\` (\`product_sub_categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_version_hero_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_links_order_idx\` ON \`_pages_v_version_hero_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_links_parent_id_idx\` ON \`_pages_v_version_hero_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_version_hero_links_locales\` (
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_version_hero_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_version_hero_links_locales_locale_parent_id_unique\` ON \`_pages_v_version_hero_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_archive\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`intro_content\` text,
  	\`populate_by\` text DEFAULT 'collection',
  	\`relation_to\` text DEFAULT 'posts',
  	\`limit\` numeric DEFAULT 10,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_archive_order_idx\` ON \`_pages_v_blocks_archive\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_archive_parent_id_idx\` ON \`_pages_v_blocks_archive\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_archive_path_idx\` ON \`_pages_v_blocks_archive\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_banner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'info',
  	\`content\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_banner_order_idx\` ON \`_pages_v_blocks_banner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_banner_parent_id_idx\` ON \`_pages_v_blocks_banner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_banner_path_idx\` ON \`_pages_v_blocks_banner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_best_seller\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_best_seller_order_idx\` ON \`_pages_v_blocks_best_seller\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_best_seller_parent_id_idx\` ON \`_pages_v_blocks_best_seller\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_best_seller_path_idx\` ON \`_pages_v_blocks_best_seller\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_best_seller_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_best_seller\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_best_seller_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_best_seller_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_buy_now\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`products_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_buy_now_order_idx\` ON \`_pages_v_blocks_buy_now\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_buy_now_parent_id_idx\` ON \`_pages_v_blocks_buy_now\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_buy_now_path_idx\` ON \`_pages_v_blocks_buy_now\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_buy_now_products_idx\` ON \`_pages_v_blocks_buy_now\` (\`products_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_buy_now_locales\` (
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_buy_now\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_buy_now_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_buy_now_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta_center\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`background_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_center_order_idx\` ON \`_pages_v_blocks_cta_center\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_center_parent_id_idx\` ON \`_pages_v_blocks_cta_center\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_center_path_idx\` ON \`_pages_v_blocks_cta_center\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_center_background_idx\` ON \`_pages_v_blocks_cta_center\` (\`background_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta_center_locales\` (
  	\`title\` text,
  	\`sub_title\` text,
  	\`description\` text,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_cta_center\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_cta_center_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_cta_center_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta_left\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`background_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_left_order_idx\` ON \`_pages_v_blocks_cta_left\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_left_parent_id_idx\` ON \`_pages_v_blocks_cta_left\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_left_path_idx\` ON \`_pages_v_blocks_cta_left\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_left_background_idx\` ON \`_pages_v_blocks_cta_left\` (\`background_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta_left_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_cta_left\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_cta_left_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_cta_left_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_call_to_action_post\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`post_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`post_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_call_to_action_post_order_idx\` ON \`_pages_v_blocks_call_to_action_post\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_call_to_action_post_parent_id_idx\` ON \`_pages_v_blocks_call_to_action_post\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_call_to_action_post_path_idx\` ON \`_pages_v_blocks_call_to_action_post\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_call_to_action_post_post_idx\` ON \`_pages_v_blocks_call_to_action_post\` (\`post_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_call_to_action_post_locales\` (
  	\`overwrite_title\` text,
  	\`overwrite_description\` text,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_call_to_action_post\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_call_to_action_post_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_call_to_action_post_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta_right_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_cta_right\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_right_gallery_order_idx\` ON \`_pages_v_blocks_cta_right_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_right_gallery_parent_id_idx\` ON \`_pages_v_blocks_cta_right_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_right_gallery_image_idx\` ON \`_pages_v_blocks_cta_right_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta_right_gallery_locales\` (
  	\`title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_cta_right_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_cta_right_gallery_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_cta_right_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta_right\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_right_order_idx\` ON \`_pages_v_blocks_cta_right\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_right_parent_id_idx\` ON \`_pages_v_blocks_cta_right\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_right_path_idx\` ON \`_pages_v_blocks_cta_right\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta_right_locales\` (
  	\`title\` text,
  	\`sub_title\` text,
  	\`description\` text,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_cta_right\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_cta_right_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_cta_right_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_call_to_add_to_cart\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`products_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_call_to_add_to_cart_order_idx\` ON \`_pages_v_blocks_call_to_add_to_cart\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_call_to_add_to_cart_parent_id_idx\` ON \`_pages_v_blocks_call_to_add_to_cart\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_call_to_add_to_cart_path_idx\` ON \`_pages_v_blocks_call_to_add_to_cart\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_call_to_add_to_cart_image_idx\` ON \`_pages_v_blocks_call_to_add_to_cart\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_call_to_add_to_cart_products_idx\` ON \`_pages_v_blocks_call_to_add_to_cart\` (\`products_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_call_to_add_to_cart_locales\` (
  	\`content\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_call_to_add_to_cart\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_call_to_add_to_cart_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_call_to_add_to_cart_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_certificates_organizations\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_certificates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_certificates_organizations_order_idx\` ON \`_pages_v_blocks_certificates_organizations\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_certificates_organizations_parent_id_idx\` ON \`_pages_v_blocks_certificates_organizations\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_certificates_organizations_logo_idx\` ON \`_pages_v_blocks_certificates_organizations\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_certificates_organizations_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_certificates_organizations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_certificates_organizations_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_certificates_organizations_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_certificates\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_certificates_order_idx\` ON \`_pages_v_blocks_certificates\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_certificates_parent_id_idx\` ON \`_pages_v_blocks_certificates\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_certificates_path_idx\` ON \`_pages_v_blocks_certificates\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_certificates_locales\` (
  	\`title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_certificates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_certificates_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_certificates_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_content_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'full',
  	\`font\` text DEFAULT 'default',
  	\`custom_css\` text DEFAULT '',
  	\`rich_text\` text,
  	\`enable_link\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_columns_order_idx\` ON \`_pages_v_blocks_content_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_columns_parent_id_idx\` ON \`_pages_v_blocks_content_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_columns_locale_idx\` ON \`_pages_v_blocks_content_columns\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_order_idx\` ON \`_pages_v_blocks_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_parent_id_idx\` ON \`_pages_v_blocks_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_path_idx\` ON \`_pages_v_blocks_content\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`form_id\` integer,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_form_block_order_idx\` ON \`_pages_v_blocks_form_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_form_block_parent_id_idx\` ON \`_pages_v_blocks_form_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_form_block_path_idx\` ON \`_pages_v_blocks_form_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_form_block_form_idx\` ON \`_pages_v_blocks_form_block\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_highlight_right\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` numeric,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_highlight_right_order_idx\` ON \`_pages_v_blocks_highlight_right\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_highlight_right_parent_id_idx\` ON \`_pages_v_blocks_highlight_right\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_highlight_right_path_idx\` ON \`_pages_v_blocks_highlight_right\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_highlight_right_image_idx\` ON \`_pages_v_blocks_highlight_right\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_highlight_right_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_highlight_right\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_highlight_right_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_highlight_right_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_highlight_center\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` numeric,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_highlight_center_order_idx\` ON \`_pages_v_blocks_highlight_center\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_highlight_center_parent_id_idx\` ON \`_pages_v_blocks_highlight_center\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_highlight_center_path_idx\` ON \`_pages_v_blocks_highlight_center\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_highlight_center_image_idx\` ON \`_pages_v_blocks_highlight_center\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_highlight_center_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_highlight_center\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_highlight_center_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_highlight_center_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_highlight_left\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` numeric,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_highlight_left_order_idx\` ON \`_pages_v_blocks_highlight_left\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_highlight_left_parent_id_idx\` ON \`_pages_v_blocks_highlight_left\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_highlight_left_path_idx\` ON \`_pages_v_blocks_highlight_left\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_highlight_left_image_idx\` ON \`_pages_v_blocks_highlight_left\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_highlight_left_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_highlight_left\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_highlight_left_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_highlight_left_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_infinite_scroll\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_infinite_scroll_order_idx\` ON \`_pages_v_blocks_infinite_scroll\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_infinite_scroll_parent_id_idx\` ON \`_pages_v_blocks_infinite_scroll\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_infinite_scroll_path_idx\` ON \`_pages_v_blocks_infinite_scroll\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_infinite_scroll_locales\` (
  	\`graphic_id\` integer,
  	\`animation_duration\` numeric DEFAULT 10,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`graphic_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_infinite_scroll\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_infinite_scroll_graphic_idx\` ON \`_pages_v_blocks_infinite_scroll_locales\` (\`graphic_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_infinite_scroll_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_infinite_scroll_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_latest_posts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_latest_posts_order_idx\` ON \`_pages_v_blocks_latest_posts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_latest_posts_parent_id_idx\` ON \`_pages_v_blocks_latest_posts\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_latest_posts_path_idx\` ON \`_pages_v_blocks_latest_posts\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_latest_posts_locales\` (
  	\`title\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_latest_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_latest_posts_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_latest_posts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_media\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_media_order_idx\` ON \`_pages_v_blocks_media\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_media_parent_id_idx\` ON \`_pages_v_blocks_media\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_media_path_idx\` ON \`_pages_v_blocks_media\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_media_media_idx\` ON \`_pages_v_blocks_media\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_posts_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`show_title\` integer DEFAULT false,
  	\`post_categories_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`post_categories_id\`) REFERENCES \`post_categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_posts_grid_order_idx\` ON \`_pages_v_blocks_posts_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_posts_grid_parent_id_idx\` ON \`_pages_v_blocks_posts_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_posts_grid_path_idx\` ON \`_pages_v_blocks_posts_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_posts_grid_post_categories_idx\` ON \`_pages_v_blocks_posts_grid\` (\`post_categories_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_products_carousel\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_products_carousel_order_idx\` ON \`_pages_v_blocks_products_carousel\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_products_carousel_parent_id_idx\` ON \`_pages_v_blocks_products_carousel\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_products_carousel_path_idx\` ON \`_pages_v_blocks_products_carousel\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_products_carousel_locales\` (
  	\`title\` text,
  	\`watch_more_btn_label\` text,
  	\`apb_type\` text DEFAULT 'reference',
  	\`apb_new_tab\` integer,
  	\`apb_url\` text,
  	\`apb_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_products_carousel\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_products_carousel_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_products_carousel_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_products_category\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_products_category_order_idx\` ON \`_pages_v_blocks_products_category\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_products_category_parent_id_idx\` ON \`_pages_v_blocks_products_category\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_products_category_path_idx\` ON \`_pages_v_blocks_products_category\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_products_category_locales\` (
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_products_category\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_products_category_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_products_category_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_three_photo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`photo_left_id\` integer,
  	\`photo_center_id\` integer,
  	\`photo_right_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`photo_left_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`photo_center_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`photo_right_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_three_photo_order_idx\` ON \`_pages_v_blocks_three_photo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_three_photo_parent_id_idx\` ON \`_pages_v_blocks_three_photo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_three_photo_path_idx\` ON \`_pages_v_blocks_three_photo\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_three_photo_photo_left_idx\` ON \`_pages_v_blocks_three_photo\` (\`photo_left_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_three_photo_photo_center_idx\` ON \`_pages_v_blocks_three_photo\` (\`photo_center_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_three_photo_photo_right_idx\` ON \`_pages_v_blocks_three_photo\` (\`photo_right_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_video_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`video_url\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_embed_order_idx\` ON \`_pages_v_blocks_video_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_embed_parent_id_idx\` ON \`_pages_v_blocks_video_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_embed_path_idx\` ON \`_pages_v_blocks_video_embed\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_hero_type\` text DEFAULT 'lowImpact',
  	\`version_hero_title\` text,
  	\`version_hero_subtitle\` text,
  	\`version_hero_description\` text,
  	\`version_hero_media_id\` integer,
  	\`version_published_at\` text,
  	\`version_slug\` text,
  	\`version_slug_lock\` integer DEFAULT true,
  	\`version_footer_size\` text DEFAULT 'small',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_version_hero_media_idx\` ON \`_pages_v\` (\`version_hero_media_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_snapshot_idx\` ON \`_pages_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_published_locale_idx\` ON \`_pages_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_autosave_idx\` ON \`_pages_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_locales\` (
  	\`version_meta_meta_title\` text,
  	\`version_meta_meta_image_id\` integer,
  	\`version_meta_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`version_meta_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_version_meta_meta_version_meta_meta_image_idx\` ON \`_pages_v_locales\` (\`version_meta_meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_locales_locale_parent_id_unique\` ON \`_pages_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`locale\` text,
  	\`pages_id\` integer,
  	\`post_categories_id\` integer,
  	\`posts_id\` integer,
  	\`product_categories_id\` integer,
  	\`products_id\` integer,
  	\`product_sub_categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`post_categories_id\`) REFERENCES \`post_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`product_categories_id\`) REFERENCES \`product_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`product_sub_categories_id\`) REFERENCES \`product_sub_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_order_idx\` ON \`_pages_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_parent_idx\` ON \`_pages_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_path_idx\` ON \`_pages_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_locale_idx\` ON \`_pages_v_rels\` (\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_pages_id_idx\` ON \`_pages_v_rels\` (\`pages_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_post_categories_id_idx\` ON \`_pages_v_rels\` (\`post_categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_posts_id_idx\` ON \`_pages_v_rels\` (\`posts_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_product_categories_id_idx\` ON \`_pages_v_rels\` (\`product_categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_products_id_idx\` ON \`_pages_v_rels\` (\`products_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_product_sub_categories_id_idx\` ON \`_pages_v_rels\` (\`product_sub_categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE TABLE \`post_categories_blocks_call_to_action_post\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`post_id\` integer NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`post_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`post_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`post_categories_blocks_call_to_action_post_order_idx\` ON \`post_categories_blocks_call_to_action_post\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`post_categories_blocks_call_to_action_post_parent_id_idx\` ON \`post_categories_blocks_call_to_action_post\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`post_categories_blocks_call_to_action_post_path_idx\` ON \`post_categories_blocks_call_to_action_post\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`post_categories_blocks_call_to_action_post_post_idx\` ON \`post_categories_blocks_call_to_action_post\` (\`post_id\`);`)
  await db.run(sql`CREATE TABLE \`post_categories_blocks_call_to_action_post_locales\` (
  	\`overwrite_title\` text,
  	\`overwrite_description\` text,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`post_categories_blocks_call_to_action_post\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`post_categories_blocks_call_to_action_post_locales_locale_parent_id_unique\` ON \`post_categories_blocks_call_to_action_post_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`post_categories_blocks_posts_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`show_title\` integer DEFAULT false,
  	\`post_categories_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`post_categories_id\`) REFERENCES \`post_categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`post_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`post_categories_blocks_posts_grid_order_idx\` ON \`post_categories_blocks_posts_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`post_categories_blocks_posts_grid_parent_id_idx\` ON \`post_categories_blocks_posts_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`post_categories_blocks_posts_grid_path_idx\` ON \`post_categories_blocks_posts_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`post_categories_blocks_posts_grid_post_categories_idx\` ON \`post_categories_blocks_posts_grid\` (\`post_categories_id\`);`)
  await db.run(sql`CREATE TABLE \`post_categories_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` integer,
  	\`url\` text,
  	\`label\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`post_categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`post_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`post_categories_breadcrumbs_order_idx\` ON \`post_categories_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`post_categories_breadcrumbs_parent_id_idx\` ON \`post_categories_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`post_categories_breadcrumbs_locale_idx\` ON \`post_categories_breadcrumbs\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`post_categories_breadcrumbs_doc_idx\` ON \`post_categories_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`post_categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`slug_lock\` integer DEFAULT true,
  	\`footer_size\` text DEFAULT 'small',
  	\`parent_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`post_categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`post_categories_slug_idx\` ON \`post_categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`post_categories_parent_idx\` ON \`post_categories\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`post_categories_updated_at_idx\` ON \`post_categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`post_categories_created_at_idx\` ON \`post_categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`post_categories_locales\` (
  	\`title\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`post_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`post_categories_locales_locale_parent_id_unique\` ON \`post_categories_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`post_categories_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`locale\` text,
  	\`pages_id\` integer,
  	\`post_categories_id\` integer,
  	\`posts_id\` integer,
  	\`product_categories_id\` integer,
  	\`products_id\` integer,
  	\`product_sub_categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`post_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`post_categories_id\`) REFERENCES \`post_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`product_categories_id\`) REFERENCES \`product_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`product_sub_categories_id\`) REFERENCES \`product_sub_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`post_categories_rels_order_idx\` ON \`post_categories_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`post_categories_rels_parent_idx\` ON \`post_categories_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`post_categories_rels_path_idx\` ON \`post_categories_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`post_categories_rels_locale_idx\` ON \`post_categories_rels\` (\`locale\`);`)
  await db.run(sql`CREATE INDEX \`post_categories_rels_pages_id_idx\` ON \`post_categories_rels\` (\`pages_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`post_categories_rels_post_categories_id_idx\` ON \`post_categories_rels\` (\`post_categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`post_categories_rels_posts_id_idx\` ON \`post_categories_rels\` (\`posts_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`post_categories_rels_product_categories_id_idx\` ON \`post_categories_rels\` (\`product_categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`post_categories_rels_products_id_idx\` ON \`post_categories_rels\` (\`products_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`post_categories_rels_product_sub_categories_id_idx\` ON \`post_categories_rels\` (\`product_sub_categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_archive\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro_content\` text,
  	\`populate_by\` text DEFAULT 'collection',
  	\`relation_to\` text DEFAULT 'posts',
  	\`limit\` numeric DEFAULT 10,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_archive_order_idx\` ON \`posts_blocks_archive\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_archive_parent_id_idx\` ON \`posts_blocks_archive\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_archive_path_idx\` ON \`posts_blocks_archive\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_buy_now\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`products_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_buy_now_order_idx\` ON \`posts_blocks_buy_now\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_buy_now_parent_id_idx\` ON \`posts_blocks_buy_now\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_buy_now_path_idx\` ON \`posts_blocks_buy_now\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_buy_now_products_idx\` ON \`posts_blocks_buy_now\` (\`products_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_buy_now_locales\` (
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_buy_now\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_buy_now_locales_locale_parent_id_unique\` ON \`posts_blocks_buy_now_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_cta_center\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`background_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_cta_center_order_idx\` ON \`posts_blocks_cta_center\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_cta_center_parent_id_idx\` ON \`posts_blocks_cta_center\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_cta_center_path_idx\` ON \`posts_blocks_cta_center\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_cta_center_background_idx\` ON \`posts_blocks_cta_center\` (\`background_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_cta_center_locales\` (
  	\`title\` text,
  	\`sub_title\` text,
  	\`description\` text,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_cta_center\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_cta_center_locales_locale_parent_id_unique\` ON \`posts_blocks_cta_center_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_cta_left\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`background_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_cta_left_order_idx\` ON \`posts_blocks_cta_left\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_cta_left_parent_id_idx\` ON \`posts_blocks_cta_left\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_cta_left_path_idx\` ON \`posts_blocks_cta_left\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_cta_left_background_idx\` ON \`posts_blocks_cta_left\` (\`background_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_cta_left_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_cta_left\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_cta_left_locales_locale_parent_id_unique\` ON \`posts_blocks_cta_left_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_cta_right_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_cta_right\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_cta_right_gallery_order_idx\` ON \`posts_blocks_cta_right_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_cta_right_gallery_parent_id_idx\` ON \`posts_blocks_cta_right_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_cta_right_gallery_image_idx\` ON \`posts_blocks_cta_right_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_cta_right_gallery_locales\` (
  	\`title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_cta_right_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_cta_right_gallery_locales_locale_parent_id_unique\` ON \`posts_blocks_cta_right_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_cta_right\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_cta_right_order_idx\` ON \`posts_blocks_cta_right\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_cta_right_parent_id_idx\` ON \`posts_blocks_cta_right\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_cta_right_path_idx\` ON \`posts_blocks_cta_right\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_cta_right_locales\` (
  	\`title\` text,
  	\`sub_title\` text,
  	\`description\` text,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_cta_right\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_cta_right_locales_locale_parent_id_unique\` ON \`posts_blocks_cta_right_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_call_to_add_to_cart\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`products_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_call_to_add_to_cart_order_idx\` ON \`posts_blocks_call_to_add_to_cart\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_call_to_add_to_cart_parent_id_idx\` ON \`posts_blocks_call_to_add_to_cart\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_call_to_add_to_cart_path_idx\` ON \`posts_blocks_call_to_add_to_cart\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_call_to_add_to_cart_image_idx\` ON \`posts_blocks_call_to_add_to_cart\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_call_to_add_to_cart_products_idx\` ON \`posts_blocks_call_to_add_to_cart\` (\`products_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_call_to_add_to_cart_locales\` (
  	\`content\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_call_to_add_to_cart\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_call_to_add_to_cart_locales_locale_parent_id_unique\` ON \`posts_blocks_call_to_add_to_cart_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_certificates_organizations\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_certificates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_certificates_organizations_order_idx\` ON \`posts_blocks_certificates_organizations\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_certificates_organizations_parent_id_idx\` ON \`posts_blocks_certificates_organizations\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_certificates_organizations_logo_idx\` ON \`posts_blocks_certificates_organizations\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_certificates_organizations_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_certificates_organizations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_certificates_organizations_locales_locale_parent_id_unique\` ON \`posts_blocks_certificates_organizations_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_certificates\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_certificates_order_idx\` ON \`posts_blocks_certificates\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_certificates_parent_id_idx\` ON \`posts_blocks_certificates\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_certificates_path_idx\` ON \`posts_blocks_certificates\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_certificates_locales\` (
  	\`title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_certificates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_certificates_locales_locale_parent_id_unique\` ON \`posts_blocks_certificates_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_content_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'full',
  	\`font\` text DEFAULT 'default',
  	\`custom_css\` text DEFAULT '',
  	\`rich_text\` text,
  	\`enable_link\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_content_columns_order_idx\` ON \`posts_blocks_content_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_content_columns_parent_id_idx\` ON \`posts_blocks_content_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_content_columns_locale_idx\` ON \`posts_blocks_content_columns\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_content_order_idx\` ON \`posts_blocks_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_content_parent_id_idx\` ON \`posts_blocks_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_content_path_idx\` ON \`posts_blocks_content\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_focus_left_small_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_focus_left_small_image_order_idx\` ON \`posts_blocks_focus_left_small_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_focus_left_small_image_parent_id_idx\` ON \`posts_blocks_focus_left_small_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_focus_left_small_image_path_idx\` ON \`posts_blocks_focus_left_small_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_focus_left_small_image_image_idx\` ON \`posts_blocks_focus_left_small_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_focus_left_small_image_locales\` (
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_focus_left_small_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_focus_left_small_image_locales_locale_parent_id_unique\` ON \`posts_blocks_focus_left_small_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_focus_right_large_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_focus_right_large_image_order_idx\` ON \`posts_blocks_focus_right_large_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_focus_right_large_image_parent_id_idx\` ON \`posts_blocks_focus_right_large_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_focus_right_large_image_path_idx\` ON \`posts_blocks_focus_right_large_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_focus_right_large_image_image_idx\` ON \`posts_blocks_focus_right_large_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_focus_right_large_image_locales\` (
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_focus_right_large_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_focus_right_large_image_locales_locale_parent_id_unique\` ON \`posts_blocks_focus_right_large_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_focus_right_small_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_focus_right_small_image_order_idx\` ON \`posts_blocks_focus_right_small_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_focus_right_small_image_parent_id_idx\` ON \`posts_blocks_focus_right_small_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_focus_right_small_image_path_idx\` ON \`posts_blocks_focus_right_small_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_focus_right_small_image_image_idx\` ON \`posts_blocks_focus_right_small_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_focus_right_small_image_locales\` (
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_focus_right_small_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_focus_right_small_image_locales_locale_parent_id_unique\` ON \`posts_blocks_focus_right_small_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`form_id\` integer,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_form_block_order_idx\` ON \`posts_blocks_form_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_form_block_parent_id_idx\` ON \`posts_blocks_form_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_form_block_path_idx\` ON \`posts_blocks_form_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_form_block_form_idx\` ON \`posts_blocks_form_block\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_highlight_right\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`order\` numeric,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_highlight_right_order_idx\` ON \`posts_blocks_highlight_right\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_highlight_right_parent_id_idx\` ON \`posts_blocks_highlight_right\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_highlight_right_path_idx\` ON \`posts_blocks_highlight_right\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_highlight_right_image_idx\` ON \`posts_blocks_highlight_right\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_highlight_right_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_highlight_right\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_highlight_right_locales_locale_parent_id_unique\` ON \`posts_blocks_highlight_right_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_highlight_center\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`order\` numeric,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_highlight_center_order_idx\` ON \`posts_blocks_highlight_center\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_highlight_center_parent_id_idx\` ON \`posts_blocks_highlight_center\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_highlight_center_path_idx\` ON \`posts_blocks_highlight_center\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_highlight_center_image_idx\` ON \`posts_blocks_highlight_center\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_highlight_center_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_highlight_center\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_highlight_center_locales_locale_parent_id_unique\` ON \`posts_blocks_highlight_center_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_highlight_left\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`order\` numeric,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_highlight_left_order_idx\` ON \`posts_blocks_highlight_left\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_highlight_left_parent_id_idx\` ON \`posts_blocks_highlight_left\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_highlight_left_path_idx\` ON \`posts_blocks_highlight_left\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_highlight_left_image_idx\` ON \`posts_blocks_highlight_left\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_highlight_left_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_highlight_left\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_highlight_left_locales_locale_parent_id_unique\` ON \`posts_blocks_highlight_left_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_infinite_scroll\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_infinite_scroll_order_idx\` ON \`posts_blocks_infinite_scroll\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_infinite_scroll_parent_id_idx\` ON \`posts_blocks_infinite_scroll\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_infinite_scroll_path_idx\` ON \`posts_blocks_infinite_scroll\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_infinite_scroll_locales\` (
  	\`graphic_id\` integer,
  	\`animation_duration\` numeric DEFAULT 10,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`graphic_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_infinite_scroll\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_infinite_scroll_graphic_idx\` ON \`posts_blocks_infinite_scroll_locales\` (\`graphic_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_infinite_scroll_locales_locale_parent_id_unique\` ON \`posts_blocks_infinite_scroll_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_media\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_media_order_idx\` ON \`posts_blocks_media\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_media_parent_id_idx\` ON \`posts_blocks_media\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_media_path_idx\` ON \`posts_blocks_media\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_media_media_idx\` ON \`posts_blocks_media\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_products_carousel\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_products_carousel_order_idx\` ON \`posts_blocks_products_carousel\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_products_carousel_parent_id_idx\` ON \`posts_blocks_products_carousel\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_products_carousel_path_idx\` ON \`posts_blocks_products_carousel\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_products_carousel_locales\` (
  	\`title\` text,
  	\`watch_more_btn_label\` text,
  	\`apb_type\` text DEFAULT 'reference',
  	\`apb_new_tab\` integer,
  	\`apb_url\` text,
  	\`apb_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_products_carousel\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_products_carousel_locales_locale_parent_id_unique\` ON \`posts_blocks_products_carousel_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_products_category\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_products_category_order_idx\` ON \`posts_blocks_products_category\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_products_category_parent_id_idx\` ON \`posts_blocks_products_category\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_products_category_path_idx\` ON \`posts_blocks_products_category\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_products_category_locales\` (
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_products_category\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_products_category_locales_locale_parent_id_unique\` ON \`posts_blocks_products_category_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_three_photo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`photo_left_id\` integer,
  	\`photo_center_id\` integer,
  	\`photo_right_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`photo_left_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`photo_center_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`photo_right_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_three_photo_order_idx\` ON \`posts_blocks_three_photo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_three_photo_parent_id_idx\` ON \`posts_blocks_three_photo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_three_photo_path_idx\` ON \`posts_blocks_three_photo\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_three_photo_photo_left_idx\` ON \`posts_blocks_three_photo\` (\`photo_left_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_three_photo_photo_center_idx\` ON \`posts_blocks_three_photo\` (\`photo_center_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_three_photo_photo_right_idx\` ON \`posts_blocks_three_photo\` (\`photo_right_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_video_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`video_url\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_video_embed_order_idx\` ON \`posts_blocks_video_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_video_embed_parent_id_idx\` ON \`posts_blocks_video_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_video_embed_path_idx\` ON \`posts_blocks_video_embed\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_populated_authors\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_populated_authors_order_idx\` ON \`posts_populated_authors\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_populated_authors_parent_id_idx\` ON \`posts_populated_authors\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`published_at\` text,
  	\`slug\` text,
  	\`slug_lock\` integer DEFAULT true,
  	\`footer_size\` text DEFAULT 'small',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`posts__status_idx\` ON \`posts\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`posts_locales\` (
  	\`title\` text,
  	\`meta_meta_title\` text,
  	\`meta_meta_image_id\` integer,
  	\`meta_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_meta_meta_meta_meta_image_idx\` ON \`posts_locales\` (\`meta_meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_locales_locale_parent_id_unique\` ON \`posts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`locale\` text,
  	\`post_categories_id\` integer,
  	\`posts_id\` integer,
  	\`pages_id\` integer,
  	\`product_categories_id\` integer,
  	\`products_id\` integer,
  	\`product_sub_categories_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`post_categories_id\`) REFERENCES \`post_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`product_categories_id\`) REFERENCES \`product_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`product_sub_categories_id\`) REFERENCES \`product_sub_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_rels_order_idx\` ON \`posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_parent_idx\` ON \`posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_path_idx\` ON \`posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_locale_idx\` ON \`posts_rels\` (\`locale\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_post_categories_id_idx\` ON \`posts_rels\` (\`post_categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_posts_id_idx\` ON \`posts_rels\` (\`posts_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_pages_id_idx\` ON \`posts_rels\` (\`pages_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_product_categories_id_idx\` ON \`posts_rels\` (\`product_categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_products_id_idx\` ON \`posts_rels\` (\`products_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_product_sub_categories_id_idx\` ON \`posts_rels\` (\`product_sub_categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_users_id_idx\` ON \`posts_rels\` (\`users_id\`,\`locale\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_archive\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`intro_content\` text,
  	\`populate_by\` text DEFAULT 'collection',
  	\`relation_to\` text DEFAULT 'posts',
  	\`limit\` numeric DEFAULT 10,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_archive_order_idx\` ON \`_posts_v_blocks_archive\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_archive_parent_id_idx\` ON \`_posts_v_blocks_archive\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_archive_path_idx\` ON \`_posts_v_blocks_archive\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_buy_now\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`products_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_buy_now_order_idx\` ON \`_posts_v_blocks_buy_now\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_buy_now_parent_id_idx\` ON \`_posts_v_blocks_buy_now\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_buy_now_path_idx\` ON \`_posts_v_blocks_buy_now\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_buy_now_products_idx\` ON \`_posts_v_blocks_buy_now\` (\`products_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_buy_now_locales\` (
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_buy_now\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_buy_now_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_buy_now_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_cta_center\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`background_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_cta_center_order_idx\` ON \`_posts_v_blocks_cta_center\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_cta_center_parent_id_idx\` ON \`_posts_v_blocks_cta_center\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_cta_center_path_idx\` ON \`_posts_v_blocks_cta_center\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_cta_center_background_idx\` ON \`_posts_v_blocks_cta_center\` (\`background_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_cta_center_locales\` (
  	\`title\` text,
  	\`sub_title\` text,
  	\`description\` text,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_cta_center\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_cta_center_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_cta_center_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_cta_left\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`background_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_cta_left_order_idx\` ON \`_posts_v_blocks_cta_left\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_cta_left_parent_id_idx\` ON \`_posts_v_blocks_cta_left\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_cta_left_path_idx\` ON \`_posts_v_blocks_cta_left\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_cta_left_background_idx\` ON \`_posts_v_blocks_cta_left\` (\`background_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_cta_left_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_cta_left\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_cta_left_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_cta_left_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_cta_right_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_cta_right\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_cta_right_gallery_order_idx\` ON \`_posts_v_blocks_cta_right_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_cta_right_gallery_parent_id_idx\` ON \`_posts_v_blocks_cta_right_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_cta_right_gallery_image_idx\` ON \`_posts_v_blocks_cta_right_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_cta_right_gallery_locales\` (
  	\`title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_cta_right_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_cta_right_gallery_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_cta_right_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_cta_right\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_cta_right_order_idx\` ON \`_posts_v_blocks_cta_right\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_cta_right_parent_id_idx\` ON \`_posts_v_blocks_cta_right\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_cta_right_path_idx\` ON \`_posts_v_blocks_cta_right\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_cta_right_locales\` (
  	\`title\` text,
  	\`sub_title\` text,
  	\`description\` text,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_cta_right\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_cta_right_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_cta_right_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_call_to_add_to_cart\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`products_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_call_to_add_to_cart_order_idx\` ON \`_posts_v_blocks_call_to_add_to_cart\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_call_to_add_to_cart_parent_id_idx\` ON \`_posts_v_blocks_call_to_add_to_cart\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_call_to_add_to_cart_path_idx\` ON \`_posts_v_blocks_call_to_add_to_cart\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_call_to_add_to_cart_image_idx\` ON \`_posts_v_blocks_call_to_add_to_cart\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_call_to_add_to_cart_products_idx\` ON \`_posts_v_blocks_call_to_add_to_cart\` (\`products_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_call_to_add_to_cart_locales\` (
  	\`content\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_call_to_add_to_cart\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_call_to_add_to_cart_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_call_to_add_to_cart_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_certificates_organizations\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_certificates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_certificates_organizations_order_idx\` ON \`_posts_v_blocks_certificates_organizations\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_certificates_organizations_parent_id_idx\` ON \`_posts_v_blocks_certificates_organizations\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_certificates_organizations_logo_idx\` ON \`_posts_v_blocks_certificates_organizations\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_certificates_organizations_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_certificates_organizations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_certificates_organizations_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_certificates_organizations_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_certificates\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_certificates_order_idx\` ON \`_posts_v_blocks_certificates\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_certificates_parent_id_idx\` ON \`_posts_v_blocks_certificates\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_certificates_path_idx\` ON \`_posts_v_blocks_certificates\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_certificates_locales\` (
  	\`title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_certificates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_certificates_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_certificates_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_content_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'full',
  	\`font\` text DEFAULT 'default',
  	\`custom_css\` text DEFAULT '',
  	\`rich_text\` text,
  	\`enable_link\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_content_columns_order_idx\` ON \`_posts_v_blocks_content_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_content_columns_parent_id_idx\` ON \`_posts_v_blocks_content_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_content_columns_locale_idx\` ON \`_posts_v_blocks_content_columns\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_content_order_idx\` ON \`_posts_v_blocks_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_content_parent_id_idx\` ON \`_posts_v_blocks_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_content_path_idx\` ON \`_posts_v_blocks_content\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_focus_left_small_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_focus_left_small_image_order_idx\` ON \`_posts_v_blocks_focus_left_small_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_focus_left_small_image_parent_id_idx\` ON \`_posts_v_blocks_focus_left_small_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_focus_left_small_image_path_idx\` ON \`_posts_v_blocks_focus_left_small_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_focus_left_small_image_image_idx\` ON \`_posts_v_blocks_focus_left_small_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_focus_left_small_image_locales\` (
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_focus_left_small_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_focus_left_small_image_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_focus_left_small_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_focus_right_large_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_focus_right_large_image_order_idx\` ON \`_posts_v_blocks_focus_right_large_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_focus_right_large_image_parent_id_idx\` ON \`_posts_v_blocks_focus_right_large_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_focus_right_large_image_path_idx\` ON \`_posts_v_blocks_focus_right_large_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_focus_right_large_image_image_idx\` ON \`_posts_v_blocks_focus_right_large_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_focus_right_large_image_locales\` (
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_focus_right_large_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_focus_right_large_image_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_focus_right_large_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_focus_right_small_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_focus_right_small_image_order_idx\` ON \`_posts_v_blocks_focus_right_small_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_focus_right_small_image_parent_id_idx\` ON \`_posts_v_blocks_focus_right_small_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_focus_right_small_image_path_idx\` ON \`_posts_v_blocks_focus_right_small_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_focus_right_small_image_image_idx\` ON \`_posts_v_blocks_focus_right_small_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_focus_right_small_image_locales\` (
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_focus_right_small_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_focus_right_small_image_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_focus_right_small_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`form_id\` integer,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_form_block_order_idx\` ON \`_posts_v_blocks_form_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_form_block_parent_id_idx\` ON \`_posts_v_blocks_form_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_form_block_path_idx\` ON \`_posts_v_blocks_form_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_form_block_form_idx\` ON \`_posts_v_blocks_form_block\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_highlight_right\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` numeric,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_highlight_right_order_idx\` ON \`_posts_v_blocks_highlight_right\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_highlight_right_parent_id_idx\` ON \`_posts_v_blocks_highlight_right\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_highlight_right_path_idx\` ON \`_posts_v_blocks_highlight_right\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_highlight_right_image_idx\` ON \`_posts_v_blocks_highlight_right\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_highlight_right_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_highlight_right\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_highlight_right_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_highlight_right_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_highlight_center\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` numeric,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_highlight_center_order_idx\` ON \`_posts_v_blocks_highlight_center\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_highlight_center_parent_id_idx\` ON \`_posts_v_blocks_highlight_center\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_highlight_center_path_idx\` ON \`_posts_v_blocks_highlight_center\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_highlight_center_image_idx\` ON \`_posts_v_blocks_highlight_center\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_highlight_center_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_highlight_center\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_highlight_center_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_highlight_center_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_highlight_left\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` numeric,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_highlight_left_order_idx\` ON \`_posts_v_blocks_highlight_left\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_highlight_left_parent_id_idx\` ON \`_posts_v_blocks_highlight_left\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_highlight_left_path_idx\` ON \`_posts_v_blocks_highlight_left\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_highlight_left_image_idx\` ON \`_posts_v_blocks_highlight_left\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_highlight_left_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_highlight_left\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_highlight_left_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_highlight_left_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_infinite_scroll\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_infinite_scroll_order_idx\` ON \`_posts_v_blocks_infinite_scroll\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_infinite_scroll_parent_id_idx\` ON \`_posts_v_blocks_infinite_scroll\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_infinite_scroll_path_idx\` ON \`_posts_v_blocks_infinite_scroll\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_infinite_scroll_locales\` (
  	\`graphic_id\` integer,
  	\`animation_duration\` numeric DEFAULT 10,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`graphic_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_infinite_scroll\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_infinite_scroll_graphic_idx\` ON \`_posts_v_blocks_infinite_scroll_locales\` (\`graphic_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_infinite_scroll_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_infinite_scroll_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_media\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_media_order_idx\` ON \`_posts_v_blocks_media\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_media_parent_id_idx\` ON \`_posts_v_blocks_media\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_media_path_idx\` ON \`_posts_v_blocks_media\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_media_media_idx\` ON \`_posts_v_blocks_media\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_products_carousel\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_products_carousel_order_idx\` ON \`_posts_v_blocks_products_carousel\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_products_carousel_parent_id_idx\` ON \`_posts_v_blocks_products_carousel\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_products_carousel_path_idx\` ON \`_posts_v_blocks_products_carousel\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_products_carousel_locales\` (
  	\`title\` text,
  	\`watch_more_btn_label\` text,
  	\`apb_type\` text DEFAULT 'reference',
  	\`apb_new_tab\` integer,
  	\`apb_url\` text,
  	\`apb_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_products_carousel\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_products_carousel_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_products_carousel_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_products_category\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_products_category_order_idx\` ON \`_posts_v_blocks_products_category\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_products_category_parent_id_idx\` ON \`_posts_v_blocks_products_category\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_products_category_path_idx\` ON \`_posts_v_blocks_products_category\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_products_category_locales\` (
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_products_category\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_products_category_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_products_category_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_three_photo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`photo_left_id\` integer,
  	\`photo_center_id\` integer,
  	\`photo_right_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`photo_left_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`photo_center_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`photo_right_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_three_photo_order_idx\` ON \`_posts_v_blocks_three_photo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_three_photo_parent_id_idx\` ON \`_posts_v_blocks_three_photo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_three_photo_path_idx\` ON \`_posts_v_blocks_three_photo\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_three_photo_photo_left_idx\` ON \`_posts_v_blocks_three_photo\` (\`photo_left_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_three_photo_photo_center_idx\` ON \`_posts_v_blocks_three_photo\` (\`photo_center_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_three_photo_photo_right_idx\` ON \`_posts_v_blocks_three_photo\` (\`photo_right_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_video_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`video_url\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_video_embed_order_idx\` ON \`_posts_v_blocks_video_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_video_embed_parent_id_idx\` ON \`_posts_v_blocks_video_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_video_embed_path_idx\` ON \`_posts_v_blocks_video_embed\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_version_populated_authors\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_version_populated_authors_order_idx\` ON \`_posts_v_version_populated_authors\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_populated_authors_parent_id_idx\` ON \`_posts_v_version_populated_authors\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_published_at\` text,
  	\`version_slug\` text,
  	\`version_slug_lock\` integer DEFAULT true,
  	\`version_footer_size\` text DEFAULT 'small',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version__status_idx\` ON \`_posts_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_snapshot_idx\` ON \`_posts_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_published_locale_idx\` ON \`_posts_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_latest_idx\` ON \`_posts_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_autosave_idx\` ON \`_posts_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_locales\` (
  	\`version_title\` text,
  	\`version_meta_meta_title\` text,
  	\`version_meta_meta_image_id\` integer,
  	\`version_meta_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`version_meta_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_version_meta_meta_version_meta_meta_image_idx\` ON \`_posts_v_locales\` (\`version_meta_meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_locales_locale_parent_id_unique\` ON \`_posts_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`locale\` text,
  	\`post_categories_id\` integer,
  	\`posts_id\` integer,
  	\`pages_id\` integer,
  	\`product_categories_id\` integer,
  	\`products_id\` integer,
  	\`product_sub_categories_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`post_categories_id\`) REFERENCES \`post_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`product_categories_id\`) REFERENCES \`product_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`product_sub_categories_id\`) REFERENCES \`product_sub_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_order_idx\` ON \`_posts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_parent_idx\` ON \`_posts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_path_idx\` ON \`_posts_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_locale_idx\` ON \`_posts_v_rels\` (\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_post_categories_id_idx\` ON \`_posts_v_rels\` (\`post_categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_posts_id_idx\` ON \`_posts_v_rels\` (\`posts_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_pages_id_idx\` ON \`_posts_v_rels\` (\`pages_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_product_categories_id_idx\` ON \`_posts_v_rels\` (\`product_categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_products_id_idx\` ON \`_posts_v_rels\` (\`products_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_product_sub_categories_id_idx\` ON \`_posts_v_rels\` (\`product_sub_categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_users_id_idx\` ON \`_posts_v_rels\` (\`users_id\`,\`locale\`);`)
  await db.run(sql`CREATE TABLE \`product_categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`slug_lock\` integer DEFAULT true,
  	\`footer_size\` text DEFAULT 'small',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`product_categories_slug_idx\` ON \`product_categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`product_categories_updated_at_idx\` ON \`product_categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`product_categories_created_at_idx\` ON \`product_categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`product_categories_locales\` (
  	\`title\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`product_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`product_categories_locales_locale_parent_id_unique\` ON \`product_categories_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_variants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sku\` text NOT NULL,
  	\`stock\` numeric NOT NULL,
  	\`price\` numeric NOT NULL,
  	\`default_variant\` integer,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_variants_order_idx\` ON \`products_variants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_variants_parent_id_idx\` ON \`products_variants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_variants_image_idx\` ON \`products_variants\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`products_variants_locales\` (
  	\`title\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_variants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`products_variants_locales_locale_parent_id_unique\` ON \`products_variants_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_archive\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro_content\` text,
  	\`populate_by\` text DEFAULT 'collection',
  	\`relation_to\` text DEFAULT 'posts',
  	\`limit\` numeric DEFAULT 10,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_blocks_archive_order_idx\` ON \`products_blocks_archive\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_archive_parent_id_idx\` ON \`products_blocks_archive\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_archive_path_idx\` ON \`products_blocks_archive\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_buy_now\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`products_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_blocks_buy_now_order_idx\` ON \`products_blocks_buy_now\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_buy_now_parent_id_idx\` ON \`products_blocks_buy_now\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_buy_now_path_idx\` ON \`products_blocks_buy_now\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_buy_now_products_idx\` ON \`products_blocks_buy_now\` (\`products_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_buy_now_locales\` (
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_blocks_buy_now\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`products_blocks_buy_now_locales_locale_parent_id_unique\` ON \`products_blocks_buy_now_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_cta_center\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`background_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_blocks_cta_center_order_idx\` ON \`products_blocks_cta_center\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_cta_center_parent_id_idx\` ON \`products_blocks_cta_center\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_cta_center_path_idx\` ON \`products_blocks_cta_center\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_cta_center_background_idx\` ON \`products_blocks_cta_center\` (\`background_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_cta_center_locales\` (
  	\`title\` text NOT NULL,
  	\`sub_title\` text,
  	\`description\` text,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_blocks_cta_center\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`products_blocks_cta_center_locales_locale_parent_id_unique\` ON \`products_blocks_cta_center_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_cta_left\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`background_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_blocks_cta_left_order_idx\` ON \`products_blocks_cta_left\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_cta_left_parent_id_idx\` ON \`products_blocks_cta_left\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_cta_left_path_idx\` ON \`products_blocks_cta_left\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_cta_left_background_idx\` ON \`products_blocks_cta_left\` (\`background_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_cta_left_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_blocks_cta_left\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`products_blocks_cta_left_locales_locale_parent_id_unique\` ON \`products_blocks_cta_left_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_cta_right_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_blocks_cta_right\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_blocks_cta_right_gallery_order_idx\` ON \`products_blocks_cta_right_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_cta_right_gallery_parent_id_idx\` ON \`products_blocks_cta_right_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_cta_right_gallery_image_idx\` ON \`products_blocks_cta_right_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_cta_right_gallery_locales\` (
  	\`title\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_blocks_cta_right_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`products_blocks_cta_right_gallery_locales_locale_parent_id_unique\` ON \`products_blocks_cta_right_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_cta_right\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_blocks_cta_right_order_idx\` ON \`products_blocks_cta_right\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_cta_right_parent_id_idx\` ON \`products_blocks_cta_right\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_cta_right_path_idx\` ON \`products_blocks_cta_right\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_cta_right_locales\` (
  	\`title\` text NOT NULL,
  	\`sub_title\` text,
  	\`description\` text,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_blocks_cta_right\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`products_blocks_cta_right_locales_locale_parent_id_unique\` ON \`products_blocks_cta_right_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_call_to_add_to_cart\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`products_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_blocks_call_to_add_to_cart_order_idx\` ON \`products_blocks_call_to_add_to_cart\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_call_to_add_to_cart_parent_id_idx\` ON \`products_blocks_call_to_add_to_cart\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_call_to_add_to_cart_path_idx\` ON \`products_blocks_call_to_add_to_cart\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_call_to_add_to_cart_image_idx\` ON \`products_blocks_call_to_add_to_cart\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_call_to_add_to_cart_products_idx\` ON \`products_blocks_call_to_add_to_cart\` (\`products_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_call_to_add_to_cart_locales\` (
  	\`content\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_blocks_call_to_add_to_cart\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`products_blocks_call_to_add_to_cart_locales_locale_parent_id_unique\` ON \`products_blocks_call_to_add_to_cart_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_certificates_organizations\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_blocks_certificates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_blocks_certificates_organizations_order_idx\` ON \`products_blocks_certificates_organizations\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_certificates_organizations_parent_id_idx\` ON \`products_blocks_certificates_organizations\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_certificates_organizations_logo_idx\` ON \`products_blocks_certificates_organizations\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_certificates_organizations_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_blocks_certificates_organizations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`products_blocks_certificates_organizations_locales_locale_parent_id_unique\` ON \`products_blocks_certificates_organizations_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_certificates\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_blocks_certificates_order_idx\` ON \`products_blocks_certificates\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_certificates_parent_id_idx\` ON \`products_blocks_certificates\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_certificates_path_idx\` ON \`products_blocks_certificates\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_certificates_locales\` (
  	\`title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_blocks_certificates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`products_blocks_certificates_locales_locale_parent_id_unique\` ON \`products_blocks_certificates_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_content_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'full',
  	\`font\` text DEFAULT 'default',
  	\`custom_css\` text DEFAULT '',
  	\`rich_text\` text,
  	\`enable_link\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_blocks_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_blocks_content_columns_order_idx\` ON \`products_blocks_content_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_content_columns_parent_id_idx\` ON \`products_blocks_content_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_content_columns_locale_idx\` ON \`products_blocks_content_columns\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_blocks_content_order_idx\` ON \`products_blocks_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_content_parent_id_idx\` ON \`products_blocks_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_content_path_idx\` ON \`products_blocks_content\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`form_id\` integer NOT NULL,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_blocks_form_block_order_idx\` ON \`products_blocks_form_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_form_block_parent_id_idx\` ON \`products_blocks_form_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_form_block_path_idx\` ON \`products_blocks_form_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_form_block_form_idx\` ON \`products_blocks_form_block\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_highlight_right\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`order\` numeric NOT NULL,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_blocks_highlight_right_order_idx\` ON \`products_blocks_highlight_right\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_highlight_right_parent_id_idx\` ON \`products_blocks_highlight_right\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_highlight_right_path_idx\` ON \`products_blocks_highlight_right\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_highlight_right_image_idx\` ON \`products_blocks_highlight_right\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_highlight_right_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_blocks_highlight_right\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`products_blocks_highlight_right_locales_locale_parent_id_unique\` ON \`products_blocks_highlight_right_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_highlight_center\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`order\` numeric NOT NULL,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_blocks_highlight_center_order_idx\` ON \`products_blocks_highlight_center\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_highlight_center_parent_id_idx\` ON \`products_blocks_highlight_center\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_highlight_center_path_idx\` ON \`products_blocks_highlight_center\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_highlight_center_image_idx\` ON \`products_blocks_highlight_center\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_highlight_center_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_blocks_highlight_center\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`products_blocks_highlight_center_locales_locale_parent_id_unique\` ON \`products_blocks_highlight_center_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_highlight_left\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`order\` numeric NOT NULL,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_blocks_highlight_left_order_idx\` ON \`products_blocks_highlight_left\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_highlight_left_parent_id_idx\` ON \`products_blocks_highlight_left\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_highlight_left_path_idx\` ON \`products_blocks_highlight_left\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_highlight_left_image_idx\` ON \`products_blocks_highlight_left\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_highlight_left_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_blocks_highlight_left\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`products_blocks_highlight_left_locales_locale_parent_id_unique\` ON \`products_blocks_highlight_left_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_how_to_use_product\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`products_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_blocks_how_to_use_product_order_idx\` ON \`products_blocks_how_to_use_product\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_how_to_use_product_parent_id_idx\` ON \`products_blocks_how_to_use_product\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_how_to_use_product_path_idx\` ON \`products_blocks_how_to_use_product\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_how_to_use_product_image_idx\` ON \`products_blocks_how_to_use_product\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_how_to_use_product_products_idx\` ON \`products_blocks_how_to_use_product\` (\`products_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_how_to_use_product_locales\` (
  	\`title\` text,
  	\`subtitle\` text,
  	\`content\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_blocks_how_to_use_product\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`products_blocks_how_to_use_product_locales_locale_parent_id_unique\` ON \`products_blocks_how_to_use_product_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_infinite_scroll\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_blocks_infinite_scroll_order_idx\` ON \`products_blocks_infinite_scroll\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_infinite_scroll_parent_id_idx\` ON \`products_blocks_infinite_scroll\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_infinite_scroll_path_idx\` ON \`products_blocks_infinite_scroll\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_infinite_scroll_locales\` (
  	\`graphic_id\` integer,
  	\`animation_duration\` numeric DEFAULT 10,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`graphic_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_blocks_infinite_scroll\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_blocks_infinite_scroll_graphic_idx\` ON \`products_blocks_infinite_scroll_locales\` (\`graphic_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`products_blocks_infinite_scroll_locales_locale_parent_id_unique\` ON \`products_blocks_infinite_scroll_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_latest_posts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_blocks_latest_posts_order_idx\` ON \`products_blocks_latest_posts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_latest_posts_parent_id_idx\` ON \`products_blocks_latest_posts\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_latest_posts_path_idx\` ON \`products_blocks_latest_posts\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_latest_posts_locales\` (
  	\`title\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_blocks_latest_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`products_blocks_latest_posts_locales_locale_parent_id_unique\` ON \`products_blocks_latest_posts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_media\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_blocks_media_order_idx\` ON \`products_blocks_media\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_media_parent_id_idx\` ON \`products_blocks_media\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_media_path_idx\` ON \`products_blocks_media\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_media_media_idx\` ON \`products_blocks_media\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_products_carousel\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_blocks_products_carousel_order_idx\` ON \`products_blocks_products_carousel\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_products_carousel_parent_id_idx\` ON \`products_blocks_products_carousel\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_products_carousel_path_idx\` ON \`products_blocks_products_carousel\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_products_carousel_locales\` (
  	\`title\` text,
  	\`watch_more_btn_label\` text,
  	\`apb_type\` text DEFAULT 'reference',
  	\`apb_new_tab\` integer,
  	\`apb_url\` text,
  	\`apb_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_blocks_products_carousel\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`products_blocks_products_carousel_locales_locale_parent_id_unique\` ON \`products_blocks_products_carousel_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_three_photo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`photo_left_id\` integer,
  	\`photo_center_id\` integer,
  	\`photo_right_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`photo_left_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`photo_center_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`photo_right_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_blocks_three_photo_order_idx\` ON \`products_blocks_three_photo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_three_photo_parent_id_idx\` ON \`products_blocks_three_photo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_three_photo_path_idx\` ON \`products_blocks_three_photo\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_three_photo_photo_left_idx\` ON \`products_blocks_three_photo\` (\`photo_left_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_three_photo_photo_center_idx\` ON \`products_blocks_three_photo\` (\`photo_center_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_three_photo_photo_right_idx\` ON \`products_blocks_three_photo\` (\`photo_right_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_video_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`video_url\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_blocks_video_embed_order_idx\` ON \`products_blocks_video_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_video_embed_parent_id_idx\` ON \`products_blocks_video_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_video_embed_path_idx\` ON \`products_blocks_video_embed\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`products\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon_id\` integer,
  	\`reviews_visible\` text DEFAULT 'show',
  	\`slug\` text,
  	\`slug_lock\` integer DEFAULT true,
  	\`footer_size\` text DEFAULT 'small',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`products_icon_idx\` ON \`products\` (\`icon_id\`);`)
  await db.run(sql`CREATE INDEX \`products_slug_idx\` ON \`products\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`products_updated_at_idx\` ON \`products\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`products_created_at_idx\` ON \`products\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`products_locales\` (
  	\`title\` text NOT NULL,
  	\`short_description\` text,
  	\`long_description\` text,
  	\`meta_meta_title\` text,
  	\`meta_meta_image_id\` integer,
  	\`meta_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_meta_meta_meta_meta_image_idx\` ON \`products_locales\` (\`meta_meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`products_locales_locale_parent_id_unique\` ON \`products_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`locale\` text,
  	\`product_categories_id\` integer,
  	\`product_sub_categories_id\` integer,
  	\`media_id\` integer,
  	\`post_categories_id\` integer,
  	\`posts_id\` integer,
  	\`pages_id\` integer,
  	\`products_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`product_categories_id\`) REFERENCES \`product_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`product_sub_categories_id\`) REFERENCES \`product_sub_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`post_categories_id\`) REFERENCES \`post_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_rels_order_idx\` ON \`products_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_parent_idx\` ON \`products_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_path_idx\` ON \`products_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_locale_idx\` ON \`products_rels\` (\`locale\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_product_categories_id_idx\` ON \`products_rels\` (\`product_categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_product_sub_categories_id_idx\` ON \`products_rels\` (\`product_sub_categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_media_id_idx\` ON \`products_rels\` (\`media_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_post_categories_id_idx\` ON \`products_rels\` (\`post_categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_posts_id_idx\` ON \`products_rels\` (\`posts_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_pages_id_idx\` ON \`products_rels\` (\`pages_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_products_id_idx\` ON \`products_rels\` (\`products_id\`,\`locale\`);`)
  await db.run(sql`CREATE TABLE \`product_sub_categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`product_categories_id\` integer NOT NULL,
  	\`slug\` text,
  	\`slug_lock\` integer DEFAULT true,
  	\`footer_size\` text DEFAULT 'small',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`product_categories_id\`) REFERENCES \`product_categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`product_sub_categories_product_categories_idx\` ON \`product_sub_categories\` (\`product_categories_id\`);`)
  await db.run(sql`CREATE INDEX \`product_sub_categories_slug_idx\` ON \`product_sub_categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`product_sub_categories_updated_at_idx\` ON \`product_sub_categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`product_sub_categories_created_at_idx\` ON \`product_sub_categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`product_sub_categories_locales\` (
  	\`title\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`product_sub_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`product_sub_categories_locales_locale_parent_id_unique\` ON \`product_sub_categories_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`orders_cart\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`product_id\` integer,
  	\`sku\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`quantity\` numeric NOT NULL,
  	\`price_at_buy\` numeric NOT NULL,
  	\`preview_total\` numeric NOT NULL,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`orders_cart_order_idx\` ON \`orders_cart\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`orders_cart_parent_id_idx\` ON \`orders_cart\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_cart_product_idx\` ON \`orders_cart\` (\`product_id\`);`)
  await db.run(sql`CREATE TABLE \`orders_billing_transactions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`transaction_date\` text,
  	\`code\` text,
  	\`content\` text,
  	\`transfer_amount\` numeric,
  	\`reference_code\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`orders_billing_transactions_order_idx\` ON \`orders_billing_transactions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`orders_billing_transactions_parent_id_idx\` ON \`orders_billing_transactions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`orders\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`invoice_id\` text NOT NULL,
  	\`customer_id\` integer NOT NULL,
  	\`receiver_name\` text,
  	\`receiver_phone_number\` text,
  	\`receiver_address\` text,
  	\`receiver_note\` text,
  	\`order_state\` text DEFAULT 'pending',
  	\`message_sender\` text,
  	\`message_receiver\` text,
  	\`message_content\` text,
  	\`shipping_info_method\` text DEFAULT 'standard',
  	\`shipping_info_tracking\` text,
  	\`prices_discount_code_id\` integer,
  	\`prices_provisional\` numeric DEFAULT 0 NOT NULL,
  	\`prices_shipping\` numeric DEFAULT 0 NOT NULL,
  	\`prices_discount\` numeric DEFAULT 0 NOT NULL,
  	\`prices_total\` numeric DEFAULT 0 NOT NULL,
  	\`prices_paid_amount\` numeric,
  	\`billing_method\` text DEFAULT 'cod',
  	\`review_rating\` numeric,
  	\`review_content\` text,
  	\`review_approved\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`prices_discount_code_id\`) REFERENCES \`discount_codes\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_invoice_id_idx\` ON \`orders\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_customer_idx\` ON \`orders\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_prices_prices_discount_code_idx\` ON \`orders\` (\`prices_discount_code_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_updated_at_idx\` ON \`orders\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`orders_created_at_idx\` ON \`orders\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`_orders_v_version_cart\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`product_id\` integer,
  	\`sku\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`quantity\` numeric NOT NULL,
  	\`price_at_buy\` numeric NOT NULL,
  	\`preview_total\` numeric NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_orders_v_version_cart_order_idx\` ON \`_orders_v_version_cart\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_cart_parent_id_idx\` ON \`_orders_v_version_cart\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_cart_product_idx\` ON \`_orders_v_version_cart\` (\`product_id\`);`)
  await db.run(sql`CREATE TABLE \`_orders_v_version_billing_transactions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`transaction_date\` text,
  	\`code\` text,
  	\`content\` text,
  	\`transfer_amount\` numeric,
  	\`reference_code\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_orders_v_version_billing_transactions_order_idx\` ON \`_orders_v_version_billing_transactions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_billing_transactions_parent_id_idx\` ON \`_orders_v_version_billing_transactions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_orders_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_invoice_id\` text NOT NULL,
  	\`version_customer_id\` integer NOT NULL,
  	\`version_receiver_name\` text,
  	\`version_receiver_phone_number\` text,
  	\`version_receiver_address\` text,
  	\`version_receiver_note\` text,
  	\`version_order_state\` text DEFAULT 'pending',
  	\`version_message_sender\` text,
  	\`version_message_receiver\` text,
  	\`version_message_content\` text,
  	\`version_shipping_info_method\` text DEFAULT 'standard',
  	\`version_shipping_info_tracking\` text,
  	\`version_prices_discount_code_id\` integer,
  	\`version_prices_provisional\` numeric DEFAULT 0 NOT NULL,
  	\`version_prices_shipping\` numeric DEFAULT 0 NOT NULL,
  	\`version_prices_discount\` numeric DEFAULT 0 NOT NULL,
  	\`version_prices_total\` numeric DEFAULT 0 NOT NULL,
  	\`version_prices_paid_amount\` numeric,
  	\`version_billing_method\` text DEFAULT 'cod',
  	\`version_review_rating\` numeric,
  	\`version_review_content\` text,
  	\`version_review_approved\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_customer_id\`) REFERENCES \`customers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_prices_discount_code_id\`) REFERENCES \`discount_codes\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_orders_v_parent_idx\` ON \`_orders_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_invoice_id_idx\` ON \`_orders_v\` (\`version_invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_customer_idx\` ON \`_orders_v\` (\`version_customer_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_prices_version_prices_discount_code_idx\` ON \`_orders_v\` (\`version_prices_discount_code_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_updated_at_idx\` ON \`_orders_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_created_at_idx\` ON \`_orders_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_created_at_idx\` ON \`_orders_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_updated_at_idx\` ON \`_orders_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`role\` text NOT NULL,
  	\`receive_order_email\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`redirects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`from\` text NOT NULL,
  	\`to_type\` text DEFAULT 'reference',
  	\`to_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`redirects_from_idx\` ON \`redirects\` (\`from\`);`)
  await db.run(sql`CREATE INDEX \`redirects_updated_at_idx\` ON \`redirects\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`redirects_created_at_idx\` ON \`redirects\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`redirects_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`redirects_rels_order_idx\` ON \`redirects_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_parent_idx\` ON \`redirects_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_path_idx\` ON \`redirects_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_pages_id_idx\` ON \`redirects_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_posts_id_idx\` ON \`redirects_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_checkbox\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`default_value\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_order_idx\` ON \`forms_blocks_checkbox\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_parent_id_idx\` ON \`forms_blocks_checkbox\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_path_idx\` ON \`forms_blocks_checkbox\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_checkbox_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_checkbox\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_checkbox_locales_locale_parent_id_unique\` ON \`forms_blocks_checkbox_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_country\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_order_idx\` ON \`forms_blocks_country\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_parent_id_idx\` ON \`forms_blocks_country\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_path_idx\` ON \`forms_blocks_country\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_country_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_country\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_country_locales_locale_parent_id_unique\` ON \`forms_blocks_country_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_email\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_order_idx\` ON \`forms_blocks_email\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_parent_id_idx\` ON \`forms_blocks_email\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_path_idx\` ON \`forms_blocks_email\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_email_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_email\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_email_locales_locale_parent_id_unique\` ON \`forms_blocks_email_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_message\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_order_idx\` ON \`forms_blocks_message\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_parent_id_idx\` ON \`forms_blocks_message\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_path_idx\` ON \`forms_blocks_message\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_message_locales\` (
  	\`message\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_message\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_message_locales_locale_parent_id_unique\` ON \`forms_blocks_message_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_number\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`default_value\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_order_idx\` ON \`forms_blocks_number\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_parent_id_idx\` ON \`forms_blocks_number\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_path_idx\` ON \`forms_blocks_number\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_number_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_number\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_number_locales_locale_parent_id_unique\` ON \`forms_blocks_number_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_select\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_options_order_idx\` ON \`forms_blocks_select_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_options_parent_id_idx\` ON \`forms_blocks_select_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select_options_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_select_options\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_select_options_locales_locale_parent_id_unique\` ON \`forms_blocks_select_options_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`placeholder\` text,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_order_idx\` ON \`forms_blocks_select\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_parent_id_idx\` ON \`forms_blocks_select\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_path_idx\` ON \`forms_blocks_select\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_select\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_select_locales_locale_parent_id_unique\` ON \`forms_blocks_select_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_state\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_order_idx\` ON \`forms_blocks_state\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_parent_id_idx\` ON \`forms_blocks_state\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_path_idx\` ON \`forms_blocks_state\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_state_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_state\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_state_locales_locale_parent_id_unique\` ON \`forms_blocks_state_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_order_idx\` ON \`forms_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_parent_id_idx\` ON \`forms_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_path_idx\` ON \`forms_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_text_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_text_locales_locale_parent_id_unique\` ON \`forms_blocks_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_textarea\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_order_idx\` ON \`forms_blocks_textarea\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_parent_id_idx\` ON \`forms_blocks_textarea\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_path_idx\` ON \`forms_blocks_textarea\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_textarea_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_textarea\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_textarea_locales_locale_parent_id_unique\` ON \`forms_blocks_textarea_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_emails\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`email_to\` text,
  	\`cc\` text,
  	\`bcc\` text,
  	\`reply_to\` text,
  	\`email_from\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_emails_order_idx\` ON \`forms_emails\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_emails_parent_id_idx\` ON \`forms_emails\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_emails_locales\` (
  	\`subject\` text DEFAULT 'You''ve received a new message.' NOT NULL,
  	\`message\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_emails\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_emails_locales_locale_parent_id_unique\` ON \`forms_emails_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`confirmation_type\` text DEFAULT 'message',
  	\`redirect_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_updated_at_idx\` ON \`forms\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`forms_created_at_idx\` ON \`forms\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`forms_locales\` (
  	\`submit_button_label\` text,
  	\`confirmation_message\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_locales_locale_parent_id_unique\` ON \`forms_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions_submission_data\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`field\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`form_submissions_submission_data_order_idx\` ON \`form_submissions_submission_data\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_submission_data_parent_id_idx\` ON \`form_submissions_submission_data\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`form_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`form_submissions_form_idx\` ON \`form_submissions\` (\`form_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_updated_at_idx\` ON \`form_submissions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_created_at_idx\` ON \`form_submissions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`search_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`relation_to\` text,
  	\`title\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`search_categories_order_idx\` ON \`search_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`search_categories_parent_id_idx\` ON \`search_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`search\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`priority\` numeric,
  	\`slug\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`search_slug_idx\` ON \`search\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`search_meta_meta_image_idx\` ON \`search\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`search_updated_at_idx\` ON \`search\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`search_created_at_idx\` ON \`search\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`search_locales\` (
  	\`title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`search_locales_locale_parent_id_unique\` ON \`search_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`search_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`search_rels_order_idx\` ON \`search_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_parent_idx\` ON \`search_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_path_idx\` ON \`search_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_posts_id_idx\` ON \`search_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_jobs_log\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`executed_at\` text NOT NULL,
  	\`completed_at\` text NOT NULL,
  	\`task_slug\` text NOT NULL,
  	\`task_i_d\` text NOT NULL,
  	\`input\` text,
  	\`output\` text,
  	\`state\` text NOT NULL,
  	\`error\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`payload_jobs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_jobs_log_order_idx\` ON \`payload_jobs_log\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_log_parent_id_idx\` ON \`payload_jobs_log\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_jobs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`input\` text,
  	\`completed_at\` text,
  	\`total_tried\` numeric DEFAULT 0,
  	\`has_error\` integer DEFAULT false,
  	\`error\` text,
  	\`task_slug\` text,
  	\`queue\` text DEFAULT 'default',
  	\`wait_until\` text,
  	\`processing\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_jobs_completed_at_idx\` ON \`payload_jobs\` (\`completed_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_total_tried_idx\` ON \`payload_jobs\` (\`total_tried\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_has_error_idx\` ON \`payload_jobs\` (\`has_error\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_task_slug_idx\` ON \`payload_jobs\` (\`task_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_queue_idx\` ON \`payload_jobs\` (\`queue\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_wait_until_idx\` ON \`payload_jobs\` (\`wait_until\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_processing_idx\` ON \`payload_jobs\` (\`processing\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_updated_at_idx\` ON \`payload_jobs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_created_at_idx\` ON \`payload_jobs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`customers_id\` integer,
  	\`contact_form_id\` integer,
  	\`discount_codes_id\` integer,
  	\`media_id\` integer,
  	\`pages_id\` integer,
  	\`post_categories_id\` integer,
  	\`posts_id\` integer,
  	\`product_categories_id\` integer,
  	\`products_id\` integer,
  	\`product_sub_categories_id\` integer,
  	\`orders_id\` integer,
  	\`users_id\` integer,
  	\`redirects_id\` integer,
  	\`forms_id\` integer,
  	\`form_submissions_id\` integer,
  	\`search_id\` integer,
  	\`payload_jobs_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`customers_id\`) REFERENCES \`customers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`contact_form_id\`) REFERENCES \`contact_form\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`discount_codes_id\`) REFERENCES \`discount_codes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`post_categories_id\`) REFERENCES \`post_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`product_categories_id\`) REFERENCES \`product_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`product_sub_categories_id\`) REFERENCES \`product_sub_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`orders_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`redirects_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`forms_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`form_submissions_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`search_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`payload_jobs_id\`) REFERENCES \`payload_jobs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_customers_id_idx\` ON \`payload_locked_documents_rels\` (\`customers_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_contact_form_id_idx\` ON \`payload_locked_documents_rels\` (\`contact_form_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_discount_codes_id_idx\` ON \`payload_locked_documents_rels\` (\`discount_codes_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_post_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`post_categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_product_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`product_categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_products_id_idx\` ON \`payload_locked_documents_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_product_sub_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`product_sub_categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_orders_id_idx\` ON \`payload_locked_documents_rels\` (\`orders_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_redirects_id_idx\` ON \`payload_locked_documents_rels\` (\`redirects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_forms_id_idx\` ON \`payload_locked_documents_rels\` (\`forms_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_form_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`form_submissions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_search_id_idx\` ON \`payload_locked_documents_rels\` (\`search_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_payload_jobs_id_idx\` ON \`payload_locked_documents_rels\` (\`payload_jobs_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`general_global\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`site_banner_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`site_banner_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`general_global_site_banner_idx\` ON \`general_global\` (\`site_banner_id\`);`)
  await db.run(sql`CREATE TABLE \`general_global_locales\` (
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`general_global\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`general_global_locales_locale_parent_id_unique\` ON \`general_global_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`contact_form_global\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`contact_form_global_locales\` (
  	\`title\` text,
  	\`name\` text,
  	\`phone_number\` text,
  	\`email\` text,
  	\`question\` text,
  	\`action_send\` text,
  	\`biolak_phone_number\` text,
  	\`action_call\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contact_form_global\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`contact_form_global_locales_locale_parent_id_unique\` ON \`contact_form_global_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`floating_global_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link\` text NOT NULL,
  	\`icon_id\` integer,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`floating_global\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`floating_global_links_order_idx\` ON \`floating_global_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`floating_global_links_parent_id_idx\` ON \`floating_global_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`floating_global_links_icon_idx\` ON \`floating_global_links\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`floating_global\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`floating_global_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`floating_global\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`floating_global_locales_locale_parent_id_unique\` ON \`floating_global_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_global\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_image_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`image_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_global_image_image_image_idx\` ON \`footer_global\` (\`image_image_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_global_locales\` (
  	\`contact_us_title\` text,
  	\`contact_us_email_input_label\` text,
  	\`contact_us_description\` text,
  	\`legal_title\` text,
  	\`legal_content\` text,
  	\`legal_copyright\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_global\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`footer_global_locales_locale_parent_id_unique\` ON \`footer_global_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header_global_header_items_left\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`kind\` text DEFAULT 'internalUrl',
  	\`prebuilt\` text,
  	\`custom_url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_global\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_global_header_items_left_order_idx\` ON \`header_global_header_items_left\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_global_header_items_left_parent_id_idx\` ON \`header_global_header_items_left\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header_global_header_items_left_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_global_header_items_left\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`header_global_header_items_left_locales_locale_parent_id_unique\` ON \`header_global_header_items_left_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header_global_header_items_right\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`kind\` text DEFAULT 'internalUrl',
  	\`prebuilt\` text,
  	\`custom_url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_global\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_global_header_items_right_order_idx\` ON \`header_global_header_items_right\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_global_header_items_right_parent_id_idx\` ON \`header_global_header_items_right\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header_global_header_items_right_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_global_header_items_right\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`header_global_header_items_right_locales_locale_parent_id_unique\` ON \`header_global_header_items_right_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header_global\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`header_global_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`post_categories_id\` integer,
  	\`posts_id\` integer,
  	\`product_categories_id\` integer,
  	\`products_id\` integer,
  	\`product_sub_categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`header_global\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`post_categories_id\`) REFERENCES \`post_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`product_categories_id\`) REFERENCES \`product_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`product_sub_categories_id\`) REFERENCES \`product_sub_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_global_rels_order_idx\` ON \`header_global_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`header_global_rels_parent_idx\` ON \`header_global_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_global_rels_path_idx\` ON \`header_global_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`header_global_rels_pages_id_idx\` ON \`header_global_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`header_global_rels_post_categories_id_idx\` ON \`header_global_rels\` (\`post_categories_id\`);`)
  await db.run(sql`CREATE INDEX \`header_global_rels_posts_id_idx\` ON \`header_global_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`header_global_rels_product_categories_id_idx\` ON \`header_global_rels\` (\`product_categories_id\`);`)
  await db.run(sql`CREATE INDEX \`header_global_rels_products_id_idx\` ON \`header_global_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`header_global_rels_product_sub_categories_id_idx\` ON \`header_global_rels\` (\`product_sub_categories_id\`);`)
  await db.run(sql`CREATE TABLE \`popup_banner_global\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`promo_global\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`promo_global_locales\` (
  	\`message\` text DEFAULT '',
  	\`link_label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`promo_global\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`promo_global_locales_locale_parent_id_unique\` ON \`promo_global_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`promo_global_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`post_categories_id\` integer,
  	\`posts_id\` integer,
  	\`product_categories_id\` integer,
  	\`products_id\` integer,
  	\`product_sub_categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`promo_global\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`post_categories_id\`) REFERENCES \`post_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`product_categories_id\`) REFERENCES \`product_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`product_sub_categories_id\`) REFERENCES \`product_sub_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`promo_global_rels_order_idx\` ON \`promo_global_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`promo_global_rels_parent_idx\` ON \`promo_global_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`promo_global_rels_path_idx\` ON \`promo_global_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`promo_global_rels_pages_id_idx\` ON \`promo_global_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`promo_global_rels_post_categories_id_idx\` ON \`promo_global_rels\` (\`post_categories_id\`);`)
  await db.run(sql`CREATE INDEX \`promo_global_rels_posts_id_idx\` ON \`promo_global_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`promo_global_rels_product_categories_id_idx\` ON \`promo_global_rels\` (\`product_categories_id\`);`)
  await db.run(sql`CREATE INDEX \`promo_global_rels_products_id_idx\` ON \`promo_global_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`promo_global_rels_product_sub_categories_id_idx\` ON \`promo_global_rels\` (\`product_sub_categories_id\`);`)
  await db.run(sql`CREATE TABLE \`reviews_global\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`reviews_global_locales\` (
  	\`title\` text,
  	\`btn_label\` text,
  	\`review_dialog_title\` text,
  	\`hearts_selection_label\` text,
  	\`invoice_id_label\` text,
  	\`content_label\` text,
  	\`send_review_btn_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`reviews_global\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`reviews_global_locales_locale_parent_id_unique\` ON \`reviews_global_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`payment_global\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`sepay_api_key\` text,
  	\`bank_name\` text,
  	\`bank_account_number\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`checkout_page_global\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`address_phone_input_label\` text,
  	\`shipping_standard_shipping_price\` numeric,
  	\`shipping_fast_shipping_price\` numeric,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`checkout_page_global_locales\` (
  	\`contacts_title\` text,
  	\`contacts_email_input_label\` text,
  	\`contacts_accept_newsletter\` text,
  	\`address_title\` text,
  	\`address_name_input_label\` text,
  	\`address_province_city_input_label\` text,
  	\`address_district_input_label\` text,
  	\`address_ward_input_label\` text,
  	\`address_details\` text,
  	\`address_save_for_next_time\` text,
  	\`shipping_title\` text,
  	\`shipping_standard_shipping_label\` text,
  	\`shipping_fast_shipping_label\` text,
  	\`payment_title\` text,
  	\`payment_cod_label\` text,
  	\`payment_bank_transfer_label\` text,
  	\`gift_title\` text,
  	\`gift_sender_input_label\` text,
  	\`gift_recipient_input_label\` text,
  	\`gift_message_input_label\` text,
  	\`order_title\` text,
  	\`discount_title\` text,
  	\`discount_input_placeholder\` text,
  	\`discount_apply_button_label\` text,
  	\`order_summary_provisional\` text,
  	\`order_summary_discount\` text,
  	\`order_summary_shipping\` text,
  	\`order_summary_total\` text,
  	\`order_summary_acknowledgment\` text,
  	\`order_summary_order_button_label\` text,
  	\`popup_success_title\` text,
  	\`popup_success_description\` text,
  	\`popup_back_to_home_button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`checkout_page_global\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`checkout_page_global_locales_locale_parent_id_unique\` ON \`checkout_page_global_locales\` (\`_locale\`,\`_parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`customers\`;`)
  await db.run(sql`DROP TABLE \`contact_form\`;`)
  await db.run(sql`DROP TABLE \`discount_codes\`;`)
  await db.run(sql`DROP TABLE \`discount_codes_rels\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`pages_hero_links\`;`)
  await db.run(sql`DROP TABLE \`pages_hero_links_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_archive\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_banner\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_best_seller\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_best_seller_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_buy_now\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_buy_now_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_center\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_center_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_left\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_left_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_call_to_action_post\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_call_to_action_post_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_right_gallery\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_right_gallery_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_right\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_right_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_call_to_add_to_cart\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_call_to_add_to_cart_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_certificates_organizations\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_certificates_organizations_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_certificates\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_certificates_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_highlight_right\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_highlight_right_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_highlight_center\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_highlight_center_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_highlight_left\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_highlight_left_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_infinite_scroll\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_infinite_scroll_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_latest_posts\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_latest_posts_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_media\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_posts_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_products_carousel\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_products_carousel_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_products_category\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_products_category_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_three_photo\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_video_embed\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_hero_links\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_hero_links_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_archive\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_banner\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_best_seller\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_best_seller_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_buy_now\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_buy_now_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta_center\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta_center_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta_left\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta_left_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_call_to_action_post\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_call_to_action_post_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta_right_gallery\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta_right_gallery_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta_right\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta_right_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_call_to_add_to_cart\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_call_to_add_to_cart_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_certificates_organizations\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_certificates_organizations_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_certificates\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_certificates_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_highlight_right\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_highlight_right_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_highlight_center\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_highlight_center_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_highlight_left\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_highlight_left_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_infinite_scroll\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_infinite_scroll_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_latest_posts\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_latest_posts_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_media\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_posts_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_products_carousel\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_products_carousel_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_products_category\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_products_category_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_three_photo\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_video_embed\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_rels\`;`)
  await db.run(sql`DROP TABLE \`post_categories_blocks_call_to_action_post\`;`)
  await db.run(sql`DROP TABLE \`post_categories_blocks_call_to_action_post_locales\`;`)
  await db.run(sql`DROP TABLE \`post_categories_blocks_posts_grid\`;`)
  await db.run(sql`DROP TABLE \`post_categories_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`post_categories\`;`)
  await db.run(sql`DROP TABLE \`post_categories_locales\`;`)
  await db.run(sql`DROP TABLE \`post_categories_rels\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_archive\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_buy_now\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_buy_now_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_cta_center\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_cta_center_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_cta_left\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_cta_left_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_cta_right_gallery\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_cta_right_gallery_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_cta_right\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_cta_right_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_call_to_add_to_cart\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_call_to_add_to_cart_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_certificates_organizations\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_certificates_organizations_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_certificates\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_certificates_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_focus_left_small_image\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_focus_left_small_image_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_focus_right_large_image\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_focus_right_large_image_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_focus_right_small_image\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_focus_right_small_image_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_highlight_right\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_highlight_right_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_highlight_center\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_highlight_center_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_highlight_left\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_highlight_left_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_infinite_scroll\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_infinite_scroll_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_media\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_products_carousel\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_products_carousel_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_products_category\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_products_category_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_three_photo\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_video_embed\`;`)
  await db.run(sql`DROP TABLE \`posts_populated_authors\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_rels\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_archive\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_buy_now\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_buy_now_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_cta_center\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_cta_center_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_cta_left\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_cta_left_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_cta_right_gallery\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_cta_right_gallery_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_cta_right\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_cta_right_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_call_to_add_to_cart\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_call_to_add_to_cart_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_certificates_organizations\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_certificates_organizations_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_certificates\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_certificates_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_focus_left_small_image\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_focus_left_small_image_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_focus_right_large_image\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_focus_right_large_image_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_focus_right_small_image\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_focus_right_small_image_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_highlight_right\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_highlight_right_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_highlight_center\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_highlight_center_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_highlight_left\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_highlight_left_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_infinite_scroll\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_infinite_scroll_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_media\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_products_carousel\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_products_carousel_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_products_category\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_products_category_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_three_photo\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_video_embed\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_version_populated_authors\`;`)
  await db.run(sql`DROP TABLE \`_posts_v\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`product_categories\`;`)
  await db.run(sql`DROP TABLE \`product_categories_locales\`;`)
  await db.run(sql`DROP TABLE \`products_variants\`;`)
  await db.run(sql`DROP TABLE \`products_variants_locales\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_archive\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_buy_now\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_buy_now_locales\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_cta_center\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_cta_center_locales\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_cta_left\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_cta_left_locales\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_cta_right_gallery\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_cta_right_gallery_locales\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_cta_right\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_cta_right_locales\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_call_to_add_to_cart\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_call_to_add_to_cart_locales\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_certificates_organizations\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_certificates_organizations_locales\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_certificates\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_certificates_locales\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_highlight_right\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_highlight_right_locales\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_highlight_center\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_highlight_center_locales\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_highlight_left\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_highlight_left_locales\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_how_to_use_product\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_how_to_use_product_locales\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_infinite_scroll\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_infinite_scroll_locales\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_latest_posts\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_latest_posts_locales\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_media\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_products_carousel\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_products_carousel_locales\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_three_photo\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_video_embed\`;`)
  await db.run(sql`DROP TABLE \`products\`;`)
  await db.run(sql`DROP TABLE \`products_locales\`;`)
  await db.run(sql`DROP TABLE \`products_rels\`;`)
  await db.run(sql`DROP TABLE \`product_sub_categories\`;`)
  await db.run(sql`DROP TABLE \`product_sub_categories_locales\`;`)
  await db.run(sql`DROP TABLE \`orders_cart\`;`)
  await db.run(sql`DROP TABLE \`orders_billing_transactions\`;`)
  await db.run(sql`DROP TABLE \`orders\`;`)
  await db.run(sql`DROP TABLE \`_orders_v_version_cart\`;`)
  await db.run(sql`DROP TABLE \`_orders_v_version_billing_transactions\`;`)
  await db.run(sql`DROP TABLE \`_orders_v\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`redirects\`;`)
  await db.run(sql`DROP TABLE \`redirects_rels\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_checkbox\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_checkbox_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_country\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_country_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_email\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_email_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_message\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_message_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_number\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_number_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select_options\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select_options_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_state\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_state_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_text_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_textarea\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_textarea_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_emails\`;`)
  await db.run(sql`DROP TABLE \`forms_emails_locales\`;`)
  await db.run(sql`DROP TABLE \`forms\`;`)
  await db.run(sql`DROP TABLE \`forms_locales\`;`)
  await db.run(sql`DROP TABLE \`form_submissions_submission_data\`;`)
  await db.run(sql`DROP TABLE \`form_submissions\`;`)
  await db.run(sql`DROP TABLE \`search_categories\`;`)
  await db.run(sql`DROP TABLE \`search\`;`)
  await db.run(sql`DROP TABLE \`search_locales\`;`)
  await db.run(sql`DROP TABLE \`search_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs_log\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`general_global\`;`)
  await db.run(sql`DROP TABLE \`general_global_locales\`;`)
  await db.run(sql`DROP TABLE \`contact_form_global\`;`)
  await db.run(sql`DROP TABLE \`contact_form_global_locales\`;`)
  await db.run(sql`DROP TABLE \`floating_global_links\`;`)
  await db.run(sql`DROP TABLE \`floating_global\`;`)
  await db.run(sql`DROP TABLE \`floating_global_locales\`;`)
  await db.run(sql`DROP TABLE \`footer_global\`;`)
  await db.run(sql`DROP TABLE \`footer_global_locales\`;`)
  await db.run(sql`DROP TABLE \`header_global_header_items_left\`;`)
  await db.run(sql`DROP TABLE \`header_global_header_items_left_locales\`;`)
  await db.run(sql`DROP TABLE \`header_global_header_items_right\`;`)
  await db.run(sql`DROP TABLE \`header_global_header_items_right_locales\`;`)
  await db.run(sql`DROP TABLE \`header_global\`;`)
  await db.run(sql`DROP TABLE \`header_global_rels\`;`)
  await db.run(sql`DROP TABLE \`popup_banner_global\`;`)
  await db.run(sql`DROP TABLE \`promo_global\`;`)
  await db.run(sql`DROP TABLE \`promo_global_locales\`;`)
  await db.run(sql`DROP TABLE \`promo_global_rels\`;`)
  await db.run(sql`DROP TABLE \`reviews_global\`;`)
  await db.run(sql`DROP TABLE \`reviews_global_locales\`;`)
  await db.run(sql`DROP TABLE \`payment_global\`;`)
  await db.run(sql`DROP TABLE \`checkout_page_global\`;`)
  await db.run(sql`DROP TABLE \`checkout_page_global_locales\`;`)
}
