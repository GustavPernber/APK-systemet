import { useContext } from "react";
import { ProductContext } from "../../ProductsController";
import Categories from "./categories/Categories";

function Filters() {
  const { showFilters, toggleShowFilters } = useContext(ProductContext);

  return (
    <section
      className={`${showFilters && "opacity-0 pointer-events-none"} 
       transition z-10 absolute h-screen w-screen bg-gray-100 top-0 left-0 `}
    >
      <div className=" bg-gray-100 w-full py-6 px-10 min-h-screen flex gap-5 flex-col">

        <div className=" flex flex-row justify-between">
          <h1 className=" text-4xl font-bold">Filtrera</h1>
          <span 
          onClick={() => toggleShowFilters()}
          className="material-icons-outlined text-2xl">close</span>
        </div>

        <div>
          <Categories></Categories>

        </div>

      </div>
    </section>
  );
}

export default Filters;
