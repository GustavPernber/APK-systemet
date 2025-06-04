import axios from "axios";
import https from "node:https";
import { config } from "./config";
import {
  type Cat1,
  type ProductInsert,
  metadata,
  products,
} from "../../functions/db/schema";
import { db } from "./db";
import { count } from "drizzle-orm";
import { rmSync, renameSync } from "node:fs";

interface Image {
  imageUrl: string;
  fileType?: any;
  size?: any;
}
interface TasteClock {
  key: string;
  value: number;
}

// TODO: Convert to zod?
interface BaseProduct {
  sellStartTime: string | null;
  productId: string;
  productNumber: string;
  productNameBold: string;
  productNameThin: string;
  category: string | null;
  productNumberShort: string;
  producerName: string;
  supplierName: string;
  isKosher: boolean;
  bottleText: string;
  restrictedParcelQuantity: number;
  isOrganic: boolean;
  isSustainableChoice: boolean;
  isClimateSmartPackaging: boolean;
  isEthical: boolean;
  ethicalLabel: string | null;
  isWebLaunch: boolean;
  productLaunchDate: string;
  isCompletelyOutOfStock: boolean;
  isTemporaryOutOfStock: boolean;
  alcoholPercentage: number;
  volumeText: string;
  volume: number;
  price: number;
  country: string;
  originLevel1: string;
  originLevel2: string | null;
  categoryLevel1: string;
  categoryLevel2: string;
  categoryLevel3: string;
  categoryLevel4: string | null;
  customCategoryTitle: string;
  assortmentText: string;
  usage: string;
  taste: string;
  tasteSymbols: string[];
  tasteClockGroupBitter: number | null;
  tasteClockGroupSmokiness: number | null;
  tasteClockBitter: number;
  tasteClockFruitacid: number;
  tasteClockBody: number;
  tasteClockRoughness: number;
  tasteClockSweetness: number;
  tasteClockSmokiness: number;
  tasteClockCasque: number;
  assortment: string;
  recycleFee: number;
  isManufacturingCountry: boolean;
  isRegionalRestricted: boolean;
  packagingLevel1: string;
  isNews: boolean;
  images: Image[];
  isDiscontinued: boolean;
  isSupplierTemporaryNotAvailable: boolean;
  sugarContent: number;
  sugarContentGramPer100ml: number;
  seal: string[];
  vintage: string | null;
  grapes: string[];
  otherSelections: string | null;
  tasteClocks: TasteClock[];
  color: string;
  dishPoints: string | null;
}

const baseProductToProduct = (
  baseProduct: BaseProduct,
  scrapedAt: Date,
): ProductInsert => {
  const apk =
    (baseProduct.alcoholPercentage * 0.01 * baseProduct.volume) /
    baseProduct.price;

  return {
    ...baseProduct,
    productLaunchDate: new Date(baseProduct.productLaunchDate),
    scrapedAt,
    apk,
    tasteSymbols: { symbols: baseProduct.tasteSymbols },
    images: { images: baseProduct.images },
    seal: { seal: baseProduct.seal },
    grapes: { grapes: baseProduct.grapes },
    tasteClocks: { tasteClocks: baseProduct.tasteClocks },
  };
};

const consoleFetchStatus: { [cat1: string]: { [cat2: string]: number } } = {};
let collectedProductsCount = 0;

async function handleSecondCategory(
  cat1: Record<"value", any>,
  cat2: Record<"value", any>,
) {
  let maxPages = false;
  let allProducts: BaseProduct[] = [];

  for (let i = 1; !maxPages; i++) {
    const url = `${
      config.systembolaget_api_url
    }page=${i}&categoryLevel1=${encodeURIComponent(
      cat1.value,
    )}&categoryLevel2=${encodeURIComponent(cat2.value)}`;
    const result = await axios<{ products: BaseProduct[] }>({
      url,
      headers: {
        ...config.headers,
      },
    }); // TODO: Add retry

    console.log(`(${cat1.value}, ${cat2.value}) Fetched:`, allProducts.length);

    allProducts = [...allProducts, ...result.data.products];

    if (result.data.products.length < 1) {
      maxPages = true;
    }
  }

  const products = new Set();
  const filteredProducts = allProducts.filter((product) => {
    const duplicate = products.has(product.productId);
    products.add(product.productId);
    return !duplicate;
  });

  return filteredProducts;
}

