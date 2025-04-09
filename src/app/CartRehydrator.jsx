"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { rehydrateCart } from "./lib/features/productSlice";

export default function CartRehydrator() {
  const dispatch = useDispatch();

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const totalAmount = JSON.parse(localStorage.getItem("totalAmount")) || 0;
    const totalQuantity =
      JSON.parse(localStorage.getItem("totalQuantity")) || 0;

    dispatch(rehydrateCart({ products, totalAmount, totalQuantity }));
  }, [dispatch]);

  return null;
}
