import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  inbox: string;
} = {
  inbox: "",
};

const activeSlugSlice = createSlice({
  name: "activeSlug",
  initialState,
  reducers: {
    addInboxSlugName: (state, action) => {
      state.inbox = action.payload;
    },
  },
});

export const activeSlugAction = activeSlugSlice.actions;
export default activeSlugSlice;
