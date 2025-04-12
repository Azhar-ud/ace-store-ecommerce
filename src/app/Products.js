"use client";
import Link from "next/link";
import { addProduct, setScrollY } from "./lib/features/productSlice";
import { useDispatch } from "react-redux";

import toast from "react-hot-toast";

export default function Products({ list, loading }) {
  const dispatch = useDispatch();
  const addToCart = (title, image, price, id, category) => {
    const product = {
      title: title,
      image: image,
      price: price,
      category: category,
      id: id,
      quantity: 1,
    };
    console.log(product);
    dispatch(addProduct(product));
    dispatch(setScrollY(window.scrollY));
    toast.success("Added to Cart");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-6 gap-4">
      {loading
        ? Array(8)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="h-[400px] bg-white shadow-md rounded-md p-4 animate-pulse flex flex-col justify-between"
              >
                <div className="bg-gray-200 h-[250px] w-[200px] mx-auto rounded-md"></div>
                <div className="mt-4 space-y-2">
                  <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
                  <div className="bg-gray-200 h-3 w-full rounded"></div>
                  <div className="bg-gray-200 h-3 w-5/6 rounded"></div>
                </div>
                <div className="flex justify-between mt-4">
                  <div className="bg-gray-200 h-8 w-20 rounded"></div>
                  <div className="bg-gray-200 h-8 w-10 rounded"></div>
                </div>
              </div>
            ))
        : list.map((item) => (
            <div
              key={item.id}
              className="grid grid-rows-2 justify-center h-full rounded-md shadow-md p-4 bg-white"
            >
              <div className="row-span-3 p-4 w-[200px] h-[250px] ml-auto mr-auto object-cover">
                <Link
                  href={{
                    pathname: `/explore/product`,
                    query: {
                      id: item.id,
                      title: item.title,
                      image: item.image,
                      price: item.price,
                      category: item.category,
                      description: item.description,
                    },
                  }}
                >
                  <div className="hover:cursor-pointer h-full w-full flex justify-center dark:bg-gray-800">
                    <img
                      src={item.image}
                      width={200}
                      height={200}
                      alt="Product"
                      className="hover:cursor-pointer hover:scale-105 duration-300 ease-in-out flex"
                    />
                  </div>
                </Link>
              </div>
              <div className="flex flex-col justify-end grid grid-rows-2">
                <div>
                  <p className="font-bold mt-2">{item.title}</p>
                </div>
                <div>
                  <p className="line-clamp-3">{item.description}</p>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    className="rounded-lg p-1 bg-black text-white"
                    onClick={() =>
                      addToCart(
                        item.title,
                        item.image,
                        item.price,
                        item.id,
                        item.category
                      )
                    }
                  >
                    Add to Cart
                  </button>
                  <p className="font-bold">${item.price}.00</p>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}
