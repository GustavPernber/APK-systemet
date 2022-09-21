import { ProductType } from "@/utils/types"
import Product from "./Product"
import SkeletonProductList from '@/components/products/products/SkeletonProductList'
import { MouseEventHandler } from "react"

type ProductListProps = {
    products:ProductType[]
    isCompactProducts: boolean
    isLoading: boolean
    fetchMore: () => void

}

const ProductList = ({isCompactProducts, products, isLoading, fetchMore}: ProductListProps) => {

    const LoadMoreButton = ({fetchMore}:{fetchMore:Function} ) => {
        return(
            <button onClick={fetchMore as MouseEventHandler}
            className=" bg-green-400 rounded-full  w-40 h-12 font-sans font-bold text-white">
                Visa fler
            </button>
        )
    }

    return(
        <div className=" w-full flex flex-col justify-center items-center gap-5 pb-10" >
            {products.map((product)=>{
                return (
                   <Product product={product} isCompact={isCompactProducts} key={product.productId}></Product>
                ) 
            })} 

            {isLoading && (<SkeletonProductList/>)}

            <LoadMoreButton fetchMore={fetchMore}/>
        </div>
    )
}

export default ProductList