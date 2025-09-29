/*
  Warnings:

  - Added the required column `topAnswers` to the `CompletedSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."CompletedSession" ADD COLUMN     "topAnswers" JSONB NOT NULL;
