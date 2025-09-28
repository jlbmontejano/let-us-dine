/*
  Warnings:

  - You are about to drop the column `userLatitude` on the `Results` table. All the data in the column will be lost.
  - You are about to drop the column `userLongitude` on the `Results` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `Results` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Results` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Results" DROP COLUMN "userLatitude",
DROP COLUMN "userLongitude",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;
