import { Schema, model } from "mongoose";
import { Product, Image, TasteClock } from "../utils/types";

const ImageSchema = new Schema<Image>({
  imageUrl: {
    type: String,
    required: true,
  },
  fileType: {
    required: false,
  },
  size: {
    required: false,
  },
});

const TasteClockSchema = new Schema<TasteClock>({
  key: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const ProductSchema = new Schema<Product>(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
    },
    productNumber: {
      type: String,
      required: true,
    },
    productNameBold: {
      type: String,
      required: true,
    },
    productNameThin: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    productNumberShort: {
      type: String,
      required: false,
    },
    producerName: {
      type: String,
      required: false,
    },
    supplierName: {
      type: String,
      required: false,
    },
    isKosher: {
      type: Boolean,
      required: true,
    },
    bottleText: {
      type: String,
      required: false,
    },
    restrictedParcelQuantity: {
      type: Number,
      required: false,
    },
    isOrganic: {
      type: Boolean,
      required: true,
    },
    isSustainableChoice: {
      type: Boolean,
      required: true,
    },
    isClimateSmartPackaging: {
      type: Boolean,
      required: true,
    },
    isEthical: {
      type: Boolean,
      required: false,
    },
    ethicalLabel: {
      type: String,
      required: false,
    },
    isWebLaunch: {
      type: Boolean,
      required: true,
    },
    productLaunchDate: {
      type: Date,
      required: false,
    },
    isCompletelyOutOfStock: {
      type: Boolean,
      required: true,
    },
    isTemporaryOutOfStock: {
      type: Boolean,
      required: true,
    },
    alcoholPercentage: {
      type: Number,
      required: true,
    },
    volumeText: {
      type: String,
      required: true,
    },
    volume: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    originLevel1: {
      type: String,
      required: false,
    },
    originLevel2: {
      type: String,
      required: false,
    },
    categoryLevel1: {
      type: String,
      required: true,
    },
    categoryLevel2: {
      type: String,
      required: true,
    },
    categoryLevel3: {
      type: String,
      required: false,
    },
    categoryLevel4: {
      type: String,
      required: false,
    },
    customCategoryTitle: {
      type: String,
      required: false,
    },
    assortmentText: {
      type: String,
      required: true,
    },
    usage: {
      type: String,
      required: false,
    },
    taste: {
      type: String,
      required: false,
    },
    tasteSymbols: {
      type: [String],
      required: false,
    },
    tasteClockGroupBitter: {
      type: String,
      required: false,
    },
    tasteClockGroupSmokiness: {
      type: String,
      required: false,
    },
    tasteClockBitter: {
      type: Number,
      required: true,
    },
    tasteClockFruitacid: {
      type: Number,
      required: true,
    },
    tasteClockBody: {
      type: Number,
      required: true,
    },
    tasteClockRoughness: {
      type: Number,
      required: true,
    },
    tasteClockSweetness: {
      type: Number,
      required: true,
    },
    tasteClockSmokiness: {
      type: Number,
      required: true,
    },
    tasteClockCasque: {
      type: Number,
      required: true,
    },
    assortment: {
      type: String,
      required: true,
    },
    recycleFee: {
      type: Number,
      required: true,
    },
    isManufacturingCountry: {
      type: Boolean,
      required: true,
    },
    isRegionalRestricted: {
      type: Boolean,
      required: true,
    },
    packagingLevel1: {
      type: String,
      required: false,
    },
    isNews: {
      type: Boolean,
      required: true,
    },
    images: {
      type: [ImageSchema],
      required: false,
    },

    isDiscontinued: {
      type: Boolean,
      required: true,
    },
    isSupplierTemporaryNotAvailable: {
      type: Boolean,
      required: true,
    },
    sugarContent: {
      type: Number,
      required: false,
    },
    sugarContentGramPer100ml: {
      type: Number,
      required: false,
    },
    seal: {
      type: [String],
      required: false,
    },
    vintage: {
      type: String,
      required: false,
    },
    grapes: {
      type: [String],
      required: false,
    },
    otherSelections: {
      type: String,
      required: false,
    },
    tasteClocks: {
      type: [TasteClockSchema],
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
    dishPoints: {
      type: String,
      required: false,
    },
    apk: {
      type: Number,
      required: true,
    },
  },
  { collection: "products-tmp" },
);

export const ProductModel = model("Product", ProductSchema);
