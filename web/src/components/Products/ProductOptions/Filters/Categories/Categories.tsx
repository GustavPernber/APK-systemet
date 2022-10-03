import Accordion from '@/components/Products/ProductOptions/Filters/utils/Accordion'
import { ProductContext } from '@/components/Products/ProductsController'
import { useContext } from 'react'


function Categories() {
    const {categories, setCat1, cat1} = useContext(ProductContext)

    const CategoriesContent = () => {
        return(
            <div className=' pb-3 grid place-items-start'>
                <div className='border-[1px] bg-gray-300 border-gray-300 
                
                rounded-lg overflow-hidden flex flex-col gap-[1px] w-full
                '>
                    <button 
                    onClick={() => setCat1({url:"all", name: "Visa alla"}) }
                    className={`${cat1.url === "all" && "bg-green-400 text-white font-semibold"} 
                    bg-white transition-colors text-sm py-3 pr-8 pl-4 w-full grid place-content-start md:text-sm`}>
                        Visa alla
                    </button>
                    {categories.cat1.map((category) =>{
                        return(
                            <button 
                            onClick={() => setCat1(category) }
                            className={`${cat1.url === category.url && "bg-green-400 text-white font-semibold "} 
                            bg-white transition-colors text-sm py-3 pr-8 pl-4 w-full grid place-content-start`}>
                            
                            {category.name === "Cider%20%26%20blanddrycker" ? "Cider & blanddryck" : category.name}
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