import ProductList from './Products/ProductList'
import api from '@/api'
import { createContext, useCallback, useContext, useEffect, useMemo, useState, useTransition, useRef } from "react"
import ProductOptions from './ProductOptions'
import { ProductsFilterOptions, SortByOptions, ProductType, Cat1, SelectedCat2, } from "@/utils/types"
import Filters from './Filters/Filters'
import { AppContext } from '../Body'


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
    setIsLoading: Function
}

export const ProductContext = createContext<ProductContextType>({} as ProductContextType)

const ProductsController = () =>{

    const { isLoading, setIsLoading, setLoadingOnTop, currentSearchTerm } = useContext(AppContext)

    const [isPendingTransition, startTransition] = useTransition()

    const {searchTerm} = useContext(AppContext)

    const [products, setProducts] = useState<ProductType[]>([])
 
    const [isCompactProducts, setIsCompactProducts] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [showFilters, setShowFilters] = useState<boolean>(false)

    const [sortBy, setSortBy] = useState<SortByOptions>("apk")
    const [showOrderStock, setShowOrderStock] = useState<boolean>(true)
    const [cat1, setCat1] = useState<Cat1>({value: "all"} as Cat1)
    const [cat2, setCat2] = useState<SelectedCat2>(null)

    const isMounted = useRef(false)

    const filters: ProductsFilterOptions = useMemo(()=>{
        return{
            showOrderStock: showOrderStock,
            cat1: cat1.value,
            cat2: cat2,
            sortBy: sortBy,
        }
    }, [sortBy, cat1, showOrderStock, cat2])

    useEffect(() => {
        setIsLoading(true)
        setPage(1)
        setProducts([])
    
        api.getProducts(filters, 1, searchTerm)
        .then(res => {
            setProducts(res.data)
            setIsLoading(false)
        })

    }, [filters])

    useEffect(() => {
        setCat2(null)
    }, [cat1])

    const toggleShowFilters = useCallback(() => setShowFilters(!showFilters), [showFilters])
    
    const fetchMore = useCallback(async () => {

        setIsLoading(true)
        const newPage = page + 1
        setPage(newPage)
        const res = await api.getProducts(filters, newPage, searchTerm)
        const newProducts = [...products, ...res.data]
        setProducts(newProducts)
        setIsLoading(false)

    }, [page, filters, products]) 
    

    useEffect(()=>{

        if (isMounted.current) {
            setIsLoading(true)
            setPage(1)
            setProducts([])
            api.getProducts(filters, 1, searchTerm)
            .then(res => {
                startTransition(() => {
                    if (res.searchTerm === currentSearchTerm.current) {
                        setProducts(res.data)
                        setIsLoading(false)
                        setLoadingOnTop(false)
                    }
                }) 
                
            })
        }

        isMounted.current = true
    }, [searchTerm])


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
        setCat2,
        setIsLoading
    }

    return(
        <ProductContext.Provider value={productContextValues}>
            <div className=' md:w-full grid  place-items-start min-h-screen md:border-t-[1px] md:border-t-gray-300 pb-[10rem]'>
                <main className=" 
                w-full
                px-3 md:px-8  md:pt-4 flex flex-row justify-center items-start">
                    <Filters/>
                    <section className=' flex flex-col justify-start md:max-w-screen lg:max-w-[55rem] lg:w-full lg:border-l-[1px] lg:border-gray-300 lg:pl-6 min-h-screen flex-1'>
                        <ProductOptions/>
                        <ProductList/>   
                    </section>
                </main>
            </div>

        </ProductContext.Provider>
    )
}

export default ProductsController