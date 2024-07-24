export interface Image {
    imageUrl: string;
    fileType?: any;
    size?: any;
}

export interface TasteClock {
    key: string;
    value: number;
}

export type Cat1 = {
    value: string,
    friendlyUrl: string,
    cat2: any[]
}

export type Categories = {
    cat1: Cat1[]
}

export interface Product {
    productId: string;
    productNumber: string;
    productNameBold: string;
    productNameThin: string;
    category?: any;
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
    ethicalLabel?: any;
    isWebLaunch: boolean;
    productLaunchDate: Date;
    isCompletelyOutOfStock: boolean;
    isTemporaryOutOfStock: boolean;
    alcoholPercentage: number;
    volumeText: string;
    volume: number;
    price: number;
    country: string;
    originLevel1: string;
    originLevel2?: any;
    categoryLevel1: string;
    categoryLevel2: string;
    categoryLevel3: string;
    categoryLevel4?: any;
    customCategoryTitle: string;
    assortmentText: string;
    usage: string;
    taste: string;
    tasteSymbols: string[];
    tasteClockGroupBitter?: any;
    tasteClockGroupSmokiness?: any;
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
    vintage: string;
    grapes: string[];
    otherSelections?: any;
    tasteClocks: TasteClock[];
    color: string;
    dishPoints?: any;
    apk: number
}

