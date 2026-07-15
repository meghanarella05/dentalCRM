export const env = {
  DATABASE_URL: process.env.DATABASE_URL!,
  APP_URL: process.env.APP_URL!,
  NODE_ENV: process.env.NODE_ENV ?? "development",
};
