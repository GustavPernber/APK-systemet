import ProductList from "./products/ProductList"
import api from '@/api'
import { useEffect, useMemo, useState } from "react"
import ProductOptions from "./productOptions/ProductOptions"
import { ProductsFilterOptions, SortByOptions, ProductType } from "@/utils/types"


const ProductsController = () =>{

    const [products, setProducts] = useState<ProductType[]>([])
    const [sortBy, setSortBy] = useState<SortByOptions>("apk")
    
    const filters: ProductsFilterOptions = useMemo(()=>{
        return{
            sortBy: sortBy
        }
    }, [sortBy])

    useEffect(()=>{
        const getProducts = async () =>{
            const res = await api.getProducts(filters)
            setProducts(res.data)
        }
        getProducts()
    }, [filters])


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