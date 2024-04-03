-- CreateTable
CREATE TABLE "trening-camps" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trening-camps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weights" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "treningCampId" TEXT,

    CONSTRAINT "weights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "body-meansurements" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "chest" DOUBLE PRECISION NOT NULL,
    "waist" DOUBLE PRECISION NOT NULL,
    "belly" DOUBLE PRECISION NOT NULL,
    "arm" DOUBLE PRECISION NOT NULL,
    "hips" DOUBLE PRECISION NOT NULL,
    "thigh" DOUBLE PRECISION NOT NULL,
    "calf" DOUBLE PRECISION NOT NULL,
    "treningCampId" TEXT,

    CONSTRAINT "body-meansurements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trening-camps_id_key" ON "trening-camps"("id");

-- CreateIndex
CREATE UNIQUE INDEX "weights_id_key" ON "weights"("id");

-- CreateIndex
CREATE UNIQUE INDEX "body-meansurements_id_key" ON "body-meansurements"("id");

-- AddForeignKey
ALTER TABLE "weights" ADD CONSTRAINT "weights_treningCampId_fkey" FOREIGN KEY ("treningCampId") REFERENCES "trening-camps"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "body-meansurements" ADD CONSTRAINT "body-meansurements_treningCampId_fkey" FOREIGN KEY ("treningCampId") REFERENCES "trening-camps"("id") ON DELETE SET NULL ON UPDATE CASCADE;
