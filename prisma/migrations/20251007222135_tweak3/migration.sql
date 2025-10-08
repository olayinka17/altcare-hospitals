/*
  Warnings:

  - You are about to drop the column `assigned_at` on the `Hospital_patient` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Hospital` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Hospital` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hospital" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Hospital_patient" DROP COLUMN "assigned_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_slug_key" ON "Hospital"("slug");
