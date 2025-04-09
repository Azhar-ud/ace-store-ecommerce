import { createSlice, current } from "@reduxjs/toolkit";

const setItemFunc = (products, totalAmount, totalQuantity) => {
  localStorage.setItem(
    "products",
    JSON.stringify(products.map((item) => item))
  );

  localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
  localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
};

const initialState = {
  products: [],
  totalAmount: 0,
  totalQuantity: 0,
  Details: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action) {
      const existing = state.products.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        state.products.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity += action.payload.quantity;
            item.price += action.payload.price;
          }
        });
      } else {
        console.log(action.payload);

        state.products.push(action.payload);
      }
      state.totalAmount =
        Math.round(
          state.products.reduce((acc, item) => acc + item.price, 0) * 100
        ) / 100;

      state.totalQuantity = state.products.length;
      setItemFunc(
        state.products.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
      console.log(state.totalAmount);
    },
    removeProduct(state, action) {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );

      state.totalAmount =
        Math.round(
          state.products.reduce((acc, item) => acc + item.price, 0) * 100
        ) / 100;
      console.log(state.totalAmount);
      state.totalQuantity = state.products.length;
      setItemFunc(state.products, state.totalAmount, state.totalQuantity);
    },
    addDetails(state, action) {
      if (state.Details === null || state.Details === undefined) {
        state.Details = [];
      }

      const existingDetail = state.Details.find(
        (item) => item.email === action.payload.email
      );

      if (existingDetail) {
        existingDetail.first_name = action.payload.first_name;
        existingDetail.last_name = action.payload.last_name;
        existingDetail.address = action.payload.address;
        existingDetail.city = action.payload.city;
      } else {
        state.Details.push(action.payload);
      }
    },
    rehydrateCart(state, action) {
      state.products = action.payload.products || [];
      state.totalAmount = action.payload.totalAmount || 0;
      state.totalQuantity = action.payload.totalQuantity || 0;
    },
  },
});

export const { addProduct, removeProduct, addDetails, rehydrateCart } =
  productSlice.actions;
export default productSlice.reducer;
