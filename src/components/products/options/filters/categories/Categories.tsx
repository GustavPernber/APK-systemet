import Accordion from '@/components/products/options/filters/utils/Accordion'
import categoriesData from '@/utils/categories.json'


function Categories() {
    const categories = categoriesData

    const CategoriesContent = () => {
        return(
            <div className=' pb-3 grid place-items-center'>
                <div className='border-[1px] bg-gray-300 border-gray-300 rounded-lg overflow-hidden grid  grid-flow-col gap-[1px]
                '>
                    {categories.cat1.map((cat1) =>{
                        return(
                            <button className='text-xl bg-white p-2 w-28'>
                                {cat1.name}
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
