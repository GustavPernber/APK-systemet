import mockRes from './productsMock.json'
import {ProductType} from './types'

const base_url = '.netlify/functions/'

async function customFetch(functionName: string){
    const response = await fetch(`${base_url}${functionName}`)
    const result = await response.json()
    return result
}


async function getProducts(): Promise<ProductType[]> {

    let products = await customFetch('get_products')
    return products
}

const api={
    getProducts
}

export default api