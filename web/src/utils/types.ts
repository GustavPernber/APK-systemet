export type SortByOptions = "apk" | "price_asc" | "alc_desc" 

export type Category = {
    url: string
    name: string
}

export type Categories = {
    cat1: Category[]
}


export type ProductsFilterOptions = {
    sortBy:SortByOptions
    cat1: Category["url"]
    showOrderStock:boolean
}

export type ProductType = {
    _id: string;
    productId: number;
    productNumber: number;
    nameBold: string;
    nameThin: string;
    vintage: null;
    cat1: string;
    cat2: string;
    cat3: string;
    cat4: string | null;
    usage: string;
    taste: string;
    tasteClocks: {key: string, value: number}[],
    volume: number,
    price: number,
    alcPercentage: number,
    assortmentText: string,
    apk: number,
    bpk: number
}

export type ProductTypeResponse = {
    data : ProductType[]
    req: any
}