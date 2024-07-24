import { MongoClient } from "mongodb";

function getClient() {
  const connectionString =
    process.env.MONGODB_READ_PATH ||
    (process.env.MONGODB_READ_PATH_DEV as string);

  const client = new MongoClient(connectionString);

  return client;
}

export function getProductCollection() {
  const client = getClient();
  return {
    collection: client.db().collection("products"),
    terminate: () => client.close(),
  };
}

export function getMetadataCollection() {
  const client = getClient();
  return {
    collection: client.db().collection("metadata"),
    terminate: () => client.close(),
  };
}
