import { db } from "./db/db";
import { metadata } from "./db/schema";
import type { Handler } from "@netlify/functions";

const handler: Handler = async (event, context) => {
  const data = await db.select().from(metadata);

  return {
    statusCode: 200,
    body: JSON.stringify(data[0]),
  };
};

export { handler };
