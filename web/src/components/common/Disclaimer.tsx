import { useState } from "react"
import Icons from "@/components/Utils/Icons"

export default function Disclaimer(){

    const [hidden, setHidden] = useState(false)

    return(
        <div className='flex flex-row w-full justify-center '>
            <div className={`${hidden && "hiddenDisclaimer"} max-h-96 overflow-hidden w-full mx-3 md:max-w-lg `}>

                <div
                className={`h-[auto] bg-gray-200 shadow-md transition overflow-hidden flex flex-col  md:my-3   gap-1 rounded w-full py-3 px-3    relative  `}>

                    <button className=" bg-white 
                    flex justify-center items-center
                    h-5 w-5  rounded-full absolute right-3 top-2"
                    onClick={()=>setHidden(true)}
                    >
                        <Icons.x/>
                    </button>

                    <h1 className="font-medium">Information</h1>
                    <p className="text-[0.8rem] text-gray-400   leading-4 ">
                        Hemsidan är inte associerad med Systembolaget på något sätt. Beställning, köp och utlämning sker endast från/av/hos Systembolaget. Hemsidan uppmanar inte till missbruk av alkohol eller till underårig konsumption av alkohol.
                    </p>
                </div>
            </div>
        </div>
        
        
    )
}