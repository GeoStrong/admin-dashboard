"use client";

import React, { useState } from "react";
import useScreenSize from "@/lib/hooks/useScreenSize";
import OrderFilterMobile from "./order-filter-mobile";
import OrderFilterDesktop from "./order-filter-desktop";
import { useAppSelector } from "@/lib/store/redux-hooks";
import { DateRange } from "react-day-picker";

const OrderFilters: React.FC<{}> = () => {
  const { dateRange } = useAppSelector((state) => state.order);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>();
  const { isMobile } = useScreenSize();

  const handleApply = () => {
    setIsCalendarOpen(false);
    setSelectedDate(dateRange);
  };

  return (
    <>
      {isMobile ? (
        <OrderFilterMobile
          calendarState={{ isCalendarOpen, setIsCalendarOpen }}
          selectedDateState={{ selectedDate, setSelectedDate }}
          handleApply={handleApply}
        />
      ) : (
        <OrderFilterDesktop
          calendarState={{ isCalendarOpen, setIsCalendarOpen }}
          selectedDateState={{ selectedDate, setSelectedDate }}
          handleApply={handleApply}
        />
      )}
    </>
  );
};
export default OrderFilters;
