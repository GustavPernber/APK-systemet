import { ProductType } from "@/utils/types"
import Product from "./Product"
import SkeletonProductList from '@/components/Products/Products/SkeletonProductList'
import { MouseEventHandler, useContext } from "react"
import { ProductContext } from "../ProductsController"

const ProductList = () => {

    const { products, isLoading, fetchMore } = useContext(ProductContext)

    const LoadMoreButton = ({fetchMore}:{fetchMore:Function} ) => {
        return(
            <button onClick={fetchMore as MouseEventHandler}
            className=" bg-green-400 rounded-full w-40 h-12 font-sans font-bold text-white">
                Visa fler
            </button>
        )
    }

    return(
        <div className=" flex flex-col justify-start items-center">
            <div className=" w-full gap-5 pb-10   grid-flow-row grid  md:grid-cols-2  md:col-start-2 " >
                <SkeletonProductList/>
                

                {isLoading && (<SkeletonProductList/>)} 
                {products.map((product)=>{
                    return (
                    <Product product={product} key={product.productId}></Product>
                    ) 
                })}
        
            </div>
            <LoadMoreButton fetchMore={fetchMore}/>
        </div>
    )
}

export default ProductList