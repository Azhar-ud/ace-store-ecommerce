"use client";
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";

export const store = () => {
  return configureStore({
    reducer: {
      products: productReducer,
    },
  });
};
