import Disclaimer from './common/Disclaimer'
import SiteHeader from './common/SiteHeader'
import ProductsController from './Products/ProductsController'
import InfoCard from './common/InfoCard'
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
        <div className='App  gap-y-3 md:gap-y-2  grid grid-rows-main  bg-gray-100 w-full  min-h-screen '>
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