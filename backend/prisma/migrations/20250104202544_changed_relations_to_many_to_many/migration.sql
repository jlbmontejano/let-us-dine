/*
  Warnings:

  - You are about to drop the column `resultId` on the `Answers` table. All the data in the column will be lost.
  - You are about to drop the column `resultId` on the `Questions` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `Results` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_resultId_fkey";

-- DropForeignKey
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_resultId_fkey";

-- DropForeignKey
ALTER TABLE "Results" DROP CONSTRAINT "Results_sessionId_fkey";

-- AlterTable
ALTER TABLE "Answers" DROP COLUMN "resultId";

-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "resultId";

-- AlterTable
ALTER TABLE "Results" DROP COLUMN "sessionId";

-- CreateTable
CREATE TABLE "_QuestionsToResults" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_QuestionsToResults_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AnswersToResults" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AnswersToResults_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ResultsToSessions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ResultsToSessions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_QuestionsToResults_B_index" ON "_QuestionsToResults"("B");

-- CreateIndex
CREATE INDEX "_AnswersToResults_B_index" ON "_AnswersToResults"("B");

-- CreateIndex
CREATE INDEX "_ResultsToSessions_B_index" ON "_ResultsToSessions"("B");

-- AddForeignKey
ALTER TABLE "_QuestionsToResults" ADD CONSTRAINT "_QuestionsToResults_A_fkey" FOREIGN KEY ("A") REFERENCES "Questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionsToResults" ADD CONSTRAINT "_QuestionsToResults_B_fkey" FOREIGN KEY ("B") REFERENCES "Results"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnswersToResults" ADD CONSTRAINT "_AnswersToResults_A_fkey" FOREIGN KEY ("A") REFERENCES "Answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnswersToResults" ADD CONSTRAINT "_AnswersToResults_B_fkey" FOREIGN KEY ("B") REFERENCES "Results"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResultsToSessions" ADD CONSTRAINT "_ResultsToSessions_A_fkey" FOREIGN KEY ("A") REFERENCES "Results"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResultsToSessions" ADD CONSTRAINT "_ResultsToSessions_B_fkey" FOREIGN KEY ("B") REFERENCES "Sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
