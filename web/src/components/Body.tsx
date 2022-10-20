import Disclaimer from './common/Disclaimer'
import SiteHeader from './common/SiteHeader'
import ProductsController from './Products/ProductsController'
import InfoCard from './common/InfoCard'
import { createContext, useState, useEffect } from 'react'
import SiteFooter from './common/SiteFooter'
import { Metadata } from '@/utils/types'
import api from '@/api'

type AppContextType = {
    showInfoCard: boolean,
    setShowInfoCard: Function
    metadata: Metadata
}

// export const InfoCardContext = createContext<InfoCardContextType>({} as InfoCardContextType)
export const AppContext = createContext<AppContextType>({} as AppContextType)

const Body = ()=>{

    // const [showInfoCard, setShowInfoCard] = useState<boolean>(false)
    const [showInfoCard, setShowInfoCard] = useState<boolean>(false)
    const [metadata, setMetadata] = useState<Metadata>({categories: {cat1:[]}, lastUpdated: ''} as Metadata)

    const AppContextValues: AppContextType = {
        showInfoCard,
        setShowInfoCard,
        metadata,
        // showInfoCard, 
        // toggleInfoCard
    }

    useEffect(() => {
        api.getMetadata()
        .then(response => {
            setMetadata(response)
        })
    }, [])

    return(
        <AppContext.Provider value={AppContextValues}>
            <div className='App  gap-y-3 md:gap-y-2  grid grid-rows-main  bg-gray-100 w-full  min-h-screen '>
                <SiteHeader/>
                <InfoCard/>
                <Disclaimer/>
                <ProductsController/>
                <SiteFooter/>
            </div>
        </AppContext.Provider>


        
    )
}

export default Body