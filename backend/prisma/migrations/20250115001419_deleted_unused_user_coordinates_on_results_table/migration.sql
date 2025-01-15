/*
  Warnings:

  - You are about to drop the column `userLatitude` on the `Results` table. All the data in the column will be lost.
  - You are about to drop the column `userLongitude` on the `Results` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Results" DROP COLUMN "userLatitude",
DROP COLUMN "userLongitude";
