/*
  Warnings:

  - You are about to drop the column `sessionId` on the `Answers` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `Session` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_sessionId_fkey";

-- AlterTable
ALTER TABLE "Answers" DROP COLUMN "sessionId",
ADD COLUMN     "resultId" INTEGER;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "sessionId",
ADD COLUMN     "resultId" INTEGER;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "sessionId",
ADD COLUMN     "resultId" INTEGER;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE SET NULL ON UPDATE CASCADE;
