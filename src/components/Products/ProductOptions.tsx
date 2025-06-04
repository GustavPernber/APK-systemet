import smallArticles from "@/assets/icons/smallArticles.svg";
import bigArticles from "@/assets/icons/bigArticles.svg";
import { useContext } from "react";
import { ProductContext } from "@/components/Products/ProductsController";
import filterIcon from "@/assets/icons/filter-settings.svg";
import DropdownOption from "@/components/Utils/DropdownOption";
import Divider from "../Utils/Divider";
import { AppContext } from "../Body";
import type { SortByOptions } from "@/utils/types";

function SortViewOptions() {
  const { sortBy, setSortBy } = useContext(AppContext);

  const { toggleShowFilters, isCompactProducts, setIsCompactProducts } =
    useContext(ProductContext);

  const handleSort = (value: string) => {
    setSortBy(value as SortByOptions);
  };

  const Sort = () => {
    return (
      <div className="relative inline-flex hs-dropdown">
        <button
          id="hs-dropdown-slideup-animation"
          type="button"
          className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-green-400 align-middle transition-all bg-white border rounded-md shadow-sm hs-dropdown-toggle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-green-400 "
        >
          Sortera
          <svg
            className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>

        <div
          className="hs-dropdown-menu w-72 transition-[opacity,margin] 
          duration hs-dropdown-open:opacity-100 hidden
           z-10 opacity-0 duration-300 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2 "
          aria-labelledby="hs-dropdown-slideup-animation"
        >
          <DropdownOption
            clickHandler={handleSort}
            selectedValue={sortBy}
            title="APK"
            value="apk"
          />

          <DropdownOption
            clickHandler={handleSort}
            selectedValue={sortBy}
            title="Högst alkoholhalt"
            value="alc_desc"
          />

          <DropdownOption
            clickHandler={handleSort}
            selectedValue={sortBy}
            title="Lägst pris"
            value="price_asc"
          />
        </div>
      </div>
    );
  };

  const CompactToggle = ({
    isCompactProducts,
    setIsCompactProducts,
  }: {
    isCompactProducts: boolean;
    setIsCompactProducts: Function;
  }) => {
    return (
      <button
        type="button"
        onClick={() => setIsCompactProducts(!isCompactProducts)}
        className="inline-flex items-center justify-center h-12 gap-2 px-4 py-3 text-sm font-bold text-green-400 align-middle transition-all bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-green-300 "
      >
        Byt vy:
        <div className="relative w-6 h-6 ">
          <img
            src={smallArticles}
            alt="Small articles icon"
            className={`${!isCompactProducts && "opacity-0"} absolute`}
          />
          <img
            src={bigArticles}
            alt="Big articles icon"
            className={`${isCompactProducts && "opacity-0"} absolute`}
          />
        </div>
      </button>
    );
  };

  return (
    <section className=" md:row-span-1 md:col-start-2">
      <button
        onClick={() => toggleShowFilters()}
        type="button"
        className="inline-flex items-center justify-center w-full gap-2 px-4 py-3 font-medium text-green-400 align-middle transition-all bg-white border rounded-md shadow-xs  lg:hidden hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white focus:ring-green-200 text-md"
      >
        Filtrera
        <img src={filterIcon} alt="" />
      </button>

      <div className="flex flex-row items-end justify-between pt-3 pb-4 ">
        <Sort />
        <CompactToggle
          isCompactProducts={isCompactProducts}
          setIsCompactProducts={setIsCompactProducts}
        />
      </div>
    </section>
  );
}

export default SortViewOptions;
