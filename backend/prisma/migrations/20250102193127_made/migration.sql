/*
  Warnings:

  - Added the required column `uuid` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE session_id_seq;
ALTER TABLE "Session" ADD COLUMN     "uuid" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('session_id_seq');
ALTER SEQUENCE session_id_seq OWNED BY "Session"."id";
