import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "posts_blocks_focus_left_small_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_focus_right_large_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_focus_right_small_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_focus_left_small_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_focus_right_large_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_focus_right_small_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "checkout" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"contacts_title" varchar DEFAULT 'Thông tin liên hệ của bạn' NOT NULL,
  	"contacts_email_input_label" varchar DEFAULT 'Nhập địa chỉ email' NOT NULL,
  	"contacts_accept_newsletter" varchar DEFAULT 'Tôi đồng ý nhận mọi thông tin khuyến mãi' NOT NULL,
  	"address_title" varchar DEFAULT 'Địa chỉ giao hàng' NOT NULL,
  	"address_name_input_label" varchar DEFAULT 'Họ và tên' NOT NULL,
  	"address_phone_input_label" varchar DEFAULT 'Số điện thoại' NOT NULL,
  	"address_province_city_input_label" varchar DEFAULT 'Chọn Tỉnh/Thành phố' NOT NULL,
  	"address_district_input_label" varchar DEFAULT 'Chọn Quận/Huyện' NOT NULL,
  	"address_ward_input_label" varchar DEFAULT 'Chọn Phuờng/Xã' NOT NULL,
  	"shipping_title" varchar DEFAULT 'Phuơng thức vận chuyển' NOT NULL,
  	"shipping_standard_shipping_label" varchar DEFAULT 'Giao hàng tiêu chuẩn (2-3 ngày)' NOT NULL,
  	"shipping_fast_shipping_label" varchar DEFAULT 'Giao hàng nhanh (1-2 ngày)' NOT NULL,
  	"payment_title" varchar DEFAULT 'Phương thức thanh toán' NOT NULL,
  	"payment_cod_label" varchar DEFAULT 'Thanh toán khi nhận hàng (COD)' NOT NULL,
  	"payment_bank_transfer_label" varchar DEFAULT 'Chuyển khoản ngân hàng (QR)' NOT NULL,
  	"gift_title" varchar DEFAULT 'Tặng quà' NOT NULL,
  	"gift_sender_input_label" varchar DEFAULT 'Tên người gửi' NOT NULL,
  	"gift_recipient_input_label" varchar DEFAULT 'Tên người nhận' NOT NULL,
  	"gift_message_input_label" varchar DEFAULT 'Thông điệp. Giới hạn 1000 chữ.' NOT NULL,
  	"order_title" varchar DEFAULT 'Chi tiết đơn hàng' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_products_carousel" ADD COLUMN "title" varchar DEFAULT 'Sản phẩm bán chạy';
  ALTER TABLE "_pages_v_blocks_products_carousel" ADD COLUMN "title" varchar DEFAULT 'Sản phẩm bán chạy';
  ALTER TABLE "posts_blocks_products_carousel" ADD COLUMN "title" varchar DEFAULT 'Sản phẩm bán chạy';
  ALTER TABLE "_posts_v_blocks_products_carousel" ADD COLUMN "title" varchar DEFAULT 'Sản phẩm bán chạy';
  ALTER TABLE "products_blocks_products_carousel" ADD COLUMN "title" varchar DEFAULT 'Sản phẩm bán chạy' NOT NULL;
  ALTER TABLE "products" ADD COLUMN "long_description" jsonb;
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_focus_left_small_image" ADD CONSTRAINT "posts_blocks_focus_left_small_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_focus_left_small_image" ADD CONSTRAINT "posts_blocks_focus_left_small_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_focus_right_large_image" ADD CONSTRAINT "posts_blocks_focus_right_large_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_focus_right_large_image" ADD CONSTRAINT "posts_blocks_focus_right_large_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_focus_right_small_image" ADD CONSTRAINT "posts_blocks_focus_right_small_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_focus_right_small_image" ADD CONSTRAINT "posts_blocks_focus_right_small_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_focus_left_small_image" ADD CONSTRAINT "_posts_v_blocks_focus_left_small_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_focus_left_small_image" ADD CONSTRAINT "_posts_v_blocks_focus_left_small_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_focus_right_large_image" ADD CONSTRAINT "_posts_v_blocks_focus_right_large_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_focus_right_large_image" ADD CONSTRAINT "_posts_v_blocks_focus_right_large_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_focus_right_small_image" ADD CONSTRAINT "_posts_v_blocks_focus_right_small_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_focus_right_small_image" ADD CONSTRAINT "_posts_v_blocks_focus_right_small_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "posts_blocks_focus_left_small_image_order_idx" ON "posts_blocks_focus_left_small_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_focus_left_small_image_parent_id_idx" ON "posts_blocks_focus_left_small_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_focus_left_small_image_path_idx" ON "posts_blocks_focus_left_small_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_focus_left_small_image_image_idx" ON "posts_blocks_focus_left_small_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_focus_right_large_image_order_idx" ON "posts_blocks_focus_right_large_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_focus_right_large_image_parent_id_idx" ON "posts_blocks_focus_right_large_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_focus_right_large_image_path_idx" ON "posts_blocks_focus_right_large_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_focus_right_large_image_image_idx" ON "posts_blocks_focus_right_large_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_focus_right_small_image_order_idx" ON "posts_blocks_focus_right_small_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_focus_right_small_image_parent_id_idx" ON "posts_blocks_focus_right_small_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_focus_right_small_image_path_idx" ON "posts_blocks_focus_right_small_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_focus_right_small_image_image_idx" ON "posts_blocks_focus_right_small_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_focus_left_small_image_order_idx" ON "_posts_v_blocks_focus_left_small_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_focus_left_small_image_parent_id_idx" ON "_posts_v_blocks_focus_left_small_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_focus_left_small_image_path_idx" ON "_posts_v_blocks_focus_left_small_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_focus_left_small_image_image_idx" ON "_posts_v_blocks_focus_left_small_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_focus_right_large_image_order_idx" ON "_posts_v_blocks_focus_right_large_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_focus_right_large_image_parent_id_idx" ON "_posts_v_blocks_focus_right_large_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_focus_right_large_image_path_idx" ON "_posts_v_blocks_focus_right_large_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_focus_right_large_image_image_idx" ON "_posts_v_blocks_focus_right_large_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_focus_right_small_image_order_idx" ON "_posts_v_blocks_focus_right_small_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_focus_right_small_image_parent_id_idx" ON "_posts_v_blocks_focus_right_small_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_focus_right_small_image_path_idx" ON "_posts_v_blocks_focus_right_small_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_focus_right_small_image_image_idx" ON "_posts_v_blocks_focus_right_small_image" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "posts_blocks_focus_left_small_image" CASCADE;
  DROP TABLE "posts_blocks_focus_right_large_image" CASCADE;
  DROP TABLE "posts_blocks_focus_right_small_image" CASCADE;
  DROP TABLE "_posts_v_blocks_focus_left_small_image" CASCADE;
  DROP TABLE "_posts_v_blocks_focus_right_large_image" CASCADE;
  DROP TABLE "_posts_v_blocks_focus_right_small_image" CASCADE;
  DROP TABLE "checkout" CASCADE;
  ALTER TABLE "pages_blocks_products_carousel" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_products_carousel" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "posts_blocks_products_carousel" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_posts_v_blocks_products_carousel" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "products_blocks_products_carousel" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "long_description";`)
}
