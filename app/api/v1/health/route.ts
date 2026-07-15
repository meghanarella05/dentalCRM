import { NextResponse } from "next/server";

import { env } from "@/lib/env";
import { API_VERSIONS, MODULE_VERSIONS, SCHEMA_VERSION } from "@/lib/version";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    apiVersion: API_VERSIONS.CURRENT,
    supportedVersions: API_VERSIONS.SUPPORTED,
    deprecatedVersions: API_VERSIONS.DEPRECATED,
    appVersion: env.APP_VERSION,
    schemaVersion: SCHEMA_VERSION,
    moduleVersions: MODULE_VERSIONS,
  });
}
