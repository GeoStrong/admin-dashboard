import React from "react";
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
import { orderFilterMenu, OrderFilterMobileProps } from "@/lib/dummy-database";
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

const OrderFilterMobile: React.FC<OrderFilterMobileProps> = ({
  calendarState,
  selectedDateState,
  handleApply,
}) => {
  const { isCalendarOpen, setIsCalendarOpen } = calendarState;
  const { selectedDate, setSelectedDate } = selectedDateState;

  return (
    <div className="mt-3 flex items-center justify-end gap-2">
      <Button className="flex items-center gap-2 rounded-xl bg-white p-5 text-sm font-bold text-red-500 hover:bg-gray-100 dark:bg-dark-150 hover:dark:bg-dark-50">
        <GrPowerReset className="text-red-500" />
        Reset Filter
      </Button>
      <Dialog>
        <DialogTrigger className="rounded-xl bg-white p-3 dark:bg-dark-150">
          <BiFilterAlt className="text-xl" />
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
                        <Select>
                          <SelectTrigger className="flex items-center gap-2 rounded-sm bg-white p-3 text-sm font-bold hover:bg-gray-100 focus:ring-0 dark:bg-dark-150 hover:dark:bg-dark-50">
                            <SelectValue
                              placeholder={makeFirstLetterUppercase(key)}
                            />
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
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-3 flex flex-row items-center gap-2 sm:justify-start">
            <Button className="w-10 bg-white text-red-500 dark:bg-dark-100">
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
