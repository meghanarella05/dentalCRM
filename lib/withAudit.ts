import { db } from "@/lib/db";

type AuditableEntity<T> = {
  id: string;
  snapshot: () => Promise<T>;
};

function diffOf(before: unknown, after: unknown) {
  return {
    before,
    after,
  };
}

export async function withAudit<T>(
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
      diff: diffOf(before, result),
    },
  });

  return result;
}
