import Accordion from "@/components/Utils/Accordion";
import { ProductContext } from "@/components/Products/ProductsController";
import { useCallback, useContext } from "react";
import { AppContext } from "@/components/Body";
import { Cat1 } from "@/api/api";

function Categories() {
  const { catFilters, setCatFilters } = useContext(ProductContext);
  const { metadata } = useContext(AppContext);

  const CategoriesContent = useCallback(() => {
    const categoriesWithAll: Cat1[] = [
      { value: "all", friendlyUrl: "", cat2: [] },
      ...metadata.categories.categories,
    ];

    return (
      <div className=" pb-3 grid place-items-start">
        <div
          className="border-[1px]  border-gray-200  bg-gray-200
                rounded-md overflow-hidden flex flex-col gap-[1px] w-full
                "
        >
          {categoriesWithAll.map((category) => {
            return (
              <div key={category.value} className=" bg-gray-200 ">
                <button
                  onClick={() => {
                    if (catFilters.cat1 === category.value) {
                      setCatFilters({
                        cat1: "all",
                        cat2: [],
                      });
                      return;
                    }
                    setCatFilters({
                      cat1: category.value,
                      cat2: [],
                    });
                  }}
                  className={`${catFilters.cat1 === category.value ? "bg-green-400 text-white font-semibold " : "hover:bg-gray-200 text-gray-700"} 
                            bg-white transition duration-75 text-sm py-3 pr-8 pl-4 w-full grid place-content-start text-left `}
                >
                  {category.value === "all" ? "Visa alla" : category.value}
                </button>

                {category.cat2 && (
                  <div
                    className={`${catFilters.cat1 === category.value ? "h-full" : "pointer-events-none h-0 opacity-0"} overflow-hidden`}
                  >
                    {category.cat2.map((category2) => {
                      return (
                        <div
                          onClick={() => {
                            if (catFilters.cat2?.includes(category2.value)) {
                              setCatFilters((prev) => ({
                                ...prev,
                                cat2:
                                  prev.cat2?.filter(
                                    (el) => el !== category2.value,
                                  ) ?? [],
                              }));
                              return;
                            } else {
                              setCatFilters((prev) => ({
                                ...prev,
                                cat2: prev.cat2
                                  ? [...prev.cat2, category2.value]
                                  : [category2.value],
                              }));
                            }
                          }}
                          className="hover:bg-gray-200  pl-5 border-b-[1px] border-gray-100 bg-white transition duration-75 flex flex-row justify-start items-center"
                          key={category2.value}
                        >
                          <input
                            readOnly={true}
                            checked={catFilters.cat2?.includes(category2.value)}
                            type="checkbox"
                            className="shrink-0  border-gray-200 cursor-pointer rounded text-green-400  p-1  focus:ring-0"
                            id="hs-checked-checkbox"
                          />
                          <span
                            className={` text-left  cursor-pointer text-sm py-3 pr-8 pl-4 w-full text-gray-600 `}
                          >
                            {category2.value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [metadata, catFilters, setCatFilters]);

  return (
    <Accordion
      contentComponent={<CategoriesContent />}
      title="Kategorier"
    ></Accordion>
  );
}

export default Categories;
