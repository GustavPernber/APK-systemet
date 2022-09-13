import { ProductType } from "@/api/types"
import { getImgPath } from "@/utils/imgPath"
import { useEffect } from "react"
import TasteClock from './TasteClock'


type ProductProps = {
    product:ProductType
}

type DisplayProductType = Omit<ProductType, 'apk'> & {
    nameAndVintage: string | null
    apk: any
    priceString: string
}


const Product = (props:ProductProps) => {
    const product: DisplayProductType = {...props.product as DisplayProductType}
    const imagePath = getImgPath(product.productId)

    
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

    product.apk = parseFloat(product.apk).toPrecision(4);
    
    
    if (product.price % 1 != 0) {
        let numbers=product.price.toFixed(2).split('.')
        // priceString="decimal"
        product.priceString=`${numbers[0]}:${numbers[1]}`
        // const decimalStr = num.toString().split('.')[1];
    }else{
        product.priceString=`${product.price.toFixed(0)}:-`
    }
    

    return (
        <a href="" className="bg-white grid w-full grid-rows-[auto auto auto] grid-cols-1 h-auto px-5 py-3 shadow rounded" >
            
            <div className="  w-full flex flex-row justify-start min-h-[8rem] gap-3">
                <div className="  overflow-hidden  w-[4.5rem] p-3 h-[85%]">
                    <img src={imagePath} alt="Produktbild" className=" object-contain w-full h-full object-top"/>
                </div>
              
                <div className="flex flex-col justify-between w-full">
                    <div className=" pb-5">
                        <p className=" pb-[0.1rem] uppercase font-[400] font-condensed text-[0.8rem] text-black  tracking-widest">
                        {product.cat1}, {product.cat2},{" "}
					    {product.cat3}
                        </p>

                        <h1 className=" font-normal">{product.nameBold}</h1>
                        <h1 className=" font-serif font-normal text-gray-300">{product.nameAndVintage}</h1>

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
           
            <div className="  w-full flex flex-row justify-around items-center py-3 border-t-[2px]  border-gray-200">

                {product.tasteClocks.map((clock)=>{
                    return(
                        <TasteClock key={clock.key} name={clock.key} value={clock.value}></TasteClock>
                    )
                })}

            </div>

            <div className=" bg-green w-full py-3 border-t-[2px] border-gray-200">
                <p className=" text-sm">
                    {product.taste} {product.usage}
                </p>
                {/* <p className=" text-sm">Nyanserad, fruktig smak med tydlig fatkaraktär, inslag av gula päron, smörkola, klöverblommor, apelsinskal och vanilj.  Serveras rumstempererad som avec.</p> */}
            </div>


        </a>)
}

export default Product