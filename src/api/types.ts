export type ProductType= {
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