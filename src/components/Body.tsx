import Disclaimer from './Disclaimer'
import SiteHeader from './SiteHeader'
import ProductsController from './Products/ProductsController'
import InfoCard from './InfoCard'
import { createContext, useCallback, useState } from 'react'

type InfoCardContextType = {
    showInfoCard: boolean,
    toggleInfoCard: Function
}

export const InfoCardContext = createContext<InfoCardContextType>({} as InfoCardContextType)

const Body = ()=>{

    const [showInfoCard, setShowInfoCard] = useState<boolean>(false)

    const toggleInfoCard = useCallback(()=>{
        setShowInfoCard(!showInfoCard)
    }, [showInfoCard])

    const infoCardContextValues: InfoCardContextType = {
        showInfoCard, 
        toggleInfoCard
    }

    return(
        <div className='App  gap-y-3  grid grid-rows-main  bg-gray-100 w-screen  min-h-screen '>
            <InfoCardContext.Provider value={infoCardContextValues}>
                <SiteHeader/>
                <InfoCard/>
            </InfoCardContext.Provider>
            
            <div className='flex flex-row w-full justify-center '>
                <Disclaimer/>
            </div>

            <ProductsController/>
        </div>

        
    )
}

export default Body