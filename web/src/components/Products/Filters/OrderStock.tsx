import { ProductContext } from "@/components/Products/ProductsController"
import { useContext } from "react"
import Accordion from "../../Utils/Accordion"

function OrderStock() {

    const {showOrderStock, setShowOrderStock, toggleShowFilters} = useContext(ProductContext)



    return(
        <div className="flex flex-col items-start gap-2  ">

            <div>
                <p>Dölj ordervaror</p>
            </div>

            <div className=" py-1">  
                <input type="checkbox" id="hs-basic-usage"
                checked={!showOrderStock}
                onClick={() => {
                    toggleShowFilters()
                    setShowOrderStock((v: boolean) => !v)
                }}

                className="relative w-[3.25rem] h-7 
                bg-gray-200 checked:bg-none  text-green-200 checked:bg-green-200  rounded-full cursor-pointer transition-colors ease-in-out duration-200 border-2 border-transparent ring-1 ring-transparent focus:border-green-300 focus:ring-transparent focus:outline-none appearance-none  focus:ring-offset-0
                before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-white before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 " />
            </div>
        </div>
      
    )
}

export default OrderStock