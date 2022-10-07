import categoriesData from './categories.json'
import config from './config.json'
import https from 'https'

import * as dotenv from 'dotenv'
import axios from 'axios'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../../.env') })


async function main(){


    const categories = categoriesData

    for (const firstCategory of categories.cat1) {
        for (const secondCategory of firstCategory.cat2) {
            let maxPages = false
            for (let i = 1; i<10; i++) {
                console.log('fetching...');
                let response = await axios({
                    method: "get",
                    // url: `${config.systembolaget_api_url}categoryLevel1=${firstCategory.url}&categoryLevel2=${secondCategory.url}&page=${i}`,
                    url:"https://www.systembolaget.se/api/gateway/productsearch/search/?page=1&size=30&sortBy=Score&sortDirection=Ascending&categoryLevel1=Vin",
                    headers: {
                        // ...config.headers
                        baseurl:"https://api-extern.systembolaget.se/sb-api-ecommerce/v1"
                    },
                    httpsAgent: new https.Agent({
                        rejectUnauthorized: false
                      })

                })
                console.log(response);
                
                
            }

        }
    }

    // Loopa igenom alla level1
        // Loopa igenom alla level 2
            // Fetcha products från en page tills results kommer tillbaka med en tom page
                // Lägg produkterna från en page i DB
}

main()