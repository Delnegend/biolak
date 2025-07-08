import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "footer_global" DROP CONSTRAINT "footer_global_legal_stamp_id_media_id_fk";

  DROP INDEX "footer_global_legal_legal_stamp_idx";
  ALTER TABLE "footer_global" DROP COLUMN "legal_stamp_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "footer_global" ADD COLUMN "legal_stamp_id" integer;
  ALTER TABLE "footer_global" ADD CONSTRAINT "footer_global_legal_stamp_id_media_id_fk" FOREIGN KEY ("legal_stamp_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "footer_global_legal_legal_stamp_idx" ON "footer_global" USING btree ("legal_stamp_id");`)
}
