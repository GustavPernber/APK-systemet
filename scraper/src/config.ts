import path from "path";

const pathToDb = path.resolve("../db/sqlite.db");

export const config = {
  DB_PATH: pathToDb,
  systembolaget_api_url:
    "https://api-extern.systembolaget.se/sb-api-ecommerce/v1/productsearch/search?",
  headers: {
    "Ocp-Apim-Subscription-Key": "cfc702aed3094c86b92d6d4ff7a54c84",
    "user-agent": "Mozilla",
    baseurl: "https://api-systembolaget.azure-api.net/sb-api-ecommerce/v1",
  },
};
