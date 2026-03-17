-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reservation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "salleId" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "pricePerHourSnapshot" REAL NOT NULL DEFAULT 0,
    "totalAmount" REAL NOT NULL,
    "paidAmount" REAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'CONFIRMED',
    "note" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservation_salleId_fkey" FOREIGN KEY ("salleId") REFERENCES "Salle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reservation" ("createdAt", "endTime", "id", "note", "paidAmount", "salleId", "startTime", "status", "totalAmount", "updatedAt", "userId") SELECT "createdAt", "endTime", "id", "note", "paidAmount", "salleId", "startTime", "status", "totalAmount", "updatedAt", "userId" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
CREATE INDEX "Reservation_startTime_idx" ON "Reservation"("startTime");
CREATE INDEX "Reservation_status_idx" ON "Reservation"("status");
CREATE INDEX "Reservation_salleId_startTime_idx" ON "Reservation"("salleId", "startTime");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
