"use client";
import Link from "next/link";
import Cart from "./Cart";
import { IoReorderThreeOutline } from "react-icons/io5";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { rehydrateCart } from "./lib/features/productSlice";
rehydrateCart();

export default function Navbar({}) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const count = useSelector((state) => state.products.totalQuantity);

  return (
    <>
      <div>
        <div
          className={`flex  justify-around 
         border-b border-gray-400   text-2xl font-bold p-2  fixed top-0 w-full bg-white z-50 lg:border-none lg:bg-gray-100 lg:text-md py-2 `}
        >
          <div className="hidden lg:block">
            <Link href={"/"}>Ace Store</Link>
          </div>
          <div className="lg:hidden">
            {open ? (
              <MdCancel onClick={() => setOpen(!open)} />
            ) : (
              <IoReorderThreeOutline
                className={`${open ? "fade-in" : "fade-out"}`}
                onClick={() => setOpen(!open)}
              />
            )}
          </div>
          <div className="ml-[83px] lg:hidden">
            <Link className="" href={"/"}>
              Ace Store
            </Link>
          </div>
          <div className="hidden lg:block lg:flex lg:gap-6">
            <Link className={path === "/" ? "underline" : ""} href={"/"}>
              Home
            </Link>
            <Link
              className={path === "/explore" ? "underline" : ""}
              href={"/explore"}
            >
              Explore All
            </Link>
          </div>
          <div className="ml-[80px] relative hover:cursor-pointer">
            <div
              className="text-[10px] p-2 rounded-full bg-black text-white flex items-center justify-center font-mono absolute inset-2 top-[-10px] px-2 "
              style={{ width: "10px", height: "10px" }}
            >
              {count}
            </div>
            <h1>
              <MdShoppingCart onClick={() => setOpenCart(!openCart)} />
            </h1>
          </div>
        </div>
        <Cart openCart={openCart} setOpenCart={setOpenCart} />
        <div
          onClick={() => setOpen(!open)}
          className={`${
            open
              ? "fixed inset-0 w-full h-full bg-black opacity-25 top-[49px]"
              : "hidden"
          }`}
        ></div>
        <div
          className={` w-[200px] fixed top-[49px] left-0 h-full border-r border-b bg-white  z-50  text-2xl border-black duration-300 ease-out transition-all rounded  ${
            open ? "translate-x-0" : "-translate-x-full"
          }    `}
        >
          <div className="flex-col flex mt-4  items-center space-y-4   ">
            <div>
              <div className="border-black ">
                <h1
                  className={`${
                    path === "/"
                      ? "border-b border-black font-bold bg-gray"
                      : ""
                  }`}
                >
                  <Link href={"/"}>Home</Link>
                </h1>
              </div>
            </div>

            <div>
              <Link
                href="/explore"
                className={`${
                  path === "/explore" ? "font-bold border-b border-black" : ""
                }`}
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
