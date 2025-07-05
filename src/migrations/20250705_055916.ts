import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_global" DROP CONSTRAINT "header_global_logo_id_media_id_fk";

  DROP INDEX "header_global_logo_idx";
  ALTER TABLE "customers" ADD COLUMN "receive_promotions" boolean;
  ALTER TABLE "orders" ADD COLUMN "shipping_info_address" varchar;
  ALTER TABLE "_orders_v" ADD COLUMN "version_shipping_info_address" varchar;
  ALTER TABLE "orders" DROP COLUMN "shipping_info_address_city";
  ALTER TABLE "orders" DROP COLUMN "shipping_info_address_district";
  ALTER TABLE "orders" DROP COLUMN "shipping_info_address_ward";
  ALTER TABLE "orders" DROP COLUMN "shipping_info_address_house_number";
  ALTER TABLE "_orders_v" DROP COLUMN "version_shipping_info_address_city";
  ALTER TABLE "_orders_v" DROP COLUMN "version_shipping_info_address_district";
  ALTER TABLE "_orders_v" DROP COLUMN "version_shipping_info_address_ward";
  ALTER TABLE "_orders_v" DROP COLUMN "version_shipping_info_address_house_number";
  ALTER TABLE "header_global" DROP COLUMN "logo_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "orders" ADD COLUMN "shipping_info_address_city" varchar NOT NULL;
  ALTER TABLE "orders" ADD COLUMN "shipping_info_address_district" varchar NOT NULL;
  ALTER TABLE "orders" ADD COLUMN "shipping_info_address_ward" varchar NOT NULL;
  ALTER TABLE "orders" ADD COLUMN "shipping_info_address_house_number" varchar NOT NULL;
  ALTER TABLE "_orders_v" ADD COLUMN "version_shipping_info_address_city" varchar NOT NULL;
  ALTER TABLE "_orders_v" ADD COLUMN "version_shipping_info_address_district" varchar NOT NULL;
  ALTER TABLE "_orders_v" ADD COLUMN "version_shipping_info_address_ward" varchar NOT NULL;
  ALTER TABLE "_orders_v" ADD COLUMN "version_shipping_info_address_house_number" varchar NOT NULL;
  ALTER TABLE "header_global" ADD COLUMN "logo_id" integer;
  ALTER TABLE "header_global" ADD CONSTRAINT "header_global_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "header_global_logo_idx" ON "header_global" USING btree ("logo_id");
  ALTER TABLE "customers" DROP COLUMN "receive_promotions";
  ALTER TABLE "orders" DROP COLUMN "shipping_info_address";
  ALTER TABLE "_orders_v" DROP COLUMN "version_shipping_info_address";`)
}
