import Product from "./Product"
import SkeletonProductList from '@/components/Products/Products/SkeletonProductList'
import { MouseEventHandler, useContext, useEffect, useMemo, useState } from "react"
import { ProductContext } from "../ProductsController"
import { AppContext } from "@/components/Body"
import debounce  from "lodash.debounce"


const ProductList = () => {
    const { loadingOnTop } = useContext(AppContext)
    const { products, isLoading, fetchMore } = useContext(ProductContext)

    const [isLoadingProper, setIsLoadingProper] = useState<boolean>(true)

    const LoadMoreButton = ({fetchMore}: {fetchMore:Function} ) => {
        return(
            <button onClick={fetchMore as MouseEventHandler}
            className=" bg-green-400 rounded-full w-40 h-12 font-sans font-bold text-white">
                Visa fler
            </button>
        )
    }

    const productElements = useMemo(() => {
       
        const list = products.map((product)=>{
            return (
                <Product product={product} key={product.productId}></Product>
            ) 
        })

        return list

    }, [products])

    useEffect(() => {
        // The following ugly stuff is needed as the products take a while to render. If we unmount the loading list before that it looks ugly.
        debounce(() => {
             if (isLoading) {
            setIsLoadingProper(true)
            }else {
                setTimeout(() => {
                    setIsLoadingProper(false)
                }, 300) 
            }
        }, 300)
    }, [isLoading, products])

    return(
        <div className=" flex flex-col justify-start items-center flex-auto ">
            <div className=" w-full gap-5 pb-10   grid-flow-row grid  md:grid-cols-2  md:col-start-2 " >
                
                {((isLoadingProper || isLoading ) && loadingOnTop) && (<SkeletonProductList/>)} 
                {productElements}
                {((isLoadingProper || isLoading ) && !loadingOnTop) && (<SkeletonProductList/>)} 

            </div>
            <LoadMoreButton fetchMore={fetchMore}/>
        </div>
    )
}

export default ProductList