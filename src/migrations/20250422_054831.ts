import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_nav_items_left_item" AS ENUM('search', 'products', 'about', 'events', 'contact', 'vie-en', 'cart');
  CREATE TYPE "public"."enum_header_nav_items_right_item" AS ENUM('search', 'products', 'about', 'events', 'contact', 'vie-en', 'cart');
  DROP TABLE "header_rels" CASCADE;
  ALTER TABLE "header_nav_items_left" ADD COLUMN "item" "enum_header_nav_items_left_item";
  ALTER TABLE "header_nav_items_right" ADD COLUMN "item" "enum_header_nav_items_right_item";
  ALTER TABLE "header_nav_items_left" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "header_nav_items_left" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "header_nav_items_left" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "header_nav_items_left" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "header_nav_items_right" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "header_nav_items_right" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "header_nav_items_right" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "header_nav_items_right" DROP COLUMN IF EXISTS "link_label";
  DROP TYPE "public"."enum_header_nav_items_left_link_type";
  DROP TYPE "public"."enum_header_nav_items_right_link_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_nav_items_left_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_right_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE IF NOT EXISTS "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "header_nav_items_left" ADD COLUMN "link_type" "enum_header_nav_items_left_link_type" DEFAULT 'reference';
  ALTER TABLE "header_nav_items_left" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "header_nav_items_left" ADD COLUMN "link_url" varchar;
  ALTER TABLE "header_nav_items_left" ADD COLUMN "link_label" varchar NOT NULL;
  ALTER TABLE "header_nav_items_right" ADD COLUMN "link_type" "enum_header_nav_items_right_link_type" DEFAULT 'reference';
  ALTER TABLE "header_nav_items_right" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "header_nav_items_right" ADD COLUMN "link_url" varchar;
  ALTER TABLE "header_nav_items_right" ADD COLUMN "link_label" varchar NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  ALTER TABLE "header_nav_items_left" DROP COLUMN IF EXISTS "item";
  ALTER TABLE "header_nav_items_right" DROP COLUMN IF EXISTS "item";
  DROP TYPE "public"."enum_header_nav_items_left_item";
  DROP TYPE "public"."enum_header_nav_items_right_item";`)
}
