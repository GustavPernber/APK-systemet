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
    const [page, setPage] = useState<number>(1)

    const filters: ProductsFilterOptions = useMemo(()=>{
        return{
            sortBy: sortBy
        }
    }, [sortBy])


    useEffect(()=>{
        setPage(1)
        setIsLoading(true)
        const getProducts = async () =>{
            const res = await api.getProducts(filters, 1)
            setProducts(res.data)
            setIsLoading(false)
        }
        getProducts()
    }, [filters])

    const fetchMore = async () => {
        setIsLoading(true)
        const newPage = page + 1
        setPage(newPage)
        const res = await api.getProducts(filters, newPage)
        const newProducts = [...products, ...res.data]
        setProducts(newProducts)
        setIsLoading(false)
    }

    return(
        <main className=" px-3">
            <ProductOptions
                sortBy={sortBy}
                setSortBy={setSortBy}

                isCompactProducts={isCompactProducts}
                setIsCompactProducts={setIsCompactProducts}
            />

            <ProductList 
            isCompactProducts={isCompactProducts}
            products={products}
            isLoading={isLoading}
            fetchMore={fetchMore}
            />
            
        </main>
    )
}

export default ProductsController