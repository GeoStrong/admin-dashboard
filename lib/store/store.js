import { configureStore } from "@reduxjs/toolkit";
import linksMenuSlice from "./links-menu-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      linksMenu: linksMenuSlice.reducer,
    },
  });
};
