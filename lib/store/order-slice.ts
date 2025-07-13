import { createSlice } from "@reduxjs/toolkit";
import { DateRange } from "react-day-picker";

const initialState: {
  dateRange: DateRange;
} = {
  dateRange: { from: new Date(), to: new Date() },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
  },
});

export const orderAction = orderSlice.actions;
export default orderSlice;
