import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const client = createClient({ url: "file:functions/db/sqlite.db" });

export const db = drizzle(client);
