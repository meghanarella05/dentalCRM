export const env = {
  DATABASE_URL: process.env.DATABASE_URL!,
  APP_URL: process.env.APP_URL!,
  APP_VERSION: process.env.APP_VERSION ?? "0.1.0",
  NODE_ENV: process.env.NODE_ENV ?? "development",
};
