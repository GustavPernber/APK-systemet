import ProductList from "./products/products/ProductList"
import api from '@/api'
import { useEffect, useState } from "react"
import { ProductType } from "@/api/types"

const ProductsController = () =>{

    const [products, setProducts] = useState<ProductType[]>([])
    
    useEffect(()=>{
        const getProducts = async () =>{
            const res = await api.getProducts()
            setProducts(res)
        }
        getProducts()
    }, [])

    return(
        <main>
            <ProductList products={products}/>
        </main>
    )
}

export default ProductsController