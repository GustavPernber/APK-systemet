import { SortByOptions } from "@/utils/types"
import SortViewOptions from "./SortViewOptions"

type ProductOptionsProps = {
    sortBy: SortByOptions
    setSortBy: any
}

function ProductOptions({ sortBy, setSortBy }: ProductOptionsProps) {
    return(
        <section>

            <SortViewOptions
                sortBy={sortBy}
                setSortBy={setSortBy}
            />
        </section> 
    )
}
export default ProductOptions