/*
  Warnings:

  - A unique constraint covering the columns `[text]` on the table `Answer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Answer_questionId_text_key";

-- CreateIndex
CREATE UNIQUE INDEX "Answer_text_key" ON "public"."Answer"("text");
