import ProductList from './Products/ProductList'
import api from '@/api'
import { createContext, useCallback, useEffect, useMemo, useState } from "react"
import ProductOptions from './ProductOptions'
import { ProductsFilterOptions, SortByOptions, ProductType, Cat1, SelectedCat2, } from "@/utils/types"
import Filters from './Filters/Filters'


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
    cat1: Cat1,
    setCat1: Function
    showOrderStock: boolean
    setShowOrderStock: Function
    cat2: SelectedCat2
    setCat2: Function
}

export const ProductContext = createContext<ProductContextType>({} as ProductContextType)

const ProductsController = () =>{

    const [products, setProducts] = useState<ProductType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isCompactProducts, setIsCompactProducts] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [showFilters, setShowFilters] = useState<boolean>(false)

    const [sortBy, setSortBy] = useState<SortByOptions>("apk")
    const [showOrderStock, setShowOrderStock] = useState<boolean>(true)
    const [cat1, setCat1] = useState<Cat1>({value: "all"} as Cat1)
    const [cat2, setCat2] = useState<SelectedCat2>(null)

    const filters: ProductsFilterOptions = useMemo(()=>{
        return{
            showOrderStock: showOrderStock,
            cat1: cat1.value,
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
    

    useEffect(()=>{
        setIsLoading(true)
        setPage(1)
        setProducts([])
        setShowFilters(false);
        api.getProducts(filters, 1)
        .then(res => {
            setProducts(res.data)
            setIsLoading(false)
        })
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
        showOrderStock,
        setShowOrderStock,
        cat2,
        setCat2
    }

    return(
        <ProductContext.Provider value={productContextValues}>
            <div className=' md:w-full grid  place-items-start min-h-screen md:border-t-[1px] md:border-t-gray-300 pb-[10rem]'>
                <main className=" 
                w-full
                px-3 md:px-8  md:pt-4 flex flex-row justify-center items-start">
                    <Filters/>
                    <section className=' flex flex-col justify-start md:max-w-screen lg:max-w-[55rem] lg:w-full lg:border-l-[1px] lg:border-gray-300 lg:pl-6 min-h-screen flex-auto'>
                        <ProductOptions/>
                        <ProductList/>   
                    </section>
                </main>
            </div>

        </ProductContext.Provider>
    )
}

export default ProductsController