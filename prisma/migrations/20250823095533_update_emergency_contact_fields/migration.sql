/*
  Warnings:

  - You are about to drop the column `emergencyContact` on the `students` table. All the data in the column will be lost.
  - You are about to drop the `_InstructorFlightLogs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_InstructorFlightLogs" DROP CONSTRAINT "_InstructorFlightLogs_A_fkey";

-- DropForeignKey
ALTER TABLE "_InstructorFlightLogs" DROP CONSTRAINT "_InstructorFlightLogs_B_fkey";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "emergencyContact",
ADD COLUMN     "emergencyContactName" TEXT,
ADD COLUMN     "emergencyContactPhone" TEXT,
ADD COLUMN     "emergencyContactRelationship" TEXT;

-- DropTable
DROP TABLE "_InstructorFlightLogs";
