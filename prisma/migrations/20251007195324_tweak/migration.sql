/*
  Warnings:

  - Changed the type of `tested_at` on the `Lab_test` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Lab_test" DROP COLUMN "tested_at",
ADD COLUMN     "tested_at" TIMESTAMP(3) NOT NULL;
