/*
  Warnings:

  - You are about to drop the column `centerLat` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `centerLng` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `radiusMeters` on the `Session` table. All the data in the column will be lost.
  - Added the required column `centerLat` to the `CompletedSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `centerLng` to the `CompletedSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `radiusMeters` to the `CompletedSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."CompletedSession" ADD COLUMN     "centerLat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "centerLng" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "radiusMeters" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "public"."Session" DROP COLUMN "centerLat",
DROP COLUMN "centerLng",
DROP COLUMN "radiusMeters";
