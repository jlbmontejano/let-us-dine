/*
  Warnings:

  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `expiresAt` on the `Session` table. All the data in the column will be lost.
  - Added the required column `id` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `sessionId` on the `Session` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Session" DROP CONSTRAINT "Session_pkey",
DROP COLUMN "expiresAt",
ADD COLUMN     "id" INTEGER NOT NULL,
DROP COLUMN "sessionId",
ADD COLUMN     "sessionId" INTEGER NOT NULL,
ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Question" (
    "id" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "sessionId" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answers" (
    "id" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,
    "sessionId" INTEGER NOT NULL,

    CONSTRAINT "Answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionQuestionAnswers" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "SessionQuestionAnswers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "SessionQuestionAnswers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "SessionQuestionAnswers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "SessionQuestionAnswers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
