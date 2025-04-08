"use client";
import { useSelector } from "react-redux";
import { useState } from "react";
import { addDetails } from "../lib/features/productSlice";
import { useDispatch } from "react-redux";

import toast from "react-hot-toast";

export default function Checkout() {
  const total = useSelector((state) => state.products.totalAmount);
  const redirect = () => {
    window.location.href = "/";
  };

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [details, setDetails] = useState({
    email: "",
    first_name: "",
    last_name: "",
    address: "",
    city: "",
  });
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    const { email, first_name, last_name, address, city } = details;
    if (!email || !first_name || !last_name || !address || !city) {
      toast.error("Please fill out all required fields");
    } else if (products.length > 0) {
      console.log("details", details);
      dispatch(addDetails(details));
      toast.success("Order Placed");
      redirect();
    }

    if (products.length === 0) {
      toast.error("Please add items to cart");
    }

    e.preventDefault();
  };
  return (
    <>
      <div className="mt-14   lg:grid lg:grid-cols-2 ">
        <div className="bg-white rounded-md shadow-md p-4 m-8 grid grid-rows-8     lg:order-2  ">
          <div className="">
            <h1 className="font-bold text-2xl font-babes border-b border-black  flex justify-center">
              {"Order Summary".toUpperCase()}
            </h1>
          </div>
          <div className="row-span-8 overflow-y-auto px-2">
            {products.map((item) => {
              return (
                <div key={item.id} className="flex  justify-between gap-4 mb-4">
                  <div className="font-bold">
                    <h2>
                      {item.quantity}*{item.title}
                    </h2>
                  </div>
                  <div>
                    <p>${item.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between border-t border-black">
            <h2 className="">Total</h2>
            <h2 className="font-bold">{total}</h2>
          </div>
        </div>
        <form className="m-4 space-y-4  " onSubmit={handleSubmit}>
          <div>
            <h1 className="font-bold text-2xl">Contact Information</h1>
            <input
              type="email"
              onChange={handleChange}
              name="email"
              placeholder="Email"
              className={`w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out `}
            />
          </div>
          <div>
            <h1 className="font-bold text-2xl">Shipping Address</h1>
          </div>
          <div className="flex gap-2">
            <input
              type="name"
              name="first_name"
              placeholder="First Name"
              onChange={handleChange}
              className="w-1/2 rounded border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            <input
              type="name"
              name="last_name"
              placeholder="Last Name"
              onChange={handleChange}
              className="w-1/2 rounded border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="space-y-4">
            <input
              type="address"
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            <input
              type="city"
              name="city"
              placeholder="City"
              onChange={handleChange}
              className="w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div>
            <button className="border border-black bg-black text-white rounded-lg p-2 font-bold w-full  ">
              Checkout
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
