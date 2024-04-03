/*
  Warnings:

  - You are about to drop the column `treningCampId` on the `body-meansurements` table. All the data in the column will be lost.
  - You are about to drop the column `treningCampId` on the `weights` table. All the data in the column will be lost.
  - You are about to drop the `trening-camps` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "body-meansurements" DROP CONSTRAINT "body-meansurements_treningCampId_fkey";

-- DropForeignKey
ALTER TABLE "weights" DROP CONSTRAINT "weights_treningCampId_fkey";

-- AlterTable
ALTER TABLE "body-meansurements" DROP COLUMN "treningCampId",
ADD COLUMN     "trainingCampId" TEXT;

-- AlterTable
ALTER TABLE "weights" DROP COLUMN "treningCampId",
ADD COLUMN     "trainingCampId" TEXT;

-- DropTable
DROP TABLE "trening-camps";

-- CreateTable
CREATE TABLE "training-camps" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "training-camps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "training-camps_id_key" ON "training-camps"("id");

-- AddForeignKey
ALTER TABLE "weights" ADD CONSTRAINT "weights_trainingCampId_fkey" FOREIGN KEY ("trainingCampId") REFERENCES "training-camps"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "body-meansurements" ADD CONSTRAINT "body-meansurements_trainingCampId_fkey" FOREIGN KEY ("trainingCampId") REFERENCES "training-camps"("id") ON DELETE SET NULL ON UPDATE CASCADE;
