import Accordion from '@/components/Utils/Accordion'
import { ProductContext } from '@/components/Products/ProductsController'
import { useContext } from 'react'
import { AppContext } from '@/components/Body'


function Categories() {
    const {setCat1, cat1} = useContext(ProductContext)
    const {metadata} = useContext(AppContext)

    const CategoriesContent = () => {

        const categoriesWithAll = [{value: "all"}, ...metadata.categories.cat1]

        return(
            <div className=' pb-3 grid place-items-start'>
                <div className='border-[1px] bg-gray-300 border-gray-300 
                
                rounded-md overflow-hidden flex flex-col gap-[1px] w-full
                '>

                    {categoriesWithAll.map((category) =>{
                        return(
                            <button 
                            key={category.value}
                            onClick={() => setCat1({value: category.value}) }
                            className={`${cat1.value === category.value ? "bg-green-400 text-white font-semibold " : "hover:bg-gray-200"} 
                            bg-white transition duration-75 text-sm py-3 pr-8 pl-4 w-full grid place-content-start`}>
                            {category.value === "all" ? "Visa alla" : category.value}
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
