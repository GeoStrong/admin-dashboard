import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const linksMenuSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    displayHandler: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const linksAction = linksMenuSlice.actions;
export default linksMenuSlice;
