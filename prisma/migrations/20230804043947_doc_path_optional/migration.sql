/*
  Warnings:

  - You are about to drop the column `userId` on the `Doc` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `Doc` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Doc" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userEmail" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "size" BIGINT NOT NULL DEFAULT 0,
    "path" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Doc_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User" ("email") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Doc" ("createdAt", "fileType", "id", "name", "path", "size", "updatedAt") SELECT "createdAt", "fileType", "id", "name", "path", "size", "updatedAt" FROM "Doc";
DROP TABLE "Doc";
ALTER TABLE "new_Doc" RENAME TO "Doc";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
