import { Metadata, ProductsFilterOptions, ProductTypeResponse } from '@/utils/types'
import mockRes from './productsMock.json'

const base_url = '.netlify/functions/'


async function getProducts(filters: ProductsFilterOptions = {} as ProductsFilterOptions, page: number = 1): Promise<ProductTypeResponse> {

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

async function getMetadata(): Promise<Metadata>{
    let response = await fetch(`${base_url}get_metadata`,{
        method: "GET",
        headers:{
            'Content-Type': 'application/json'
        },
    })

    const metadata = await response.json()
    return metadata
}

const api={
    getMetadata,
    getProducts
}

export default api