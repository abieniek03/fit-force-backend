/*
  Warnings:

  - You are about to drop the column `trainingCampId` on the `body-meansurements` table. All the data in the column will be lost.
  - You are about to drop the column `trainingCampId` on the `weights` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "body-meansurements" DROP CONSTRAINT "body-meansurements_trainingCampId_fkey";

-- DropForeignKey
ALTER TABLE "weights" DROP CONSTRAINT "weights_trainingCampId_fkey";

-- AlterTable
ALTER TABLE "body-meansurements" DROP COLUMN "trainingCampId",
ADD COLUMN     "campId" TEXT;

-- AlterTable
ALTER TABLE "weights" DROP COLUMN "trainingCampId",
ADD COLUMN     "campId" TEXT;

-- AddForeignKey
ALTER TABLE "weights" ADD CONSTRAINT "weights_campId_fkey" FOREIGN KEY ("campId") REFERENCES "training-camps"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "body-meansurements" ADD CONSTRAINT "body-meansurements_campId_fkey" FOREIGN KEY ("campId") REFERENCES "training-camps"("id") ON DELETE SET NULL ON UPDATE CASCADE;
