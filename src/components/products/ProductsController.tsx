import ProductList from "./products/ProductList"
import api from '@/api'
import { createContext, useEffect, useMemo, useState } from "react"
import ProductOptions from "./productOptions/ProductOptions"
import { ProductsFilterOptions, SortByOptions, ProductType } from "@/utils/types"

type ProductContextType = {
    fetchMore: Function
    sortBy: SortByOptions
    setSortBy: Function
    isCompactProducts: boolean,
    setIsCompactProducts: Function,
    products: ProductType[]
    isLoading: boolean,
}

export const ProductContext = createContext<ProductContextType>({} as ProductContextType)

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

    const fetchMore = async () => {
        setIsLoading(true)
        const newPage = page + 1
        setPage(newPage)
        const res = await api.getProducts(filters, newPage)
        const newProducts = [...products, ...res.data]
        setProducts(newProducts)
        setIsLoading(false)
    }
    
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


    const productContextValues: ProductContextType= {
        fetchMore,
        sortBy,
        setSortBy,
        isCompactProducts,
        setIsCompactProducts,
        products,
        isLoading
    }

    return(
        <ProductContext.Provider value={productContextValues}>
            <main className=" px-3">
                <ProductOptions/>
                <ProductList/>   
            </main>
        </ProductContext.Provider>
    )
}

export default ProductsController