import { db } from "@/lib/db";
import { MODULE_VERSIONS } from "@/lib/version";

type TrackProps = Record<string, unknown>;

type TrackContext = {
  tenantId?: string;
  userId?: string;
};

export async function track(event: string, props: TrackProps, context: TrackContext = {}) {
  await db.trackedEvent.create({
    data: {
      event,
      props: {
        ...props,
        trackerVersion: MODULE_VERSIONS.tracking,
      },
      tenantId: context.tenantId,
      userId: context.userId,
    },
  });
}

export async function getEventRollup(days = 30) {
  const start = new Date();
  start.setDate(start.getDate() - days);

  const rows = await db.trackedEvent.groupBy({
    by: ["event"],
    where: {
      createdAt: {
        gte: start,
      },
    },
    _count: {
      _all: true,
    },
    orderBy: {
      _count: {
        event: "desc",
      },
    },
  });

  return rows.map((row) => ({
    event: row.event,
    count: row._count._all,
  }));
}
