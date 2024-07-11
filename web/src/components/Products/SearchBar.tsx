import { useContext, useTransition, useState } from "react";
import { AppContext } from "../Body";
import Icons from "../Utils/Icons";

const SearchBar = () => {
  const {
    setSearchTerm,
    setIsLoading,
    setLoadingOnTop,
    currentSearchTerm,
    searchTerm,
    setSortBy,
  } = useContext(AppContext);
  const [isPending, startTransition] = useTransition();
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null,
  );

  const inputChanged = () => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const newTimer = setTimeout(() => {
      if (/^\s*$/.test(currentSearchTerm.current)) {
        // Its only spaces
        setSortBy("apk");
      } else {
        setSortBy("");
      }
      startTransition(() => {
        setSearchTerm(currentSearchTerm.current);
      });
    }, 500);

    setDebounceTimer(newTimer);
  };

  return (
    <div
      className="rounded-full pl-6 pr-2 py-0 text-sm font-sans outline-none border-none 
    w-full grid place-content-between grid-flow-col place-items-center  justify-items-start  grid-rows-1 grid-cols-[1fr_auto]  focus-within:ring-1 ring-green-400
    gap-2
    bg-gray-200"
    >
      <input
        onChange={(e) => {
          if (!(/^\s*$/.test(e.target.value) && /^\s*$/.test(searchTerm))) {
            currentSearchTerm.current = e.target.value;
            inputChanged();
            startTransition(() => {
              setIsLoading(true);
              setLoadingOnTop(true);
            });
          }
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
