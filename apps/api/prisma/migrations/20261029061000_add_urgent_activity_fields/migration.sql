ALTER TYPE "ActivityCategory" ADD VALUE IF NOT EXISTS 'URGENT_APPEAL';

ALTER TABLE "Activity"
ADD COLUMN "isUrgent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "urgencyLevel" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "endDate" TIMESTAMP(3);

CREATE INDEX "Activity_isUrgent_urgencyLevel_idx"
ON "Activity"("isUrgent", "urgencyLevel");
