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

    const product: any = {...props.product}
    const [imagePath, setImagePath] = useState<string>(getImgPath(product.productId))
        
    const parsedNameVintage = [product.productNameThin, product.vintage].filter(element => !!element).join(', ')

    const parsedProductPath = () => {
        const productUrlName = `${product.productNameBold
            .replace(/\s+/g, "-")
            .toLowerCase()}-${props.product.productNumber}`;
        const productUrl = `https://www.systembolaget.se/produkt/${encodeURIComponent(product.categoryLevel1)}/${productUrlName}`;
        return productUrl
    }
    
    const parsedPriceString= () => { // TODO: Clean up maybe? Export to utils
        let priceString
        if (product.price % 1 != 0) {
            let numbers = product.price.toFixed(2).split('.')
            priceString = `${numbers[0]}:${numbers[1]}`
        }else{
            priceString = `${product.price.toFixed(0)}:-`
        }
        return priceString
    }

    return (
        <a href={parsedProductPath()} target="_blank" rel="noopener noreferrer" className={`${product.assortmentText === "Ordervaror" ? "bg-gray-200" : "bg-white"} 
         w-full flex flex-col  justify-between  h-auto px-5 pb-2 pt-5 shadow rounded min-h-[12rem]
        
        `} >
            <div>

                <div className="  w-full flex flex-row justify-start h-[9rem] border-b-[1px] border-gray-300">
                    <div className="   h-24  w-16 ">
                        <img 
                        src={imagePath}
                        onError={(e)=>setImagePath(PlaceHolderWineBottle)}
                        alt="Produktbild" 
                        className="  min-h-full min-w-full object-contain max-w-full max-h-full"/>
                    </div>
                
                    <div className="flex flex-col justify-between w-full pl-5">
                        <div className="">
                            <p className=" pb-[0.1rem] uppercase font-[400] font-condensed text-[0.8rem] text-black  tracking-widest">
                                {product.customCategoryTitle}
                            </p>

                            <h1 className=" font-normal">{product.productNameBold}</h1>
                            <h1 className=" font-serif font-normal text-gray-400">{parsedNameVintage}</h1>

                        </div>

                        <div className="w-full flex flex-row justify-between items-center pb-3">
                            <div className="flex flex-row  flex-wrap
                            justify-start   gap-x-3 text-sm whitespace-nowrap">
                                <p className=" font-semibold">APK: {parseFloat(product.apk).toPrecision(3)}</p>
                                <p>{product.volumeText} </p>
                                <p>{product.alcoholPercentage} %</p>

                            </div>
                            <p className=" font-bold text-sm self-end ">{parsedPriceString()}</p>
                        
                        </div>
                    </div>
                </div>
            

                {product.tasteClocks.length > 0 &&  
                (<div className={`${isCompact && 'h-0'} overflow-hidden `}>
                    <div className={`w-full flex flex-row justify-around items-center py-3  `}>
                        {product.tasteClocks.map((clock: {key: string, value: number})=>{
                            return(
                                <TasteClock key={clock.key} name={clock.key} value={clock.value}></TasteClock>
                            )
                        })}

                    </div>
                </div>)}

                { `${product.taste} ${product.usage}` !== "null null" &&
                (<div className={`${isCompact ? 'h-0' : 'h-[6rem]' } overflow-hidden `}>
                    <div className=" w-full py-3 h-full border-t-[1px] border-gray-300 ">
                        <p className=" text-sm ">
                            {product.taste} {product.usage}
                        </p>
                    </div>
                </div>)}
                
                
            </div>
            <div className=" w-full flex flex-col justify-center items-center ">
                {product.assortmentText === "Ordervaror" && 
                    (
                        <div className=" w-full h-8">
                            <span className=" bg-orange rounded-md w-full font-condensed  text-sm p-1 flex justify-center font-bold text-gray-800 uppercase tracking-wide ">
                                Ordervara</span>
                        </div>
                    )
                }
            </div>

        </a>
    )
}

export default Product