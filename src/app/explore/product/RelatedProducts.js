import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { fetchAllProducts } from "@/app/lib/api";
import { useEffect } from "react";
import { setProductList } from "@/app/lib/features/productSlice";
export default function RelatedProducts({ category, id }) {
  const relatedItems = useSelector((state) => state.products.productList);
  const isFetched = useSelector((state) => state.products.isFetched);
  const dispatch = useDispatch();

  useEffect(() => {
    const getRelatedProducts = async () => {
      try {
        const response = await fetchAllProducts();
        dispatch(setProductList(response));
      } catch (err) {
        console.error(err);
      }
    };
    if (!isFetched) {
      getRelatedProducts();
    }
  }, [isFetched, dispatch]);

  return (
    <>
      <div className="m-4">
        <h1 className="font-bold text-2xl">Related Products</h1>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 ">
          {relatedItems.map(
            (relatedItem) =>
              category === relatedItem.category &&
              relatedItem.id !== id && (
                <div key={relatedItem.id} className="">
                  <Link
                    href={{
                      pathname: `/explore/product`,
                      query: {
                        id: relatedItem.id,
                        title: relatedItem.title,
                        image: relatedItem.image,
                        price: relatedItem.price,
                        category: relatedItem.category,
                        description: relatedItem.description,
                      },
                    }}
                  >
                    <div
                      className={`grid grid-rows-1 rounded-md shadow-md p-4 bg-white  p-4 mt-2   `}
                    >
                      <img
                        src={relatedItem.image}
                        alt={relatedItem.title}
                        className="w-150 ml-auto mr-auto  h-[100px] hover:scale-105 duration-300 ease-in-out xl:h-[200px]"
                      />
                      <p className="line-clamp-2  font-bold">
                        {relatedItem.title}
                      </p>

                      <p className="font-bold">${relatedItem.price}</p>
                    </div>
                  </Link>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
}
