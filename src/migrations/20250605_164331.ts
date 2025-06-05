import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_certificates_organizations_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_infinite_scroll_locales" (
  	"graphic_id" integer,
  	"animation_duration" numeric DEFAULT 10,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_certificates_organizations_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_infinite_scroll_locales" (
  	"graphic_id" integer,
  	"animation_duration" numeric DEFAULT 10,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "posts_blocks_certificates_organizations_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "posts_blocks_infinite_scroll_locales" (
  	"graphic_id" integer,
  	"animation_duration" numeric DEFAULT 10,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_certificates_organizations_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_infinite_scroll_locales" (
  	"graphic_id" integer,
  	"animation_duration" numeric DEFAULT 10,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "products_blocks_certificates_organizations_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "products_blocks_infinite_scroll_locales" (
  	"graphic_id" integer NOT NULL,
  	"animation_duration" numeric DEFAULT 10,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  ALTER TABLE "pages_blocks_infinite_scroll" DROP CONSTRAINT "pages_blocks_infinite_scroll_graphic_id_media_id_fk";

  ALTER TABLE "_pages_v_blocks_infinite_scroll" DROP CONSTRAINT "_pages_v_blocks_infinite_scroll_graphic_id_media_id_fk";

  ALTER TABLE "posts_blocks_infinite_scroll" DROP CONSTRAINT "posts_blocks_infinite_scroll_graphic_id_media_id_fk";

  ALTER TABLE "_posts_v_blocks_infinite_scroll" DROP CONSTRAINT "_posts_v_blocks_infinite_scroll_graphic_id_media_id_fk";

  ALTER TABLE "products_blocks_infinite_scroll" DROP CONSTRAINT "products_blocks_infinite_scroll_graphic_id_media_id_fk";

  DROP INDEX IF EXISTS "pages_blocks_infinite_scroll_graphic_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_infinite_scroll_graphic_idx";
  DROP INDEX IF EXISTS "posts_blocks_infinite_scroll_graphic_idx";
  DROP INDEX IF EXISTS "_posts_v_blocks_infinite_scroll_graphic_idx";
  DROP INDEX IF EXISTS "products_blocks_infinite_scroll_graphic_idx";
  ALTER TABLE "contact_form_global_locales" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "contact_form_global_locales" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "contact_form_global_locales" ALTER COLUMN "phone_number" DROP NOT NULL;
  ALTER TABLE "contact_form_global_locales" ALTER COLUMN "email" DROP NOT NULL;
  ALTER TABLE "contact_form_global_locales" ALTER COLUMN "question" DROP NOT NULL;
  ALTER TABLE "contact_form_global_locales" ALTER COLUMN "action_send" DROP NOT NULL;
  ALTER TABLE "contact_form_global_locales" ALTER COLUMN "action_call" DROP NOT NULL;
  ALTER TABLE "floating_global_locales" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "footer_global" ALTER COLUMN "legal_stamp_id" DROP NOT NULL;
  ALTER TABLE "footer_global_locales" ALTER COLUMN "contact_us_title" DROP NOT NULL;
  ALTER TABLE "footer_global_locales" ALTER COLUMN "contact_us_email_input_label" DROP NOT NULL;
  ALTER TABLE "footer_global_locales" ALTER COLUMN "contact_us_description" DROP NOT NULL;
  ALTER TABLE "footer_global_locales" ALTER COLUMN "legal_title" DROP NOT NULL;
  ALTER TABLE "footer_global_locales" ALTER COLUMN "legal_content" DROP NOT NULL;
  ALTER TABLE "footer_global_locales" ALTER COLUMN "legal_copyright" DROP NOT NULL;
  ALTER TABLE "reviews_global_locales" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "reviews_global_locales" ALTER COLUMN "btn_label" DROP NOT NULL;
  ALTER TABLE "reviews_global_locales" ALTER COLUMN "review_dialog_title" DROP NOT NULL;
  ALTER TABLE "reviews_global_locales" ALTER COLUMN "hearts_selection_label" DROP NOT NULL;
  ALTER TABLE "reviews_global_locales" ALTER COLUMN "invoice_id_label" DROP NOT NULL;
  ALTER TABLE "reviews_global_locales" ALTER COLUMN "content_label" DROP NOT NULL;
  ALTER TABLE "reviews_global_locales" ALTER COLUMN "send_review_btn_label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_cta_left_locales" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_cta_left_locales" ADD COLUMN "description" jsonb;
  ALTER TABLE "pages_blocks_call_to_action_post_locales" ADD COLUMN "overwrite_title" varchar;
  ALTER TABLE "pages_blocks_call_to_action_post_locales" ADD COLUMN "overwrite_description" varchar;
  ALTER TABLE "pages_blocks_call_to_add_to_cart_locales" ADD COLUMN "content" jsonb;
  ALTER TABLE "_pages_v_blocks_cta_left_locales" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_cta_left_locales" ADD COLUMN "description" jsonb;
  ALTER TABLE "_pages_v_blocks_call_to_action_post_locales" ADD COLUMN "overwrite_title" varchar;
  ALTER TABLE "_pages_v_blocks_call_to_action_post_locales" ADD COLUMN "overwrite_description" varchar;
  ALTER TABLE "_pages_v_blocks_call_to_add_to_cart_locales" ADD COLUMN "content" jsonb;
  ALTER TABLE "post_categories_blocks_call_to_action_post_locales" ADD COLUMN "overwrite_title" varchar;
  ALTER TABLE "post_categories_blocks_call_to_action_post_locales" ADD COLUMN "overwrite_description" varchar;
  ALTER TABLE "posts_blocks_cta_left_locales" ADD COLUMN "title" varchar;
  ALTER TABLE "posts_blocks_cta_left_locales" ADD COLUMN "description" jsonb;
  ALTER TABLE "posts_blocks_call_to_add_to_cart_locales" ADD COLUMN "content" jsonb;
  ALTER TABLE "_posts_v_blocks_cta_left_locales" ADD COLUMN "title" varchar;
  ALTER TABLE "_posts_v_blocks_cta_left_locales" ADD COLUMN "description" jsonb;
  ALTER TABLE "_posts_v_blocks_call_to_add_to_cart_locales" ADD COLUMN "content" jsonb;
  ALTER TABLE "products_blocks_cta_left_locales" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "products_blocks_cta_left_locales" ADD COLUMN "description" jsonb;
  ALTER TABLE "products_blocks_call_to_add_to_cart_locales" ADD COLUMN "content" jsonb;
  ALTER TABLE "products_blocks_how_to_use_product_locales" ADD COLUMN "content" jsonb NOT NULL;
  ALTER TABLE "contact_form_global_locales" ADD COLUMN "biolak_phone_number" varchar;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_certificates_organizations_locales" ADD CONSTRAINT "pages_blocks_certificates_organizations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_certificates_organizations"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_infinite_scroll_locales" ADD CONSTRAINT "pages_blocks_infinite_scroll_locales_graphic_id_media_id_fk" FOREIGN KEY ("graphic_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_infinite_scroll_locales" ADD CONSTRAINT "pages_blocks_infinite_scroll_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_infinite_scroll"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_certificates_organizations_locales" ADD CONSTRAINT "_pages_v_blocks_certificates_organizations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_certificates_organizations"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_infinite_scroll_locales" ADD CONSTRAINT "_pages_v_blocks_infinite_scroll_locales_graphic_id_media_id_fk" FOREIGN KEY ("graphic_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_infinite_scroll_locales" ADD CONSTRAINT "_pages_v_blocks_infinite_scroll_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_infinite_scroll"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "posts_blocks_certificates_organizations_locales" ADD CONSTRAINT "posts_blocks_certificates_organizations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_certificates_organizations"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "posts_blocks_infinite_scroll_locales" ADD CONSTRAINT "posts_blocks_infinite_scroll_locales_graphic_id_media_id_fk" FOREIGN KEY ("graphic_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "posts_blocks_infinite_scroll_locales" ADD CONSTRAINT "posts_blocks_infinite_scroll_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_infinite_scroll"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_certificates_organizations_locales" ADD CONSTRAINT "_posts_v_blocks_certificates_organizations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_certificates_organizations"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_infinite_scroll_locales" ADD CONSTRAINT "_posts_v_blocks_infinite_scroll_locales_graphic_id_media_id_fk" FOREIGN KEY ("graphic_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_infinite_scroll_locales" ADD CONSTRAINT "_posts_v_blocks_infinite_scroll_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_infinite_scroll"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "products_blocks_certificates_organizations_locales" ADD CONSTRAINT "products_blocks_certificates_organizations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_certificates_organizations"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "products_blocks_infinite_scroll_locales" ADD CONSTRAINT "products_blocks_infinite_scroll_locales_graphic_id_media_id_fk" FOREIGN KEY ("graphic_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "products_blocks_infinite_scroll_locales" ADD CONSTRAINT "products_blocks_infinite_scroll_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_infinite_scroll"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_certificates_organizations_locales_locale_parent_id_unique" ON "pages_blocks_certificates_organizations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_infinite_scroll_graphic_idx" ON "pages_blocks_infinite_scroll_locales" USING btree ("graphic_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_infinite_scroll_locales_locale_parent_id_unique" ON "pages_blocks_infinite_scroll_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_certificates_organizations_locales_locale_parent_id_unique" ON "_pages_v_blocks_certificates_organizations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_infinite_scroll_graphic_idx" ON "_pages_v_blocks_infinite_scroll_locales" USING btree ("graphic_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_infinite_scroll_locales_locale_parent_id_unique" ON "_pages_v_blocks_infinite_scroll_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_blocks_certificates_organizations_locales_locale_parent_id_unique" ON "posts_blocks_certificates_organizations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_infinite_scroll_graphic_idx" ON "posts_blocks_infinite_scroll_locales" USING btree ("graphic_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_blocks_infinite_scroll_locales_locale_parent_id_unique" ON "posts_blocks_infinite_scroll_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_posts_v_blocks_certificates_organizations_locales_locale_parent_id_unique" ON "_posts_v_blocks_certificates_organizations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_infinite_scroll_graphic_idx" ON "_posts_v_blocks_infinite_scroll_locales" USING btree ("graphic_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "_posts_v_blocks_infinite_scroll_locales_locale_parent_id_unique" ON "_posts_v_blocks_infinite_scroll_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "products_blocks_certificates_organizations_locales_locale_parent_id_unique" ON "products_blocks_certificates_organizations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_infinite_scroll_graphic_idx" ON "products_blocks_infinite_scroll_locales" USING btree ("graphic_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "products_blocks_infinite_scroll_locales_locale_parent_id_unique" ON "products_blocks_infinite_scroll_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_cta_left" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_cta_left" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "pages_blocks_call_to_action_post" DROP COLUMN IF EXISTS "overwrite_title";
  ALTER TABLE "pages_blocks_call_to_action_post" DROP COLUMN IF EXISTS "overwrite_description";
  ALTER TABLE "pages_blocks_call_to_add_to_cart" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "pages_blocks_certificates_organizations" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_certificates_organizations" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "pages_blocks_infinite_scroll" DROP COLUMN IF EXISTS "graphic_id";
  ALTER TABLE "pages_blocks_infinite_scroll" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "_pages_v_blocks_cta_left" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_cta_left" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_call_to_action_post" DROP COLUMN IF EXISTS "overwrite_title";
  ALTER TABLE "_pages_v_blocks_call_to_action_post" DROP COLUMN IF EXISTS "overwrite_description";
  ALTER TABLE "_pages_v_blocks_call_to_add_to_cart" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "_pages_v_blocks_certificates_organizations" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_certificates_organizations" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_infinite_scroll" DROP COLUMN IF EXISTS "graphic_id";
  ALTER TABLE "_pages_v_blocks_infinite_scroll" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "post_categories_blocks_call_to_action_post" DROP COLUMN IF EXISTS "overwrite_title";
  ALTER TABLE "post_categories_blocks_call_to_action_post" DROP COLUMN IF EXISTS "overwrite_description";
  ALTER TABLE "posts_blocks_cta_left" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "posts_blocks_cta_left" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "posts_blocks_call_to_add_to_cart" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "posts_blocks_certificates_organizations" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "posts_blocks_certificates_organizations" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "posts_blocks_infinite_scroll" DROP COLUMN IF EXISTS "graphic_id";
  ALTER TABLE "posts_blocks_infinite_scroll" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "_posts_v_blocks_cta_left" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_posts_v_blocks_cta_left" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_posts_v_blocks_call_to_add_to_cart" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "_posts_v_blocks_certificates_organizations" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_posts_v_blocks_certificates_organizations" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_posts_v_blocks_infinite_scroll" DROP COLUMN IF EXISTS "graphic_id";
  ALTER TABLE "_posts_v_blocks_infinite_scroll" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "products_blocks_cta_left" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "products_blocks_cta_left" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "products_blocks_call_to_add_to_cart" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "products_blocks_certificates_organizations" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "products_blocks_certificates_organizations" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "products_blocks_how_to_use_product" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "products_blocks_infinite_scroll" DROP COLUMN IF EXISTS "graphic_id";
  ALTER TABLE "products_blocks_infinite_scroll" DROP COLUMN IF EXISTS "animation_duration";
  ALTER TABLE "contact_form_global" DROP COLUMN IF EXISTS "biolak_phone_number";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_certificates_organizations_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_infinite_scroll_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_certificates_organizations_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_infinite_scroll_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_certificates_organizations_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_infinite_scroll_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_certificates_organizations_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_infinite_scroll_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_certificates_organizations_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_infinite_scroll_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_certificates_organizations_locales" CASCADE;
  DROP TABLE "pages_blocks_infinite_scroll_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_certificates_organizations_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_infinite_scroll_locales" CASCADE;
  DROP TABLE "posts_blocks_certificates_organizations_locales" CASCADE;
  DROP TABLE "posts_blocks_infinite_scroll_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_certificates_organizations_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_infinite_scroll_locales" CASCADE;
  DROP TABLE "products_blocks_certificates_organizations_locales" CASCADE;
  DROP TABLE "products_blocks_infinite_scroll_locales" CASCADE;
  ALTER TABLE "contact_form_global_locales" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "contact_form_global_locales" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "contact_form_global_locales" ALTER COLUMN "phone_number" SET NOT NULL;
  ALTER TABLE "contact_form_global_locales" ALTER COLUMN "email" SET NOT NULL;
  ALTER TABLE "contact_form_global_locales" ALTER COLUMN "question" SET NOT NULL;
  ALTER TABLE "contact_form_global_locales" ALTER COLUMN "action_send" SET NOT NULL;
  ALTER TABLE "contact_form_global_locales" ALTER COLUMN "action_call" SET NOT NULL;
  ALTER TABLE "floating_global_locales" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "footer_global" ALTER COLUMN "legal_stamp_id" SET NOT NULL;
  ALTER TABLE "footer_global_locales" ALTER COLUMN "contact_us_title" SET NOT NULL;
  ALTER TABLE "footer_global_locales" ALTER COLUMN "contact_us_email_input_label" SET NOT NULL;
  ALTER TABLE "footer_global_locales" ALTER COLUMN "contact_us_description" SET NOT NULL;
  ALTER TABLE "footer_global_locales" ALTER COLUMN "legal_title" SET NOT NULL;
  ALTER TABLE "footer_global_locales" ALTER COLUMN "legal_content" SET NOT NULL;
  ALTER TABLE "footer_global_locales" ALTER COLUMN "legal_copyright" SET NOT NULL;
  ALTER TABLE "reviews_global_locales" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "reviews_global_locales" ALTER COLUMN "btn_label" SET NOT NULL;
  ALTER TABLE "reviews_global_locales" ALTER COLUMN "review_dialog_title" SET NOT NULL;
  ALTER TABLE "reviews_global_locales" ALTER COLUMN "hearts_selection_label" SET NOT NULL;
  ALTER TABLE "reviews_global_locales" ALTER COLUMN "invoice_id_label" SET NOT NULL;
  ALTER TABLE "reviews_global_locales" ALTER COLUMN "content_label" SET NOT NULL;
  ALTER TABLE "reviews_global_locales" ALTER COLUMN "send_review_btn_label" SET NOT NULL;
  ALTER TABLE "pages_blocks_cta_left" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_cta_left" ADD COLUMN "description" jsonb;
  ALTER TABLE "pages_blocks_call_to_action_post" ADD COLUMN "overwrite_title" varchar;
  ALTER TABLE "pages_blocks_call_to_action_post" ADD COLUMN "overwrite_description" varchar;
  ALTER TABLE "pages_blocks_call_to_add_to_cart" ADD COLUMN "content" jsonb;
  ALTER TABLE "pages_blocks_certificates_organizations" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_certificates_organizations" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_infinite_scroll" ADD COLUMN "graphic_id" integer;
  ALTER TABLE "pages_blocks_infinite_scroll" ADD COLUMN "animation_duration" numeric DEFAULT 10;
  ALTER TABLE "_pages_v_blocks_cta_left" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_cta_left" ADD COLUMN "description" jsonb;
  ALTER TABLE "_pages_v_blocks_call_to_action_post" ADD COLUMN "overwrite_title" varchar;
  ALTER TABLE "_pages_v_blocks_call_to_action_post" ADD COLUMN "overwrite_description" varchar;
  ALTER TABLE "_pages_v_blocks_call_to_add_to_cart" ADD COLUMN "content" jsonb;
  ALTER TABLE "_pages_v_blocks_certificates_organizations" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_certificates_organizations" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_infinite_scroll" ADD COLUMN "graphic_id" integer;
  ALTER TABLE "_pages_v_blocks_infinite_scroll" ADD COLUMN "animation_duration" numeric DEFAULT 10;
  ALTER TABLE "post_categories_blocks_call_to_action_post" ADD COLUMN "overwrite_title" varchar;
  ALTER TABLE "post_categories_blocks_call_to_action_post" ADD COLUMN "overwrite_description" varchar;
  ALTER TABLE "posts_blocks_cta_left" ADD COLUMN "title" varchar;
  ALTER TABLE "posts_blocks_cta_left" ADD COLUMN "description" jsonb;
  ALTER TABLE "posts_blocks_call_to_add_to_cart" ADD COLUMN "content" jsonb;
  ALTER TABLE "posts_blocks_certificates_organizations" ADD COLUMN "title" varchar;
  ALTER TABLE "posts_blocks_certificates_organizations" ADD COLUMN "description" varchar;
  ALTER TABLE "posts_blocks_infinite_scroll" ADD COLUMN "graphic_id" integer;
  ALTER TABLE "posts_blocks_infinite_scroll" ADD COLUMN "animation_duration" numeric DEFAULT 10;
  ALTER TABLE "_posts_v_blocks_cta_left" ADD COLUMN "title" varchar;
  ALTER TABLE "_posts_v_blocks_cta_left" ADD COLUMN "description" jsonb;
  ALTER TABLE "_posts_v_blocks_call_to_add_to_cart" ADD COLUMN "content" jsonb;
  ALTER TABLE "_posts_v_blocks_certificates_organizations" ADD COLUMN "title" varchar;
  ALTER TABLE "_posts_v_blocks_certificates_organizations" ADD COLUMN "description" varchar;
  ALTER TABLE "_posts_v_blocks_infinite_scroll" ADD COLUMN "graphic_id" integer;
  ALTER TABLE "_posts_v_blocks_infinite_scroll" ADD COLUMN "animation_duration" numeric DEFAULT 10;
  ALTER TABLE "products_blocks_cta_left" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "products_blocks_cta_left" ADD COLUMN "description" jsonb;
  ALTER TABLE "products_blocks_call_to_add_to_cart" ADD COLUMN "content" jsonb;
  ALTER TABLE "products_blocks_certificates_organizations" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "products_blocks_certificates_organizations" ADD COLUMN "description" varchar;
  ALTER TABLE "products_blocks_how_to_use_product" ADD COLUMN "content" jsonb NOT NULL;
  ALTER TABLE "products_blocks_infinite_scroll" ADD COLUMN "graphic_id" integer NOT NULL;
  ALTER TABLE "products_blocks_infinite_scroll" ADD COLUMN "animation_duration" numeric DEFAULT 10;
  ALTER TABLE "contact_form_global" ADD COLUMN "biolak_phone_number" varchar DEFAULT '0987654321';
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_infinite_scroll" ADD CONSTRAINT "pages_blocks_infinite_scroll_graphic_id_media_id_fk" FOREIGN KEY ("graphic_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_infinite_scroll" ADD CONSTRAINT "_pages_v_blocks_infinite_scroll_graphic_id_media_id_fk" FOREIGN KEY ("graphic_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "posts_blocks_infinite_scroll" ADD CONSTRAINT "posts_blocks_infinite_scroll_graphic_id_media_id_fk" FOREIGN KEY ("graphic_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_infinite_scroll" ADD CONSTRAINT "_posts_v_blocks_infinite_scroll_graphic_id_media_id_fk" FOREIGN KEY ("graphic_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "products_blocks_infinite_scroll" ADD CONSTRAINT "products_blocks_infinite_scroll_graphic_id_media_id_fk" FOREIGN KEY ("graphic_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "pages_blocks_infinite_scroll_graphic_idx" ON "pages_blocks_infinite_scroll" USING btree ("graphic_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_infinite_scroll_graphic_idx" ON "_pages_v_blocks_infinite_scroll" USING btree ("graphic_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_infinite_scroll_graphic_idx" ON "posts_blocks_infinite_scroll" USING btree ("graphic_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_infinite_scroll_graphic_idx" ON "_posts_v_blocks_infinite_scroll" USING btree ("graphic_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_infinite_scroll_graphic_idx" ON "products_blocks_infinite_scroll" USING btree ("graphic_id");
  ALTER TABLE "pages_blocks_cta_left_locales" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_cta_left_locales" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "pages_blocks_call_to_action_post_locales" DROP COLUMN IF EXISTS "overwrite_title";
  ALTER TABLE "pages_blocks_call_to_action_post_locales" DROP COLUMN IF EXISTS "overwrite_description";
  ALTER TABLE "pages_blocks_call_to_add_to_cart_locales" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "_pages_v_blocks_cta_left_locales" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_cta_left_locales" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_call_to_action_post_locales" DROP COLUMN IF EXISTS "overwrite_title";
  ALTER TABLE "_pages_v_blocks_call_to_action_post_locales" DROP COLUMN IF EXISTS "overwrite_description";
  ALTER TABLE "_pages_v_blocks_call_to_add_to_cart_locales" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "post_categories_blocks_call_to_action_post_locales" DROP COLUMN IF EXISTS "overwrite_title";
  ALTER TABLE "post_categories_blocks_call_to_action_post_locales" DROP COLUMN IF EXISTS "overwrite_description";
  ALTER TABLE "posts_blocks_cta_left_locales" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "posts_blocks_cta_left_locales" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "posts_blocks_call_to_add_to_cart_locales" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "_posts_v_blocks_cta_left_locales" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_posts_v_blocks_cta_left_locales" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_posts_v_blocks_call_to_add_to_cart_locales" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "products_blocks_cta_left_locales" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "products_blocks_cta_left_locales" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "products_blocks_call_to_add_to_cart_locales" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "products_blocks_how_to_use_product_locales" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "contact_form_global_locales" DROP COLUMN IF EXISTS "biolak_phone_number";`)
}
