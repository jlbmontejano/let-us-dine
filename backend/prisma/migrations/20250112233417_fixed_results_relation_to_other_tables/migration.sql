/*
  Warnings:

  - You are about to drop the `_AnswersToResults` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_QuestionsToResults` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ResultsToSessions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `answersId` to the `Results` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId` to the `Results` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionsId` to the `Results` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AnswersToResults" DROP CONSTRAINT "_AnswersToResults_A_fkey";

-- DropForeignKey
ALTER TABLE "_AnswersToResults" DROP CONSTRAINT "_AnswersToResults_B_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionsToResults" DROP CONSTRAINT "_QuestionsToResults_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionsToResults" DROP CONSTRAINT "_QuestionsToResults_B_fkey";

-- DropForeignKey
ALTER TABLE "_ResultsToSessions" DROP CONSTRAINT "_ResultsToSessions_A_fkey";

-- DropForeignKey
ALTER TABLE "_ResultsToSessions" DROP CONSTRAINT "_ResultsToSessions_B_fkey";

-- AlterTable
ALTER TABLE "Results" ADD COLUMN     "answersId" INTEGER NOT NULL,
ADD COLUMN     "questionId" INTEGER NOT NULL,
ADD COLUMN     "sessionsId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_AnswersToResults";

-- DropTable
DROP TABLE "_QuestionsToResults";

-- DropTable
DROP TABLE "_ResultsToSessions";

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_answersId_fkey" FOREIGN KEY ("answersId") REFERENCES "Answers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_sessionsId_fkey" FOREIGN KEY ("sessionsId") REFERENCES "Sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
