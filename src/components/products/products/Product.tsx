import { ProductType } from "@/utils/types"
import { getImgPath } from "@/utils/imgPath"
import { useEffect, useState } from "react"
import TasteClock from './TasteClock'
import PlaceHolderWineBottle from "../../../assets/img/placeholder-wine-bottle.png";

type ProductProps = {
    product:ProductType
    isCompact:boolean
}

type DisplayProductType = Omit<ProductType, 'apk'> & {
    nameAndVintage: string | null
    apk: any
    priceString: string
}


const Product = (props:ProductProps) => {
    
    const product: DisplayProductType = {...props.product as DisplayProductType}
    const [imagePath, setImagePath] = useState<string>(getImgPath(product.productId))
    
    product.cat1 = product.cat1==="Cider%20%26%20blanddrycker" ? "Cider & blanddryck" : product.cat1
    
    if (product.vintage === null && product.nameThin === null) {
        product.nameAndVintage = "";
    } else if (product.nameThin === null) {
        product.nameAndVintage = product.vintage;
    } else if (product.vintage === null) {
        product.nameAndVintage = product.nameThin;
    } else {
        product.nameAndVintage = `${product.nameThin}, ${product.vintage}`;
    }

    product.apk = parseFloat(product.apk).toPrecision(3);
    
    
    if (product.price % 1 != 0) {
        let numbers=product.price.toFixed(2).split('.')
        // priceString="decimal"
        product.priceString=`${numbers[0]}:${numbers[1]}`
        // const decimalStr = num.toString().split('.')[1];
    }else{
        product.priceString=`${product.price.toFixed(0)}:-`
    }
    

    return (
        <a href="" className={`${product.assortmentText === "Ordervaror" ? "bg-gray-200" : "bg-white"} grid w-full grid-rows-[auto auto auto] grid-cols-1 h-auto px-5 py-3 shadow rounded`} >
            
            <div className="  w-full flex flex-row justify-start h-auto  min-h-[8rem] ">
                <div className="   h-24  w-16 ">
                    <img 
                    src={imagePath}
                    onError={(e)=>setImagePath(PlaceHolderWineBottle)}
                    alt="Produktbild" 
                    className="  min-h-full min-w-full object-contain max-w-full max-h-full"/>
                </div>
              
                <div className="flex flex-col justify-between w-full pl-5">
                    <div className=" pb-5">
                        <p className=" pb-[0.1rem] uppercase font-[400] font-condensed text-[0.8rem] text-black  tracking-widest">
                
                        {product.cat2}{product.cat3 != null ?  `, ${product.cat3}` : ""}

                        </p>

                        <h1 className=" font-normal">{product.nameBold}</h1>
                        <h1 className=" font-serif font-normal text-gray-400">{product.nameAndVintage}</h1>

                    </div>

                    <div className="w-full flex flex-row justify-between items-center pb-3">
                        <div className="flex flex-row  flex-wrap
                          justify-start   gap-x-3 text-sm whitespace-nowrap">
                            <p className=" font-semibold">APK: {product.apk}</p>
                            <p>{product.volume} ml</p>
                            <p>{product.alcPercentage} %</p>

                        </div>
                        <p className=" font-bold text-sm self-end ">{product.priceString}</p>
                       
                    </div>
                </div>
            </div>
           

            {product.tasteClocks.length > 0 &&  
            (<div className={`${props.isCompact && 'h-0'} overflow-hidden`}>

                <div className={`w-full flex flex-row justify-around items-center py-3 border-t-[1px]  border-gray-300`}>
                    {product.tasteClocks.map((clock)=>{
                        return(
                            <TasteClock key={clock.key} name={clock.key} value={clock.value}></TasteClock>
                        )
                    })}

                </div>
            </div>)}

            { `${product.taste} ${product.usage}` !== "null null" &&
            (<div className={`${props.isCompact && 'h-0'} overflow-hidden`}>
                <div className=" w-full py-3 border-t-[1px] border-gray-300">
                    <p className=" text-sm">
                        {product.taste} {product.usage}
                    </p>
                </div>
            </div>)}
            
            {product.assortmentText === "Ordervaror" &&
            (<div className=" border-t-[1px] border-gray-300 pt-2 ">
                <span className=" bg-orange rounded-md w-full font-condensed  text-xs p-1 flex justify-center font-bold text-gray-800 uppercase tracking-wide ">Ordervara</span>
            </div>)}

        </a>)
}

export default Product