-- CreateTable
CREATE TABLE "Measure" (
    "id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "customer_code" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "measure_datetime" TIMESTAMP(3) NOT NULL,
    "measure_type" TEXT NOT NULL,
    "has_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Measure_pkey" PRIMARY KEY ("id")
);
