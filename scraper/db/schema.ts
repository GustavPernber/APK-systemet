import {
  int,
  integer,
  real,
  sqliteTable,
  text,
  unique,
} from "drizzle-orm/sqlite-core";

type ImageJson = {
  images: {
    imageUrl: string;
    fileType?: string | null;
    size?: string | null;
  }[];
};

interface TasteClock {
  key: string;
  value: number;
}

type TasteSymbolsJson = {
  symbols: string[];
};

export type Cat1 = {
  value: string;
  friendlyUrl: string;
  cat2: {
    value: string | null;
    count: number | null;
    isActive: boolean | null;
    friendlyUrl: string | null;
    subtitleText: string | null;
  }[];
};

export const metadata = sqliteTable("metadata", {
  categories: text("categories", { mode: "json" }).$type<{
    categories: Cat1[];
  }>(),
  lastScraped: integer("lastScraped", { mode: "timestamp" }),
});

export const products = sqliteTable(
  "products",
  {
    dbId: integer("dbId", { mode: "number" }).primaryKey({
      autoIncrement: true,
    }),
    productId: text("productId"),
    productNumber: text("productNumber"),
    productNameBold: text("productNameBold"),
    productNameThin: text("productNameThin"),
    category: text("category"), // or null
    productNumberShort: text("productNumberShort"),
    producerName: text("producerName"),
    supplierName: text("supplierName"),
    isKosher: integer("isKosher", { mode: "boolean" }),
    bottleText: text("bottleText"),
    restrictedParcelQuantity: int("restrictedParcelQuantity"),
    isOrganic: integer("isOrganic", { mode: "boolean" }),
    isSustainableChoice: integer("isSustainableChoice", { mode: "boolean" }),
    isClimateSmartPackaging: integer("isClimateSmartPackaging", {
      mode: "boolean",
    }),
    isEthical: integer("isEthical", { mode: "boolean" }),
    ethicalLabel: text("ethicalLabel"),
    isWebLaunch: integer("isWebLaunch", { mode: "boolean" }),
    productLaunchDate: integer("productLaunchDate", { mode: "timestamp" }),
    isCompletelyOutOfStock: integer("isCompletelyOutOfStock", {
      mode: "boolean",
    }),
    isTemporaryOutOfStock: integer("isTemporaryOutOfStock", {
      mode: "boolean",
    }),
    alcoholPercentage: real("alcoholPercentage"),
    volumeText: text("volumeText"),
    volume: real("volume"),
    price: real("price"),
    country: text("country"),
    originLevel1: text("originLevel1"),
    originLevel2: text("originLevel2"),
    categoryLevel1: text("categoryLevel1"),
    categoryLevel2: text("categoryLevel2"),
    categoryLevel3: text("categoryLevel3"),
    categoryLevel4: text("categoryLevel4"),
    customCategoryTitle: text("customCategoryTitle"),
    assortmentText: text("assortmentText"),
    usage: text("usage"),
    taste: text("taste"),
    tasteSymbols: text("tasteSymbols", {
      mode: "json",
    }).$type<TasteSymbolsJson>(),
    tasteClockGroupBitter: int("tasteClockGroupBitter"),
    tasteClockGroupSmokiness: int("tasteClockGroupSmokiness"),
    tasteClockBitter: int("tasteClockBitter"),
    tasteClockFruitacid: int("tasteClockFruitacid"),
    tasteClockBody: int("tasteClockBody"),
    tasteClockRoughness: int("tasteClockRoughness"),
    tasteClockSweetness: int("tasteClockSweetness"),
    tasteClockSmokiness: int("tasteClockSmokiness"),
    tasteClockCasque: int("tasteClockCasque"),
    assortment: text("assortment"),
    recycleFee: real("recycleFee"),
    isManufacturingCountry: integer("isManufacturingCountry", {
      mode: "boolean",
    }),
    isRegionalRestricted: integer("isRegionalRestricted", { mode: "boolean" }),
    packagingLevel1: text("packagingLevel1"),
    isNews: integer("isNews", { mode: "boolean" }),
    images: text("images", { mode: "json" }).$type<ImageJson>(),
    isDiscontinued: integer("isDiscontinued", { mode: "boolean" }),
    isSupplierTemporaryNotAvailable: integer(
      "isSupplierTemporaryNotAvailable",
      { mode: "boolean" }
    ),
    sugarContent: int("sugarContent"),
    sugarContentGramPer100ml: real("sugarContentGramPer100ml"),
    seal: text("seal", { mode: "json" }).$type<{ seal: string[] }>(),
    vintage: text("vintage"),
    grapes: text("grapes", { mode: "json" }).$type<{ grapes: string[] }>(),
    otherSelections: text("otherSelections"),
    tasteClocks: text("tasteClocks", { mode: "json" }).$type<{
      tasteClocks: TasteClock[];
    }>(),
    color: text("color"),
    dishPoints: text("dishPoints"),
    apk: real("apk"),
    scrapedAt: integer("scrapedAt", { mode: "timestamp" }),
  },
  (table) => {
    return {
      unique_productId_for_date: unique().on(table.productId, table.scrapedAt),
    };
  }
);

export type ProductInsert = Omit<typeof products.$inferSelect, "dbId">;
export type Metadata = typeof metadata.$inferSelect;
