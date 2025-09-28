/*
  Warnings:

  - You are about to drop the column `yelpData` on the `Answers` table. All the data in the column will be lost.
  - You are about to drop the column `avgLatitude` on the `Sessions` table. All the data in the column will be lost.
  - You are about to drop the column `avgLongitude` on the `Sessions` table. All the data in the column will be lost.
  - You are about to drop the column `radius` on the `Sessions` table. All the data in the column will be lost.
  - Added the required column `googleData` to the `Answers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Answers" DROP COLUMN "yelpData",
ADD COLUMN     "googleData" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "public"."Sessions" DROP COLUMN "avgLatitude",
DROP COLUMN "avgLongitude",
DROP COLUMN "radius",
ADD COLUMN     "centerLat" DOUBLE PRECISION,
ADD COLUMN     "centerLong" DOUBLE PRECISION,
ADD COLUMN     "radiusMeters" DOUBLE PRECISION;
