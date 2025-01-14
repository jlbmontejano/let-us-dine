/*
  Warnings:

  - A unique constraint covering the columns `[text]` on the table `Answers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Answers_text_key" ON "Answers"("text");
