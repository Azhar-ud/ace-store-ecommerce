"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Details({ product, setProduct }) {
  const pathname = usePathname();

  return (
    <>
      {console.log}
      <div>Details</div>
      <div className="">
        <div className="bg-white rounded-md shadow-md p-4 h-full flex flex-col justify-center">
          <div className="hover:cursor-pointer h-full w-full flex justify-center">
            <Link href="">
              <img
                src={product.image}
                width={200}
                height={200}
                alt="Modal"
                className="hover:cursor-pointer hover:scale-105 duration-300 ease-in-out flex "
              />
            </Link>
          </div>
          <p className=" font-bold mt-2">{product.title}</p>
          <p className="line-clamp-3">{product.description}</p>
          <div className="flex justify-between mt-4">
            <button className=" rounded-lg p-1 bg-black text-white">
              Add to Cart
            </button>
            <p className="font-bold">${product.price}.00</p>
          </div>
        </div>
      </div>
    </>
  );
}
