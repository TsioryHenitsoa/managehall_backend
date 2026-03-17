-- CreateTable
CREATE TABLE "ReservationHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reservationId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "actorUserId" TEXT,
    "details" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ReservationHistory_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PaymentEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reservationId" TEXT NOT NULL,
    "paymentId" TEXT,
    "eventType" TEXT NOT NULL DEFAULT 'PAYMENT_CREATED',
    "amount" REAL NOT NULL,
    "method" TEXT,
    "note" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PaymentEvent_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PaymentEvent_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "ReservationHistory_reservationId_createdAt_idx" ON "ReservationHistory"("reservationId", "createdAt");

-- CreateIndex
CREATE INDEX "ReservationHistory_action_createdAt_idx" ON "ReservationHistory"("action", "createdAt");

-- CreateIndex
CREATE INDEX "PaymentEvent_reservationId_createdAt_idx" ON "PaymentEvent"("reservationId", "createdAt");

-- CreateIndex
CREATE INDEX "PaymentEvent_eventType_createdAt_idx" ON "PaymentEvent"("eventType", "createdAt");

-- CreateIndex
CREATE INDEX "Payment_createdAt_idx" ON "Payment"("createdAt");

-- CreateIndex
CREATE INDEX "Payment_method_createdAt_idx" ON "Payment"("method", "createdAt");

-- CreateIndex
CREATE INDEX "Reservation_startTime_idx" ON "Reservation"("startTime");

-- CreateIndex
CREATE INDEX "Reservation_status_idx" ON "Reservation"("status");

-- CreateIndex
CREATE INDEX "Reservation_salleId_startTime_idx" ON "Reservation"("salleId", "startTime");
