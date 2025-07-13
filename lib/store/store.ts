import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./products-slice";
import inboxMessagesSlice from "./inbox-messages-slice";
import activeSlugSlice from "./active-slug-slice";
import orderSlice from "./order-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      products: productsSlice.reducer,
      inboxMessages: inboxMessagesSlice.reducer,
      activeSlug: activeSlugSlice.reducer,
      order: orderSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
