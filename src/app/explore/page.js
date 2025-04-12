"use client";

import Options from "../Options";
import { useState, useRef, useEffect } from "react";
import Products from "../Products";
import { setProductList } from "../lib/features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../lib/api";

export default function ExploreAll() {
  const [sort, setSort] = useState("All");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products.productList);
  const isFetched = useSelector((state) => state.products.isFetched);
  const scroll = useSelector((state) => state.products.scrollY);

  const type = [
    "men's clothing",
    "women's clothing",
    "electronics",
    "jewelery",
  ];

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchAllProducts();
        dispatch(setProductList(response));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    if (!isFetched) {
      getProducts();
    } else {
      setLoading(false);
    }
  }, [dispatch, isFetched]);

  useEffect(() => {
    window.scrollTo(0, scroll);
  }, []);

  // Clone data to avoid mutating Redux state
  let sortedData = [...data];

  if (sort === "desc") {
    sortedData.sort((a, b) => b.price - a.price);
  } else if (sort === "asc") {
    sortedData.sort((a, b) => a.price - b.price);
  } else {
    sortedData.sort((a, b) => a.id - b.id);
  }

  const filteredData =
    category !== "All"
      ? sortedData.filter((item) => item.category === category)
      : sortedData;

  return (
    <div className="mt-12">
      <Options
        type={type}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      <div>
        <Products
          category={category}
          sort={sort}
          list={filteredData}
          loading={loading}
        />
      </div>
    </div>
  );
}
