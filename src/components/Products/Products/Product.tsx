import { ProductType } from "@/utils/types"
import { getImgPath } from "@/utils/imgPath"
import { useContext, useEffect, useState } from "react"
import TasteClock from './TasteClock'
import PlaceHolderWineBottle from "../../../assets/img/placeholder-wine-bottle.png";
import { ProductContext } from "../ProductsController";

type ProductProps = {
    product:ProductType
}

type DisplayProductType = Omit<ProductType, 'apk'> & {
    nameAndVintage: string | null
    apk: any
    priceString: string
}


const Product = (props:ProductProps) => {
    
    const isCompact = useContext(ProductContext).isCompactProducts

    const product: DisplayProductType = {...props.product as DisplayProductType}
    const [imagePath, setImagePath] = useState<string>(getImgPath(product.productId))
    
    product.cat1 = product.cat1==="Cider%20%26%20blanddrycker" ? "Cider & blanddryck" : product.cat1
    
    const formatNameVintage = () => {
        let nameAndVintage
        if (product.vintage === null && product.nameThin === null) {
            nameAndVintage = "";
        } else if (product.nameThin === null) {
            nameAndVintage = product.vintage;
        } else if (product.vintage === null) {
            nameAndVintage = product.nameThin;
        } else {
            nameAndVintage = `${product.nameThin}, ${product.vintage}`;
        }
        return nameAndVintage
    }
    
    const formatApk = () => {
        return product.apk = parseFloat(product.apk).toPrecision(3);
    }

    const formatProductPath = () => {
        const productUrlName = `${product.nameBold
            .replace(/\s+/g, "-")
            .toLowerCase()}-${props.product.productNumber}`;
    
        const cat1NameURL = product.cat1==="Cider%20%26%20blanddrycker" ? "cider-blanddrycker" : product.cat1
    
        const productUrl = `https://www.systembolaget.se/produkt/${cat1NameURL}/${productUrlName}`;

        return productUrl
    }
    
    const formatPriceString= () => {
        let priceString
        if (product.price % 1 != 0) {
            let numbers=product.price.toFixed(2).split('.')
            // priceString="decimal"
            priceString=`${numbers[0]}:${numbers[1]}`
            // const decimalStr = num.toString().split('.')[1];
        }else{
            priceString=`${product.price.toFixed(0)}:-`
        }
        return priceString
    }

    return (
        <a href={formatProductPath()} target="_blank" rel="noopener noreferrer" className={`${product.assortmentText === "Ordervaror" ? "bg-gray-200" : "bg-white"} 
        grid w-full grid-rows-[auto auto auto] grid-cols-1 h-auto px-5 pb-2 pt-5 shadow rounded
        
        `} >
            
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
                        <h1 className=" font-serif font-normal text-gray-400">{formatNameVintage()}</h1>

                    </div>

                    <div className="w-full flex flex-row justify-between items-center pb-3">
                        <div className="flex flex-row  flex-wrap
                          justify-start   gap-x-3 text-sm whitespace-nowrap">
                            <p className=" font-semibold">APK: {formatApk()}</p>
                            <p>{product.volume} ml</p>
                            <p>{product.alcPercentage} %</p>

                        </div>
                        <p className=" font-bold text-sm self-end ">{formatPriceString()}</p>
                       
                    </div>
                </div>
            </div>
           

            {product.tasteClocks.length > 0 &&  
            (<div className={`${isCompact && 'h-0'} overflow-hidden`}>

                <div className={`w-full flex flex-row justify-around items-center py-3 border-t-[1px]  border-gray-300`}>
                    {product.tasteClocks.map((clock)=>{
                        return(
                            <TasteClock key={clock.key} name={clock.key} value={clock.value}></TasteClock>
                        )
                    })}

                </div>
            </div>)}

            { `${product.taste} ${product.usage}` !== "null null" &&
            (<div className={`${isCompact && 'h-0'} overflow-hidden`}>
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

        </a>
    )
}

export default Product