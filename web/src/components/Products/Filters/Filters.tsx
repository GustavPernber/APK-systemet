import { useContext } from "react";
import { ProductContext } from "../ProductsController";
import Categories from "./Categories";
import OrderStock from "./OrderStock";
import Icons from "@/components/Utils/Icons";
import Divider from "@/components/Utils/Divider";

function Filters() {
  const { showFilters, toggleShowFilters } = useContext(ProductContext);

  return (
    <section
      className={`${showFilters ? "preventBodyScroll" : "opacity-0 pointer-events-none"} 
      transition z-10 fixed h-screen w-screen bg-gray-100 top-0 left-0 flex justify-start items-center flex-col flex-1
      
      lg:opacity-100 lg:h-70vh lg:col-start-1  lg:row-span-2 lg:row-start-1
      lg:max-w-[14rem] lg:pointer-events-auto
      lg:sticky lg:pt-10 lg:overflow-y-scroll 
      `}
    >
      <div
        className=" bg-gray-100  pt-10 
      overflow-y-scroll
      max-w-[30rem] w-full
      max-h-screen
      pb-14 px-10 

      lg:min-h-0 flex gap-5 flex-col lg:p-0 lg:pr-2  lg:pb-28"
      >
        <div className=" flex flex-row justify-between">
          <h1 className=" text-2xl font-medium ml-[-3px]">Filtrera</h1>
          <span
            onClick={() => toggleShowFilters()}
            className="material-icons-outlined text-2xl w-10 h-10 flex flex-col justify-center items-center lg:opacity-0 lg:pointer-events-none  cursor-pointer"
          >
            <Icons.x style={{ color: "#00000" }} />
          </span>
        </div>

        <div className="grid grid-flow-row  gap-3">
          <Categories />

          <Divider />

          <OrderStock />
        </div>
      </div>
    </section>
  );
}

export default Filters;
