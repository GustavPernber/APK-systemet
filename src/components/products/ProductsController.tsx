import ProductList from "./Products/ProductList"
import api from '@/api'
import { createContext, useCallback, useEffect, useMemo, useState } from "react"
import ProductOptions from "./Options/ProductOptions"
import { ProductsFilterOptions, SortByOptions, ProductType, Category, Categories } from "@/utils/types"
import categoriesData from '@/utils/categories.json'


type ProductContextType = {
    fetchMore: Function
    sortBy: SortByOptions
    setSortBy: Function
    isCompactProducts: boolean,
    setIsCompactProducts: Function,
    products: ProductType[]
    isLoading: boolean,
    showFilters: boolean,
    toggleShowFilters: Function
    cat1: Category,
    setCat1: Function
    categories: Categories
}

export const ProductContext = createContext<ProductContextType>({} as ProductContextType)

const ProductsController = () =>{

    const [products, setProducts] = useState<ProductType[]>([])
    const [sortBy, setSortBy] = useState<SortByOptions>("apk")
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isCompactProducts, setIsCompactProducts] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [showFilters, setShowFilters] = useState<boolean>(false)

    const [cat1, setCat1] = useState<Category>({url:"all", name: "Visa alla"})

    const categories: Categories = useMemo(() => categoriesData, [])

    const filters: ProductsFilterOptions = useMemo(()=>{
        return{
            cat1: cat1.name,
            sortBy: sortBy
        }
    }, [sortBy, cat1])

    const toggleShowFilters = useCallback(() => setShowFilters(!showFilters), [showFilters])
    
    const fetchMore = useCallback(async () => {
        setIsLoading(true)
        const newPage = page + 1
        setPage(newPage)
        const res = await api.getProducts(filters, newPage)
        const newProducts = [...products, ...res.data]
        setProducts(newProducts)
        setIsLoading(false)
    }, []) 
    
    useEffect(()=>{
        setPage(1)
        setIsLoading(true)
        setShowFilters(false)
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
        isLoading,
        showFilters,
        toggleShowFilters,
        cat1,
        setCat1,
        categories
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