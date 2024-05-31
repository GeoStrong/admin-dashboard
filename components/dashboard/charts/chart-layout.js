"use client";

import { createElement, useState } from "react";
import ChartDatePicker from "./chart-date-picker";
import SalesChart from "./sales-chart";
import { revenueMonthlyData, salesMonthlyData } from "@/lib/dummy-database";
import RevenueChart from "./revenue-chart";

const ChartLayout = () => {
  const [activeSalesMonth, setActiveSalesMonth] = useState(
    salesMonthlyData[0].name,
  );

  const [activeRevenueMonth, setActiveRevenueMonth] = useState(
    revenueMonthlyData[0].name,
  );

  const chartsSettingData = [
    {
      height: "h-72",
      name: "Sales Details",
      monthData: salesMonthlyData,
      activeMonth: activeSalesMonth,
      setActiveMonth: setActiveSalesMonth,
      chartComponent: createElement(SalesChart, {
        month: salesMonthlyData.find(
          (month) => month.name === activeSalesMonth && month,
        ),
      }),
    },
    {
      height: "h-96",
      name: "Revenue Details",
      monthData: revenueMonthlyData,
      activeMonth: activeRevenueMonth,
      setActiveMonth: setActiveRevenueMonth,
      chartComponent: createElement(RevenueChart, {
        month: revenueMonthlyData.find(
          (month) => month.name === activeRevenueMonth && month,
        ),
      }),
    },
  ];

  return (
    <>
      {chartsSettingData.map((chartData) => {
        return (
          <div
            key={chartData.name}
            className="mt-7 rounded-xl bg-white px-8 py-9 dark:bg-dark-50"
          >
            <div className="flex justify-between">
              <h3 className="text-2xl font-bold text-dark-100 dark:text-white">
                {chartData.name}
              </h3>
              <ChartDatePicker
                months={chartData.monthData}
                activeMonth={chartData.activeMonth}
                setActiveMonth={chartData.setActiveMonth}
              />
            </div>
            <div className={`${chartData.height} mt-5`}>
              {chartData.chartComponent}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ChartLayout;
