import { ProductContext } from "@/components/Products/ProductsController"
import { useContext } from "react"
import Accordion from "../../Utils/Accordion"

function OrderStock() {

    const {showOrderStock, setShowOrderStock, toggleShowFilters} = useContext(ProductContext)


    const OrderStockContent = () => {
        return(
            <div className="flex flex-row items-center py-3 cursor-pointer "
            onClick={() => {
                toggleShowFilters()
                setShowOrderStock((v: boolean) => !v)
            }}

            >
                <input 
                checked={!showOrderStock}
                type="checkbox" className="shrink-0  border-gray-200 cursor-pointer rounded text-green-400  p-3  focus:ring-0" id="hs-checked-checkbox" />
                <label htmlFor="hs-checked-checkbox" className=" cursor-pointer text-base text-gray-700 ml-3 ">
                    Dölj ordervaror
                </label>
            </div>
        )
    }

    return(
        <Accordion
        contentComponent={<OrderStockContent/>}
        title="Ordervaror"
        />
      
    )
}

export default OrderStock