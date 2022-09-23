import { ProductContext } from "@/components/Products/ProductsController"
import { useContext } from "react"
import Accordion from "../utils/Accordion"

function OrderStock() {

    const {showOrderStock, setShowOrderStock} = useContext(ProductContext)

    const OrderStockContent = () => {
        return(
            <div className="flex">
                <input 
                checked={showOrderStock}
                onChange={() => setShowOrderStock(!showOrderStock)}
                type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-green-400   focus:ring-0" id="hs-checked-checkbox" />
                <label htmlFor="hs-checked-checkbox" className="text-md text-black ml-3 ">
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