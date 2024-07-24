import { config } from "./config";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../../functions/db/schema";
import path from "path";

const dbPath = path.resolve("functions/db/sqlite.db");
console.log(dbPath);
const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });
