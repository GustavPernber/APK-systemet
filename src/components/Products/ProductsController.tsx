import ProductList from "./Products/ProductList";
import api, {
  Cat1,
  Product,
  ProductOptions as TProductOptions,
} from "@/api/api";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
  useRef,
  Dispatch,
  SetStateAction,
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
  fetchMore: Function;
  isCompactProducts: boolean;
  setIsCompactProducts: Function;
  products: Product[];
  showFilters: boolean;
  toggleShowFilters: Function;
  // cat1: Cat1;
  // setCat1: Function;
  showOrderStock: boolean;
  setShowOrderStock: Function;
  catFilters: CatFilters;
  setCatFilters: Dispatch<SetStateAction<CatFilters>>;
  // cat2: string[] | null;
  // setCat2: Dispatch<SetStateAction<string[] | null>>;
  isLoading: boolean;
};

export const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType,
);

const ProductsController = () => {
  const { currentSearchTerm, sortBy } = useContext(AppContext);

  // // const [products, setProducts] = useState<Product[]>([]);

  const [isCompactProducts, setIsCompactProducts] = useState<boolean>(false);
  // // const [page, setPage] = useState<number>(1);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const [showOrderStock, setShowOrderStock] = useState<boolean>(
    defaultFilters.showOrderStock,
  );

  const [catFilters, setCatFilters] = useState<CatFilters>({
    cat1: defaultFilters.cat1,
    cat2: defaultFilters.cat2,
  });

  // const filters = useMemo(() => {
  //   const filtersOpts: TProductOptions = {
  //     showOrderStock: showOrderStock,
  //     cat1: cat1,
  //     cat2: cat2,
  //     sortBy: sortBy,
  //   };
  //   return filtersOpts;
  // }, [sortBy, cat1, showOrderStock, cat2]);

  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [
        "products",
        catFilters.cat1,
        catFilters.cat2,
        showOrderStock,
        sortBy,
      ],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) =>
        api.getProducts({
          cat1: catFilters.cat1,
          cat2: catFilters.cat2,
          page: pageParam,
          showOrderStock: showOrderStock,
          sortBy: sortBy,
        }),
      getNextPageParam: (lastPage, pages) => {
        return lastPage.data.length === 0 ? undefined : pages.length + 1;
      },
    });

  // const fetchMore = useCallback(async () => {
  //   setIsLoading(true);
  //   const newPage = page + 1;
  //   setPage(newPage);
  //   const res = await api.getProducts({
  //     cat1: cat1,
  //     cat2: cat2,
  //     page: newPage,
  //     showOrderStock: showOrderStock,
  //     sortBy: sortBy,
  //   });
  //   const newProducts = [...products, ...res.data];
  //   setProducts(newProducts);
  //   setIsLoading(false);
  // }, [page, filters, products]);

  // const fetchInitial = useCallback(async () => {
  //   setIsLoading(true);
  //   setProducts([]);
  //   const response = await api.getProducts({
  //     cat1: cat1,
  //     cat2: cat2,
  //     page: 1,
  //     showOrderStock: showOrderStock,
  //     sortBy: sortBy,
  //   });
  //   // if (response.searchTerm === currentSearchTerm.current) {
  //   setProducts(response.data);
  //   setIsLoading(false);
  //   setLoadingOnTop(false);
  //   // }
  // }, [filters]);

  // useEffect(() => {
  //   fetchInitial();
  // }, [filters]);

  // useEffect(() => {
  //   setCat2(null);
  // }, [cat1]);

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
    // cat1,
    // setCat1,
    showOrderStock,
    setShowOrderStock,
    // cat2,
    // setCat2,
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
