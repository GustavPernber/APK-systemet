import mongoose from 'mongoose'
import Product from './utils/models/Product.js'
import Joi from 'joi'


const handler= async (event, context) =>{

    try {
        mongoose.connect(process.env.MONGODB_PATH)
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({error: `Couldn't connect to server: ${error}` })
        }
    }

    const requestFilters = JSON.parse(event.body).filters

    const filterSchema = Joi.object().keys({
        sortBy: Joi.string().valid('apk', 'alc_desc', 'price_asc').failover('apk')
    })

    const validFilters = filterSchema.validate(requestFilters);
    console.log(validFilters);

    let sortObject
    switch (validFilters.value.sortBy) {
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

    let productsFromDB
    try {
        productsFromDB  = await Product.find().limit(30).sort(sortObject)
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({error: error})
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({data: productsFromDB})
    }
}


export {handler}