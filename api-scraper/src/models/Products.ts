import mongoose from "mongoose";
import {Product, Image, TasteClock} from '../utils/types'

const ImageSchema = new mongoose.Schema<Image>({
    imageUrl: {
        type: String,
        required: true
    },
    fileType: {
        required: false,
    },
    size: {
        required: false,
    }
})

const TasteClockSchema = new mongoose.Schema<TasteClock>({
    key: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
})

const ProductSchema = new mongoose.Schema<Product>({
//   productId: {type: Number, required: true, unique: true},
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
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  productNumberShort: {
    type: String,
    required: true,
  },
  producerName: {
    type: String,
    required: true,
  },
  supplierName: {
    type: String,
    required: true,
  },
  isKosher: {
    type: Boolean,
    required: true,
  },
  bottleText: {
    type: String,
    required: true,
  },
  restrictedParcelQuantity: {
    type: Number,
    required: true,
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
  isEthical:{
    type: Boolean,
    required: false,
 
  },
  ethicalLabel: {
    type: String,
    required: true,
 
  },
  isWebLaunch: {
    type: Boolean,
    required: true,
 
  },
  productLaunchDate: {
    type: Date,
    required: true,
 
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
    required: true,
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
    required: true,
  },
  categoryLevel4:{
    type: String,
    required: false,
  },
  customCategoryTitle: {
    type: String,
    required: true,
  },
  assortmentText:{
    type: String,
    required: true,
  },
  usage:
  {
    type: String,
    required: true,
  },
  taste:
  {
    type: String,
    required: true,
  },
  tasteSymbols:{
    type: [String],
    required: true,
  },
  tasteClockGroupBitter: {
    type: String,
    required: false,
  },
  tasteClockGroupSmokiness: {
    type: String,
    required: false,
  },
  tasteClockBitter:{
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
  tasteClockSweetness:{
    type: Number,
    required: true,
  },
  tasteClockSmokiness:{
    type: Number,
    required: true,
  },
  tasteClockCasque: {
    type: Number,
    required: true,
  },
  assortment:{
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
    required: true,
  },
  isNews: {
    type: Boolean,
    required: true,
  },
  images: {
    type: [ImageSchema],
    required: true
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
    required: true,
  },
  sugarContentGramPer100ml: {
    type: Number,
    required: true,
  },
  seal: {
    type: [String],
    required: true,
  },
  vintage: {
    type: String,
    required: true,
  },
  grapes:{
    type: [String],
    required: true,
  },
  otherSelections: {
    type: String,
    required: false,
  },
  tasteClocks: {
    type: [TasteClockSchema],
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  dishPoints: {
    type: String,
    required: false,
  },
});

const OLDProductSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
    unique: true,
  },
  productNumber: {
    type: Number,
    required: true,
  },
  nameBold: {
    type: String,
    required: true,
  },
  nameThin: {
    type: String,
    required: false,
  },
  vintage: {
    type: String,
    required: false,
  },
  cat1: {
    type: String,
    required: false,
  },
  cat2: {
    type: String,
    required: false,
  },
  cat3: {
    type: String,
    required: false,
  },
  cat4: {
    type: String,
    required: false,
  },
  usage: {
    type: String,
    required: false,
  },
  taste: {
    type: String,
    required: false,
  },
  tasteClocks: {
    type: Array,
  },
  volume: {
    type: Number,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  alcPercentage: {
    type: Number,
    required: false,
  },
  assortmentText: {
    type: String,
    required: false,
  },
  apk: {
    type: Number,
    required: false,
  },
  bpk: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
