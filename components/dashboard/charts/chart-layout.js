"use client";

import { useState } from "react";
import ChartDatePicker from "./chart-date-picker";
import SalesChart from "./sales-chart";
import { salesMonthlyData } from "@/lib/dummy-database";

const ChartLayout = () => {
  const [activeMonth, setActiveMonth] = useState(salesMonthlyData[0].name);

  return (
    <div className="mt-7 rounded-xl bg-white px-8 py-9 dark:bg-dark-50">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-dark-100 dark:text-white">
          Sales Details
        </h2>
        <ChartDatePicker
          months={salesMonthlyData}
          activeMonth={activeMonth}
          setActiveMonth={setActiveMonth}
        />
      </div>
      <div className="mt-5 h-72">
        <SalesChart
          month={salesMonthlyData.find(
            (month) => month.name === activeMonth && month,
          )}
        />
      </div>
    </div>
  );
};
export default ChartLayout;
