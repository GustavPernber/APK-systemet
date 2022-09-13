import {Handler } from '@netlify/functions'
const mongoose=require('mongoose')
const Product=require('../models/Product')

const handler: Handler = async (event, context) =>{

    mongoose.connect("mongodb+srv://Gustav:PFVtT9SViE05XdB6@cluster0.xno6l.mongodb.net/system-bolaget?retryWrites=true&w=majority")
    let products= await Product.find().limit(30)

    return {
        statusCode: 200,
        body: JSON.stringify(products)
    }
}

export {handler}