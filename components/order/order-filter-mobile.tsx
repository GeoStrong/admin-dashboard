import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../general/UI/dialog";
import { BiFilterAlt } from "react-icons/bi";
import { orderFilterMenu } from "@/lib/dummy-database";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../general/UI/select";
import {
  formatDateRange,
  makeFirstLetterUppercase,
} from "@/lib/functions/functions";
import { Button } from "../general/UI/button";
import { GrPowerReset } from "react-icons/gr";
import { OrderFilterMobileProps } from "@/lib/types/types";
import { useSearchParams } from "next/navigation";

const OrderFilterMobile: React.FC<OrderFilterMobileProps> = ({
  calendarState,
  selectedDateState,
  handleApply,
  handleFilter,
  handleReset,
}) => {
  const [filterValues, setFilterValues] = useState({
    type: "Type",
    status: "Status",
  });
  const { isCalendarOpen, setIsCalendarOpen } = calendarState;
  const { selectedDate } = selectedDateState;
  const searchParams = useSearchParams();

  const onFilterValueChange = (key: string, newValue: string) =>
    setFilterValues((prevState) => ({
      ...prevState,
      [key]: newValue,
    }));

  const resetFilters = () => {
    setFilterValues({
      type: "Type",
      status: "Status",
    });
    handleReset();
  };

  const activeFiltersCount = Array.from(searchParams.entries()).length;

  useEffect(() => {
    if (selectedDate && selectedDate.from && selectedDate.to) {
      handleFilter("date", formatDateRange(selectedDate));
    }
  }, [handleFilter, selectedDate]);

  return (
    <div className="mt-3 flex items-center justify-end gap-2">
      <Button
        onClick={resetFilters}
        className="flex items-center gap-2 rounded-xl bg-white p-5 text-sm font-bold text-red-500 hover:bg-gray-100 dark:bg-dark-150 hover:dark:bg-dark-50"
      >
        <GrPowerReset className="text-red-500" />
        Reset Filter
      </Button>
      <Dialog>
        <DialogTrigger className="rounded-xl bg-white p-3 dark:bg-dark-150">
          <div className="relative">
            <BiFilterAlt className="text-xl" />
            {activeFiltersCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                {activeFiltersCount}
              </span>
            )}
          </div>
        </DialogTrigger>
        <DialogContent className="w-4/5 rounded-xl bg-white dark:bg-dark-50">
          <DialogHeader>
            <DialogTitle>Filter By</DialogTitle>
            <DialogDescription>
              <div className="mt-3">
                {Object.entries(orderFilterMenu).map(([key, value]) => (
                  <>
                    {key !== "date" ? (
                      <div key={key} className="flex gap-2">
                        <Select
                          value={
                            filterValues[key] === makeFirstLetterUppercase(key)
                              ? ""
                              : filterValues[key]
                          }
                          onValueChange={(value) => {
                            handleFilter(key, value);
                            return onFilterValueChange(key, value);
                          }}
                        >
                          <SelectTrigger className="flex items-center gap-2 rounded-sm bg-white p-3 text-sm font-bold hover:bg-gray-100 focus:ring-0 dark:bg-dark-150 hover:dark:bg-dark-50">
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
                          className="flex cursor-pointer items-center gap-2 rounded-sm border bg-white p-3 text-sm font-bold hover:bg-gray-100 dark:bg-dark-150 hover:dark:bg-dark-50"
                          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                        >
                          {selectedDate
                            ? formatDateRange(selectedDate)
                            : "Date"}
                        </div>

                        {isCalendarOpen && (
                          <div className="absolute left-1/2 top-1/2 z-10 mt-2 -translate-x-1/2 -translate-y-1/2 transform rounded-md border bg-white p-4 dark:bg-dark-150">
                            {value}
                            <Button
                              onClick={() => {
                                handleApply();
                                setIsCalendarOpen(false);
                              }}
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
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-3 flex flex-row items-center gap-2 sm:justify-start">
            <Button
              onClick={resetFilters}
              type="button"
              className="w-10 bg-white text-red-500 dark:bg-dark-100"
            >
              <GrPowerReset className="text-red-500" />
            </Button>
            <DialogClose asChild className="w-full">
              <Button type="button" variant="secondary">
                Apply Filters
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default OrderFilterMobile;
