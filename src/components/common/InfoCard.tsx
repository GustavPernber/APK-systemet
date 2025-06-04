import { useContext } from "react";
import { AppContext } from "../Body";
import Icons from "../Utils/Icons";

function InfoCard() {
  const { showInfoCard, setShowInfoCard } = useContext(AppContext);

  return (
    <>
      <div
        className={`${showInfoCard ? "opacity-100" : "opacity-0 pointer-events-none"} transition fixed w-full h-screen  grid place-content-center z-40 px-5 `}
      >
        <div
          className={"transition-all from-white to-gray-200  bg-gradient-to-br shadow-lg min-h-[15rem] rounded-lg max-w-2xl w-full p-5  z-40 "}
        >
          <div className={"flex flex-row justify-between pb-5"}>
            <h1 className=" font-semibold">Vad är APK?</h1>

            <span
              className="bg-white w-8 h-8 rounded-full flex flex-col items-center justify-center  cursor-pointer text-gray-400 "
              onClick={() => setShowInfoCard((v: boolean) => !v)}
            >
              <Icons.x className="text-[1.2rem]" />
            </span>
          </div>

          <p className=" text-gray-400 leading-">
            Alkohol per krona (APK) är ett mått som anger mängden alkohol
            (etanol) som erhålls per nedlagd krona.
            <br />
            <br />
            APK stiger då dryckens pris sjunker eller alkoholhalten stiger.
            Enheten för APK är milliliter ren etanol per krona (Ml/Kr)
          </p>
        </div>

        <div
          onClick={() => setShowInfoCard((v: boolean) => !v)}
          className={` ${showInfoCard ? "opacity-80" : "opacity-0"} transition bg-gray-600  w-full h-full absolute top-0 `}
        />
      </div>
    </>
  );
}

export default InfoCard;
