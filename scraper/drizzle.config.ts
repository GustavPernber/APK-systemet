import type { Config } from "drizzle-kit";
import { config } from "./src/config";
export default {
  schema: "../db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: config.DB_PATH,
  },
} satisfies Config;
