import { MainHandlerResponse } from "./utils/types";
import Joi from "joi";
import { getMetadataCollection, getProductCollection } from "./utils/db";
import { SortDirection } from "mongodb";

const validateRequest = async (filters, page, searchTerm) => {
  const metadataConnection = getMetadataCollection()
  const metadata = await metadataConnection.collection.findOne({}) as any
  metadataConnection.terminate()

  const allCat1Names: string[] = metadata.categories.cat1.map(
    (element: { value: string }) => element.value
  );

  const schemas = {
    pageSchema: Joi.number().min(1).failover(1).required(),
    filterSchema: Joi.object()
      .required()
      .keys({
        sortBy: Joi.string()
          .required()
          .valid("apk", "alc_desc", "price_asc")
          .failover("apk"),
        cat1: Joi.string()
          .required()
          .valid(...allCat1Names)
          .failover("all"),
        cat2: Joi.array().items(Joi.string()).required().failover([]),
        showOrderStock: Joi.boolean().required().failover(true),
      }),
    searchTermSchema: Joi.string().required().failover(""),
  };

  const validFilters = schemas.filterSchema.validate(filters).value;
  const validPage = schemas.pageSchema.validate(page).value;
  const validSearchTerm: string = /^\s*$/.test(searchTerm)
    ? ""
    : schemas.searchTermSchema.validate(searchTerm).value;

  let sortBy: { [key: string]: SortDirection } | undefined = undefined;
  switch (validFilters.sortBy) {
    case "apk":
      sortBy = { apk: -1 };
      break;
    case "alc_desc":
      sortBy = { alcoholPercentage: -1 };
      break;
    case "price_asc":
      sortBy = { price: 1 };
      break;
  }

  console.log(validSearchTerm);

  // const indexName = `systembolaget-products${(process.env.MONGODB_READ_PATH || process.env.MONGODB_READ_PATH_DEV )?.includes("dev") ? "-dev" : ""}`

  return {
    page: validPage,
    categoryLevel1:
      validFilters.cat1 !== "all"
        ? { categoryLevel1: decodeURIComponent(validFilters.cat1) }
        : null,
    categoryLevel2:
      validFilters.cat2.length > 0
        ? {
            $or: validFilters.cat2.map((category: string[]) => {
              return { categoryLevel2: category };
            }),
          }
        : null,
    showOrderStock:
      validFilters.showOrderStock === false
        ? { assortmentText: { $ne: "Ordervaror" } }
        : null,
    searchTerm: validSearchTerm !== "" ?  {$search: { 
    text:{
      query:validSearchTerm,
      path: {
        'wildcard': '*'
      }
    }}} : null,
    sortBy,
  };
};

const main = async (event, context): Promise<MainHandlerResponse> => {
  const PAGINATION_LIMIT = 30;
  const productConnection = getProductCollection()

  let requestBody: any;
  try {
    requestBody = JSON.parse(event.body);
  } catch (error) {
    requestBody = null;
  }

  const validRequest = await validateRequest(
    requestBody?.filters ? requestBody?.filters : {},
    requestBody?.page,
    requestBody?.searchTerm
  );

    /// U LEFT OF HERE IDIOOOOOOOOOOT
  // Have to change lib to native mongdb away from mongoose. Mongodb shell has better support for atlas search and stuff
  const paginationOffset =
    PAGINATION_LIMIT * validRequest.page - PAGINATION_LIMIT;
  
  let agg: any[] = validRequest.searchTerm ? [validRequest.searchTerm] : []
  agg = [...agg,  
    { $match: {
    ...validRequest.categoryLevel1,
    ...validRequest.categoryLevel2,
    ...validRequest.showOrderStock,
  }},
  {$sort: validRequest.sortBy},
  {$skip: paginationOffset},
  {$limit: PAGINATION_LIMIT},]
  console.log(agg);

  const result =  await productConnection.collection.aggregate(agg).toArray()
  productConnection.terminate()

  return {
    body: { data: result },
  };
};

const handler = async (event, context) => {
  try {
    const response: MainHandlerResponse = await main(event, context);

    return {
      statusCode: response?.statusCode || 200,
      body: JSON.stringify(response.body),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error. See logs or contact site owner.",
      }),
    };
  }
};

export { handler };
