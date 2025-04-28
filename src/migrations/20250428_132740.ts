import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cta_center_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_left_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_right_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_center_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_left_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_right_button_link_type" AS ENUM('reference', 'custom');
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
  
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
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
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_center_order_idx" ON "pages_blocks_cta_center" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_center_parent_id_idx" ON "pages_blocks_cta_center" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_center_path_idx" ON "pages_blocks_cta_center" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_center_background_idx" ON "pages_blocks_cta_center" USING btree ("background_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_left_order_idx" ON "pages_blocks_cta_left" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_left_parent_id_idx" ON "pages_blocks_cta_left" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_left_path_idx" ON "pages_blocks_cta_left" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_left_background_idx" ON "pages_blocks_cta_left" USING btree ("background_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_right_gallery_order_idx" ON "pages_blocks_cta_right_gallery" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_right_gallery_parent_id_idx" ON "pages_blocks_cta_right_gallery" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_right_gallery_image_idx" ON "pages_blocks_cta_right_gallery" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_right_order_idx" ON "pages_blocks_cta_right" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_right_parent_id_idx" ON "pages_blocks_cta_right" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_right_path_idx" ON "pages_blocks_cta_right" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_center_order_idx" ON "_pages_v_blocks_cta_center" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_center_parent_id_idx" ON "_pages_v_blocks_cta_center" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_center_path_idx" ON "_pages_v_blocks_cta_center" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_center_background_idx" ON "_pages_v_blocks_cta_center" USING btree ("background_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_left_order_idx" ON "_pages_v_blocks_cta_left" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_left_parent_id_idx" ON "_pages_v_blocks_cta_left" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_left_path_idx" ON "_pages_v_blocks_cta_left" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_left_background_idx" ON "_pages_v_blocks_cta_left" USING btree ("background_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_right_gallery_order_idx" ON "_pages_v_blocks_cta_right_gallery" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_right_gallery_parent_id_idx" ON "_pages_v_blocks_cta_right_gallery" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_right_gallery_image_idx" ON "_pages_v_blocks_cta_right_gallery" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_right_order_idx" ON "_pages_v_blocks_cta_right" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_right_parent_id_idx" ON "_pages_v_blocks_cta_right" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_right_path_idx" ON "_pages_v_blocks_cta_right" USING btree ("_path");
  DROP TYPE "public"."enum_pages_blocks_cta_variant";
  DROP TYPE "public"."enum_pages_blocks_cta_button_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_variant";
  DROP TYPE "public"."enum__pages_v_blocks_cta_button_link_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cta_variant" AS ENUM('centered', 'left');
  CREATE TYPE "public"."enum_pages_blocks_cta_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_variant" AS ENUM('centered', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_button_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE IF NOT EXISTS "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub_title" varchar,
  	"description" jsonb,
  	"background_id" integer,
  	"variant" "enum_pages_blocks_cta_variant" DEFAULT 'centered',
  	"button_text" varchar,
  	"button_link_type" "enum_pages_blocks_cta_button_link_type" DEFAULT 'reference',
  	"button_link_new_tab" boolean,
  	"button_link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub_title" varchar,
  	"description" jsonb,
  	"background_id" integer,
  	"variant" "enum__pages_v_blocks_cta_variant" DEFAULT 'centered',
  	"button_text" varchar,
  	"button_link_type" "enum__pages_v_blocks_cta_button_link_type" DEFAULT 'reference',
  	"button_link_new_tab" boolean,
  	"button_link_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DROP TABLE "pages_blocks_cta_center" CASCADE;
  DROP TABLE "pages_blocks_cta_left" CASCADE;
  DROP TABLE "pages_blocks_cta_right_gallery" CASCADE;
  DROP TABLE "pages_blocks_cta_right" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_center" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_left" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_right_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_right" CASCADE;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_background_id_media_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_background_id_media_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_background_idx" ON "pages_blocks_cta" USING btree ("background_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_background_idx" ON "_pages_v_blocks_cta" USING btree ("background_id");
  DROP TYPE "public"."enum_pages_blocks_cta_center_button_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_left_button_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_right_button_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_center_button_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_left_button_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_right_button_link_type";`)
}
