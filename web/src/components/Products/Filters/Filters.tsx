import { useContext } from "react";
import { ProductContext } from "../ProductsController";
import Categories from "./Categories";
import OrderStock from "./OrderStock";

function Filters() {
  const { showFilters, toggleShowFilters } = useContext(ProductContext);

  return (
    <section
      className={`${!showFilters && "opacity-0 pointer-events-none"} 
      transition z-10 fixed h-screen w-screen bg-gray-100 top-0 left-0 grid place-items-start
      
      lg:opacity-100 lg:h-70vh lg:col-start-1  lg:row-span-2 lg:row-start-1
      lg:w-[14rem] lg:pointer-events-auto
      lg:sticky lg:pt-10 lg:overflow-y-scroll 
      `}
    >
      <div className=" bg-gray-100  pt-10 
       max-w-[30rem] w-full
      pb-14 px-10 min-h-screen  lg:min-h-0 flex gap-5 flex-col lg:p-0 lg:pr-2  lg:pb-28">

        <div className=" flex flex-row justify-between">
          <h1 className=" text-2xl  font-semibold ml-[-3px]">Filtrera</h1>
          <span 
          onClick={() => toggleShowFilters()}
          className="material-icons-outlined text-2xl w-10 h-10 flex flex-col justify-center items-center lg:opacity-0 lg:pointer-events-none ">close</span>
        </div>

        <div className=" flex flex-col gap-4">
          <Categories/>
          <OrderStock/>

        </div>

      </div>
    </section>
  );
}

export default Filters;
