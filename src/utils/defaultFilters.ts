import { ProductsFilterOptions, Cat1 } from "./types";

export const defaultFilters: ProductsFilterOptions = {
  cat1: { value: "all" } as Cat1,
  cat2: null,
  showOrderStock: true,
  sortBy: "apk",
  searchTerm: "",
};
