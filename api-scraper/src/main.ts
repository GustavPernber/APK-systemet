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
const MONGO_DB_WRITE_PATH = process.env.MONGODB_WRITE_PATH_DEV || process.env.MONGODB_WRITE_PATH
if (!MONGO_DB_WRITE_PATH) throw new Error("No path specified for mongo db")

export async function main() {
  console.time("Completed program in: ")
  console.log("Connecting to database with: ");
  console.log(MONGO_DB_WRITE_PATH);

  await mongoose.connect(MONGO_DB_WRITE_PATH as string);

  console.log("Connected!");

  try{
    mongoose.connection.dropCollection("products-tmp")
  }catch{}
  
  
  let categories = await fetchCategories();
 
  async function fetchNewProducts() {
    console.log("Fetching new products...");
    const consoleFetchStatus: any = {};

    function addToDb(
      product: Product,
    ) {
      return new Promise<void>(async (resolve, reject) => {
        const apk =
          (product.alcoholPercentage * 0.01 * product.volume) / product.price;
        try {
          const data = new ProductModel({ ...product, apk: apk });
          await data.save();
          consoleFetchStatus[`${product.categoryLevel1}`][`${product.categoryLevel2}`] += 1;
          console.log(consoleFetchStatus)
        } catch (error: any) {
          console.log(error)
          throw new Error()
        }
        resolve();
      });
    }

    for (const firstCategory of categories.cat1) {
        
      consoleFetchStatus[`${firstCategory.value}`] = {};
      for (const secondCategory of firstCategory.cat2) {
        const writeToDbPromises: Promise<void>[] = [];

        consoleFetchStatus[`${firstCategory.value}`][
          `${secondCategory.value}`
        ] = 0;
        console.log(consoleFetchStatus);

        let maxPages = false;
        let allProducts: Product[] = []

        for (let i = 1; !maxPages; i++) {
          console.log("Fetched: ", allProducts.length);

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

          allProducts = [...allProducts, ...response.data.products]
          
          if (response.data.products < 1) {
            maxPages = true;
          }

        }

        console.log("Deduplicating...");
        const products = new Set()
        const filteredProducts = allProducts.filter(product => {
          const duplicate = products.has(product.productId);
          products.add(product.productId);
          return !duplicate;
        })
        
        for (const product of filteredProducts) {
          writeToDbPromises.push(addToDb(product))
        }

        await Promise.all(writeToDbPromises)
      }
    
    }

    return;
  }

  async function transferCollections() {
    console.log("Dropping old collection...");
    const db = mongoose.connection.db;
    try {
      await db.dropCollection("products");
    } finally{
      await db.collection("products-tmp").rename("products");
      return;
    }
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
    
    console.log(categories);
    return categories;
  }

  async function updateMetadata() {
    const data = new MetadataModel({ categories: categories, lastUpdated: (new Date).toISOString() });
    try {
      await mongoose.connection.dropCollection("metadata");
    } finally{
      await data.save();
    }
  }
  
  await fetchNewProducts();
  await transferCollections();
  await updateMetadata()
  await mongoose.disconnect()
  console.timeEnd("Completed program in: ")
  console.log("UPDATE COMPLETED");
  return;
}



