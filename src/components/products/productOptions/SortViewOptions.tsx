import { SortByOptions } from "@/utils/types";
import  smallArticles from '@/assets/icons/smallArticles.svg'
import  bigArticles from '@/assets/icons/bigArticles.svg'


type SortViewOptionsProps = {
  sortBy: SortByOptions;
  setSortBy: Function;
  isCompactProducts: boolean;
  setIsCompactProducts: Function;
};

function SortViewOptions({
  sortBy,
  setSortBy,
  setIsCompactProducts,
  isCompactProducts,
}: SortViewOptionsProps) {
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
            className="py-3 px-4 pr-9 block  h-12 w-full border-gray-200 rounded-md text-sm bg-green-100 "
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
    className="py-3 px-4 py-3 px-4 h-12 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm ">
      Byt vy:
      <img src={isCompactProducts ? smallArticles : bigArticles} alt="" />
    </button>
    );
  };

  return (
    <div className="py-3 flex flex-row justify-between items-end">
      <Sort />
      <CompactToggle 
        isCompactProducts={isCompactProducts}
        setIsCompactProducts={setIsCompactProducts}
      />
    </div>
  );
}

export default SortViewOptions;
