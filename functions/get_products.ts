import { z } from "zod";
import { Handler, HandlerEvent } from "@netlify/functions";
import { db } from "./db/db";
import { products } from "./db/schema";
import { and, asc, desc, eq, inArray, ne } from "drizzle-orm";

const FiltersSchema = z.object({
  sortBy: z.enum(["apk", "price_asc", "alc_desc"]).optional().default("apk"),
  cat1: z.string().optional(),
  page: z.coerce.number().optional().default(1),
  cat2: z.array(z.string().min(1)).min(1).optional().catch(undefined),
  showOrderStock: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .optional()
    .default("true"),
  // searchTerm: z.string().optional()
});

const PAGINATION_LIMIT = 30;

type Filters = z.infer<typeof FiltersSchema>;

const getProducts = async (filters: Filters) => {
  let sortByColumn: {
    column:
      | typeof products.apk
      | typeof products.price
      | typeof products.alcoholPercentage;
    direction: "asc" | "desc";
  };
  switch (filters.sortBy) {
    case "apk":
      sortByColumn = {
        column: products.apk,
        direction: "desc",
      };
      break;
    case "price_asc":
      sortByColumn = {
        column: products.price,
        direction: "asc",
      };
      break;
    case "alc_desc":
      sortByColumn = {
        column: products.alcoholPercentage,
        direction: "desc",
      };
      break;
  }

  const data = await db
    .select()
    .from(products)
    .where(
      and(
        filters.cat1 && filters.cat1 !== "all"
          ? eq(products.categoryLevel1, filters.cat1)
          : undefined,
        filters.cat2
          ? inArray(products.categoryLevel2, filters.cat2)
          : undefined,
        filters.showOrderStock === false
          ? ne(products.assortmentText, "Ordervaror")
          : undefined,
      ),
    )
    .orderBy(
      sortByColumn.direction === "asc"
        ? asc(sortByColumn.column)
        : desc(sortByColumn.column),
    )
    .limit(PAGINATION_LIMIT)
    .offset(filters.page * PAGINATION_LIMIT - PAGINATION_LIMIT);

  return data;
};

const handler: Handler = async (event, context) => {
  const request = event.multiValueQueryStringParameters;

  const validFilters = FiltersSchema.parse({
    sortBy: request?.sortBy?.[0],
    cat1: request?.cat1?.[0],
    page: request?.page?.[0],
    cat2: request?.cat2,
    showOrderStock: request?.showOrderStock?.[0],
    // searchTerm: request.searchTerm
  });

  const products = await getProducts(validFilters);

  return {
    body: JSON.stringify({
      data: products,
    }),
    statusCode: 200,
  };
};

export { handler };
