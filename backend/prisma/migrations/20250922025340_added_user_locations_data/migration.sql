/*
  Warnings:

  - You are about to drop the column `questionText` on the `Answers` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Sessions` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Sessions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[questionId,text]` on the table `Answers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `questionId` to the `Answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Answers` table without a default value. This is not possible if the table is not empty.
  - Made the column `yelpData` on table `Answers` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Results` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Answers" DROP CONSTRAINT "Answers_questionText_fkey";

-- DropIndex
DROP INDEX "public"."Answers_questionText_text_key";

-- AlterTable
ALTER TABLE "public"."Answers" DROP COLUMN "questionText",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "questionId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "yelpData" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Questions" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Results" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userLatitude" DOUBLE PRECISION,
ADD COLUMN     "userLongitude" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "public"."Sessions" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "avgLatitude" DOUBLE PRECISION,
ADD COLUMN     "avgLongitude" DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "Answers_questionId_text_key" ON "public"."Answers"("questionId", "text");

-- AddForeignKey
ALTER TABLE "public"."Answers" ADD CONSTRAINT "Answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
