import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_infinite_scroll" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"graphic_id" integer,
  	"animation_duration" numeric DEFAULT 5,
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
   ALTER TABLE "_pages_v_blocks_infinite_scroll" ADD CONSTRAINT "_pages_v_blocks_infinite_scroll_graphic_id_media_id_fk" FOREIGN KEY ("graphic_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_infinite_scroll" ADD CONSTRAINT "_pages_v_blocks_infinite_scroll_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_infinite_scroll_order_idx" ON "pages_blocks_infinite_scroll" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_infinite_scroll_parent_id_idx" ON "pages_blocks_infinite_scroll" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_infinite_scroll_path_idx" ON "pages_blocks_infinite_scroll" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_infinite_scroll_graphic_idx" ON "pages_blocks_infinite_scroll" USING btree ("graphic_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_infinite_scroll_order_idx" ON "_pages_v_blocks_infinite_scroll" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_infinite_scroll_parent_id_idx" ON "_pages_v_blocks_infinite_scroll" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_infinite_scroll_path_idx" ON "_pages_v_blocks_infinite_scroll" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_infinite_scroll_graphic_idx" ON "_pages_v_blocks_infinite_scroll" USING btree ("graphic_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_infinite_scroll" CASCADE;
  DROP TABLE "_pages_v_blocks_infinite_scroll" CASCADE;`)
}
