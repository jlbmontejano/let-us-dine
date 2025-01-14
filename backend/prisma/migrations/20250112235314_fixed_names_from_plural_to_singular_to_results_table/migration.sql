/*
  Warnings:

  - You are about to drop the column `answersId` on the `Results` table. All the data in the column will be lost.
  - You are about to drop the column `sessionsId` on the `Results` table. All the data in the column will be lost.
  - Added the required column `answerId` to the `Results` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `Results` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Results" DROP CONSTRAINT "Results_answersId_fkey";

-- DropForeignKey
ALTER TABLE "Results" DROP CONSTRAINT "Results_sessionsId_fkey";

-- AlterTable
ALTER TABLE "Results" DROP COLUMN "answersId",
DROP COLUMN "sessionsId",
ADD COLUMN     "answerId" INTEGER NOT NULL,
ADD COLUMN     "sessionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
