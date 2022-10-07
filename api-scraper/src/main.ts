import categoriesData from './categories.json'
import config from './config.json'
import https from 'https'
import {Product} from './utils/types'
import mongoose from 'mongoose';
import {ProductModel} from './models/Products'

import * as dotenv from 'dotenv'
import axios from 'axios'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../../.env') }) // Points to env in dev env

async function main(){

    console.log('Connecting to database...')
    try {
        await mongoose.connect(process.env.MONGODB_WRITE_PATH_DEV as string)
    } catch (error) {
        console.error("Failed to connect to db.");
        console.log(error);
        throw new Error();
    }
    console.log("Connected!")

    async function fetchNewProducts(){
    
        const categories = categoriesData
        const writeToDbPromises: Promise<void>[] = []
        const consoleFetchStatus: any = {}
    
        function addToDb(product: Product, firstCategory: string, secondCategory: string) {
            return new Promise<void>(async (resolve, reject) => {
                const apk = (product.alcoholPercentage * 0.01 * product.volume) / product.price;
                try {
                    const data = new ProductModel({...product, apk: apk})
                    await data.save()
                    consoleFetchStatus[`${firstCategory}`][`${secondCategory}`] += 1
                } catch (error: any) {
                    if (error.code === 11000) {
                        console.log("DUPLICATE DETECTED:", product.productNameBold, product.productNumber);
                        resolve()
                    }else{
                        reject(error)
                    }

                }
                resolve()
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
                        throw new Error();
                    }
    
                    try {
                        response.data.products.forEach((product: Product) => {
                            writeToDbPromises.push(addToDb(product, firstCategory.name, secondCategory.name))
                        });
                    } catch (error) {
                        console.error("Could not write product to DB")
                        console.log(error);
                        throw new Error()
                    }
                    
                    if (response.data.products < 1) {
                        maxPages = true
                    }
      
                }
    
            }
        }
        await Promise.all(writeToDbPromises)
        return "Succes"
    
    }

    async function transferCollections(){
        const db = mongoose.connection.db
        console.log("Dropping old collection...");
        try {
            
            await db.dropCollection('products')
            
            await db.collection('products-tmp').rename("products")
        } catch (error) {
            console.log("Failed to drop and rename collection");
            console.log(error);
            throw new Error()
        }
        return
    } 
    
    try {
        await fetchNewProducts()
        await transferCollections()
    } catch (error) {
        return
    }
    console.log('UPDATE COMPLETED');
    return

}

main()