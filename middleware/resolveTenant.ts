import { db } from "@/lib/db";

export async function resolveTenant(req: Request) {
  const host = req.headers.get("host");

  if (!host) {
    throw new Error("Missing host header");
  }

  const slug = host.split(":")[0].split(".")[0];

  return db.tenant.findUniqueOrThrow({ where: { slug } });
}
