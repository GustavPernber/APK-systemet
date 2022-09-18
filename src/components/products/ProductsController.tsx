import ProductList from "./products/ProductList"
import api from '@/api'
import { useEffect, useState } from "react"
import { ProductType } from "@/api/types"
import ProductOptions from "./productOptions/ProductOptions"
import { ProductsFilterOptions, SortByOptions } from "@/utils/types"


const ProductsController = () =>{

    const [products, setProducts] = useState<ProductType[]>([])
    const [sortBy, setSortBy] = useState<SortByOptions>("apk")
    
    useEffect(()=>{
        const getProducts = async () =>{
            const res = await api.getProducts()
            setProducts(res)
        }
        getProducts()
    }, [])


    useEffect(()=>{
        const options: ProductsFilterOptions= {
            sort: sortBy
        }
    }, [sortBy])

    return(
        <main className=" px-3">
            <ProductOptions
                sortBy={sortBy}
                setSortBy={setSortBy}
            />
            <ProductList products={products}/>
        </main>
    )
}

export default ProductsController