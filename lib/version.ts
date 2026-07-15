export const SCHEMA_VERSION = "2026.07.15.1";

export const API_VERSIONS = {
  CURRENT: "v1",
  SUPPORTED: ["v1"],
  DEPRECATED: ["legacy"],
} as const;

export const MODULE_VERSIONS = {
  env: "1.1.0",
  db: "1.1.0",
  notify: "1.1.0",
  audit: "1.1.0",
  tracking: "1.1.0",
  auth: "1.1.0",
  tenancy: "1.1.0",
  ui: "1.1.0",
} as const;
