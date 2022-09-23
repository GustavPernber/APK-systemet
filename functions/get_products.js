import mongoose from 'mongoose'
import Product from './utils/models/Product.js'
import Joi from 'joi'
import categoriesData from './utils/categories.json'

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

    const categories = categoriesData
    let allCat1Name = categories.cat1.map((cat1)=>{
        return cat1.name
    })
    allCat1Name.push('all')

    const requestBody = JSON.parse(event.body)



    const pageSchema = Joi.number().min(1).failover(1)
    const filterSchema = Joi.object().keys({
        sortBy: Joi.string().valid('apk', 'alc_desc', 'price_asc').failover('apk'),
        cat1: Joi.string().valid(...allCat1Name).failover('all')
    })

    const validPage = pageSchema.validate(requestBody.page).value
    const validFilters = filterSchema.validate(requestBody.filters).value;
    console.log(validFilters);
    let sortByObject
    switch (validFilters.sortBy) {
        case 'apk':
            sortByObject = { 'apk' : -1}
            break;
        case 'alc_desc':
            sortByObject = { 'alcPercentage' : -1}
            break
        case 'price_asc':
            sortByObject = { 'price' : 1}
            break
    }

    const productsLimit = 30
    const offset = productsLimit * validPage - productsLimit

    let productsFromDB
    try {
        if (validFilters.cat1 !== 'all') {
            productsFromDB  = await Product.find().limit(productsLimit)
            .where('cat1').equals(validFilters.cat1)
            .sort(sortByObject).skip(offset)
        }else{
            productsFromDB  = await Product.find().limit(productsLimit)
            .sort(sortByObject).skip(offset)
        }
    } catch (e) {
        console.error(e);
        return {
            statusCode: 500,
            body: JSON.stringify({error: {message: "Failed to fetch products.", error: e}})
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({data: productsFromDB})
    }
}


export {handler}