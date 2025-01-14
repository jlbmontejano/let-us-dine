/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Sessions_uuid_key" ON "Sessions"("uuid");
