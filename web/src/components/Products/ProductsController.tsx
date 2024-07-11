import ProductList from "./Products/ProductList";
import api from "@/api";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
  useRef,
} from "react";
import ProductOptions from "./ProductOptions";
import {
  ProductsFilterOptions,
  SortByOptions,
  ProductType,
  Cat1,
  SelectedCat2,
} from "@/utils/types";
import Filters from "./Filters/Filters";
import { AppContext } from "../Body";
import { defaultFilters } from "@/utils/defaultFilters";

type ProductContextType = {
  fetchMore: Function;
  isCompactProducts: boolean;
  setIsCompactProducts: Function;
  products: ProductType[];
  showFilters: boolean;
  toggleShowFilters: Function;
  cat1: Cat1;
  setCat1: Function;
  showOrderStock: boolean;
  setShowOrderStock: Function;
  cat2: SelectedCat2;
  setCat2: Function;
  fetchInitial: Function;
};

export const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType,
);

const ProductsController = () => {
  const {
    setIsLoading,
    setLoadingOnTop,
    currentSearchTerm,
    sortBy,
    searchTerm,
  } = useContext(AppContext);

  const [products, setProducts] = useState<ProductType[]>([]);

  const [isCompactProducts, setIsCompactProducts] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const [showOrderStock, setShowOrderStock] = useState<boolean>(
    defaultFilters.showOrderStock,
  );
  const [cat1, setCat1] = useState<Cat1>(defaultFilters.cat1);
  const [cat2, setCat2] = useState<SelectedCat2>(defaultFilters.cat2);

  const filters = useMemo(() => {
    const filtersOpts: ProductsFilterOptions = {
      showOrderStock: showOrderStock,
      cat1: cat1,
      cat2: cat2,
      sortBy: sortBy,
      searchTerm: searchTerm,
    };
    return filtersOpts;
  }, [sortBy, cat1, showOrderStock, cat2, searchTerm]);

  const fetchMore = useCallback(async () => {
    setIsLoading(true);
    const newPage = page + 1;
    setPage(newPage);
    const res = await api.getProducts(filters, newPage);
    const newProducts = [...products, ...res.data];
    setProducts(newProducts);
    setIsLoading(false);
  }, [page, filters, products]);

  const fetchInitial = useCallback(async () => {
    setIsLoading(true);
    setProducts([]);
    const response = await api.getProducts(filters, 1);
    if (response.searchTerm === currentSearchTerm.current) {
      setProducts(response.data);
      setIsLoading(false);
      setLoadingOnTop(false);
    }
  }, [filters, searchTerm]);

  useEffect(() => {
    fetchInitial();
  }, [filters]);

  useEffect(() => {
    setCat2(null);
  }, [cat1]);

  const toggleShowFilters = useCallback(() => {
    if (window.innerWidth <= 1023) {
      setShowFilters(!showFilters);
    }
  }, [showFilters]);

  const productContextValues: ProductContextType = {
    fetchInitial,
    fetchMore,
    isCompactProducts,
    setIsCompactProducts,
    products,
    showFilters,
    toggleShowFilters,
    cat1,
    setCat1,
    showOrderStock,
    setShowOrderStock,
    cat2,
    setCat2,
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
