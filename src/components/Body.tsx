import SiteHeader from "./common/SiteHeader";
import ProductsController from "./Products/ProductsController";
import InfoCard from "./common/InfoCard";
import {
  createContext,
  useState,
  useEffect,
  type SetStateAction,
  type Dispatch,
} from "react";
import SiteFooter from "./common/SiteFooter";
import type { SortByOptions } from "@/utils/types";
import api, { type MetadataResponse } from "@/api/api";
import { defaultFilters } from "@/utils/defaultFilters";

type AppContextType = {
  // isLoading: boolean;
  // setIsLoading: Dispatch<SetStateAction<boolean>>;
  showInfoCard: boolean;
  setShowInfoCard: Dispatch<SetStateAction<boolean>>;
  metadata: MetadataResponse;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: SortByOptions;
  setSortBy: (prop: SortByOptions) => void;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

const Body = () => {
  // const [loadingOnTop, setLoadingOnTop] = useState(false);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showInfoCard, setShowInfoCard] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<MetadataResponse>({
    categories: { categories: [] },
    lastScraped: "",
  });
  // const [searchTerm, setSearchTerm] = useState<string>(
  //   defaultFilters.searchTerm,
  // );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortByOptions>(defaultFilters.sortBy);

  const AppContextValues: AppContextType = {
    // isLoading,
    // setIsLoading,
    showInfoCard,
    setShowInfoCard,
    metadata,
    searchTerm,
    setSearchTerm,
    // loadingOnTop,
    // setLoadingOnTop,
    sortBy,
    setSortBy,
  };

  useEffect(() => {
    api.getMetadata().then((response) => {
      setMetadata(response);
    });
  }, []);

  return (
    <AppContext.Provider value={AppContextValues}>
      <div className="App  gap-y-3 md:gap-y-2  grid grid-rows-main  bg-gray-100 w-full  min-h-screen ">
        <SiteHeader />
        <InfoCard />
        {/* <Disclaimer /> */}
        <ProductsController />
        <SiteFooter />
      </div>
    </AppContext.Provider>
  );
};

export default Body;
