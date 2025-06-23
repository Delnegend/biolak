import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "orders_shipping_info_shipping_info_tracking_idx";
  DROP INDEX "_orders_v_version_shipping_info_version_shipping_info_tracking_idx";
  ALTER TABLE "header_global" ADD COLUMN "logo_id" integer;
  ALTER TABLE "header_global" ADD CONSTRAINT "header_global_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "header_global_logo_idx" ON "header_global" USING btree ("logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_global" DROP CONSTRAINT "header_global_logo_id_media_id_fk";

  DROP INDEX "header_global_logo_idx";
  CREATE UNIQUE INDEX "orders_shipping_info_shipping_info_tracking_idx" ON "orders" USING btree ("shipping_info_tracking");
  CREATE INDEX "_orders_v_version_shipping_info_version_shipping_info_tracking_idx" ON "_orders_v" USING btree ("version_shipping_info_tracking");
  ALTER TABLE "header_global" DROP COLUMN "logo_id";`)
}
