import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_footer_size" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_version_footer_size" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum_posts_footer_size" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum__posts_v_version_footer_size" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum_products_footer_size" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum_product_categories_footer_size" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum_product_sub_categories_footer_size" AS ENUM('small', 'medium', 'large');
  ALTER TYPE "public"."enum_header_nav_items_left_item" RENAME TO "enum_header_global_nav_items_left_item";
  ALTER TYPE "public"."enum_header_nav_items_right_item" RENAME TO "enum_header_global_nav_items_right_item";
  CREATE TABLE IF NOT EXISTS "contact_form_global" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Liên hệ với BioLAK' NOT NULL,
  	"name" varchar DEFAULT 'Nhập tên của bạn' NOT NULL,
  	"phone_number" varchar DEFAULT 'Nhập số điện thoại' NOT NULL,
  	"email" varchar DEFAULT 'Nhập địa chỉ email' NOT NULL,
  	"question" varchar DEFAULT 'Câu hỏi của bạn tới chúng tôi' NOT NULL,
  	"action_send" varchar DEFAULT 'GỬI BIOLAK' NOT NULL,
  	"biolak_phone_number" varchar DEFAULT '0987654321',
  	"action_call" varchar DEFAULT 'GỌI BIOLAK' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_products_category_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_products_category_products" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_products_category_products" CASCADE;
  DROP TABLE "_pages_v_blocks_products_category_products" CASCADE;
  ALTER TABLE "header_nav_items_left" RENAME TO "header_global_nav_items_left";
  ALTER TABLE "header_nav_items_right" RENAME TO "header_global_nav_items_right";
  ALTER TABLE "header" RENAME TO "header_global";
  ALTER TABLE "footer" RENAME TO "footer_global";
  ALTER TABLE "checkout" RENAME TO "checkout_page_global";
  ALTER TABLE "contact_form" RENAME COLUMN "name" TO "username";
  ALTER TABLE "contact_form" RENAME COLUMN "question" TO "message";
  ALTER TABLE "header_global_nav_items_left" DROP CONSTRAINT "header_nav_items_left_parent_id_fk";
  
  ALTER TABLE "header_global_nav_items_right" DROP CONSTRAINT "header_nav_items_right_parent_id_fk";
  
  ALTER TABLE "footer_global" DROP CONSTRAINT "footer_image_image_id_media_id_fk";
  
  ALTER TABLE "footer_global" DROP CONSTRAINT "footer_legal_stamp_id_media_id_fk";
  
  DROP INDEX IF EXISTS "header_nav_items_left_order_idx";
  DROP INDEX IF EXISTS "header_nav_items_left_parent_id_idx";
  DROP INDEX IF EXISTS "header_nav_items_right_order_idx";
  DROP INDEX IF EXISTS "header_nav_items_right_parent_id_idx";
  DROP INDEX IF EXISTS "footer_image_image_image_idx";
  DROP INDEX IF EXISTS "footer_legal_legal_stamp_idx";
  ALTER TABLE "contact_form" ALTER COLUMN "phone_number" DROP DEFAULT;
  ALTER TABLE "contact_form" ALTER COLUMN "email" DROP DEFAULT;
  ALTER TABLE "contact_form" ALTER COLUMN "updated_at" SET DEFAULT now();
  ALTER TABLE "contact_form" ALTER COLUMN "updated_at" SET NOT NULL;
  ALTER TABLE "contact_form" ALTER COLUMN "created_at" SET DEFAULT now();
  ALTER TABLE "contact_form" ALTER COLUMN "created_at" SET NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "footer_size" "enum_pages_footer_size" DEFAULT 'small';
  ALTER TABLE "_pages_v" ADD COLUMN "version_footer_size" "enum__pages_v_version_footer_size" DEFAULT 'small';
  ALTER TABLE "posts" ADD COLUMN "footer_size" "enum_posts_footer_size" DEFAULT 'small';
  ALTER TABLE "_posts_v" ADD COLUMN "version_footer_size" "enum__posts_v_version_footer_size" DEFAULT 'small';
  ALTER TABLE "products" ADD COLUMN "icon_id" integer;
  ALTER TABLE "products" ADD COLUMN "footer_size" "enum_products_footer_size" DEFAULT 'small';
  ALTER TABLE "product_categories" ADD COLUMN "footer_size" "enum_product_categories_footer_size" DEFAULT 'small';
  ALTER TABLE "product_sub_categories" ADD COLUMN "footer_size" "enum_product_sub_categories_footer_size" DEFAULT 'small';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "contact_form_id" integer;
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_form_fk" FOREIGN KEY ("contact_form_id") REFERENCES "public"."contact_form"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_global_nav_items_left" ADD CONSTRAINT "header_global_nav_items_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_global"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_global_nav_items_right" ADD CONSTRAINT "header_global_nav_items_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_global"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_global" ADD CONSTRAINT "footer_global_image_image_id_media_id_fk" FOREIGN KEY ("image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_global" ADD CONSTRAINT "footer_global_legal_stamp_id_media_id_fk" FOREIGN KEY ("legal_stamp_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "products_icon_idx" ON "products" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_contact_form_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_form_id");
  CREATE INDEX IF NOT EXISTS "header_global_nav_items_left_order_idx" ON "header_global_nav_items_left" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_global_nav_items_left_parent_id_idx" ON "header_global_nav_items_left" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_global_nav_items_right_order_idx" ON "header_global_nav_items_right" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_global_nav_items_right_parent_id_idx" ON "header_global_nav_items_right" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_global_image_image_image_idx" ON "footer_global" USING btree ("image_image_id");
  CREATE INDEX IF NOT EXISTS "footer_global_legal_legal_stamp_idx" ON "footer_global" USING btree ("legal_stamp_id");
  CREATE INDEX IF NOT EXISTS "contact_form_updated_at_idx" ON "contact_form" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "contact_form_created_at_idx" ON "contact_form" USING btree ("created_at");
  ALTER TABLE "contact_form" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "contact_form" DROP COLUMN IF EXISTS "action_send";
  ALTER TABLE "contact_form" DROP COLUMN IF EXISTS "biolak_phone_number";
  ALTER TABLE "contact_form" DROP COLUMN IF EXISTS "action_call";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_nav_items_left_item" AS ENUM('search', 'products', 'about', 'events', 'contact', 'vie-en', 'cart');
  CREATE TYPE "public"."enum_header_nav_items_right_item" AS ENUM('search', 'products', 'about', 'events', 'contact', 'vie-en', 'cart');
  CREATE TABLE IF NOT EXISTS "pages_blocks_products_category_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_products_category_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"product_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "header_nav_items_left" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" "enum_header_nav_items_left_item"
  );
  
  CREATE TABLE IF NOT EXISTS "header_nav_items_right" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" "enum_header_nav_items_right_item"
  );
  
  CREATE TABLE IF NOT EXISTS "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_image_id" integer,
  	"contact_us_title" varchar DEFAULT 'Đăng kí để nhận thông tin khuyến mãi sớm nhất từ BioLAK' NOT NULL,
  	"contact_us_email_input_label" varchar DEFAULT 'Nhập địa chỉ Email' NOT NULL,
  	"contact_us_description" varchar DEFAULT 'Đăng kí để nhận thông tin liên lạc về các sản phẩm, dịch vụ, cửa hàng, sự kiện và các vấn đề đáng quan tâm của BioLAK.' NOT NULL,
  	"legal_title" varchar DEFAULT 'Website thuộc quyền của công ty trách nhiệm hữu hạn ELAK' NOT NULL,
  	"legal_content" varchar DEFAULT 'GCNDKKD 0107874681 | Sở kế hoạch và đầu tư TP. Hà Nội
  cấp ngày 05/06/2017,
  đăng ký thay đổi lần 2 ngày 12/01/2024
  Địa chỉ: Xóm 5 thôn Long Phú, xã Hòa Thạch, huyện Quốc Oai,
  TP Hà Nội, Việt Nam.
  Điện thoại: 0983335596 - Email: info@biolak.vn' NOT NULL,
  	"legal_stamp_id" integer NOT NULL,
  	"legal_copyright" varchar DEFAULT '© 2025 BioLAK Vietnam. All rights reserved.' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
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
  
  ALTER TABLE "header_global_nav_items_left" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_global_nav_items_right" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_global" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_global" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_form_global" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "checkout_page_global" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "header_global_nav_items_left" CASCADE;
  DROP TABLE "header_global_nav_items_right" CASCADE;
  DROP TABLE "header_global" CASCADE;
  DROP TABLE "footer_global" CASCADE;
  DROP TABLE "contact_form_global" CASCADE;
  DROP TABLE "checkout_page_global" CASCADE;
  ALTER TABLE "products" DROP CONSTRAINT "products_icon_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_contact_form_fk";
  
  DROP INDEX IF EXISTS "contact_form_updated_at_idx";
  DROP INDEX IF EXISTS "contact_form_created_at_idx";
  DROP INDEX IF EXISTS "products_icon_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_contact_form_id_idx";
  ALTER TABLE "contact_form" ALTER COLUMN "email" SET DEFAULT 'Nhập địa chỉ email';
  ALTER TABLE "contact_form" ALTER COLUMN "phone_number" SET DEFAULT 'Nhập số điện thoại';
  ALTER TABLE "contact_form" ALTER COLUMN "updated_at" DROP DEFAULT;
  ALTER TABLE "contact_form" ALTER COLUMN "updated_at" DROP NOT NULL;
  ALTER TABLE "contact_form" ALTER COLUMN "created_at" DROP DEFAULT;
  ALTER TABLE "contact_form" ALTER COLUMN "created_at" DROP NOT NULL;
  ALTER TABLE "contact_form" ADD COLUMN "title" varchar DEFAULT 'Liên hệ với BioLAK' NOT NULL;
  ALTER TABLE "contact_form" ADD COLUMN "name" varchar DEFAULT 'Nhập tên của bạn' NOT NULL;
  ALTER TABLE "contact_form" ADD COLUMN "question" varchar DEFAULT 'Câu hỏi của bạn tới chúng tôi' NOT NULL;
  ALTER TABLE "contact_form" ADD COLUMN "action_send" varchar DEFAULT 'GỬI BIOLAK' NOT NULL;
  ALTER TABLE "contact_form" ADD COLUMN "biolak_phone_number" varchar DEFAULT '0987654321';
  ALTER TABLE "contact_form" ADD COLUMN "action_call" varchar DEFAULT 'GỌI BIOLAK' NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_products_category_products" ADD CONSTRAINT "pages_blocks_products_category_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_products_category_products" ADD CONSTRAINT "pages_blocks_products_category_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_products_category"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_products_category_products" ADD CONSTRAINT "_pages_v_blocks_products_category_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_products_category_products" ADD CONSTRAINT "_pages_v_blocks_products_category_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_products_category"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items_left" ADD CONSTRAINT "header_nav_items_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items_right" ADD CONSTRAINT "header_nav_items_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer" ADD CONSTRAINT "footer_image_image_id_media_id_fk" FOREIGN KEY ("image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer" ADD CONSTRAINT "footer_legal_stamp_id_media_id_fk" FOREIGN KEY ("legal_stamp_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_products_category_products_order_idx" ON "pages_blocks_products_category_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_products_category_products_parent_id_idx" ON "pages_blocks_products_category_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_products_category_products_product_idx" ON "pages_blocks_products_category_products" USING btree ("product_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_products_category_products_order_idx" ON "_pages_v_blocks_products_category_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_products_category_products_parent_id_idx" ON "_pages_v_blocks_products_category_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_products_category_products_product_idx" ON "_pages_v_blocks_products_category_products" USING btree ("product_id");
  CREATE INDEX IF NOT EXISTS "header_nav_items_left_order_idx" ON "header_nav_items_left" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_nav_items_left_parent_id_idx" ON "header_nav_items_left" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_nav_items_right_order_idx" ON "header_nav_items_right" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_nav_items_right_parent_id_idx" ON "header_nav_items_right" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_image_image_image_idx" ON "footer" USING btree ("image_image_id");
  CREATE INDEX IF NOT EXISTS "footer_legal_legal_stamp_idx" ON "footer" USING btree ("legal_stamp_id");
  ALTER TABLE "contact_form" DROP COLUMN IF EXISTS "username";
  ALTER TABLE "contact_form" DROP COLUMN IF EXISTS "message";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "footer_size";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_footer_size";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "footer_size";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_footer_size";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "icon_id";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "footer_size";
  ALTER TABLE "product_categories" DROP COLUMN IF EXISTS "footer_size";
  ALTER TABLE "product_sub_categories" DROP COLUMN IF EXISTS "footer_size";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "contact_form_id";
  DROP TYPE "public"."enum_pages_footer_size";
  DROP TYPE "public"."enum__pages_v_version_footer_size";
  DROP TYPE "public"."enum_posts_footer_size";
  DROP TYPE "public"."enum__posts_v_version_footer_size";
  DROP TYPE "public"."enum_products_footer_size";
  DROP TYPE "public"."enum_product_categories_footer_size";
  DROP TYPE "public"."enum_product_sub_categories_footer_size";
  DROP TYPE "public"."enum_header_global_nav_items_left_item";
  DROP TYPE "public"."enum_header_global_nav_items_right_item";`)
}
