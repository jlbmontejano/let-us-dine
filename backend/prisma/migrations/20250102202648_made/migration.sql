-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_sessionId_fkey";

-- AlterTable
ALTER TABLE "Answers" ALTER COLUMN "sessionId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "sessionId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "sessionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "SessionQuestionAnswers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "SessionQuestionAnswers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "SessionQuestionAnswers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
