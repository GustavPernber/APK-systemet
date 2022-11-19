import Disclaimer from './common/Disclaimer'
import SiteHeader from './common/SiteHeader'
import ProductsController from './Products/ProductsController'
import InfoCard from './common/InfoCard'
import { createContext, useState, useEffect, useRef } from 'react'
import SiteFooter from './common/SiteFooter'
import { Metadata, SortByOptions } from '@/utils/types'
import api from '@/api'
import { defaultFilters } from '@/utils/defaultFilters'

type AppContextType = {
    isLoading: boolean,
    setIsLoading: Function
    showInfoCard: boolean,
    setShowInfoCard: Function
    metadata: Metadata
    searchTerm: string
    setSearchTerm: Function
    loadingOnTop: boolean
    setLoadingOnTop: Function
    currentSearchTerm: React.MutableRefObject<string>
    sortBy: SortByOptions
    setSortBy: (prop: SortByOptions) => void

}

export const AppContext = createContext<AppContextType>({} as AppContextType)

const Body = ()=>{

    const [loadingOnTop, setLoadingOnTop] = useState(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [showInfoCard, setShowInfoCard] = useState<boolean>(false)
    const [metadata, setMetadata] = useState<Metadata>({categories: {cat1:[]}, lastUpdated: ''} as Metadata)
    const [searchTerm, setSearchTerm] = useState<string>(defaultFilters.searchTerm)
    const currentSearchTerm = useRef("")
    const [sortBy, setSortBy] = useState<SortByOptions>(defaultFilters.sortBy)

    const AppContextValues: AppContextType = {
        isLoading,
        setIsLoading,
        showInfoCard,
        setShowInfoCard,
        metadata,
        searchTerm,
        setSearchTerm,
        loadingOnTop,
        setLoadingOnTop,
        currentSearchTerm,
        sortBy,
        setSortBy
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