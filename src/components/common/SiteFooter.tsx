import Logo from "./Logo";
import { AppContext } from "../Body";
import { useContext } from "react";
import Icons from "@/components/Utils/Icons";

const SiteFooter = () => {
  const { metadata } = useContext(AppContext);

  const parsedDate = new Date(metadata.lastScraped);

  return (
    <footer className=" w-screen h-[10rem]  bg-gradient-to-br from-gray-200 to-gray-300 px-4 py-6 grid grid-cols-2 grid-rows-[1fr_auto_1fr]">
      <a
        className=" col-start-1 self-start   w-min"
        target={"_blank"}
        href="https://github.com/GustavPernber/APK-systemet-remastered"
      >
        <Icons.gitHub className=" text-[1.5rem]" />
      </a>
      <Logo className="  !text-gray-400 !text-sm !leading-3 col-start-2 self-start place-self-end" />

      <span className="w-full h-[1px] bg-gray-300 col-span-2" />

      <p className="text-gray-400 col-span-2  text-sm self-end">
        {metadata.lastScraped &&
          `Senast uppdaterad: ${parsedDate.toLocaleString(undefined, { hour12: false, dateStyle: "full", timeStyle: "short" }).replace("at", " Kl")}`}
      </p>
    </footer>
  );
};

export default SiteFooter;
