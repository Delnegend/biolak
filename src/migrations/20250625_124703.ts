import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_best_seller_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_best_seller_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "orders_billing_transactions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"transaction_date" timestamp(3) with time zone,
  	"code" varchar,
  	"content" varchar,
  	"transfer_amount" numeric,
  	"reference_code" varchar,
  	"description" varchar
  );

  CREATE TABLE "_orders_v_version_billing_transactions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"transaction_date" timestamp(3) with time zone,
  	"code" varchar,
  	"content" varchar,
  	"transfer_amount" numeric,
  	"reference_code" varchar,
  	"description" varchar
  );

  CREATE TABLE "payment_global" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"sepay_api_key" varchar,
  	"bank_name" varchar,
  	"bank_account_number" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  DROP INDEX "orders_cart_products_sku_idx";
  DROP INDEX "_orders_v_version_cart_products_sku_idx";
  ALTER TABLE "pages_blocks_best_seller" ADD COLUMN "link_type" "enum_pages_blocks_best_seller_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_best_seller" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "pages_blocks_best_seller" ADD COLUMN "link_url" varchar;
  ALTER TABLE "pages_blocks_best_seller_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_best_seller" ADD COLUMN "link_type" "enum__pages_v_blocks_best_seller_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_best_seller" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_best_seller" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_best_seller_locales" ADD COLUMN "link_label" varchar;
  ALTER TABLE "orders" ADD COLUMN "invoice_id" varchar NOT NULL;
  ALTER TABLE "_orders_v" ADD COLUMN "version_invoice_id" varchar NOT NULL;
  ALTER TABLE "checkout_page_global_locales" ADD COLUMN "popup_success_title" varchar;
  ALTER TABLE "checkout_page_global_locales" ADD COLUMN "popup_success_description" varchar;
  ALTER TABLE "checkout_page_global_locales" ADD COLUMN "popup_back_to_home_button_label" varchar;
  ALTER TABLE "orders_billing_transactions" ADD CONSTRAINT "orders_billing_transactions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_orders_v_version_billing_transactions" ADD CONSTRAINT "_orders_v_version_billing_transactions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_orders_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "orders_billing_transactions_order_idx" ON "orders_billing_transactions" USING btree ("_order");
  CREATE INDEX "orders_billing_transactions_parent_id_idx" ON "orders_billing_transactions" USING btree ("_parent_id");
  CREATE INDEX "_orders_v_version_billing_transactions_order_idx" ON "_orders_v_version_billing_transactions" USING btree ("_order");
  CREATE INDEX "_orders_v_version_billing_transactions_parent_id_idx" ON "_orders_v_version_billing_transactions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "orders_invoice_id_idx" ON "orders" USING btree ("invoice_id");
  CREATE INDEX "_orders_v_version_version_invoice_id_idx" ON "_orders_v" USING btree ("version_invoice_id");
  ALTER TABLE "orders" DROP COLUMN "billing_transaction_info_gateway";
  ALTER TABLE "orders" DROP COLUMN "billing_transaction_info_transaction_date";
  ALTER TABLE "orders" DROP COLUMN "billing_transaction_info_account_number";
  ALTER TABLE "orders" DROP COLUMN "billing_transaction_info_code";
  ALTER TABLE "orders" DROP COLUMN "billing_transaction_info_content";
  ALTER TABLE "orders" DROP COLUMN "billing_transaction_info_transfer_amount";
  ALTER TABLE "orders" DROP COLUMN "billing_transaction_info_reference_code";
  ALTER TABLE "orders" DROP COLUMN "billing_transaction_info_description";
  ALTER TABLE "_orders_v" DROP COLUMN "version_billing_transaction_info_gateway";
  ALTER TABLE "_orders_v" DROP COLUMN "version_billing_transaction_info_transaction_date";
  ALTER TABLE "_orders_v" DROP COLUMN "version_billing_transaction_info_account_number";
  ALTER TABLE "_orders_v" DROP COLUMN "version_billing_transaction_info_code";
  ALTER TABLE "_orders_v" DROP COLUMN "version_billing_transaction_info_content";
  ALTER TABLE "_orders_v" DROP COLUMN "version_billing_transaction_info_transfer_amount";
  ALTER TABLE "_orders_v" DROP COLUMN "version_billing_transaction_info_reference_code";
  ALTER TABLE "_orders_v" DROP COLUMN "version_billing_transaction_info_description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "orders_billing_transactions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_orders_v_version_billing_transactions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payment_global" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "orders_billing_transactions" CASCADE;
  DROP TABLE "_orders_v_version_billing_transactions" CASCADE;
  DROP TABLE "payment_global" CASCADE;
  DROP INDEX "orders_invoice_id_idx";
  DROP INDEX "_orders_v_version_version_invoice_id_idx";
  ALTER TABLE "orders" ADD COLUMN "billing_transaction_info_gateway" varchar;
  ALTER TABLE "orders" ADD COLUMN "billing_transaction_info_transaction_date" timestamp(3) with time zone;
  ALTER TABLE "orders" ADD COLUMN "billing_transaction_info_account_number" varchar;
  ALTER TABLE "orders" ADD COLUMN "billing_transaction_info_code" varchar;
  ALTER TABLE "orders" ADD COLUMN "billing_transaction_info_content" varchar;
  ALTER TABLE "orders" ADD COLUMN "billing_transaction_info_transfer_amount" numeric;
  ALTER TABLE "orders" ADD COLUMN "billing_transaction_info_reference_code" varchar;
  ALTER TABLE "orders" ADD COLUMN "billing_transaction_info_description" varchar;
  ALTER TABLE "_orders_v" ADD COLUMN "version_billing_transaction_info_gateway" varchar;
  ALTER TABLE "_orders_v" ADD COLUMN "version_billing_transaction_info_transaction_date" timestamp(3) with time zone;
  ALTER TABLE "_orders_v" ADD COLUMN "version_billing_transaction_info_account_number" varchar;
  ALTER TABLE "_orders_v" ADD COLUMN "version_billing_transaction_info_code" varchar;
  ALTER TABLE "_orders_v" ADD COLUMN "version_billing_transaction_info_content" varchar;
  ALTER TABLE "_orders_v" ADD COLUMN "version_billing_transaction_info_transfer_amount" numeric;
  ALTER TABLE "_orders_v" ADD COLUMN "version_billing_transaction_info_reference_code" varchar;
  ALTER TABLE "_orders_v" ADD COLUMN "version_billing_transaction_info_description" varchar;
  CREATE UNIQUE INDEX "orders_cart_products_sku_idx" ON "orders_cart_products" USING btree ("sku");
  CREATE INDEX "_orders_v_version_cart_products_sku_idx" ON "_orders_v_version_cart_products" USING btree ("sku");
  ALTER TABLE "pages_blocks_best_seller" DROP COLUMN "link_type";
  ALTER TABLE "pages_blocks_best_seller" DROP COLUMN "link_new_tab";
  ALTER TABLE "pages_blocks_best_seller" DROP COLUMN "link_url";
  ALTER TABLE "pages_blocks_best_seller_locales" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_best_seller" DROP COLUMN "link_type";
  ALTER TABLE "_pages_v_blocks_best_seller" DROP COLUMN "link_new_tab";
  ALTER TABLE "_pages_v_blocks_best_seller" DROP COLUMN "link_url";
  ALTER TABLE "_pages_v_blocks_best_seller_locales" DROP COLUMN "link_label";
  ALTER TABLE "orders" DROP COLUMN "invoice_id";
  ALTER TABLE "_orders_v" DROP COLUMN "version_invoice_id";
  ALTER TABLE "checkout_page_global_locales" DROP COLUMN "popup_success_title";
  ALTER TABLE "checkout_page_global_locales" DROP COLUMN "popup_success_description";
  ALTER TABLE "checkout_page_global_locales" DROP COLUMN "popup_back_to_home_button_label";
  DROP TYPE "public"."enum_pages_blocks_best_seller_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_best_seller_link_type";`)
}
