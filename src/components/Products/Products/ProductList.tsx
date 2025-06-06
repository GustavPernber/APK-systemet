import Product from "./Product";
import SkeletonProductList from "@/components/Products/Products/SkeletonProductList";
import { useContext, useMemo } from "react";
import { ProductContext } from "../ProductsController";
import Icons from "@/components/Utils/Icons";

const ProductList = () => {
  const { products, fetchMore, isLoading } = useContext(ProductContext);

  const LoadMoreButton = () => {
    return (
      <button
        type="button"
        onClick={() => {
          fetchMore();
        }}
        className="w-40 h-12 font-sans font-bold text-white bg-green-400 rounded-full "
      >
        Visa fler
      </button>
    );
  };

  const loadingOnTop = products.length < 1;

  const productElements = useMemo(() => {
    if (!products) {
      return [];
    }
    const list = products.map((product) => {
      return <Product product={product} key={product.dbId} />;
    });

    return list;
  }, [products]);

  return (
    <div className="flex flex-col items-center justify-start flex-auto ">
      <div className="grid w-full grid-flow-row gap-5 pb-10 md:grid-cols-2 md:col-start-2">
        {isLoading && loadingOnTop && <SkeletonProductList />}
        {productElements}
        {isLoading && !loadingOnTop && <SkeletonProductList />}
      </div>

      {!isLoading && productElements.length < 1 && (
        <div className="flex flex-col items-center justify-center gap-4">
          <Icons.search className="text-gray-300 h-[6rem] w-[6rem]" />
          <p className="font-serif text-xl text-gray-700">
            {"Inga sökträffar"}
          </p>
        </div>
      )}

      {productElements.length % 30 === 0 && productElements.length > 0 && (
        <LoadMoreButton />
      )}
    </div>
  );
};

export default ProductList;
