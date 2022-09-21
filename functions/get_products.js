import mongoose from 'mongoose'
import Product from './utils/models/Product.js'
import Joi from 'joi'


const handler= async (event, context) =>{

    try {
        mongoose.connect(process.env.MONGODB_PATH)
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({error: {message: "Failed to connect to database.", error: error} })
        }
    }

    const requestBody = JSON.parse(event.body)

    const pageSchema = Joi.number().min(1).failover(1)
    const filterSchema = Joi.object().keys({
        sortBy: Joi.string().valid('apk', 'alc_desc', 'price_asc').failover('apk')
    })
    const validPage = pageSchema.validate(requestBody.page).value
    const validFilters = filterSchema.validate(requestBody.filters).value;

    let sortObject
    switch (validFilters.sortBy) {
        case 'apk':
            sortObject = { 'apk' : -1}
            break;
        case 'alc_desc':
            sortObject = { 'alcPercentage' : -1}
            break
        case 'price_asc':
            sortObject = { 'price' : 1}
            break
    }

    const productsLimit = 30
    const offset = productsLimit * validPage - productsLimit

    let productsFromDB
    try {
        productsFromDB  = await Product.find().limit(productsLimit).sort(sortObject).skip(offset)
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({error: {message: "Failed to fetch products.", error: error}})
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({data: productsFromDB})
    }
}


export {handler}