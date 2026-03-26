/*
  Warnings:

  - You are about to drop the column `isCampaign` on the `Activity` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ActivityCategory" AS ENUM ('PROMOTIONS', 'EMERGENCY_AID', 'RAMADAN_CAMPAIGN', 'NAFL_OFFERING', 'WEFA_MEAL', 'ORPHAN', 'WE_ARE_TOGETHER_WITH_OUR_ORPHANS', 'WATER_WELL_PROJECT', 'ZAKAT_AND_SADAKA', 'EDUCATION_AID', 'HEALTH', 'TURKEY_AIDS', 'INCOME_SUPPORT', 'GENERAL_HELPS', 'CONSTRUCTION_PROJECTS');

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "isCampaign",
ADD COLUMN     "category" "ActivityCategory" NOT NULL DEFAULT 'GENERAL_HELPS',
ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0;
