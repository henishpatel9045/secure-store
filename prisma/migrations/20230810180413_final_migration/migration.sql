-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "googleId" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doc" (
    "id" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fileName" TEXT NOT NULL DEFAULT '',
    "description" TEXT,
    "fileType" TEXT NOT NULL,
    "size" BIGINT NOT NULL DEFAULT 0,
    "path" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Doc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EncryptedDoc" (
    "id" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "description" TEXT,
    "fileType" TEXT NOT NULL,
    "size" BIGINT NOT NULL DEFAULT 0,
    "path" TEXT,
    "passKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EncryptedDoc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharableDocs" (
    "id" TEXT NOT NULL,
    "docId" TEXT NOT NULL,
    "accessed" INTEGER NOT NULL DEFAULT 0,
    "expireAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SharableDocs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocShareRequest" (
    "id" SERIAL NOT NULL,
    "senderName" TEXT NOT NULL,
    "senderEmail" TEXT,
    "message" TEXT NOT NULL,
    "docId" TEXT NOT NULL,
    "visited" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DocShareRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- AddForeignKey
ALTER TABLE "Doc" ADD CONSTRAINT "Doc_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EncryptedDoc" ADD CONSTRAINT "EncryptedDoc_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharableDocs" ADD CONSTRAINT "SharableDocs_docId_fkey" FOREIGN KEY ("docId") REFERENCES "Doc"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocShareRequest" ADD CONSTRAINT "DocShareRequest_docId_fkey" FOREIGN KEY ("docId") REFERENCES "Doc"("id") ON DELETE CASCADE ON UPDATE CASCADE;
