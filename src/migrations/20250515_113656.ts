import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_post_categories_footer_size" AS ENUM('small', 'medium', 'large');
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
  
  ALTER TABLE "pages_blocks_posts_grid" ADD COLUMN "post_categories_id" integer;
  ALTER TABLE "_pages_v_blocks_posts_grid" ADD COLUMN "post_categories_id" integer;
  ALTER TABLE "post_categories" ADD COLUMN "footer_size" "enum_post_categories_footer_size" DEFAULT 'small';
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
  
  CREATE INDEX IF NOT EXISTS "post_categories_blocks_call_to_action_post_order_idx" ON "post_categories_blocks_call_to_action_post" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "post_categories_blocks_call_to_action_post_parent_id_idx" ON "post_categories_blocks_call_to_action_post" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "post_categories_blocks_call_to_action_post_path_idx" ON "post_categories_blocks_call_to_action_post" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "post_categories_blocks_call_to_action_post_post_idx" ON "post_categories_blocks_call_to_action_post" USING btree ("post_id");
  CREATE INDEX IF NOT EXISTS "post_categories_blocks_posts_grid_order_idx" ON "post_categories_blocks_posts_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "post_categories_blocks_posts_grid_parent_id_idx" ON "post_categories_blocks_posts_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "post_categories_blocks_posts_grid_path_idx" ON "post_categories_blocks_posts_grid" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "post_categories_blocks_posts_grid_post_categories_idx" ON "post_categories_blocks_posts_grid" USING btree ("post_categories_id");
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_posts_grid" ADD CONSTRAINT "pages_blocks_posts_grid_post_categories_id_post_categories_id_fk" FOREIGN KEY ("post_categories_id") REFERENCES "public"."post_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_posts_grid" ADD CONSTRAINT "_pages_v_blocks_posts_grid_post_categories_id_post_categories_id_fk" FOREIGN KEY ("post_categories_id") REFERENCES "public"."post_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_posts_grid_post_categories_idx" ON "pages_blocks_posts_grid" USING btree ("post_categories_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_posts_grid_post_categories_idx" ON "_pages_v_blocks_posts_grid" USING btree ("post_categories_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "post_categories_blocks_call_to_action_post" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "post_categories_blocks_posts_grid" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "post_categories_blocks_call_to_action_post" CASCADE;
  DROP TABLE "post_categories_blocks_posts_grid" CASCADE;
  ALTER TABLE "pages_blocks_posts_grid" DROP CONSTRAINT "pages_blocks_posts_grid_post_categories_id_post_categories_id_fk";
  
  ALTER TABLE "_pages_v_blocks_posts_grid" DROP CONSTRAINT "_pages_v_blocks_posts_grid_post_categories_id_post_categories_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_posts_grid_post_categories_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_posts_grid_post_categories_idx";
  ALTER TABLE "pages_blocks_posts_grid" DROP COLUMN IF EXISTS "post_categories_id";
  ALTER TABLE "_pages_v_blocks_posts_grid" DROP COLUMN IF EXISTS "post_categories_id";
  ALTER TABLE "post_categories" DROP COLUMN IF EXISTS "footer_size";
  DROP TYPE "public"."enum_post_categories_footer_size";`)
}
