import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";

import { createClient } from "@libsql/client";

const client = createClient({ url: "file:db/sqlite-tmp.db" });
const db = drizzle(client);

await migrate(db, { migrationsFolder: "drizzle/migrations" });

export { db };
