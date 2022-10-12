import { useContext } from "react"
import { InfoCardContext } from "../Body"

function InfoCard(){
    const { showInfoCard, toggleInfoCard } = useContext(InfoCardContext)

    return(
        <>
       { showInfoCard && (<div className={`fixed w-full h-screen  grid place-content-center z-40 px-5 ` } >

            <div className={`transition-all bg-gray-100 min-h-[15rem] rounded-lg w-full pb-9 pt-7 px-9 z-40 `} >
                <div className={`flex flex-row justify-between pb-5`}>
                    <h1>Vad är APK?</h1>

                    <span 
                    onClick={()=> toggleInfoCard()}
                    className="material-icons-outlined text-xl 
                     bg-white w-8 h-8 rounded-full flex flex-col items-center justify-center text-gray-400 ">
                        close
                    </span>
                </div>

                <p className=" text-gray-400 leading-">
                    Alkohol per krona (APK) är ett mått som anger mängden alkohol (etanol) som erhålls per 
                    nedlagd krona. 
                    <br />
                    <br />
                    APK stiger då dryckens pris sjunker eller alkoholhalten stiger.
                    Enheten för APK är milliliter ren etanol per krona (Ml/Kr)

                </p>
            </div>

            <div 
            onClick={()=>toggleInfoCard()}
            className={` ${showInfoCard ? "opacity-80" : "opacity-0" } transition bg-gray-600  w-full h-full absolute top-0 `}  />
            
        
        </div>)}
        </>

        
    )
}

export default InfoCard