import {Handler } from '@netlify/functions'
import mongoose from 'mongoose'
import Product from './utils/models/Product'
// const Product=require('../../models/Product')

const handler: Handler = async (event, context) =>{

    mongoose.connect("mongodb+srv://Gustav:PFVtT9SViE05XdB6@cluster0.xno6l.mongodb.net/system-bolaget?retryWrites=true&w=majority")
    let products= await Product.find().limit(30).sort({"apk" : -1})

    return {
        statusCode: 200,
        body: JSON.stringify(products)
    }
}

export {handler}