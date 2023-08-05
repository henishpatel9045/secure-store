-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SharableDocs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "docId" TEXT NOT NULL,
    "accessed" INTEGER NOT NULL,
    "expireAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SharableDocs_docId_fkey" FOREIGN KEY ("docId") REFERENCES "Doc" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SharableDocs" ("accessed", "docId", "expireAt", "id") SELECT "accessed", "docId", "expireAt", "id" FROM "SharableDocs";
DROP TABLE "SharableDocs";
ALTER TABLE "new_SharableDocs" RENAME TO "SharableDocs";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
