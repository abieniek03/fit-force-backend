-- CreateEnum
CREATE TYPE "SEX" AS ENUM ('male', 'female');

-- CreateTable
CREATE TABLE "my-parameters" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sex" "SEX" NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "height" INTEGER NOT NULL,

    CONSTRAINT "my-parameters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "my-parameters_id_key" ON "my-parameters"("id");
