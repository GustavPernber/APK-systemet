import {MainHandlerResponse} from './utils/types'
import mongoose from 'mongoose'
import Joi from 'joi'
import { SortOrder } from 'mongoose'
import {ProductModel } from './utils/models/Products'


const main = async (event, context): Promise<MainHandlerResponse> => {
    const PAGINATION_LIMIT = 30
    await mongoose.connect(process.env.MONGODB_READ_PATH || process.env.MONGODB_READ_PATH_DEV as string)
   
    let requestBody: any
    try {
        requestBody = JSON.parse(event.body)
    } catch (error) {
        requestBody = null
    }

    const metadata =[...await mongoose.connection.db.collection("metadata").find({}).toArray()][0]
    const allCat1Names: string[] = metadata.categories.cat1.map((element: {value: string}) => element.value)
    const schemas = {
        pageSchema: Joi.number().min(1).failover(1).required(),
        filterSchema: Joi.object().required().keys({
            sortBy: Joi.string().required().valid('apk', 'alc_desc', 'price_asc').failover('apk'),
            cat1: Joi.string().required().valid(...allCat1Names).failover('all'),
            showOrderStock: Joi.boolean().required().failover(true)
        })
    }
    const validPageRequest = schemas.pageSchema.validate(requestBody?.page).value
    const validFilters = schemas.filterSchema.validate(requestBody?.filters ? requestBody?.filters : {}).value;
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

    const paginationOffset = PAGINATION_LIMIT * validPageRequest - PAGINATION_LIMIT

    let queryParams: any = {}
    validFilters.cat1 != "all" ? queryParams.categoryLevel1 = decodeURIComponent(validFilters.cat1) : null
    validFilters.showOrderStock === false ? queryParams.assortmentText = {$ne: "Ordervaror"} : null
    const result = await ProductModel.find(queryParams).sort(sortBy).skip(paginationOffset).limit(PAGINATION_LIMIT)
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