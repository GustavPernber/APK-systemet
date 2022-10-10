import config from "./config.json";
import https from "https";
import { Product } from "./utils/types";
import mongoose from "mongoose";
import { ProductModel } from "./models/Products";
import { MetadataModel } from "./models/Metadata";
import * as dotenv from "dotenv";
import axios from "axios";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") }); // Points to env in dev env
const MONGO_DB_WRITE_PATH = process.env.MONGODB_WRITE_PATH_DEV || process.env.MONGODB_WRITE_PATH_DEV
if (!MONGO_DB_WRITE_PATH) throw new Error("No path specified for mongo db")

export async function main() {
  console.log("Connecting to database...");
  try {
    await mongoose.connect(MONGO_DB_WRITE_PATH as string);
  } catch (error) {
    console.error("Failed to connect to db.");
    console.log(error);
    throw new Error();
  }
  console.log("Connected!");

  let categories: any;
  try {
    categories = await fetchCategories();
    console.log(categories);
  } catch (error) {
    console.log("Failed to fetch categories");
    console.log(error);
    throw new Error()
  }

  async function fetchNewProducts() {
    console.log("Fetching new products...");
    const writeToDbPromises: Promise<void>[] = [];
    const consoleFetchStatus: any = {};

    function addToDb(
      product: Product,
      firstCategory: string,
      secondCategory: string
    ) {
      return new Promise<void>(async (resolve, reject) => {
        const apk =
          (product.alcoholPercentage * 0.01 * product.volume) / product.price;
        try {
          const data = new ProductModel({ ...product, apk: apk });
          await data.save();
          consoleFetchStatus[`${firstCategory}`][`${secondCategory}`] += 1;
        } catch (error: any) {
          if (error.code === 11000) {
            console.log(
              "DUPLICATE DETECTED:",
              product.productNameBold,
              product.productNumber
            );
            resolve();
          } else {
            reject(error);
          }
        }
        resolve();
      });
    }

    for (const firstCategory of categories.cat1) {
      console.log("first loop");
      consoleFetchStatus[`${firstCategory.value}`] = {};
      for (const secondCategory of firstCategory.cat2) {
        console.log("second loop");
        consoleFetchStatus[`${firstCategory.value}`][
          `${secondCategory.value}`
        ] = 0;

        let maxPages = false;

        for (let i = 1; !maxPages; i++) {
          console.log(consoleFetchStatus);

          let response = await axios({
            method: "get",
            url: `${
              config.systembolaget_api_url
            }page=${i}&categoryLevel1=${encodeURIComponent(
              firstCategory.value
            )}&categoryLevel2=${encodeURIComponent(secondCategory.value)}`,
            headers: {
              ...config.headers,
            },
            httpsAgent: new https.Agent({
              rejectUnauthorized: false,
            }),
          });

          response.data.products.forEach((product: Product) => {
            writeToDbPromises.push(
              addToDb(product, firstCategory.value, secondCategory.value)
            );
          });

          if (response.data.products < 1) {
            maxPages = true;
          }
        }
      }
    }
    await Promise.all(writeToDbPromises);
    return;
  }

  async function transferCollections() {
    console.log("Dropping old collection...");
    const db = mongoose.connection.db;
    await db.dropCollection("products");
    await db.collection("products-tmp").rename("products");
    return;
  }

  async function fetchCategories() {
    console.log("Collecting categories...");

    const nonDrinkProducts = ["Alkoholfritt", "Presentartiklar"];

    let response = await axios({
      method: "get",
      url: `${config.systembolaget_api_url}page=1`,
      headers: {
        ...config.headers,
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });

    const cat1FilterObjects = response.data.filters.filter((filter: any) => {
      return filter.name === "CategoryLevel1";
    })[0].searchModifiers;

    const categories: { cat1: any[] } = {
      cat1: [],
    };
    cat1FilterObjects.forEach((filterObj: any) => {
      if (!nonDrinkProducts.includes(filterObj.value)) {
        categories.cat1 = [
          ...categories.cat1,
          { friendlyUrl: filterObj.friendlyUrl, value: filterObj.value },
        ];
      }
    });

    const newCat1 = [];
    for await (const cat1Filter of categories.cat1) {
      const response = await axios({
        method: "get",
        url: `${
          config.systembolaget_api_url
        }page=1&categoryLevel1=${encodeURIComponent(cat1Filter.value)}`,
        headers: {
          ...config.headers,
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      });

      const cat2FilterObjects = response.data.filters.filter((filter: any) => {
        return filter.name === "CategoryLevel1";
      })[0].child.searchModifiers;
      newCat1.push({ ...cat1Filter, cat2: [...cat2FilterObjects] });
    }
    categories.cat1 = newCat1;
    const data = new MetadataModel({ categories: categories });
    await mongoose.connection.dropCollection("metadata");
    await data.save();
    console.log(categories);
    return categories;
  }

  try {
    await fetchNewProducts();
    await transferCollections();
  } catch (error) {
    console.log(error);
    throw new Error()
  }
  console.log("UPDATE COMPLETED");
  return;
}



