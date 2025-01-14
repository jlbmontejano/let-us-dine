/*
  Warnings:

  - You are about to drop the column `resultId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `resultId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the `Answers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `questionId` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_resultId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_resultId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_resultId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "resultId";

-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "questionId" INTEGER NOT NULL,
ADD COLUMN     "sessionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "resultId";

-- DropTable
DROP TABLE "Answers";

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
