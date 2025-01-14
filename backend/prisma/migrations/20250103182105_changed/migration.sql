/*
  Warnings:

  - You are about to drop the `SessionQuestionAnswers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_sessionId_fkey";

-- DropTable
DROP TABLE "SessionQuestionAnswers";

-- CreateTable
CREATE TABLE "Results" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Results_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Results"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Results"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Results"("id") ON DELETE SET NULL ON UPDATE CASCADE;
