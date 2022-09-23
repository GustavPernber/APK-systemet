import SortViewOptions from "./SortViewOptions"
import filterIcon from '@/assets/icons/filter-settings.svg'
import { useContext } from "react"
import { ProductContext } from "../ProductsController"
import Filters from './filters/Filters'

function ProductOptions() {

    const { toggleShowFilters } = useContext(ProductContext)

    return(
        <section>
            <button 
            onClick={() => toggleShowFilters()}
            type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-green-400 shadow-xs align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white focus:ring-green-200 transition-all text-md ">
                Filtrera
                <img src={filterIcon} alt="" />
            </button>
            
            <Filters/>
            <SortViewOptions/>
        </section> 
    )
}
export default ProductOptions