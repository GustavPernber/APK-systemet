import {MainHandlerResponse} from './utils/types'
import { getMetadataCollection } from './utils/db'


const main = async (event, context): Promise<MainHandlerResponse> => {

    const collection = getMetadataCollection()

    const metadata = await collection.collection.find().toArray()

    collection.terminate()
    return {
        body: metadata[0]
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