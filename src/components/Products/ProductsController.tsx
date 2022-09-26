import ProductList from './Products/ProductList'
import api from '@/api'
import { createContext, useCallback, useEffect, useMemo, useState } from "react"
import ProductOptions from './ProductOptions/ProductOptions'
import { ProductsFilterOptions, SortByOptions, ProductType, Category, Categories } from "@/utils/types"
import categoriesData from '@/utils/categories.json'
import Filters from './ProductOptions/Filters/Filters'


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
    showOrderStock: boolean
    setShowOrderStock: Function
}

export const ProductContext = createContext<ProductContextType>({} as ProductContextType)

const ProductsController = () =>{

    const [products, setProducts] = useState<ProductType[]>([])
    const [sortBy, setSortBy] = useState<SortByOptions>("apk")
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isCompactProducts, setIsCompactProducts] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [showFilters, setShowFilters] = useState<boolean>(false)

    const [showOrderStock, setShowOrderStock] = useState<boolean>(true)
    const [cat1, setCat1] = useState<Category>({url:"all", name: "Visa alla"})

    const categories: Categories = useMemo(() => categoriesData, [])

    const filters: ProductsFilterOptions = useMemo(()=>{
        return{
            showOrderStock: showOrderStock,
            cat1: cat1.name,
            sortBy: sortBy
        }
    }, [sortBy, cat1, showOrderStock])

    const toggleShowFilters = useCallback(() => setShowFilters(!showFilters), [showFilters])
    
    const fetchMore = useCallback(async () => {
        setIsLoading(true)
        const newPage = page + 1
        setPage(newPage)
        const res = await api.getProducts(filters, newPage)
        const newProducts = [...products, ...res.data]
        setProducts(newProducts)
        setIsLoading(false)
    }, [page, filters, products]) 
    
    //States verkar batchas ihop. Se till att isloading körs först
    useEffect(()=>{
        setIsLoading(true)
        setPage(1)
        setShowFilters(false)
        const getProducts = async () =>{
            const res = await api.getProducts(filters, 1)
            setProducts(res.data)
            setIsLoading(false)
        }
        getProducts()
    }, [filters])


    const productContextValues: ProductContextType = {
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
        categories,
        showOrderStock,
        setShowOrderStock
    }

    return(
        <ProductContext.Provider value={productContextValues}>
            <div className=' md:w-full grid place-items-center md:border-t-[1px] md:border-t-gray-300 pb-[rem]'>
                <main className=" 
                
                px-3 md:px-8 lg:w-auto lg:grid  lg:grid-flow-row  lg:grid-cols-productsController md:pt-4 lg:gap-x-6 ">
                    <Filters/>
                    <section className=' flex flex-col justify-center md:max-w-screen lg:max-w-[55rem] md:w-full'>
                        <ProductOptions/>
                        <ProductList/>   
                    </section>
                </main>
            </div>

        </ProductContext.Provider>
    )
}

export default ProductsController