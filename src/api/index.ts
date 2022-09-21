import { ProductsFilterOptions, ProductTypeResponse } from '@/utils/types'
import mockRes from './productsMock.json'

const base_url = '.netlify/functions/'

// async function customFetch(functionName: string){
//     const response = await fetch()
//     const result = await response.json()
//     return result
// }


async function getProducts(filters: ProductsFilterOptions = {}, page: number = 1): Promise<ProductTypeResponse> {

    let response = await fetch(`${base_url}get_products`,{
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({filters: filters, page: page}) 
    })

    let products = await response.json()
    return products
}

const api={
    getProducts
}

export default api