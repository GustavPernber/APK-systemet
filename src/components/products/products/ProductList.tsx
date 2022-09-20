import { ProductType } from "@/utils/types"
import Product from "./Product"

type ProductListProps = {
    products:ProductType[]
}

const ProductList = (props: ProductListProps) => {

    return(
        <div className=" w-full flex flex-col justify-center items-center gap-5" >
          
            {props.products.map((product)=>{
                return (
                   <Product product={product} key={product.productId}></Product>
                ) 
            })}
            
        </div>
    )
}

export default ProductList