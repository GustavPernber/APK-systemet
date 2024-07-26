import { SortByOptions } from "@/utils/types";
import * as qs from "neoqs";
import { products } from "../../functions/db/schema";

const BASE_URL = ".netlify/functions/";

export type Product = typeof products.$inferSelect;

type GetProductsResponse = {
  data: Product[];
};

export type ProductOptions = {
  cat1: Cat1;
  cat2: string[] | null;
  showOrderStock: boolean;
  sortBy: SortByOptions;
};

async function getProducts({
  cat1,
  cat2,
  page,
  showOrderStock,
  sortBy,
}: ProductOptions & { page: number }): Promise<GetProductsResponse> {
  const query = qs.stringify(
    {
      sortBy,
      cat1: cat1.value,
      showOrderStock,
      cat2,
      page,
    },
    { arrayFormat: "repeat", allowEmptyArrays: false },
  );

  let response = await fetch(`${BASE_URL}get_products?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let products = await response.json();
  return products;
}

export type Cat1 = {
  value: string;
  friendlyUrl: string;
  cat2: any[];
};

export type MetadataResponse = {
  categories: {
    categories: Cat1[];
  };
  lastScraped: string;
};

async function getMetadata(): Promise<MetadataResponse> {
  let response = await fetch(`${BASE_URL}get_metadata`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const metadata = await response.json();
  return metadata;
}

const api = {
  getMetadata,
  getProducts,
};

export default api;
