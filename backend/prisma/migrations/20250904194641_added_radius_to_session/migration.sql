/*
  Warnings:

  - Added the required column `radius` to the `Sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Sessions" ADD COLUMN     "radius" DOUBLE PRECISION NOT NULL;
