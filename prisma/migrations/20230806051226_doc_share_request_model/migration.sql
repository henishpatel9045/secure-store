-- CreateTable
CREATE TABLE "DocShareRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "senderName" TEXT NOT NULL,
    "senderEmail" TEXT,
    "message" TEXT NOT NULL,
    "docId" TEXT NOT NULL,
    "visited" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DocShareRequest_docId_fkey" FOREIGN KEY ("docId") REFERENCES "Doc" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
