/*
  Warnings:

  - A unique constraint covering the columns `[questionId,text]` on the table `Answers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Answers_questionId_text_key" ON "Answers"("questionId", "text");
