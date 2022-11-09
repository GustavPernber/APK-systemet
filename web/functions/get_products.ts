import {MainHandlerResponse} from './utils/types'
import mongoose from 'mongoose'
import Joi, { valid } from 'joi'
import { SortOrder } from 'mongoose'
import {ProductModel } from './utils/models/Products'


const validateRequest = async (filters, page) => {

    const metadata =[...await mongoose.connection.db.collection("metadata").find({}).toArray()][0]
    const allCat1Names: string[] = metadata.categories.cat1.map((element: {value: string}) => element.value)

    const schemas = {
        pageSchema: Joi.number().min(1).failover(1).required(),
        filterSchema: Joi.object().required().keys({
            sortBy: Joi.string().required().valid('apk', 'alc_desc', 'price_asc').failover('apk'),
            cat1: Joi.string().required().valid(...allCat1Names).failover('all'),
            cat2: Joi.array().items(Joi.string()).required().failover([]),
            showOrderStock: Joi.boolean().required().failover(true)
        })
    }

    const validFilters = schemas.filterSchema.validate(filters).value
    const validPage = schemas.pageSchema.validate(page).value

    let sortBy: {[key: string] : SortOrder}| undefined = undefined;
    switch (validFilters.sortBy) {
        case 'apk':
            sortBy = { 'apk' : -1}
            break;
        case 'alc_desc':
            sortBy = { 'alcoholPercentage' : -1}
            break
        case 'price_asc':
            sortBy = { 'price' : 1}
            break
    }

    return {
        page: validPage, 
        categoryLevel1: validFilters.cat1 !== "all" ? {categoryLevel1: decodeURIComponent(validFilters.cat1) } : null,
        categoryLevel2: validFilters.cat2.length > 0 ? {$or: validFilters.cat2.map((category: string[]) => {return {categoryLevel2: category}})} : null,
        showOrderStock: validFilters.showOrderStock === false ? {assortmentText: {$ne: "Ordervaror"}} : null,
        sortBy
    }
}

const main = async (event, context): Promise<MainHandlerResponse> => {
    const PAGINATION_LIMIT = 30
    await mongoose.connect(process.env.MONGODB_READ_PATH || process.env.MONGODB_READ_PATH_DEV as string)
   
    let requestBody: any
    try {
        requestBody = JSON.parse(event.body)
    } catch (error) {
        requestBody = null
    }

    
    const validRequest = await validateRequest(requestBody?.filters ? requestBody?.filters : {}, requestBody?.page )

    const paginationOffset = PAGINATION_LIMIT * validRequest.page - PAGINATION_LIMIT
    console.log(validRequest.categoryLevel2);
    
    const result = await ProductModel.find({
        ...validRequest.categoryLevel1, 
        ...validRequest.categoryLevel2,
        ...validRequest.showOrderStock
    }).sort(validRequest.sortBy).skip(paginationOffset).limit(PAGINATION_LIMIT)
    return {
        body: {data: result}
    }

}

const handler = async (event, context) => {
    try {
        const response: MainHandlerResponse = await main(event, context)

        return {
            statusCode: response?.statusCode || 200,
            body: JSON.stringify(response.body)
        }
    } catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            body: JSON.stringify({message:"Internal server error. See logs or contact site owner."})
        }
    }
}

export {handler}