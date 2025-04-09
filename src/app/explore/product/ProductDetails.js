"use client";

import { useSearchParams } from "next/navigation";
import { addProduct } from "@/app/lib/features/productSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

import toast from "react-hot-toast";
export default function ProductDetails({}) {
  const [quantity, setQuantity] = useState(1);
  const searchParams = useSearchParams();
  const item = {
    title: searchParams.get("title"),
    image: searchParams.get("image"),
    price: Number(searchParams.get("price")),
    description: searchParams.get("description"),
    id: Number(searchParams.get("id")),
    category: searchParams.get("category"),
    quantity: Number(searchParams.get("quantity")),
  };

  const IncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const DecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const dispatch = useDispatch();
  const add = (title, image, price, id, category) => {
    const product = {
      title: title,
      image: image,
      price: price * quantity,
      category: category,
      id: id,
      quantity: quantity,
    };
    dispatch(addProduct(product));
    toast.success("Added to Cart");
  };

  return (
    <>
      <div className=" flex gap-4  flex-col m-4 lg:flex-row lg:mt-10 lg:gap-10 lg:m-10 lg:p-10">
        <div className="p-14 flex justify-center lg:p-0 ">
          <img
            className="border rounded p-8 bg-white md:h-[400px] lg:max-w-lg  hover:scale-105 duration-300 ease-in-out xl:h-[500px]"
            src={searchParams.get("image")}
            alt="product"
          />
        </div>
        <div className="lg:justify-center lg:flex lg:flex-col lg:gap-4   ">
          <div className="">
            <div className="">
              <h1 className="font-bold text-2xl xl:text-4xl">{item.title}</h1>
            </div>
            <div>
              <p>${item.price}</p>
            </div>
            <div className="mb-4">
              <p className="text-slate-600">{item.description}</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            Quantity:
            <button
              onClick={DecreaseQuantity}
              className="rounded-full p-2 bg-gray-200 text-black"
            >
              -
            </button>
            <p>{quantity}</p>
            <button
              onClick={IncreaseQuantity}
              className="rounded-full p-2 bg-gray-200 text-black"
            >
              +
            </button>
          </div>

          <div className="mt-4 lg:mt-0">
            <button
              onClick={() =>
                add(item.title, item.image, item.price, item.id, item.category)
              }
              className=" rounded-3xl p-2 bg-black text-white"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
