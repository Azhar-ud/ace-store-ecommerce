import { useSelector } from "react-redux";
import { MdShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeProduct, rehydrateCart } from "./lib/features/productSlice";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useEffect } from "react";

import Link from "next/link";
import toast from "react-hot-toast";

export default function Cart({ openCart, setOpenCart }) {
  const products = useSelector((state) => state.products.products);
  const length = useSelector((state) => state.products.products.length);
  const dispatch = useDispatch();
  const total = useSelector((state) => state.products.totalAmount);

  const remove = (id) => {
    dispatch(removeProduct({ id }));
    toast.error("Removed from Cart");
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const products = JSON.parse(localStorage.getItem("products")) || [];
      const totalAmount = JSON.parse(localStorage.getItem("totalAmount")) || 0;
      const totalQuantity =
        JSON.parse(localStorage.getItem("totalQuantity")) || 0;

      dispatch(
        rehydrateCart({
          products,
          totalAmount,
          totalQuantity,
        })
      );
    }
  }, []);

  return (
    <>
      {openCart ? (
        <>
          <div
            onClick={() => setOpenCart(!openCart)}
            className={`  ${
              openCart
                ? " inset-0 w-full h-full bg-black opacity-25 top-0 fixed z-50 "
                : "hidden"
            }`}
          >
            {console.log(openCart)}
          </div>

          <div
            className={`
              fixed top-0 right-0 h-full w-[300px] lg:w-[420px] bg-white z-50 flex flex-col  
              transform transition-transform duration-300 ease-in-out overflow-y-auto
              border-2 
              ${openCart ? "translate-x-0" : "translate-x-full"}
          `}
          >
            <div className="grid grid-rows-5 h-full">
              <div className=" flex flex-col justify-center items-center bg-gray-200 p-6 font-bold text-2xl  z-50 top-0 w-full ">
                <h1>
                  <MdShoppingCart />
                </h1>
                <h2>Cart</h2>
              </div>
              <div className="row-span-4 overflow-y-auto px-2">
                {products.length > 0 ? (
                  products.map((product) => (
                    <div key={product.id}>
                      <div className="grid grid-cols-2  border-b p-4 mt-4 relative ">
                        <IoIosCloseCircleOutline
                          className=" absolute top-[-8px]  right-0 cursor-pointer  mr-2 text-xl "
                          onClick={() => remove(product.id)}
                        />
                        <div className="object-cover w-full h-full ">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-40 h-20 object-scale-down"
                          />
                        </div>
                        <div className="font-bold text-[12px] ">
                          <h2>{product.title}</h2>
                          <p className="text-slate-400 text-[10px] capitalize">
                            Category: {product.category}
                          </p>
                          <p className="text-slate-400 text-[10px]">
                            Quantity:{" "}
                            {product.quantity ? product.quantity : "1"}
                          </p>
                          <p className="">Price: ${product.price}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 flex justify-center ">
                    No items Yet{console.log(total)}
                  </div>
                )}
              </div>
              <div
                className={`${length === 0 ? "hidden" : ""}
                p-4 bg-gray-200 rounded  w-full bg-gray-200     `}
              >
                <div className="flex justify-between  mb-8 text-lg font-bold">
                  <h3>Checkout</h3>
                  <p>Total: ${(total * 1000) / 1000}</p>
                </div>
                <div>
                  <Link type="button" href="/checkout">
                    <button
                      onClick={() => setOpenCart(!openCart)}
                      className="bg-black text-white p-2 rounded-md w-full"
                    >
                      Checkout{console.log(length)}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
