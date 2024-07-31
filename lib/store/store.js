import { configureStore } from "@reduxjs/toolkit";
import linksMenuSlice from "./links-menu-slice";
import productsSlice from "./products-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      linksMenu: linksMenuSlice.reducer,
      products: productsSlice.reducer,
    },
  });
};
