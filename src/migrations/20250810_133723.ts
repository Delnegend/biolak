import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_orders_order_state" AS ENUM('pending', 'processing', 'completed');
  CREATE TYPE "public"."enum__orders_v_version_order_state" AS ENUM('pending', 'processing', 'completed');
  CREATE TABLE "orders_cart" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer,
  	"sku" varchar NOT NULL,
  	"quantity" numeric NOT NULL,
  	"price_at_buy" numeric
  );

  CREATE TABLE "_orders_v_version_cart" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"product_id" integer,
  	"sku" varchar NOT NULL,
  	"quantity" numeric NOT NULL,
  	"price_at_buy" numeric,
  	"_uuid" varchar
  );

  CREATE TABLE "general_global" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_banner_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE "general_global_locales" (
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  ALTER TABLE "orders_cart_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_orders_v_version_cart_products" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "orders_cart_products" CASCADE;
  DROP TABLE "_orders_v_version_cart_products" CASCADE;
  ALTER TABLE "orders" DROP CONSTRAINT "orders_cart_discount_code_id_discount_codes_id_fk";

  ALTER TABLE "_orders_v" DROP CONSTRAINT "_orders_v_version_cart_discount_code_id_discount_codes_id_fk";

  DROP INDEX "orders_cart_cart_discount_code_idx";
  DROP INDEX "_orders_v_version_cart_version_cart_discount_code_idx";
  ALTER TABLE "orders" ADD COLUMN "receiver_name" varchar;
  ALTER TABLE "orders" ADD COLUMN "receiver_phone_number" varchar;
  ALTER TABLE "orders" ADD COLUMN "receiver_address" varchar;
  ALTER TABLE "orders" ADD COLUMN "receiver_note" varchar;
  ALTER TABLE "orders" ADD COLUMN "order_state" "enum_orders_order_state" DEFAULT 'pending';
  ALTER TABLE "_orders_v" ADD COLUMN "version_receiver_name" varchar;
  ALTER TABLE "_orders_v" ADD COLUMN "version_receiver_phone_number" varchar;
  ALTER TABLE "_orders_v" ADD COLUMN "version_receiver_address" varchar;
  ALTER TABLE "_orders_v" ADD COLUMN "version_receiver_note" varchar;
  ALTER TABLE "_orders_v" ADD COLUMN "version_order_state" "enum__orders_v_version_order_state" DEFAULT 'pending';
  ALTER TABLE "orders_cart" ADD CONSTRAINT "orders_cart_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "orders_cart" ADD CONSTRAINT "orders_cart_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_orders_v_version_cart" ADD CONSTRAINT "_orders_v_version_cart_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_orders_v_version_cart" ADD CONSTRAINT "_orders_v_version_cart_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_orders_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "general_global" ADD CONSTRAINT "general_global_site_banner_id_media_id_fk" FOREIGN KEY ("site_banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "general_global_locales" ADD CONSTRAINT "general_global_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."general_global"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "orders_cart_order_idx" ON "orders_cart" USING btree ("_order");
  CREATE INDEX "orders_cart_parent_id_idx" ON "orders_cart" USING btree ("_parent_id");
  CREATE INDEX "orders_cart_product_idx" ON "orders_cart" USING btree ("product_id");
  CREATE INDEX "_orders_v_version_cart_order_idx" ON "_orders_v_version_cart" USING btree ("_order");
  CREATE INDEX "_orders_v_version_cart_parent_id_idx" ON "_orders_v_version_cart" USING btree ("_parent_id");
  CREATE INDEX "_orders_v_version_cart_product_idx" ON "_orders_v_version_cart" USING btree ("product_id");
  CREATE INDEX "general_global_site_banner_idx" ON "general_global" USING btree ("site_banner_id");
  CREATE UNIQUE INDEX "general_global_locales_locale_parent_id_unique" ON "general_global_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "orders" DROP COLUMN "note";
  ALTER TABLE "orders" DROP COLUMN "cart_discount_code_id";
  ALTER TABLE "orders" DROP COLUMN "billing_paid_in_full";
  ALTER TABLE "orders" DROP COLUMN "shipping_info_address";
  ALTER TABLE "_orders_v" DROP COLUMN "version_note";
  ALTER TABLE "_orders_v" DROP COLUMN "version_cart_discount_code_id";
  ALTER TABLE "_orders_v" DROP COLUMN "version_billing_paid_in_full";
  ALTER TABLE "_orders_v" DROP COLUMN "version_shipping_info_address";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "orders_cart_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer NOT NULL,
  	"sku" varchar NOT NULL,
  	"quantity" numeric NOT NULL
  );

  CREATE TABLE "_orders_v_version_cart_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"product_id" integer NOT NULL,
  	"sku" varchar NOT NULL,
  	"quantity" numeric NOT NULL,
  	"_uuid" varchar
  );

  ALTER TABLE "orders_cart" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_orders_v_version_cart" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "general_global" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "general_global_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "orders_cart" CASCADE;
  DROP TABLE "_orders_v_version_cart" CASCADE;
  DROP TABLE "general_global" CASCADE;
  DROP TABLE "general_global_locales" CASCADE;
  ALTER TABLE "orders" ADD COLUMN "note" varchar;
  ALTER TABLE "orders" ADD COLUMN "cart_discount_code_id" integer;
  ALTER TABLE "orders" ADD COLUMN "billing_paid_in_full" boolean DEFAULT false;
  ALTER TABLE "orders" ADD COLUMN "shipping_info_address" varchar;
  ALTER TABLE "_orders_v" ADD COLUMN "version_note" varchar;
  ALTER TABLE "_orders_v" ADD COLUMN "version_cart_discount_code_id" integer;
  ALTER TABLE "_orders_v" ADD COLUMN "version_billing_paid_in_full" boolean DEFAULT false;
  ALTER TABLE "_orders_v" ADD COLUMN "version_shipping_info_address" varchar;
  ALTER TABLE "orders_cart_products" ADD CONSTRAINT "orders_cart_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "orders_cart_products" ADD CONSTRAINT "orders_cart_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_orders_v_version_cart_products" ADD CONSTRAINT "_orders_v_version_cart_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_orders_v_version_cart_products" ADD CONSTRAINT "_orders_v_version_cart_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_orders_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "orders_cart_products_order_idx" ON "orders_cart_products" USING btree ("_order");
  CREATE INDEX "orders_cart_products_parent_id_idx" ON "orders_cart_products" USING btree ("_parent_id");
  CREATE INDEX "orders_cart_products_product_idx" ON "orders_cart_products" USING btree ("product_id");
  CREATE INDEX "_orders_v_version_cart_products_order_idx" ON "_orders_v_version_cart_products" USING btree ("_order");
  CREATE INDEX "_orders_v_version_cart_products_parent_id_idx" ON "_orders_v_version_cart_products" USING btree ("_parent_id");
  CREATE INDEX "_orders_v_version_cart_products_product_idx" ON "_orders_v_version_cart_products" USING btree ("product_id");
  ALTER TABLE "orders" ADD CONSTRAINT "orders_cart_discount_code_id_discount_codes_id_fk" FOREIGN KEY ("cart_discount_code_id") REFERENCES "public"."discount_codes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_orders_v" ADD CONSTRAINT "_orders_v_version_cart_discount_code_id_discount_codes_id_fk" FOREIGN KEY ("version_cart_discount_code_id") REFERENCES "public"."discount_codes"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "orders_cart_cart_discount_code_idx" ON "orders" USING btree ("cart_discount_code_id");
  CREATE INDEX "_orders_v_version_cart_version_cart_discount_code_idx" ON "_orders_v" USING btree ("version_cart_discount_code_id");
  ALTER TABLE "orders" DROP COLUMN "receiver_name";
  ALTER TABLE "orders" DROP COLUMN "receiver_phone_number";
  ALTER TABLE "orders" DROP COLUMN "receiver_address";
  ALTER TABLE "orders" DROP COLUMN "receiver_note";
  ALTER TABLE "orders" DROP COLUMN "order_state";
  ALTER TABLE "_orders_v" DROP COLUMN "version_receiver_name";
  ALTER TABLE "_orders_v" DROP COLUMN "version_receiver_phone_number";
  ALTER TABLE "_orders_v" DROP COLUMN "version_receiver_address";
  ALTER TABLE "_orders_v" DROP COLUMN "version_receiver_note";
  ALTER TABLE "_orders_v" DROP COLUMN "version_order_state";
  DROP TYPE "public"."enum_orders_order_state";
  DROP TYPE "public"."enum__orders_v_version_order_state";`)
}
