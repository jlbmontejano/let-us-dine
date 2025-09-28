/*
  Warnings:

  - You are about to drop the column `averageLatitude` on the `Sessions` table. All the data in the column will be lost.
  - You are about to drop the column `averageLongitude` on the `Sessions` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `Sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sessions" DROP COLUMN "averageLatitude",
DROP COLUMN "averageLongitude",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;
