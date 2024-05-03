-- CreateTable
CREATE TABLE "user-profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "brithDate" TIMESTAMP(3) NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "user-profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user-profile_id_key" ON "user-profile"("id");
