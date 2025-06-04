import ProductList from "./Products/ProductList";
import api, { type Product } from "@/api/api";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import ProductOptions from "./ProductOptions";
import Filters from "./Filters/Filters";
import { AppContext } from "../Body";
import { defaultFilters } from "@/utils/defaultFilters";
import { useInfiniteQuery } from "@tanstack/react-query";

type CatFilters = {
  cat1: string;
  cat2: string[] | null;
};

type ProductContextType = {
  fetchMore: () => void;
  isCompactProducts: boolean;
  setIsCompactProducts: React.Dispatch<React.SetStateAction<boolean>>;
  products: Product[];
  showFilters: boolean;
  toggleShowFilters: () => void;
  showOrderStock: boolean;
  setShowOrderStock: React.Dispatch<React.SetStateAction<boolean>>;
  catFilters: CatFilters;
  setCatFilters: Dispatch<SetStateAction<CatFilters>>;
  isLoading: boolean;
};

export const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType,
);

const ProductsController = () => {
  const { searchTerm, sortBy } = useContext(AppContext);

  const [isCompactProducts, setIsCompactProducts] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const [showOrderStock, setShowOrderStock] = useState<boolean>(
    defaultFilters.showOrderStock,
  );

  const [catFilters, setCatFilters] = useState<CatFilters>({
    cat1: defaultFilters.cat1,
    cat2: defaultFilters.cat2,
  });

  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [
        "products",
        catFilters.cat1,
        catFilters.cat2,
        showOrderStock,
        sortBy,
        searchTerm.trim(), // Only use trimmed value for search
      ],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) =>
        api.getProducts({
          cat1: catFilters.cat1,
          cat2: catFilters.cat2,
          page: pageParam,
          showOrderStock: showOrderStock,
          sortBy: sortBy,
          searchTerm: searchTerm.trim() === "" ? undefined : searchTerm.trim(),
        }),
      getNextPageParam: (lastPage, pages) => {
        return lastPage.data.length === 0 ? undefined : pages.length + 1;
      },
    });

  const toggleShowFilters = useCallback(() => {
    if (window.innerWidth <= 1023) {
      setShowFilters(!showFilters);
    }
  }, [showFilters]);

  const products = useMemo(
    () => data?.pages.flatMap((page) => page.data) || [],
    [data],
  );

  const productContextValues: ProductContextType = {
    isCompactProducts,
    setIsCompactProducts,
    showFilters,
    toggleShowFilters,
    catFilters,
    setCatFilters,
    showOrderStock,
    setShowOrderStock,
    fetchMore: fetchNextPage,
    products,
    isLoading: isLoading || isFetchingNextPage,
  };

  return (
    <ProductContext.Provider value={productContextValues}>
      <div className=" md:w-full grid  place-items-start min-h-screen md:border-t-[1px] md:border-t-gray-300 pb-[10rem]">
        <main
          className="
                w-full
                px-3 md:px-8  md:pt-4 flex flex-row justify-center items-start"
        >
          <Filters />
          <section className=" flex flex-col justify-start md:max-w-screen lg:max-w-[55rem] lg:w-full lg:border-l-[1px] lg:border-gray-300 lg:pl-6 min-h-screen flex-1">
            <ProductOptions />
            <ProductList />
          </section>
        </main>
      </div>
    </ProductContext.Provider>
  );
};

export default ProductsController;
