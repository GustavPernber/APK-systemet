import { SortByOptions } from "@/utils/types"
import SortViewOptions from "./SortViewOptions"

type ProductOptionsProps = {
    sortBy: SortByOptions
    setSortBy: Function
    isCompactProducts: boolean
    setIsCompactProducts: Function
}

function ProductOptions({ sortBy, setSortBy, isCompactProducts, setIsCompactProducts }: ProductOptionsProps) {
    return(
        <section>

            <SortViewOptions
                isCompactProducts={isCompactProducts}
                setIsCompactProducts={setIsCompactProducts}
                
                sortBy={sortBy}
                setSortBy={setSortBy}
            />
        </section> 
    )
}
export default ProductOptions