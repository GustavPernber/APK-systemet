import {MainHandlerResponse} from './utils/types'
import mongoose from 'mongoose'


const main = async (event, context): Promise<MainHandlerResponse> => {
    await mongoose.connect(process.env.MONGODB_READ_PATH_DEV as string)
    const metadata =[...await mongoose.connection.db.collection("metadata").find({}).toArray()][0]
    return {
        body: metadata
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