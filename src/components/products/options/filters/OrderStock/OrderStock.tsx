import Accordion from "../utils/Accordion"

function OrderStock() {

    const OrderStockContent = () => {
        return(
            <div className="flex">
                <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-green-400   focus:ring-0" id="hs-checked-checkbox" />
                <label htmlFor="hs-checked-checkbox" className="text-md text-gray-500 ml-3 dark:text-gray-400">
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