import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cta_variant" AS ENUM('centered', 'left');
  CREATE TYPE "public"."enum_pages_blocks_cta_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_variant" AS ENUM('centered', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_button_link_type" AS ENUM('reference', 'custom');
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
  
  ALTER TABLE "pages_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_cta_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_links" CASCADE;
  ALTER TABLE "pages_blocks_media_block" RENAME TO "pages_blocks_media";
  ALTER TABLE "_pages_v_blocks_media_block" RENAME TO "_pages_v_blocks_media";
  ALTER TABLE "pages_blocks_media" DROP CONSTRAINT "pages_blocks_media_block_media_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_media" DROP CONSTRAINT "pages_blocks_media_block_parent_id_fk";
  
  ALTER TABLE "_pages_v_blocks_media" DROP CONSTRAINT "_pages_v_blocks_media_block_media_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_media" DROP CONSTRAINT "_pages_v_blocks_media_block_parent_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_media_block_order_idx";
  DROP INDEX IF EXISTS "pages_blocks_media_block_parent_id_idx";
  DROP INDEX IF EXISTS "pages_blocks_media_block_path_idx";
  DROP INDEX IF EXISTS "pages_blocks_media_block_media_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_media_block_order_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_media_block_parent_id_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_media_block_path_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_media_block_media_idx";
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "sub_title" varchar;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "description" jsonb;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "background_id" integer;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "variant" "enum_pages_blocks_cta_variant" DEFAULT 'centered';
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "button_text" varchar;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "button_link_type" "enum_pages_blocks_cta_button_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "button_link_new_tab" boolean;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "button_link_url" varchar;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "sub_title" varchar;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "description" jsonb;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "background_id" integer;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "variant" "enum__pages_v_blocks_cta_variant" DEFAULT 'centered';
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "button_text" varchar;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "button_link_type" "enum__pages_v_blocks_cta_button_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "button_link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "button_link_url" varchar;
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
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_certificates_organizations_order_idx" ON "pages_blocks_certificates_organizations" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_certificates_organizations_parent_id_idx" ON "pages_blocks_certificates_organizations" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_certificates_organizations_logo_idx" ON "pages_blocks_certificates_organizations" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_certificates_order_idx" ON "pages_blocks_certificates" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_certificates_parent_id_idx" ON "pages_blocks_certificates" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_certificates_path_idx" ON "pages_blocks_certificates" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_certificates_organizations_order_idx" ON "_pages_v_blocks_certificates_organizations" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_certificates_organizations_parent_id_idx" ON "_pages_v_blocks_certificates_organizations" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_certificates_organizations_logo_idx" ON "_pages_v_blocks_certificates_organizations" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_certificates_order_idx" ON "_pages_v_blocks_certificates" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_certificates_parent_id_idx" ON "_pages_v_blocks_certificates" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_certificates_path_idx" ON "_pages_v_blocks_certificates" USING btree ("_path");
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_background_id_media_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
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
   ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_background_id_media_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
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
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_background_idx" ON "pages_blocks_cta" USING btree ("background_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_order_idx" ON "pages_blocks_media" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_parent_id_idx" ON "pages_blocks_media" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_path_idx" ON "pages_blocks_media" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_media_idx" ON "pages_blocks_media" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_background_idx" ON "_pages_v_blocks_cta" USING btree ("background_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_order_idx" ON "_pages_v_blocks_media" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_parent_id_idx" ON "_pages_v_blocks_media" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_path_idx" ON "_pages_v_blocks_media" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_media_idx" ON "_pages_v_blocks_media" USING btree ("media_id");
  ALTER TABLE "pages_blocks_cta" DROP COLUMN IF EXISTS "rich_text";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN IF EXISTS "rich_text";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TABLE IF NOT EXISTS "pages_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_cta_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_cta_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_certificates_organizations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_certificates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_certificates_organizations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_certificates" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_certificates_organizations" CASCADE;
  DROP TABLE "pages_blocks_certificates" CASCADE;
  DROP TABLE "_pages_v_blocks_certificates_organizations" CASCADE;
  DROP TABLE "_pages_v_blocks_certificates" CASCADE;
  ALTER TABLE "pages_blocks_media" RENAME TO "pages_blocks_media_block";
  ALTER TABLE "_pages_v_blocks_media" RENAME TO "_pages_v_blocks_media_block";
  ALTER TABLE "pages_blocks_cta" DROP CONSTRAINT "pages_blocks_cta_background_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_media_block" DROP CONSTRAINT "pages_blocks_media_media_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_media_block" DROP CONSTRAINT "pages_blocks_media_parent_id_fk";
  
  ALTER TABLE "_pages_v_blocks_cta" DROP CONSTRAINT "_pages_v_blocks_cta_background_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_media_block" DROP CONSTRAINT "_pages_v_blocks_media_media_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_media_block" DROP CONSTRAINT "_pages_v_blocks_media_parent_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_cta_background_idx";
  DROP INDEX IF EXISTS "pages_blocks_media_order_idx";
  DROP INDEX IF EXISTS "pages_blocks_media_parent_id_idx";
  DROP INDEX IF EXISTS "pages_blocks_media_path_idx";
  DROP INDEX IF EXISTS "pages_blocks_media_media_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_cta_background_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_media_order_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_media_parent_id_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_media_path_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_media_media_idx";
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "rich_text" jsonb;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_links_order_idx" ON "pages_blocks_cta_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_links_parent_id_idx" ON "pages_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_links_order_idx" ON "_pages_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_links_parent_id_idx" ON "_pages_v_blocks_cta_links" USING btree ("_parent_id");
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_block_order_idx" ON "pages_blocks_media_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_block_parent_id_idx" ON "pages_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_block_path_idx" ON "pages_blocks_media_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_block_media_idx" ON "pages_blocks_media_block" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_block_order_idx" ON "_pages_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_block_parent_id_idx" ON "_pages_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_block_path_idx" ON "_pages_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_block_media_idx" ON "_pages_v_blocks_media_block" USING btree ("media_id");
  ALTER TABLE "pages_blocks_cta" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN IF EXISTS "sub_title";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN IF EXISTS "background_id";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN IF EXISTS "variant";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN IF EXISTS "button_text";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN IF EXISTS "button_link_type";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN IF EXISTS "button_link_new_tab";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN IF EXISTS "button_link_url";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN IF EXISTS "sub_title";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN IF EXISTS "background_id";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN IF EXISTS "variant";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN IF EXISTS "button_text";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN IF EXISTS "button_link_type";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN IF EXISTS "button_link_new_tab";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN IF EXISTS "button_link_url";
  DROP TYPE "public"."enum_pages_blocks_cta_variant";
  DROP TYPE "public"."enum_pages_blocks_cta_button_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_variant";
  DROP TYPE "public"."enum__pages_v_blocks_cta_button_link_type";`)
}
