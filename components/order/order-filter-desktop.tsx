"use client";

import React, { useEffect, useState } from "react";
import { orderFilterMenu } from "@/lib/dummy-database";
import {
  formatDateRange,
  makeFirstLetterUppercase,
} from "@/lib/functions/functions";
import { Button } from "../general/UI/button";
import { GrPowerReset } from "react-icons/gr";
import { BiFilterAlt } from "react-icons/bi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../general/UI/select";
import { OrderFilterMobileProps } from "@/lib/types/types";

const OrderFilterDesktop: React.FC<OrderFilterMobileProps> = ({
  calendarState,
  selectedDateState,
  handleApply,
  handleFilter,
}) => {
  const [filterValues, setFilterValues] = useState({
    type: "Type",
    status: "Status",
  });
  const { isCalendarOpen, setIsCalendarOpen } = calendarState;
  const { selectedDate } = selectedDateState;

  const onFilterValueChange = (key: string, newValue: string) =>
    setFilterValues((prevState) => ({
      ...prevState,
      [key]: newValue,
    }));

  useEffect(() => {
    selectedDate && handleFilter("date", formatDateRange(selectedDate));
  }, [handleFilter, selectedDate]);

  return (
    <div className="max-h-18 relative mt-3 flex w-full items-center">
      <div className="flex items-center gap-2 rounded-none rounded-l-xl border bg-white p-5 text-sm font-bold hover:bg-gray-100 dark:bg-dark-150 hover:dark:bg-dark-50">
        <BiFilterAlt className="text-xl" />
        <span className="hidden lg:block">Filter By</span>
      </div>
      {Object.entries(orderFilterMenu).map(([key, value]) => (
        <>
          {key !== "date" ? (
            <div key={key}>
              <Select
                onValueChange={(value) => {
                  handleFilter(key, value);
                  return onFilterValueChange(key, value);
                }}
              >
                <SelectTrigger className="flex h-full min-w-40 items-center gap-2 rounded-none border border-l-0 bg-white p-5 text-sm font-bold hover:bg-gray-100 focus:ring-0 dark:bg-dark-150 hover:dark:bg-dark-50">
                  <SelectValue placeholder={filterValues[key]} />
                </SelectTrigger>
                <SelectContent className="bg-white text-center dark:bg-dark-150">
                  {value.map((item: string) => (
                    <SelectItem key={item} value={item}>
                      {makeFirstLetterUppercase(item)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="relative" key={key}>
              <div
                className="flex h-full min-w-40 cursor-pointer items-center gap-2 rounded-none border border-l-0 bg-white p-5 text-sm font-bold hover:bg-gray-100 dark:bg-dark-150 hover:dark:bg-dark-50"
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              >
                {selectedDate ? formatDateRange(selectedDate) : "Date"}
              </div>

              {isCalendarOpen && (
                <div className="absolute z-10 mt-2 rounded-md border bg-white p-4 dark:bg-dark-150">
                  {value}
                  <Button
                    onClick={handleApply}
                    className="mt-2 w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
                  >
                    Apply
                  </Button>
                </div>
              )}
            </div>
          )}
        </>
      ))}
      <Button
        onClick={() => {
          Object.entries(orderFilterMenu).map(([key]) => {
            handleFilter(key, "");
          });
        }}
        className="flex h-full items-center gap-2 rounded-none rounded-r-xl border border-l-0 bg-white p-5 text-sm font-bold text-red-500 hover:bg-gray-100 dark:bg-dark-150 hover:dark:bg-dark-50"
      >
        <GrPowerReset className="text-red-500" />
        Reset Filter
      </Button>
    </div>
  );
};
export default OrderFilterDesktop;
