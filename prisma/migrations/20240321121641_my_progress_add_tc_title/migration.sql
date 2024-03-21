/*
  Warnings:

  - Added the required column `title` to the `training-camps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "training-camps" ADD COLUMN     "title" TEXT NOT NULL;
