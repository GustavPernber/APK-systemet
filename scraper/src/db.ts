import { config } from "./config";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../db/schema";

const dbPath = config.DB_PATH;
console.log("dbPath", dbPath);

const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });
