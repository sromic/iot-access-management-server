-- CreateTable
CREATE TABLE "Operator" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Operator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TapChanger" (
    "id" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "gpsLocation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TapChanger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TapChangerOperator" (
    "operatorId" TEXT NOT NULL,
    "tapChangerId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TapChangerOperator_pkey" PRIMARY KEY ("operatorId","tapChangerId")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Operator_email_key" ON "Operator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Operator_phoneNumber_key" ON "Operator"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Operator_userName_key" ON "Operator"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "TapChanger_serialNumber_key" ON "TapChanger"("serialNumber");

-- AddForeignKey
ALTER TABLE "TapChangerOperator" ADD CONSTRAINT "TapChangerOperator_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TapChangerOperator" ADD CONSTRAINT "TapChangerOperator_tapChangerId_fkey" FOREIGN KEY ("tapChangerId") REFERENCES "TapChanger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
