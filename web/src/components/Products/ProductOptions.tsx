import smallArticles from "@/assets/icons/smallArticles.svg";
import bigArticles from "@/assets/icons/bigArticles.svg";
import { useContext } from "react";
import { ProductContext } from "@/components/Products/ProductsController";
import filterIcon from "@/assets/icons/filter-settings.svg";
import DropdownOption from "../Utils/DropdownOption";
import Divider from "../Utils/Divider";
import { AppContext } from "../Body";
import { SortByOptions } from "@/utils/types";

function SortViewOptions() {
  const {
    sortBy,
    setSortBy,
  } = useContext(AppContext)

  const {
    toggleShowFilters,
    isCompactProducts,
    setIsCompactProducts,
  } = useContext(ProductContext);

  const handleSort = (value: string) => {
    setSortBy(value as SortByOptions)
  }

  const Sort = () => {

    return (
      <div className="hs-dropdown relative inline-flex">
        <button
          id="hs-dropdown-slideup-animation"
          type="button"
          className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center 
          gap-2 rounded-md border font-bold
          bg-white text-green-400 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-green-400 transition-all text-sm "
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
        className="py-3 px-4 h-12 inline-flex 
     font-bold text-green-400
    justify-center items-center gap-2 rounded-md border bg-white shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-green-300 transition-all text-sm "
      >
        Byt vy:
        <div className=" relative h-6 w-6">
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
    <section className="  md:row-span-1 md:col-start-2 ">
        <button
        onClick={() => toggleShowFilters()}
        type="button"
        className="   lg:hidden w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-green-400 shadow-xs align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white focus:ring-green-200 transition-all text-md "
      >
        Filtrera
        <img src={filterIcon} alt="" />
      </button>

      <div className="pb-4 pt-3 flex flex-row justify-between items-end ">
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
