import SortViewOptions from "./SortViewOptions"
import filterIcon from '@/assets/icons/filter-settings.svg'
import { useContext } from "react"
import { ProductContext } from "../ProductsController"
import Filters from './Filters/Filters'

function ProductOptions() {

    const { toggleShowFilters } = useContext(ProductContext)

    return(
        <section className="  md:row-span-1 md:col-start-2 ">
            <button 
            onClick={() => toggleShowFilters()}
            type="button" className="   md:hidden w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-green-400 shadow-xs align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white focus:ring-green-200 transition-all text-md ">
                Filtrera
                <img src={filterIcon} alt="" />
            </button>
            
            
            <SortViewOptions/>
        </section> 
    )
}
export default ProductOptions