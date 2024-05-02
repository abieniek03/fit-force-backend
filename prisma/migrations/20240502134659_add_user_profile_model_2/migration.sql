/*
  Warnings:

  - You are about to alter the column `height` on the `user-profile` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "user-profile" ALTER COLUMN "height" SET DATA TYPE INTEGER;
