import Accordion from '@/components/Utils/Accordion'
import { ProductContext } from '@/components/Products/ProductsController'
import { useContext } from 'react'
import { AppContext } from '@/components/Body'


function Categories() {
    const {setCat1, cat1} = useContext(ProductContext)
    const {metadata} = useContext(AppContext)

    const CategoriesContent = () => {
        return(
            <div className=' pb-3 grid place-items-start'>
                <div className='border-[1px] bg-gray-300 border-gray-300 
                
                rounded-lg overflow-hidden flex flex-col gap-[1px] w-full
                '>
                    <button 
                    onClick={() => setCat1({value:"all"}) }
                    className={`${cat1.value === "all" && "bg-green-400 text-white font-semibold"} 
                    bg-white transition-colors text-sm py-3 pr-8 pl-4 w-full grid place-content-start md:text-sm`}>
                        Visa alla
                    </button>
                    {metadata.categories.cat1.map((category) =>{
                        return(
                            <button 
                            key={category.value}
                            onClick={() => setCat1({value: category.value}) }
                            className={`${cat1.value === category.value && "bg-green-400 text-white font-semibold "} 
                            bg-white transition-colors text-sm py-3 pr-8 pl-4 w-full grid place-content-start`}>
                            {category.value}
                            </button>
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
