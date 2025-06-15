import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_discount_codes_discount_type" AS ENUM('percentage', 'fixed');
  CREATE TABLE IF NOT EXISTS "discount_codes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar NOT NULL,
  	"amount" numeric,
  	"is_active" boolean DEFAULT true,
  	"discount_type" "enum_discount_codes_discount_type" DEFAULT 'percentage' NOT NULL,
  	"value" numeric DEFAULT 0 NOT NULL,
  	"max_discount" numeric,
  	"expiration_date" timestamp(3) with time zone,
  	"all_products" boolean DEFAULT false,
  	"all_categories" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "discount_codes_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer,
  	"product_categories_id" integer,
  	"product_sub_categories_id" integer
  );

  ALTER TABLE "posts" DROP CONSTRAINT "posts_hero_image_id_media_id_fk";

  ALTER TABLE "_posts_v" DROP CONSTRAINT "_posts_v_version_hero_image_id_media_id_fk";

  ALTER TABLE "products" DROP CONSTRAINT "products_hero_media_id_media_id_fk";

  DROP INDEX IF EXISTS "posts_hero_image_idx";
  DROP INDEX IF EXISTS "_posts_v_version_version_hero_image_idx";
  DROP INDEX IF EXISTS "products_hero_media_idx";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "discount_codes_id" integer;
  DO $$ BEGIN
   ALTER TABLE "discount_codes_rels" ADD CONSTRAINT "discount_codes_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."discount_codes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "discount_codes_rels" ADD CONSTRAINT "discount_codes_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "discount_codes_rels" ADD CONSTRAINT "discount_codes_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "discount_codes_rels" ADD CONSTRAINT "discount_codes_rels_product_sub_categories_fk" FOREIGN KEY ("product_sub_categories_id") REFERENCES "public"."product_sub_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE UNIQUE INDEX IF NOT EXISTS "discount_codes_code_idx" ON "discount_codes" USING btree ("code");
  CREATE INDEX IF NOT EXISTS "discount_codes_updated_at_idx" ON "discount_codes" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "discount_codes_created_at_idx" ON "discount_codes" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "discount_codes_rels_order_idx" ON "discount_codes_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "discount_codes_rels_parent_idx" ON "discount_codes_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "discount_codes_rels_path_idx" ON "discount_codes_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "discount_codes_rels_products_id_idx" ON "discount_codes_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "discount_codes_rels_product_categories_id_idx" ON "discount_codes_rels" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "discount_codes_rels_product_sub_categories_id_idx" ON "discount_codes_rels" USING btree ("product_sub_categories_id");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_discount_codes_fk" FOREIGN KEY ("discount_codes_id") REFERENCES "public"."discount_codes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_discount_codes_id_idx" ON "payload_locked_documents_rels" USING btree ("discount_codes_id");
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "hero_image_id";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_hero_image_id";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "hero_media_id";
  ALTER TABLE "products_locales" DROP COLUMN IF EXISTS "hero_subtitle";
  ALTER TABLE "products_locales" DROP COLUMN IF EXISTS "hero_title";
  ALTER TABLE "products_locales" DROP COLUMN IF EXISTS "hero_description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "discount_codes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "discount_codes_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "discount_codes" CASCADE;
  DROP TABLE "discount_codes_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_discount_codes_fk";

  DROP INDEX IF EXISTS "payload_locked_documents_rels_discount_codes_id_idx";
  ALTER TABLE "posts" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN "version_hero_image_id" integer;
  ALTER TABLE "products" ADD COLUMN "hero_media_id" integer;
  ALTER TABLE "products_locales" ADD COLUMN "hero_subtitle" varchar;
  ALTER TABLE "products_locales" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "products_locales" ADD COLUMN "hero_description" jsonb;
  DO $$ BEGIN
   ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "posts_hero_image_idx" ON "posts" USING btree ("hero_image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_hero_image_idx" ON "_posts_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "products_hero_media_idx" ON "products" USING btree ("hero_media_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "discount_codes_id";
  DROP TYPE "public"."enum_discount_codes_discount_type";`)
}
