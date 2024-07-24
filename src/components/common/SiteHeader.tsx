import { useContext } from "react";
import { AppContext } from "../Body";
import Logo from "./Logo";
import Icons from "@/components/Utils/Icons";
import SearchBar from "../Products/SearchBar";

export default function SiteHeader() {
  const { showInfoCard, setShowInfoCard } = useContext(AppContext);

  return (
    <header
      className=" grid grid-cols-2 grid-rows-2 grid-flow-col px-3 pt-4 pb-2  md:px-6 md:pb-0  justify-self-start items-center w-full   gap-y-3
		md:grid-cols-3 md:grid-rows-1
		"
    >
      <Logo />

      <button
        onClick={() => setShowInfoCard((v: boolean) => !v)}
        className=" flex flex-row  items-center gap-1  col-start-2  md:col-start-3  justify-self-end"
      >
        <Icons.info className=" text-[1.2rem] mb-[0.1rem]" />
        <p className="text-[0.9rem] text-gray-400">Vad är APK?</p>
      </button>

      <div className=" col-span-2 md:col-span-1 ">
        <SearchBar />
      </div>
    </header>
  );
}
