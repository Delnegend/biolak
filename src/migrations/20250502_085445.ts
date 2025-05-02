import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_latest_posts_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"post_id" integer
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
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_latest_posts_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"post_id" integer,
  	"_uuid" varchar
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
   ALTER TABLE "pages_blocks_latest_posts" ADD CONSTRAINT "pages_blocks_latest_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "_pages_v_blocks_latest_posts" ADD CONSTRAINT "_pages_v_blocks_latest_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_latest_posts_posts_order_idx" ON "pages_blocks_latest_posts_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_latest_posts_posts_parent_id_idx" ON "pages_blocks_latest_posts_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_latest_posts_posts_post_idx" ON "pages_blocks_latest_posts_posts" USING btree ("post_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_latest_posts_order_idx" ON "pages_blocks_latest_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_latest_posts_parent_id_idx" ON "pages_blocks_latest_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_latest_posts_path_idx" ON "pages_blocks_latest_posts" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_latest_posts_posts_order_idx" ON "_pages_v_blocks_latest_posts_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_latest_posts_posts_parent_id_idx" ON "_pages_v_blocks_latest_posts_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_latest_posts_posts_post_idx" ON "_pages_v_blocks_latest_posts_posts" USING btree ("post_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_latest_posts_order_idx" ON "_pages_v_blocks_latest_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_latest_posts_parent_id_idx" ON "_pages_v_blocks_latest_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_latest_posts_path_idx" ON "_pages_v_blocks_latest_posts" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_latest_posts_posts" CASCADE;
  DROP TABLE "pages_blocks_latest_posts" CASCADE;
  DROP TABLE "_pages_v_blocks_latest_posts_posts" CASCADE;
  DROP TABLE "_pages_v_blocks_latest_posts" CASCADE;`)
}
