"use client";

import React, { useEffect, useState } from "react";
import { Calendar } from "../general/UI/calendar";
import { DateRange } from "react-day-picker";
import { useAppDispatch } from "@/lib/store/redux-hooks";
import { orderAction } from "@/lib/store/order-slice";

const OrderCalendar: React.FC<{}> = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(orderAction.setDateRange(dateRange));
  }, [dateRange, dispatch]);

  return (
    <>
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={setDateRange}
        className="rounded-md border"
        ISOWeek={true}
      />
    </>
  );
};
export default OrderCalendar;
