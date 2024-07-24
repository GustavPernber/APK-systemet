import type { Config } from "drizzle-kit";
export default {
  schema: "./functions/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: "./functions/db/sqlite.db",
  },
} satisfies Config;
