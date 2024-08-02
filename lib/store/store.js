import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./products-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      products: productsSlice.reducer,
    },
  });
};
