/*
  Warnings:

  - Added the required column `practitioner_id` to the `Medication_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medication_items" ADD COLUMN     "practitioner_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Medication_items" ADD CONSTRAINT "Medication_items_practitioner_id_fkey" FOREIGN KEY ("practitioner_id") REFERENCES "Practitioner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
