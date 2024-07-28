import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { config } from "dotenv";

config();

const dbPath = "db/sqlite.db";

console.log(`Connecting to database at ${dbPath}`);

const client = createClient({ url: `file:${dbPath}` });

export const db = drizzle(client);
