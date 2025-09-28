-- AlterTable
ALTER TABLE "public"."Answers" ADD COLUMN     "yelpData" JSONB;

-- AlterTable
ALTER TABLE "public"."Sessions" ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL,
ALTER COLUMN "radius" DROP NOT NULL;
