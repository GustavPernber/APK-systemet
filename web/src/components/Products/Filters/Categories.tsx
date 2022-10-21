import Accordion from '@/components/Utils/Accordion'
import { ProductContext } from '@/components/Products/ProductsController'
import { useContext } from 'react'
import { AppContext } from '@/components/Body'
import {Cat1, SelectedCat2} from '@/utils/types'

function Categories() {
    const {setCat1, cat1, cat2, setCat2} = useContext(ProductContext)
    const {metadata} = useContext(AppContext)

    const CategoriesContent = () => {

        const categoriesWithAll = [{value: "all"} as Cat1, ...metadata.categories.cat1]

        return(
            <div className=' pb-3 grid place-items-start'>
                <div className='border-[1px]  border-gray-200  bg-gray-200
                
                rounded-md overflow-hidden flex flex-col gap-[1px] w-full
                '>

                {categoriesWithAll.map((category) =>{
                    return(
                        <>
                            {(cat1.value === category.value || category.value === "all" || cat1.value === "all") && 
                                (
                                <div className=' bg-gray-200 '>
                                    <button 
                                    key={category.value}
                                    onClick={() => setCat1(()=> cat1.value === category.value ? {value: "all"} : {value: category.value}) }
                                    className={`${cat1.value === category.value ? "bg-green-400 text-white font-semibold " : "hover:bg-gray-200"} 
                                    bg-white transition duration-75 text-sm py-3 pr-8 pl-4 w-full grid place-content-start text-left`}>

                                    {category.value === "all" ? "Visa alla" : category.value}
                                    </button>

                                    {category.cat2 && 
                                        (
                                        <div className={`${cat1.value === category.value ? "h-full" : "h-0 opacity-0 pointer-events-none"} 
                                         bg-white `}>
                                            {category.cat2.map((category2) => {
                                                return(
                                                
                                                <div 
                                                onClick={() => {
                                                    if (cat2?.includes(category2.value)) {
                                                        setCat2((v: SelectedCat2) => [...v!.filter((el) => el !== category2.value)] ) 
                                                    }else{
                                                        setCat2((v: SelectedCat2) => v ? [...v, category2.value] : [category2.value])
                                                    }
                                                }}
                                                className='hover:bg-gray-200  pl-5 border-b-[1px] border-gray-100 bg-white transition duration-75 flex flex-row justify-start items-center'
                                                key={category2.value}>
                                                    <input 
                                                    checked={cat2?.includes(category2.value)}
                                                    // onChange={() => setShowOrderStock(!showOrderStock)}
                                                    type="checkbox" className="shrink-0  border-gray-200 cursor-pointer rounded text-green-400  p-1  focus:ring-0" id="hs-checked-checkbox" />
                                                    
                                                    <span
                                                    // onClick={() => setCat2({value: category2.value}) }
                                                    
                                                    className={` text-left  cursor-pointer text-sm py-3 pr-8 pl-4 w-full `}>
                                                        {category2.value}
                                                    </span>
                                                </div>
                                                    

                                                )
                                            })}
                                        </div>    
                                        )
                                    }
                                    
                                </div>
                                )
                            }   

                        </>
                        

                    )
                })}
                </div>
            </div>
        )
    }

    return (
        <Accordion
        contentComponent={<CategoriesContent/>}
        title="Kategorier"
        ></Accordion>
    );
}

export default Categories;
