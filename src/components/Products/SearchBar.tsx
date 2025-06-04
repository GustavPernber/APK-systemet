import { useContext, useRef, useState } from "react";
import { AppContext } from "../Body";
import Icons from "../Utils/Icons";

const SearchBar = () => {
  const { searchTerm, setSearchTerm, setSortBy } = useContext(AppContext);
  const [inputValue, setInputValue] = useState(searchTerm);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  return (
    <div
      className="rounded-full pl-6 pr-2 py-0 text-sm font-sans outline-none border-none \
    w-full grid place-content-between grid-flow-col place-items-center  justify-items-start  grid-rows-1 grid-cols-[1fr_auto]  focus-within:ring-1 ring-green-400\n    gap-2\n    bg-gray-200"
    >
      <input
        value={inputValue}
        onChange={(e) => {
          const value = e.target.value;
          setInputValue(value); // update input immediately
          if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
          }
          debounceTimer.current = setTimeout(() => {
            setSearchTerm(value); // update context (and thus query) debounced
          }, 500);
        }}
        type="text"
        placeholder="Sök efter en produkt..."
        className=" w-full p-0 m-0 font-sans text-md  bg-transparent   border-none  focus:ring-0  text-slate-700"
      />

      <div className=" bg-green-400 grid place-items-center w-[2rem] h-[2rem] rounded-full my-2">
        <Icons.search className=" text-white" />
      </div>
    </div>
  );
};

export default SearchBar;
