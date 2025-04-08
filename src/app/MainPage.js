import Link from "next/link";
import Image from "next/image";
import fashionPic from "../../public/fashion-Ecommerce1.jpg";
import fashionPic2 from "../../public/fashionPic-2.jpg";
import fashionPic3 from "../../public/fashionPic-3.jpg";

export default function MainPage() {
  return (
    <>
      <div className="lg:grid lg:grid-cols-5 lg:gap-4 mt-32 lg:m-20  ">
        <div className=" p-6 lg:col-span-3  ">
          <div className="mb-4">
            <div className="mb-4">
              <h1 className="font-bold text-4xl font-babes">
                {"Experience the height of fashion with our exquisite designer pieces".toUpperCase()}
              </h1>
            </div>
            <div>
              <p
                className=" text
          -
          2xl"
              >
                Where style, sophistication, exclusivity is the forefront of our
                collection. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Repellat quaerat nostrum quia nam earum, libero, expedita
                impedit delectus provident quo eveniet.
              </p>
            </div>
          </div>
          <div>
            <button className="rounded-lg p-1 bg-black text-white p-2 font-light flex flex-start">
              <Link prefetch href={"/explore"}>
                Discover Our Products
              </Link>
            </button>
          </div>
        </div>

        <div className="hidden lg:block lg:gap-4 ">
          <Image
            src={fashionPic}
            width={350}
            height={350}
            alt="Modal"
            className="hover:cursor-pointer hover:scale-105 duration-300 ease-in-out flex grayscale hover:grayscale-0 rounded-lg "
          />
          <Image
            src={fashionPic2}
            width={350}
            height={350}
            alt="Modal"
            className="hover:cursor-pointer hover:scale-105 duration-300 ease-in-out flex grayscale hover:grayscale-0 rounded-lg mt-1 "
          />
        </div>
        <Image
          src={fashionPic3}
          width={350}
          height={350}
          alt="Modal"
          className="hover:cursor-pointer hover:scale-105 duration-300 ease-in-out flex grayscale hover:grayscale-0 rounded-lg hidden lg:block"
          priority={true}
        />
      </div>
    </>
  );
}
