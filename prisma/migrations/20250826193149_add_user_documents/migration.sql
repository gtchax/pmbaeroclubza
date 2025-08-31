-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('MEDICAL_CERTIFICATE', 'LICENSE_COPY', 'INSURANCE_DOCUMENT', 'IDENTIFICATION', 'MEDICAL_RECORD', 'TRAINING_CERTIFICATE', 'AIRCRAFT_CERTIFICATION', 'OTHER');

-- CreateEnum
CREATE TYPE "DocumentCategory" AS ENUM ('REGISTRATION', 'MEDICAL', 'LICENSING', 'INSURANCE', 'TRAINING', 'AIRCRAFT', 'ADMINISTRATIVE', 'OTHER');

-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'EXPIRED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "user_documents" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "type" "DocumentType" NOT NULL,
    "category" "DocumentCategory" NOT NULL,
    "megaFileId" TEXT NOT NULL,
    "megaFolderId" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "status" "DocumentStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reviewedAt" TIMESTAMP(3),
    "reviewedBy" TEXT,
    "reviewNotes" TEXT,

    CONSTRAINT "user_documents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_documents" ADD CONSTRAINT "user_documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
