import { SortByOptions } from "@/utils/types";

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
          className="block text-sm font-medium mb-2 "
        >
          Sortera
        </label>

        <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            id="hs-select-label"
            className="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm bg-green-100 "
        >
          <option value='apk'>APK</option>
          <option value='alc_desc'>Högst alkoholhalt</option>
          <option value='price_asc'>Lägsta pris</option>
        </select>
      </form>
    );
  };

  const CompactToggle = () => {
    return (
        <div>
            hello btn
        </div>
    );
  };

  return (
    <div className="py-3 flex flex-row justify-between">
      <Sort />
      <CompactToggle />
    </div>
  );
}

export default SortViewOptions;
