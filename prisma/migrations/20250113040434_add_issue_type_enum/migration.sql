/*
  Warnings:

  - The `status` column on the `Issue` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `priority` column on the `Issue` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `Issue` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "IssueType" AS ENUM ('BUG', 'FEATURE', 'ENHANCEMENT', 'DOCUMENTATION', 'OTHER');

-- CreateEnum
CREATE TYPE "IssueStatus" AS ENUM ('TO_DO', 'IN_PROGRESS', 'CODE_REVIEW', 'COMPLETED');

-- CreateEnum
CREATE TYPE "IssuePriority" AS ENUM ('MINOR', 'LOWEST', 'LOW', 'MEDIUM', 'HIGH', 'HIGHEST', 'CRITICAL');

-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "status",
ADD COLUMN     "status" "IssueStatus" NOT NULL DEFAULT 'TO_DO',
DROP COLUMN "priority",
ADD COLUMN     "priority" "IssuePriority" NOT NULL DEFAULT 'MEDIUM',
DROP COLUMN "type",
ADD COLUMN     "type" "IssueType" NOT NULL DEFAULT 'FEATURE';

-- DropEnum
DROP TYPE "Priority";

-- DropEnum
DROP TYPE "TaskStatus";

-- DropEnum
DROP TYPE "Type";
