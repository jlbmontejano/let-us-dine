/*
  Warnings:

  - You are about to drop the column `questionId` on the `Answers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[questionText,text]` on the table `Answers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[text]` on the table `Questions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `questionText` to the `Answers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_questionId_fkey";

-- DropIndex
DROP INDEX "Answers_questionId_text_key";

-- AlterTable
ALTER TABLE "Answers" DROP COLUMN "questionId",
ADD COLUMN     "questionText" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Answers_questionText_text_key" ON "Answers"("questionText", "text");

-- CreateIndex
CREATE UNIQUE INDEX "Questions_text_key" ON "Questions"("text");

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_questionText_fkey" FOREIGN KEY ("questionText") REFERENCES "Questions"("text") ON DELETE RESTRICT ON UPDATE CASCADE;
