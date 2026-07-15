-- Schema version tracking
CREATE TABLE "SchemaVersion" (
  "id" TEXT NOT NULL,
  "version" TEXT NOT NULL,
  "notes" TEXT,
  "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SchemaVersion_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "SchemaVersion_version_key" ON "SchemaVersion"("version");

-- Record version columns for optimistic concurrency / lineage
ALTER TABLE "Tenant" ADD COLUMN "version" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "User" ADD COLUMN "version" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "Role" ADD COLUMN "version" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "Account" ADD COLUMN "version" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "Notification" ADD COLUMN "version" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "AuditLog" ADD COLUMN "entityVersion" INTEGER;

INSERT INTO "SchemaVersion" ("id", "version", "notes")
VALUES ('seed-versioning-20260715192000', '2026.07.15.1', 'Introduced API/module/data/schema versioning support');
