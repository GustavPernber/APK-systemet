import config from "./config.json";
import { Product } from "./utils/types";
import axios from "axios";

export default async function handleSecondCategory(cat1: any, cat2: any) {
  let maxPages = false;
  let allProducts: Product[] = [];

  for (let i = 1; !maxPages; i++) {
    const url = `${
      config.systembolaget_api_url
    }page=${i}&categoryLevel1=${encodeURIComponent(
      cat1.value,
    )}&categoryLevel2=${encodeURIComponent(cat2.value)}`;
    const result = await axios({
      url,
      headers: {
        ...config.headers,
      },
    });

    console.log("Fetched: ", allProducts.length);

    allProducts = [...allProducts, ...result.data.products];

    if (result.data.products < 1) {
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
