import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_orders_billing_method" AS ENUM('cod', 'bankTransfer');
  CREATE TYPE "public"."enum_orders_shipping_info_method" AS ENUM('standard', 'express');
  CREATE TYPE "public"."enum__orders_v_version_billing_method" AS ENUM('cod', 'bankTransfer');
  CREATE TYPE "public"."enum__orders_v_version_shipping_info_method" AS ENUM('standard', 'express');
  CREATE TABLE IF NOT EXISTS "orders_cart_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer NOT NULL,
  	"sku" varchar NOT NULL,
  	"quantity" numeric NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "_orders_v_version_cart_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"product_id" integer NOT NULL,
  	"sku" varchar NOT NULL,
  	"quantity" numeric NOT NULL,
  	"_uuid" varchar
  );

  CREATE TABLE IF NOT EXISTS "_orders_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_customer_id" integer NOT NULL,
  	"version_note" varchar,
  	"version_cart_discount_code_id" integer,
  	"version_billing_method" "enum__orders_v_version_billing_method" DEFAULT 'cod',
  	"version_billing_paid_in_full" boolean DEFAULT false,
  	"version_billing_transaction_info_gateway" varchar,
  	"version_billing_transaction_info_transaction_date" timestamp(3) with time zone,
  	"version_billing_transaction_info_account_number" varchar,
  	"version_billing_transaction_info_code" varchar,
  	"version_billing_transaction_info_content" varchar,
  	"version_billing_transaction_info_transfer_amount" numeric,
  	"version_billing_transaction_info_reference_code" varchar,
  	"version_billing_transaction_info_description" varchar,
  	"version_shipping_info_address_city" varchar NOT NULL,
  	"version_shipping_info_address_district" varchar NOT NULL,
  	"version_shipping_info_address_ward" varchar NOT NULL,
  	"version_shipping_info_address_house_number" varchar NOT NULL,
  	"version_shipping_info_method" "enum__orders_v_version_shipping_info_method" DEFAULT 'standard',
  	"version_shipping_info_tracking" varchar,
  	"version_message_sender" varchar,
  	"version_message_receiver" varchar,
  	"version_message_content" varchar,
  	"version_review_rating" numeric,
  	"version_review_content" varchar,
  	"version_review_approved" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  ALTER TABLE "orders" RENAME COLUMN "customers_id" TO "customer_id";
  ALTER TABLE "orders" DROP CONSTRAINT "orders_products_id_products_id_fk";

  ALTER TABLE "orders" DROP CONSTRAINT "orders_customers_id_customers_id_fk";

  DROP INDEX IF EXISTS "orders_products_idx";
  DROP INDEX IF EXISTS "orders_customers_idx";
  ALTER TABLE "products_blocks_infinite_scroll_locales" ALTER COLUMN "graphic_id" DROP NOT NULL;
  ALTER TABLE "orders" ADD COLUMN "note" varchar;
  ALTER TABLE "orders" ADD COLUMN "cart_discount_code_id" integer;
  ALTER TABLE "orders" ADD COLUMN "billing_method" "enum_orders_billing_method" DEFAULT 'cod';
  ALTER TABLE "orders" ADD COLUMN "billing_paid_in_full" boolean DEFAULT false;
  ALTER TABLE "orders" ADD COLUMN "billing_transaction_info_gateway" varchar;
  ALTER TABLE "orders" ADD COLUMN "billing_transaction_info_transaction_date" timestamp(3) with time zone;
  ALTER TABLE "orders" ADD COLUMN "billing_transaction_info_account_number" varchar;
  ALTER TABLE "orders" ADD COLUMN "billing_transaction_info_code" varchar;
  ALTER TABLE "orders" ADD COLUMN "billing_transaction_info_content" varchar;
  ALTER TABLE "orders" ADD COLUMN "billing_transaction_info_transfer_amount" numeric;
  ALTER TABLE "orders" ADD COLUMN "billing_transaction_info_reference_code" varchar;
  ALTER TABLE "orders" ADD COLUMN "billing_transaction_info_description" varchar;
  ALTER TABLE "orders" ADD COLUMN "shipping_info_address_city" varchar;
  UPDATE "orders" SET "shipping_info_address_city" = '';
  ALTER TABLE "orders" ALTER COLUMN "shipping_info_address_city" SET NOT NULL;
  ALTER TABLE "orders" ADD COLUMN "shipping_info_address_district" varchar;
  UPDATE "orders" SET "shipping_info_address_district" = '';
  ALTER TABLE "orders" ALTER COLUMN "shipping_info_address_district" SET NOT NULL;
  ALTER TABLE "orders" ADD COLUMN "shipping_info_address_ward" varchar;
  UPDATE "orders" SET "shipping_info_address_ward" = '';
  ALTER TABLE "orders" ALTER COLUMN "shipping_info_address_ward" SET NOT NULL;
  ALTER TABLE "orders" ADD COLUMN "shipping_info_address_house_number" varchar;
  UPDATE "orders" SET "shipping_info_address_house_number" = '';
  ALTER TABLE "orders" ALTER COLUMN "shipping_info_address_house_number" SET NOT NULL;
  ALTER TABLE "orders" ADD COLUMN "shipping_info_method" "enum_orders_shipping_info_method" DEFAULT 'standard';
  ALTER TABLE "orders" ADD COLUMN "shipping_info_tracking" varchar;
  ALTER TABLE "orders" ADD COLUMN "message_sender" varchar;
  ALTER TABLE "orders" ADD COLUMN "message_receiver" varchar;
  ALTER TABLE "orders" ADD COLUMN "message_content" varchar;
  ALTER TABLE "users" ADD COLUMN "receive_order_email" boolean DEFAULT true;
  ALTER TABLE "checkout_page_global" ADD COLUMN "shipping_standard_shipping_price" numeric;
  ALTER TABLE "checkout_page_global" ADD COLUMN "shipping_fast_shipping_price" numeric;
  DO $$ BEGIN
   ALTER TABLE "orders_cart_products" ADD CONSTRAINT "orders_cart_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "orders_cart_products" ADD CONSTRAINT "orders_cart_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_orders_v_version_cart_products" ADD CONSTRAINT "_orders_v_version_cart_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_orders_v_version_cart_products" ADD CONSTRAINT "_orders_v_version_cart_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_orders_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_orders_v" ADD CONSTRAINT "_orders_v_parent_id_orders_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_orders_v" ADD CONSTRAINT "_orders_v_version_customer_id_customers_id_fk" FOREIGN KEY ("version_customer_id") REFERENCES "public"."customers"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_orders_v" ADD CONSTRAINT "_orders_v_version_cart_discount_code_id_discount_codes_id_fk" FOREIGN KEY ("version_cart_discount_code_id") REFERENCES "public"."discount_codes"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "orders_cart_products_order_idx" ON "orders_cart_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "orders_cart_products_parent_id_idx" ON "orders_cart_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "orders_cart_products_product_idx" ON "orders_cart_products" USING btree ("product_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "orders_cart_products_sku_idx" ON "orders_cart_products" USING btree ("sku");
  CREATE INDEX IF NOT EXISTS "_orders_v_version_cart_products_order_idx" ON "_orders_v_version_cart_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_orders_v_version_cart_products_parent_id_idx" ON "_orders_v_version_cart_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_orders_v_version_cart_products_product_idx" ON "_orders_v_version_cart_products" USING btree ("product_id");
  CREATE INDEX IF NOT EXISTS "_orders_v_version_cart_products_sku_idx" ON "_orders_v_version_cart_products" USING btree ("sku");
  CREATE INDEX IF NOT EXISTS "_orders_v_parent_idx" ON "_orders_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_orders_v_version_version_customer_idx" ON "_orders_v" USING btree ("version_customer_id");
  CREATE INDEX IF NOT EXISTS "_orders_v_version_cart_version_cart_discount_code_idx" ON "_orders_v" USING btree ("version_cart_discount_code_id");
  CREATE INDEX IF NOT EXISTS "_orders_v_version_shipping_info_version_shipping_info_tracking_idx" ON "_orders_v" USING btree ("version_shipping_info_tracking");
  CREATE INDEX IF NOT EXISTS "_orders_v_version_version_updated_at_idx" ON "_orders_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_orders_v_version_version_created_at_idx" ON "_orders_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_orders_v_created_at_idx" ON "_orders_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_orders_v_updated_at_idx" ON "_orders_v" USING btree ("updated_at");
  DO $$ BEGIN
   ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "orders" ADD CONSTRAINT "orders_cart_discount_code_id_discount_codes_id_fk" FOREIGN KEY ("cart_discount_code_id") REFERENCES "public"."discount_codes"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE UNIQUE INDEX IF NOT EXISTS "customers_email_idx" ON "customers" USING btree ("email");
  CREATE UNIQUE INDEX IF NOT EXISTS "customers_phone_number_idx" ON "customers" USING btree ("phone_number");
  CREATE INDEX IF NOT EXISTS "orders_customer_idx" ON "orders" USING btree ("customer_id");
  CREATE INDEX IF NOT EXISTS "orders_cart_cart_discount_code_idx" ON "orders" USING btree ("cart_discount_code_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "orders_shipping_info_shipping_info_tracking_idx" ON "orders" USING btree ("shipping_info_tracking");
  ALTER TABLE "customers" DROP COLUMN IF EXISTS "address";
  ALTER TABLE "discount_codes" DROP COLUMN IF EXISTS "all_categories";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "products_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "orders_cart_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_orders_v_version_cart_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_orders_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "orders_cart_products" CASCADE;
  DROP TABLE "_orders_v_version_cart_products" CASCADE;
  DROP TABLE "_orders_v" CASCADE;
  ALTER TABLE "orders" RENAME COLUMN "customer_id" TO "customers_id";
  ALTER TABLE "orders" DROP CONSTRAINT "orders_customer_id_customers_id_fk";

  ALTER TABLE "orders" DROP CONSTRAINT "orders_cart_discount_code_id_discount_codes_id_fk";

  DROP INDEX IF EXISTS "customers_email_idx";
  DROP INDEX IF EXISTS "customers_phone_number_idx";
  DROP INDEX IF EXISTS "orders_customer_idx";
  DROP INDEX IF EXISTS "orders_cart_cart_discount_code_idx";
  DROP INDEX IF EXISTS "orders_shipping_info_shipping_info_tracking_idx";
  ALTER TABLE "products_blocks_infinite_scroll_locales" ALTER COLUMN "graphic_id" SET NOT NULL;
  ALTER TABLE "customers" ADD COLUMN "address" varchar;
  ALTER TABLE "discount_codes" ADD COLUMN "all_categories" boolean DEFAULT false;
  ALTER TABLE "orders" ADD COLUMN "products_id" integer NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "orders" ADD CONSTRAINT "orders_products_id_products_id_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "orders" ADD CONSTRAINT "orders_customers_id_customers_id_fk" FOREIGN KEY ("customers_id") REFERENCES "public"."customers"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "orders_products_idx" ON "orders" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "orders_customers_idx" ON "orders" USING btree ("customers_id");
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "note";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "cart_discount_code_id";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "billing_method";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "billing_paid_in_full";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "billing_transaction_info_gateway";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "billing_transaction_info_transaction_date";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "billing_transaction_info_account_number";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "billing_transaction_info_code";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "billing_transaction_info_content";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "billing_transaction_info_transfer_amount";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "billing_transaction_info_reference_code";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "billing_transaction_info_description";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "shipping_info_address_city";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "shipping_info_address_district";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "shipping_info_address_ward";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "shipping_info_address_house_number";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "shipping_info_method";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "shipping_info_tracking";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "message_sender";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "message_receiver";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "message_content";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "receive_order_email";
  ALTER TABLE "checkout_page_global" DROP COLUMN IF EXISTS "shipping_standard_shipping_price";
  ALTER TABLE "checkout_page_global" DROP COLUMN IF EXISTS "shipping_fast_shipping_price";
  DROP TYPE "public"."enum_orders_billing_method";
  DROP TYPE "public"."enum_orders_shipping_info_method";
  DROP TYPE "public"."enum__orders_v_version_billing_method";
  DROP TYPE "public"."enum__orders_v_version_shipping_info_method";`)
}
