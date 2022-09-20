import ProductList from "./products/ProductList"
import api from '@/api'
import { useEffect, useMemo, useState } from "react"
import ProductOptions from "./productOptions/ProductOptions"
import { ProductsFilterOptions, SortByOptions, ProductType } from "@/utils/types"
import SkeletonProductList from "./products/SkeletonProductList"

const ProductsController = () =>{

    const [products, setProducts] = useState<ProductType[]>([])
    const [sortBy, setSortBy] = useState<SortByOptions>("apk")
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isCompactProducts, setIsCompactProducts] = useState<boolean>(false)

    const filters: ProductsFilterOptions = useMemo(()=>{
        return{
            sortBy: sortBy
        }
    }, [sortBy])


    useEffect(()=>{
        const getProducts = async () =>{
            setIsLoading(true)
            const res = await api.getProducts(filters)
            setProducts(res.data)
            setIsLoading(false)
        }
        getProducts()
    }, [filters])


    return(
        <main className=" px-3">
            <ProductOptions
                sortBy={sortBy}
                setSortBy={setSortBy}

                isCompactProducts={isCompactProducts}
                setIsCompactProducts={setIsCompactProducts}
            />

            {isLoading ? 
            <SkeletonProductList/>
            :
            <ProductList 
            isCompactProducts={isCompactProducts}
            products={products}/>}
        </main>
    )
}

export default ProductsController