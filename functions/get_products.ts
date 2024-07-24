import { z } from "zod";
import { Handler, HandlerEvent } from "@netlify/functions";

const FiltersSchema = z.object({
  sortBy: z.string().optional().catch("apk"),
  cat1: z.string().array().optional(),
  page: z.number().optional().catch(1),
  // cat2: z.array(z.string()).optional(),
  // showOrderStock: z.boolean().optional(),
  // searchTerm: z.string().optional()
});

type Filters = z.infer<typeof FiltersSchema>;

// const validateRequest = async (filters, page) => {
//   const metadataConnection = getMetadataCollection();
//   const metadata = (await metadataConnection.collection.findOne({})) as any;
//   metadataConnection.terminate();

//   const allCat1Names: string[] = metadata.categories.cat1.map(
//     (element: { value: string }) => element.value,
//   );

//   const schemas = {
//     pageSchema: Joi.number().min(1).failover(1).required(),
//     filterSchema: Joi.object()
//       .required()
//       .keys({
//         sortBy: Joi.string()
//           .required()
//           .valid("apk", "alc_desc", "price_asc", "")
//           .failover("apk"),
//         cat1: Joi.string()
//           .required()
//           .valid(...allCat1Names)
//           .failover("all"),
//         cat2: Joi.array().items(Joi.string()).required().failover([]),
//         showOrderStock: Joi.boolean().required().failover(true),
//         searchTerm: Joi.string().required().failover(""),
//       }),
//   };

//   const validFilters = schemas.filterSchema.validate(filters).value;
//   const validPage = schemas.pageSchema.validate(page).value;
//   const validSearchTerm: string = /^\s*$/.test(filters.searchTerm)
//     ? ""
//     : validFilters.searchTerm;

//   let sortBy: { [key: string]: SortDirection } | null = null;
//   switch (validFilters.sortBy) {
//     case "apk":
//       sortBy = { apk: -1 };
//       break;
//     case "alc_desc":
//       sortBy = { alcoholPercentage: -1 };
//       break;
//     case "price_asc":
//       sortBy = { price: 1 };
//       break;
//     case "":
//       sortBy = null;
//       break;
//   }

//   return {
//     page: validPage,
//     categoryLevel1:
//       validFilters.cat1 !== "all"
//         ? { categoryLevel1: decodeURIComponent(validFilters.cat1) }
//         : null,
//     categoryLevel2:
//       validFilters.cat2.length > 0
//         ? {
//             $or: validFilters.cat2.map((category: string[]) => {
//               return { categoryLevel2: category };
//             }),
//           }
//         : null,
//     showOrderStock:
//       validFilters.showOrderStock === false
//         ? { assortmentText: { $ne: "Ordervaror" } }
//         : null,
//     searchTerm:
//       validSearchTerm !== ""
//         ? {
//             $search: {
//               text: {
//                 query: validSearchTerm,
//                 path: {
//                   wildcard: "*",
//                 },
//               },
//             },
//           }
//         : null,
//     sortBy,
//   };
// };

const main = async (event: HandlerEvent) => {
  // let requestBody: Filters | null = null;
  // try {
  //   requestBody = JSON.parse(event.body);
  // } catch (error) {
  //   requestBody = null;
  // }

  // const validRequest = await validateRequest(
  //   requestBody?.filters ? requestBody?.filters : {},
  //   requestBody?.page,
  // );

  // const paginationOffset =
  //   PAGINATION_LIMIT * validRequest.page - PAGINATION_LIMIT;

  // let agg: any[] = validRequest.searchTerm ? [validRequest.searchTerm] : [];
  // agg = [
  //   ...agg,
  //   {
  //     $match: {
  //       ...validRequest.categoryLevel1,
  //       ...validRequest.categoryLevel2,
  //       ...validRequest.showOrderStock,
  //     },
  //   },
  // ];

  // if (validRequest.sortBy) {
  //   agg.push({ $sort: validRequest.sortBy });
  // }
  // agg.push({ $skip: paginationOffset });
  // agg.push({ $limit: PAGINATION_LIMIT });

  // console.log(agg);

  // const result = await productConnection.collection.aggregate(agg).toArray();
  // productConnection.terminate();

  return {
    body: {
      data: [],
    },
    statusCode: 200,
  };
};

const handler: Handler = async (event, context) => {
  const PAGINATION_LIMIT = 30;
  // const productConnection = getProductCollection();
  const request = event.queryStringParameters;

  console.log(request);
  console.log(event);

  return {
    body: JSON.stringify({
      data: [],
    }),
    statusCode: 200,
  };
};

export { handler };
