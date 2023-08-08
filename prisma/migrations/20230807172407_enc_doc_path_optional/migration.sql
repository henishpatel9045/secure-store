-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EncryptedDoc" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userEmail" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "description" TEXT,
    "fileType" TEXT NOT NULL,
    "size" BIGINT NOT NULL DEFAULT 0,
    "path" TEXT,
    "passKey" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EncryptedDoc_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User" ("email") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_EncryptedDoc" ("createdAt", "description", "fileName", "fileType", "id", "name", "passKey", "path", "size", "updatedAt", "userEmail") SELECT "createdAt", "description", "fileName", "fileType", "id", "name", "passKey", "path", "size", "updatedAt", "userEmail" FROM "EncryptedDoc";
DROP TABLE "EncryptedDoc";
ALTER TABLE "new_EncryptedDoc" RENAME TO "EncryptedDoc";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
