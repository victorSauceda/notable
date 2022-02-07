-- CreateTable
CREATE TABLE "Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "patient_first_name" TEXT NOT NULL,
    "patient_last_name" TEXT NOT NULL,
    "date_chosen" DATETIME NOT NULL,
    "time_chosen" DATETIME NOT NULL
);
