ALTER TABLE "PastEvent" ADD COLUMN "name" TEXT;

UPDATE "PastEvent"
SET "name" = "title";

ALTER TABLE "PastEvent"
ALTER COLUMN "name" SET NOT NULL;

ALTER TABLE "PastEvent" DROP COLUMN "title";
