/*
  Warnings:

  - The primary key for the `DocShareRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `DocShareRequest` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DocShareRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "senderName" TEXT NOT NULL,
    "senderEmail" TEXT,
    "message" TEXT NOT NULL,
    "docId" TEXT NOT NULL,
    "visited" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DocShareRequest_docId_fkey" FOREIGN KEY ("docId") REFERENCES "Doc" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_DocShareRequest" ("createdAt", "docId", "id", "message", "senderEmail", "senderName", "visited") SELECT "createdAt", "docId", "id", "message", "senderEmail", "senderName", "visited" FROM "DocShareRequest";
DROP TABLE "DocShareRequest";
ALTER TABLE "new_DocShareRequest" RENAME TO "DocShareRequest";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
