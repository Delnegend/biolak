import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "orders_cart" ALTER COLUMN "price_at_buy" SET NOT NULL;
  ALTER TABLE "_orders_v_version_cart" ALTER COLUMN "price_at_buy" SET NOT NULL;
  ALTER TABLE "orders_cart" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "orders_cart" ADD COLUMN "preview_total" numeric NOT NULL;
  ALTER TABLE "orders" ADD COLUMN "prices_discount_code_id" integer;
  ALTER TABLE "orders" ADD COLUMN "prices_provisional" numeric DEFAULT 0 NOT NULL;
  ALTER TABLE "orders" ADD COLUMN "prices_shipping" numeric DEFAULT 0 NOT NULL;
  ALTER TABLE "orders" ADD COLUMN "prices_discount" numeric DEFAULT 0 NOT NULL;
  ALTER TABLE "orders" ADD COLUMN "prices_total" numeric DEFAULT 0 NOT NULL;
  ALTER TABLE "orders" ADD COLUMN "prices_paid_amount" numeric;
  ALTER TABLE "_orders_v_version_cart" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "_orders_v_version_cart" ADD COLUMN "preview_total" numeric NOT NULL;
  ALTER TABLE "_orders_v" ADD COLUMN "version_prices_discount_code_id" integer;
  ALTER TABLE "_orders_v" ADD COLUMN "version_prices_provisional" numeric DEFAULT 0 NOT NULL;
  ALTER TABLE "_orders_v" ADD COLUMN "version_prices_shipping" numeric DEFAULT 0 NOT NULL;
  ALTER TABLE "_orders_v" ADD COLUMN "version_prices_discount" numeric DEFAULT 0 NOT NULL;
  ALTER TABLE "_orders_v" ADD COLUMN "version_prices_total" numeric DEFAULT 0 NOT NULL;
  ALTER TABLE "_orders_v" ADD COLUMN "version_prices_paid_amount" numeric;
  ALTER TABLE "orders" ADD CONSTRAINT "orders_prices_discount_code_id_discount_codes_id_fk" FOREIGN KEY ("prices_discount_code_id") REFERENCES "public"."discount_codes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_orders_v" ADD CONSTRAINT "_orders_v_version_prices_discount_code_id_discount_codes_id_fk" FOREIGN KEY ("version_prices_discount_code_id") REFERENCES "public"."discount_codes"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "orders_prices_prices_discount_code_idx" ON "orders" USING btree ("prices_discount_code_id");
  CREATE INDEX "_orders_v_version_prices_version_prices_discount_code_idx" ON "_orders_v" USING btree ("version_prices_discount_code_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "orders" DROP CONSTRAINT "orders_prices_discount_code_id_discount_codes_id_fk";

  ALTER TABLE "_orders_v" DROP CONSTRAINT "_orders_v_version_prices_discount_code_id_discount_codes_id_fk";

  DROP INDEX "orders_prices_prices_discount_code_idx";
  DROP INDEX "_orders_v_version_prices_version_prices_discount_code_idx";
  ALTER TABLE "orders_cart" ALTER COLUMN "price_at_buy" DROP NOT NULL;
  ALTER TABLE "_orders_v_version_cart" ALTER COLUMN "price_at_buy" DROP NOT NULL;
  ALTER TABLE "orders_cart" DROP COLUMN "title";
  ALTER TABLE "orders_cart" DROP COLUMN "preview_total";
  ALTER TABLE "orders" DROP COLUMN "prices_discount_code_id";
  ALTER TABLE "orders" DROP COLUMN "prices_provisional";
  ALTER TABLE "orders" DROP COLUMN "prices_shipping";
  ALTER TABLE "orders" DROP COLUMN "prices_discount";
  ALTER TABLE "orders" DROP COLUMN "prices_total";
  ALTER TABLE "orders" DROP COLUMN "prices_paid_amount";
  ALTER TABLE "_orders_v_version_cart" DROP COLUMN "title";
  ALTER TABLE "_orders_v_version_cart" DROP COLUMN "preview_total";
  ALTER TABLE "_orders_v" DROP COLUMN "version_prices_discount_code_id";
  ALTER TABLE "_orders_v" DROP COLUMN "version_prices_provisional";
  ALTER TABLE "_orders_v" DROP COLUMN "version_prices_shipping";
  ALTER TABLE "_orders_v" DROP COLUMN "version_prices_discount";
  ALTER TABLE "_orders_v" DROP COLUMN "version_prices_total";
  ALTER TABLE "_orders_v" DROP COLUMN "version_prices_paid_amount";`)
}
