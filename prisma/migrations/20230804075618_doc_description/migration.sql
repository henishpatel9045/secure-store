/*
  Warnings:

  - You are about to drop the column `userId` on the `EncryptedDoc` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `EncryptedDoc` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doc" ADD COLUMN "description" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EncryptedDoc" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userEmail" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "fileType" TEXT NOT NULL,
    "size" BIGINT NOT NULL DEFAULT 0,
    "path" TEXT NOT NULL,
    "passKey" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EncryptedDoc_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User" ("email") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_EncryptedDoc" ("createdAt", "fileType", "id", "name", "passKey", "path", "size", "updatedAt") SELECT "createdAt", "fileType", "id", "name", "passKey", "path", "size", "updatedAt" FROM "EncryptedDoc";
DROP TABLE "EncryptedDoc";
ALTER TABLE "new_EncryptedDoc" RENAME TO "EncryptedDoc";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