type Categories = {
  cat1: Cat1[];
};

async function fetchNewProducts(
  categories: Categories,
  onProductFetched: (product: BaseProduct) => Promise<void>,
) {
  for (const firstCategory of categories.cat1) {
    console.log(`Beginning fetch for '${firstCategory.value}'`);
    consoleFetchStatus[`${firstCategory.value}`] = {};
    for (const secondCategory of firstCategory.cat2) {
      consoleFetchStatus![`${firstCategory.value}`]![
        `${secondCategory.value}`
      ] = 0;

      const products = await handleSecondCategory(
        firstCategory,
        secondCategory,
      );

      for (const product of products) {
        await onProductFetched(product);
      }
    }
  }

  return;
}

async function fetchCategories() {
  console.log("Collecting categories...");

  const nonDrinkProducts = ["Alkoholfritt", "Presentartiklar"]; // TODO: remove some from exclusion rule

  const response = await axios({
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

  const categories: Categories = { cat1: [] };
  cat1FilterObjects.forEach((filterObj: any) => {
    if (!nonDrinkProducts.includes(filterObj.value)) {
      categories.cat1 = [
        ...categories.cat1,
        {
          friendlyUrl: filterObj.friendlyUrl,
          value: filterObj.value,
        } as Cat1,
      ];
    }
  });

  const newCat1: {
    cat2: any[];
    value: string;
    friendlyUrl: string;
  }[] = [];
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

class ProductInserter {
  private fetchedProducts: ProductInsert[] = [];
  private insertionPromises: Promise<any>[] = [];

  private async insertFromList(productsToBeInserted: ProductInsert[]) {
    console.log("INSERTING...");
    let attempts = 0;
    const MAX_ATTEMPTS = 4;

    while (attempts < MAX_ATTEMPTS) {
      try {
        await db.insert(products).values(productsToBeInserted);
        break;
      } catch (_error) {
        const error = _error as { status?: number; message?: string };
        console.log(error);
        if (error.message?.includes("Duplicate entry")) {
          return;
        }

        if (error.status === 400) {
          throw new Error("400 code on insertion!");
        }
        attempts++;
        if (attempts >= MAX_ATTEMPTS) {
          throw new Error("Failed to insert product after 3 attempts!");
        }
        console.log("CONTINUING AFTER FAILED INSERTION ATTEMPT");
      }
    }
    return;
  }

  public async push(product: ProductInsert) {
    this.fetchedProducts.push(product);
    if (this.fetchedProducts.length > 100) return;

    this.insertionPromises.push(this.insertFromList(this.fetchedProducts));
    // Instead of having an await here which could slow other stuff done i could copy the array only store the promise. question is how computatiaally expensive that would be...

    this.fetchedProducts = [];
    return;
  }

  public async close() {
    if (this.fetchedProducts.length) {
      await this.insertFromList(this.fetchedProducts);
    }

    await Promise.all(this.insertionPromises);
    return;
  }
}

export async function scrapeSystemBolaget() {
  const scrapedAt = new Date();
  const countResult = await db.select({ value: count() }).from(products);

  const { value: totalProductsCount } = countResult[0]!;

  const productInserter = new ProductInserter();

  const categories = await fetchCategories();

  await fetchNewProducts(categories, async (product) => {
    const value = baseProductToProduct(product, scrapedAt);

    await productInserter.push(value);

    consoleFetchStatus![`${product.categoryLevel1}`]![
      `${product.categoryLevel2}`
    ]! += 1;
    collectedProductsCount++;

    console.log(consoleFetchStatus);
    console.log(
      `${((collectedProductsCount / totalProductsCount) * 100).toFixed(2)}%`,
    );
    return;
  });

  await productInserter.close();

  await db.insert(metadata).values({
    categories: { categories: categories.cat1 },
    lastScraped: scrapedAt,
  });

  rmSync("db/sqlite.db");
  renameSync("db/sqlite-tmp.db", "db/sqlite.db");

  return;
}
scrapeSystemBolaget();

// const mockProduct: BaseProduct = {
//   productId: "24459057",
//   productNumber: "3469014",
//   productNameBold: "Hop Notch",
//   productNameThin: "Hello Sunshine! NEIPA",
//   category: null,
//   productNumberShort: "34690",
//   producerName: "Hop Notch Brewing",
//   supplierName: "Waxholms Bryggeri AB",
//   isKosher: false,
//   bottleText: "Burk",
//   restrictedParcelQuantity: 0,
//   isOrganic: false,
//   isSustainableChoice: false,
//   isClimateSmartPackaging: false,
//   isEthical: false,
//   ethicalLabel: null,
//   isWebLaunch: false,
//   productLaunchDate: "2021-12-02T00:00:00",
//   sellStartTime: "10:00:00",
//   isCompletelyOutOfStock: false,
//   isTemporaryOutOfStock: false,
//   alcoholPercentage: 6.5,
//   volumeText: "440 ml",
//   volume: 440,
//   price: 44.9,
//   country: "Sverige",
//   originLevel1: "Stockholms län",
//   originLevel2: "Vaxholm kommun",
//   categoryLevel1: "Öl",
//   categoryLevel2: "Ale",
//   categoryLevel3: "New England IPA/Hazy IPA",
//   categoryLevel4: null,
//   customCategoryTitle: "Öl, Ale, New England IPA/Hazy IPA",
//   assortmentText: "Lokalt & Småskaligt",
//   usage:
//     "Serveras vid 8-10°C som sällskapsdryck eller till rätter av fläsk-, lamm- och nötkött.",
//   taste:
//     "Humlearomatisk, fruktig smak med tydlig beska och liten sötma, med inslag av papaya, apelsinskal, ananas, sockerkaka och honung.",
//   tasteSymbols: ["Fläsk", "Lamm", "Sällskapsdryck", "Nöt"],
//   tasteClockGroupBitter: null,
//   tasteClockGroupSmokiness: null,
//   tasteClockBitter: 7,
//   tasteClockFruitacid: 0,
//   tasteClockBody: 7,
//   tasteClockRoughness: 0,
//   tasteClockSweetness: 3,
//   tasteClockSmokiness: 0,
//   tasteClockCasque: 1,
//   assortment: "TSLS",
//   recycleFee: 1,
//   isManufacturingCountry: true,
//   isRegionalRestricted: true,
//   packagingLevel1: "Burk",
//   isNews: false,
//   images: [
//     {
//       imageUrl:
//         "https://sb-product-media-prod.azureedge.net/productimages/24459057/24459057",
//       fileType: null,
//       size: null,
//     },
//   ],
//   isDiscontinued: false,
//   isSupplierTemporaryNotAvailable: false,
//   sugarContent: 0,
//   sugarContentGramPer100ml: 0,
//   seal: [],
//   vintage: null,
//   grapes: [],
//   otherSelections: null,
//   tasteClocks: [
//     { key: "TasteClockBitter", value: 7 },
//     { key: "TasteClockBody", value: 7 },
//     { key: "TasteClockSweetness", value: 3 },
//   ],
//   color: "Oklar, gul färg.",
//   dishPoints: null,
// };
// async function testDuplication() {
//   const inserter = new ProductInserter();
//   const newProduct = baseProductToProduct(mockProduct, new Date());
//   await inserter.push(newProduct);
//   await inserter.push({ ...newProduct });

//   await inserter.close();
//   console.log("Done!");
// }

// testDuplication();

// CHATPGT
// To enforce the uniqueness of productId for each lastScraped date, you can create a composite UNIQUE index on these two columns. This will ensure that the combination of productId and lastScraped is unique in the products table.

// Here's the SQL statement to add this constraint:

// ;
// This statement will add a new UNIQUE constraint named unique_product_per_day to the products table. The constraint is on the productId column and the date part of the lastScraped column. This means that for each date, each productId can only appear once.

// Please replace products, productId, and lastScraped with your actual table and column names if they are different.
