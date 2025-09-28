/*
  Warnings:

  - You are about to drop the column `centerLong` on the `Sessions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Sessions" DROP COLUMN "centerLong",
ADD COLUMN     "centerLng" DOUBLE PRECISION;
