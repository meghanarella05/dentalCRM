import { NextResponse } from "next/server";

import { env } from "@/lib/env";
import { API_VERSIONS, MODULE_VERSIONS, SCHEMA_VERSION } from "@/lib/version";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    apiVersion: "legacy",
    deprecated: true,
    supportedVersions: API_VERSIONS.SUPPORTED,
    appVersion: env.APP_VERSION,
    schemaVersion: SCHEMA_VERSION,
    moduleVersions: MODULE_VERSIONS,
  });
}
