import Disclaimer from './Disclaimer'
import SiteHeader from './SiteHeader'
import ProductsController from './products/ProductsController'

const Body = ()=>{
    return(
        <div className='App  gap-y-3  grid grid-rows-main  bg-gray-100 w-screen  min-h-screen'>
            <SiteHeader/>
            
            <div className='flex flex-row w-full justify-center '>
                <Disclaimer/>
            </div>

            <ProductsController/>
        </div>

        
    )
}

export default Body