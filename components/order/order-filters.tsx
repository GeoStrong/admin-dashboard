"use client";

import React, { useCallback, useState, useTransition } from "react";
import useScreenSize from "@/lib/hooks/useScreenSize";
import OrderFilterMobile from "./order-filter-mobile";
import OrderFilterDesktop from "./order-filter-desktop";
import { useAppSelector } from "@/lib/store/redux-hooks";
import { DateRange } from "react-day-picker";
import { useRouter, useSearchParams } from "next/navigation";

const OrderFilters: React.FC<{}> = () => {
  const { dateRange } = useAppSelector((state) => state.order);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>();
  const { isMobile } = useScreenSize();
  const [isPending, startTransition] = useTransition();

  const handleFilter = useCallback(
    (filter: string, value: string) => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams);

        if (value) {
          params.set(filter, value);
          replace(`/main/order?${params.toString()}`);
        } else if (value === "" || !value) {
          params.delete(filter);
          replace(`/main/order?${params.toString()}`);
        }
      });
    },
    [replace, searchParams],
  );

  const handleReset = useCallback(() => {
    startTransition(() => {
      setSelectedDate(undefined);
      replace("/main/order");
    });
  }, [replace, setSelectedDate]);

  const handleApply = () => {
    setIsCalendarOpen(false);
    if (dateRange) {
      setSelectedDate(dateRange);
    }
  };

  return (
    <>
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
            </div>
          </div>
        </div>
      )}

      {isMobile ? (
        <OrderFilterMobile
          calendarState={{ isCalendarOpen, setIsCalendarOpen }}
          selectedDateState={{ selectedDate, setSelectedDate }}
          handleApply={handleApply}
          handleFilter={handleFilter}
          handleReset={handleReset}
        />
      ) : (
        <OrderFilterDesktop
          calendarState={{ isCalendarOpen, setIsCalendarOpen }}
          selectedDateState={{ selectedDate, setSelectedDate }}
          handleApply={handleApply}
          handleFilter={handleFilter}
          handleReset={handleReset}
        />
      )}
    </>
  );
};
export default OrderFilters;
