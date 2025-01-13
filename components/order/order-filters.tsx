"use client";

import React, { useCallback, useState } from "react";
import useScreenSize from "@/lib/hooks/useScreenSize";
import OrderFilterMobile from "./order-filter-mobile";
import OrderFilterDesktop from "./order-filter-desktop";
import { useAppSelector } from "@/lib/store/redux-hooks";
import { DateRange } from "react-day-picker";
import { useRouter, useSearchParams } from "next/navigation";
import useLocation from "@/lib/hooks/useLocation";

const OrderFilters: React.FC<{}> = () => {
  const { dateRange } = useAppSelector((state) => state.order);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>();
  const { isMobile } = useScreenSize();
  const { location } = useLocation();

  const handleFilter = useCallback(
    (filter: string, value: string) => {
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set(filter, value);
        replace(`/main/order?${params.toString()}`);
      } else if (value === "" || !value) {
        location.search = "";
        replace(`/main/order?${location.search}`);
      }
    },
    [location, replace, searchParams],
  );

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
          handleFilter={handleFilter}
        />
      ) : (
        <OrderFilterDesktop
          calendarState={{ isCalendarOpen, setIsCalendarOpen }}
          selectedDateState={{ selectedDate, setSelectedDate }}
          handleApply={handleApply}
          handleFilter={handleFilter}
        />
      )}
    </>
  );
};
export default OrderFilters;
