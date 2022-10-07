import categoriesData from './categories.json'
import config from './config.json'
import https from 'https'
import {Product} from './utils/types'
import {connect} from 'mongoose';
import {ProductModel} from './models/Products'

import * as dotenv from 'dotenv'
import axios from 'axios'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

async function main(){

    const categories = categoriesData
    const writeToDbPromises: any[] = []
    const consoleFetchStatus: any = {}
    try {
        await connect(process.env.MONGODB_WRITE_PATH_DEV as string)
    } catch (error) {
        console.error("Failed to connect to db");
        console.log(error);
        return
    }

    function addToDb(product: Product, firstCategory: string, secondCategory: string) {
        return new Promise(async (resolve, reject) => {
            const apk = (product.alcoholPercentage * 0.01 * product.volume) / product.price;
            try {
                const data = new ProductModel({...product, apk: apk})
                await data.save()
            } catch (error: any) {
                if (error.code === 11000) {
                    console.log("DUPLICATE DETECTED:", product.productNameBold, product.productNumber);
                    resolve("No duplicate")
                }
                reject(error)
            }
            consoleFetchStatus[`${firstCategory}`][`${secondCategory}`] += 1
            resolve("Resolved one product")
        })
    }

    for (const firstCategory of categories.cat1) {
        consoleFetchStatus[`${firstCategory.name}`] = {}
        for (const secondCategory of firstCategory.cat2) {
            consoleFetchStatus[`${firstCategory.name}`][`${secondCategory.name}`] = 0
            let maxPages = false
            for (let i = 1; !maxPages; i++) {
                console.log(consoleFetchStatus)

                let response
                try {
                    response = await axios({
                        method:"get",
                        url: `${config.systembolaget_api_url}page=${i}&categoryLevel1=${firstCategory.url}&categoryLevel2=${secondCategory.url}`,
                        headers: {
                            ...config.headers
                        },
                        httpsAgent: new https.Agent({
                            rejectUnauthorized: false
                        })
                    })
                    
                } catch (error) {
                    console.error("Failed to fetch from API");
                    console.log(error);
                    return
                }

                try {
                    response.data.products.forEach((product: Product) => {
                        writeToDbPromises.push(addToDb(product, firstCategory.name, secondCategory.name))
                    });
                } catch (error) {
                    console.error("Could not write product to DB")
                    console.log(error);
                    return
                }
                
                if (response.data.products < 1) {
                    maxPages = true
                }
  
            }

        }
    }
    return Promise.all(writeToDbPromises)

}

main()