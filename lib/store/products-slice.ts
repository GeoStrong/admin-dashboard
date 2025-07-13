import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../types/types";

const initialState: { favoriteProducts: Product[] } = {
  favoriteProducts: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addFavoriteProduct: (state, action) => {
      state.favoriteProducts.push(action.payload);
    },
    removeFavoriteProduct: (state, action) => {
      state.favoriteProducts = state.favoriteProducts.filter(
        (product) => product.id !== action.payload.id,
      );
    },
  },
});

export const productsAction = productsSlice.actions;
export default productsSlice;
