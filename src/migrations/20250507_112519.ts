import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_latest_posts_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_products_carousel_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_latest_posts_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_products_carousel_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_products_carousel_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_products_carousel_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_latest_posts_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_products_carousel_products" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_latest_posts_posts" CASCADE;
  DROP TABLE "pages_blocks_products_carousel_products" CASCADE;
  DROP TABLE "_pages_v_blocks_latest_posts_posts" CASCADE;
  DROP TABLE "_pages_v_blocks_products_carousel_products" CASCADE;
  DROP TABLE "posts_blocks_products_carousel_products" CASCADE;
  DROP TABLE "_posts_v_blocks_products_carousel_products" CASCADE;
  DROP TABLE "products_gallery" CASCADE;
  DROP TABLE "products_blocks_latest_posts_posts" CASCADE;
  DROP TABLE "products_blocks_products_carousel_products" CASCADE;
  ALTER TABLE "products_rels" ADD COLUMN "media_id" integer;
  DO $$ BEGIN
   ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "products_rels_media_id_idx" ON "products_rels" USING btree ("media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_latest_posts_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"post_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_products_carousel_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_latest_posts_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"post_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_products_carousel_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"product_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_products_carousel_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_products_carousel_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"product_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_latest_posts_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"post_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "products_blocks_products_carousel_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer NOT NULL
  );
  
  ALTER TABLE "products_rels" DROP CONSTRAINT "products_rels_media_fk";
  
  DROP INDEX IF EXISTS "products_rels_media_id_idx";
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_latest_posts_posts" ADD CONSTRAINT "pages_blocks_latest_posts_posts_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_latest_posts_posts" ADD CONSTRAINT "pages_blocks_latest_posts_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_latest_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_products_carousel_products" ADD CONSTRAINT "pages_blocks_products_carousel_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_products_carousel_products" ADD CONSTRAINT "pages_blocks_products_carousel_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_products_carousel"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_latest_posts_posts" ADD CONSTRAINT "_pages_v_blocks_latest_posts_posts_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_latest_posts_posts" ADD CONSTRAINT "_pages_v_blocks_latest_posts_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_latest_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_products_carousel_products" ADD CONSTRAINT "_pages_v_blocks_products_carousel_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_products_carousel_products" ADD CONSTRAINT "_pages_v_blocks_products_carousel_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_products_carousel"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "products_gallery" ADD CONSTRAINT "products_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_gallery" ADD CONSTRAINT "products_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "products_blocks_products_carousel_products" ADD CONSTRAINT "products_blocks_products_carousel_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_blocks_products_carousel_products" ADD CONSTRAINT "products_blocks_products_carousel_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_products_carousel"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_latest_posts_posts_order_idx" ON "pages_blocks_latest_posts_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_latest_posts_posts_parent_id_idx" ON "pages_blocks_latest_posts_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_latest_posts_posts_post_idx" ON "pages_blocks_latest_posts_posts" USING btree ("post_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_products_carousel_products_order_idx" ON "pages_blocks_products_carousel_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_products_carousel_products_parent_id_idx" ON "pages_blocks_products_carousel_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_products_carousel_products_product_idx" ON "pages_blocks_products_carousel_products" USING btree ("product_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_latest_posts_posts_order_idx" ON "_pages_v_blocks_latest_posts_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_latest_posts_posts_parent_id_idx" ON "_pages_v_blocks_latest_posts_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_latest_posts_posts_post_idx" ON "_pages_v_blocks_latest_posts_posts" USING btree ("post_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_products_carousel_products_order_idx" ON "_pages_v_blocks_products_carousel_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_products_carousel_products_parent_id_idx" ON "_pages_v_blocks_products_carousel_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_products_carousel_products_product_idx" ON "_pages_v_blocks_products_carousel_products" USING btree ("product_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_products_carousel_products_order_idx" ON "posts_blocks_products_carousel_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_products_carousel_products_parent_id_idx" ON "posts_blocks_products_carousel_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_products_carousel_products_product_idx" ON "posts_blocks_products_carousel_products" USING btree ("product_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_products_carousel_products_order_idx" ON "_posts_v_blocks_products_carousel_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_products_carousel_products_parent_id_idx" ON "_posts_v_blocks_products_carousel_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_products_carousel_products_product_idx" ON "_posts_v_blocks_products_carousel_products" USING btree ("product_id");
  CREATE INDEX IF NOT EXISTS "products_gallery_order_idx" ON "products_gallery" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_gallery_parent_id_idx" ON "products_gallery" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_gallery_image_idx" ON "products_gallery" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_latest_posts_posts_order_idx" ON "products_blocks_latest_posts_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_latest_posts_posts_parent_id_idx" ON "products_blocks_latest_posts_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_latest_posts_posts_post_idx" ON "products_blocks_latest_posts_posts" USING btree ("post_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_products_carousel_products_order_idx" ON "products_blocks_products_carousel_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_blocks_products_carousel_products_parent_id_idx" ON "products_blocks_products_carousel_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_blocks_products_carousel_products_product_idx" ON "products_blocks_products_carousel_products" USING btree ("product_id");
  ALTER TABLE "products_rels" DROP COLUMN IF EXISTS "media_id";`)
}
