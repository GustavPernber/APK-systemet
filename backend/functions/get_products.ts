import {Handler } from '@netlify/functions'
import mongoose from 'mongoose'
import Product from './utils/models/Product'
// const Product=require('../../models/Product')

const handler: Handler = async (event, context) =>{

    mongoose.connect(process.env.MONGODB_PATH as string)
    let products= await Product.find().limit(30).sort({"apk" : -1})

    return {
        statusCode: 200,
        body: JSON.stringify(products)
    }
}

export {handler}