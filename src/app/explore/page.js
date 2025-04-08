"use client";
import Navbar from "../Navbar";
import Options from "../Options";
import { use, useState, useRef } from "react";
import Products from "../Products";
import { useEffect } from "react";
import { GiVortex } from "react-icons/gi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector } from "react-redux";
export default function ExploreAll({}) {
  const [data, setData] = useState();
  const [sort, setSort] = useState("All");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchedRef = useRef(false);
  const type = [
    "men's clothing",
    "women's clothing",
    "electronics",
    "jewelery",
  ];
  const fetchData = async () => {
    try {
      let response = await fetch("https://fakestoreapi.com/products");
      response = await response.json();

      setData(response);
      console.log(response);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  if (sort == "desc") {
    console.log("desc");
    data.sort((a, b) => {
      return b.price - a.price;
    });
  }
  if (sort == "asc") {
    data.sort((a, b) => {
      return a.price - b.price;
    });
  }
  if (sort == "all") {
    data.sort((a, b) => {
      return a.id - b.id;
    });
  }
  const listing = () => {
    return data.filter((item) => {
      return item.category == category;
    });
  };
  useEffect(() => {
    if (!fetchedRef.current) {
      fetchData();
      console.log("fetching");
      fetchedRef.current = true;
    }
  }, []);

  return (
    <>
      <div className="mt-12">
        <Options
          type={type}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
        />
        {loading ? (
          <div className="animate-spin text-4xl flex justify-center items-center">
            <AiOutlineLoading3Quarters />
          </div>
        ) : (
          <div>
            <Products
              category={category}
              sort={sort}
              list={category != "All" ? listing() : data}
              loading={loading}
            />
          </div>
        )}
      </div>
    </>
  );
}
