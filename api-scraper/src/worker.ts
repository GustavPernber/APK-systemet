import config from "./config.json";
import https from "https";
import { Product } from "./utils/types";
import axios from "axios";

export default async function handleSecondCategory(cat1:any, cat2: any){


    let maxPages = false;
    let allProducts: Product[] = []

    // ALL PAGES
    for (let i = 1; !maxPages; i++) {

        let response = await axios({
        method: "get",
        url: `${
            config.systembolaget_api_url
        }page=${i}&categoryLevel1=${encodeURIComponent(
            cat1.value
        )}&categoryLevel2=${encodeURIComponent(cat2.value)}`,
        headers: {
            ...config.headers,
        },
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
        });

        allProducts = [...allProducts, ...response.data.products]
        
        if (response.data.products < 1) {
            maxPages = true;
        }

    }

    const products = new Set()
    const filteredProducts = allProducts.filter(product => {
        const duplicate = products.has(product.productId);
        products.add(product.productId);
        return !duplicate;
    })
    
    return filteredProducts
    
}

