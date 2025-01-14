/*
  Warnings:

  - You are about to drop the column `sessionId` on the `Results` table. All the data in the column will be lost.
  - Added the required column `sessionUuid` to the `Results` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Results" DROP CONSTRAINT "Results_sessionId_fkey";

-- AlterTable
ALTER TABLE "Results" DROP COLUMN "sessionId",
ADD COLUMN     "sessionUuid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_sessionUuid_fkey" FOREIGN KEY ("sessionUuid") REFERENCES "Sessions"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
