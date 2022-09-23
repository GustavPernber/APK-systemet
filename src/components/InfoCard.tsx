import { useContext } from "react"
import { InfoCardContext } from "./Body"

function InfoCard(){
    const { showInfoCard, toggleInfoCard } = useContext(InfoCardContext)

    return(
        <div className={`fixed w-full h-full ${!showInfoCard && "pointer-events-none"} z-30` } >
            <section className={`${showInfoCard ? "bg-black opacity-60" : " opacity-0 pointer-events-none"}  transition-all h-screen w-full top-0 right-0 absolute `}>
            </section>
            <div className={`${showInfoCard ? "" : " translate-y-full"} transition-all duration-300 bg-gray-100 rounded-xl h-[20rem] w-screen absolute bottom-0 left-0 
             py-8 px-10`} 
            >
                <div className={`flex flex-row justify-between pb-5`}>
                    <h1>Vad är APK?</h1>

                    <span 
                    onClick={()=> {
                        console.log('should change');
                        toggleInfoCard()
                    }}
                    className="material-icons-outlined text-xl 
                     bg-white w-8 h-8 rounded-full flex flex-col items-center justify-center text-gray-400 ">
                        close
                    </span>
                </div>

                <p>
                Alkohol per krona (APK) är ett mått som anger mängden alkohol (etanol) som erhålls per 
                nedlagd krona. 
                <br />
                <br />
                APK stiger då dryckens pris sjunker eller alkoholhalten stiger.
                Enheten för APK är milliliter ren etanol per krona (Ml/Kr)

                </p>
            </div>
        
        </div>
        
    )
}

export default InfoCard