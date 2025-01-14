-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
