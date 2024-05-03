/*
  Warnings:

  - You are about to drop the column `brithDate` on the `user-profile` table. All the data in the column will be lost.
  - Added the required column `birthDate` to the `user-profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user-profile" DROP COLUMN "brithDate",
ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL;
