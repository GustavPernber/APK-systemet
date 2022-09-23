import { SortByOptions } from "@/utils/types";
import  smallArticles from '@/assets/icons/smallArticles.svg'
import  bigArticles from '@/assets/icons/bigArticles.svg'
import { useContext } from "react";
import {ProductContext} from '@/components/products/ProductsController'

function SortViewOptions() {

  const {sortBy, setSortBy, isCompactProducts, setIsCompactProducts } = useContext(ProductContext)

  const Sort = () => {
    return (
      <form >
        <label
          htmlFor="hs-select-label"
          className="block text-sm font-medium ml-1"
        >
          Sortera
        </label>

        <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            id="hs-select-label"
            className="py-3 px-4 pr-9 block 
             text-green-400
             font-bold
            h-12 w-full border-gray-200 rounded-md text-sm  bg-[url('./assets/icons/sort-arrows.svg')] "
        >
          <option value='apk'>APK</option>
          <option value='alc_desc'>Högst alkoholhalt</option>
          <option value='price_asc'>Lägsta pris</option>
        </select>
      </form>
    );
  };

  const CompactToggle = ({isCompactProducts, setIsCompactProducts}: {isCompactProducts: boolean, setIsCompactProducts: Function} )=> {
    return (
      
    <button type="button" 
    onClick={()=>setIsCompactProducts(!isCompactProducts)}
    className="py-3 px-4 h-12 inline-flex 
     font-bold text-green-400
    justify-center items-center gap-2 rounded-md border bg-white shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm ">
      Byt vy:
      <div className=" relative h-6 w-6">
        <img src={smallArticles} alt="Small articles icon" className={`${!isCompactProducts && "opacity-0"} absolute`}/> 
        <img src={bigArticles} alt="Big articles icon" className={`${isCompactProducts && "opacity-0"} absolute`}/>
      </div>
    </button>
    );
  };

  return (
    <div className="pb-4 pt-3 flex flex-row justify-between items-end ">
      <Sort />
      <CompactToggle 
        isCompactProducts={isCompactProducts}
        setIsCompactProducts={setIsCompactProducts}
      />
    </div>
  );
}

export default SortViewOptions;
