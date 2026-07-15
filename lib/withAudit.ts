import { db } from "@/lib/db";

type AuditableEntity<T> = {
  id: string;
  snapshot: () => Promise<T>;
};

type VersionedRecord = {
  version?: number;
};

function diffOf(before: unknown, after: unknown) {
  return {
    before,
    after,
  };
}

export async function withAudit<T extends VersionedRecord>(
  actorId: string,
  action: string,
  entity: AuditableEntity<T>,
  fn: () => Promise<T>,
) {
  const before = await entity.snapshot();
  const result = await fn();

  await db.auditLog.create({
    data: {
      actorId,
      action,
      entity: entity.id,
      entityVersion: result.version,
      diff: diffOf(before, result),
    },
  });

  return result;
}
