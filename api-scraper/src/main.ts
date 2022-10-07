import categoriesData from './categories.json'
import config from './config.json'
import https from 'https'
import sleep from 'sleep-promise';
import {Product} from './utils/types'

import * as dotenv from 'dotenv'
import axios from 'axios'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../../.env') })


async function main(){

    const categories = categoriesData
    const writeToDbPromises: any[] = []
    const consoleFetchStatus: any = {}

    function addToDb(product: Product) {
        return Promise.resolve(product)
    }

    for (const firstCategory of categories.cat1) {
        consoleFetchStatus[`${firstCategory.name}`] = {}
        for (const secondCategory of firstCategory.cat2) {
            consoleFetchStatus[`${firstCategory.name}`][`${secondCategory.name}`] = "lol"
            let maxPages = false
            for (let i = 1; !maxPages; i++) {
                console.log(consoleFetchStatus)

                try {
                    const response = await axios({
                        method:"get",
                        url: `${config.systembolaget_api_url}page=${i}&categoryLevel1=${firstCategory.url}&categoryLevel2=${secondCategory.url}`,
                        headers: {
                            ...config.headers
                        },
                        httpsAgent: new https.Agent({
                            rejectUnauthorized: false
                        })
                    })
                    if (response.data.products < 1) {
                        maxPages = true
                    }

                    response.data.products.forEach((product: Product) => {
                        writeToDbPromises.push(addToDb(product))
                    });
                } catch (error) {
                    maxPages = true
                    console.log(error);
                    throw new Error()
                }
                
  
            }

        }
    }

    return Promise.all(writeToDbPromises)


    // Loopa igenom alla level1
        // Loopa igenom alla level 2
            // Fetcha products från en page tills results kommer tillbaka med en tom page
                // Lägg produkterna från en page i DB
}

main()