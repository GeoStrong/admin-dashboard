"use client";

import React, { createElement, JSX, useState } from "react";
import ChartDatePicker from "./chart-date-picker";
import SalesChart from "./sales-chart";
import {
  MonthSettings,
  revenueMonthlyData,
  salesMonthlyData,
} from "@/lib/dummy-database";
import RevenueChart from "./revenue-chart";

interface ChartsSettings extends MonthSettings {
  height: string;
  name: string;
  chartComponent: JSX.Element;
}

const ChartLayout: React.FC = () => {
  const [activeSalesMonth, setActiveSalesMonth] = useState(
    salesMonthlyData[0].name,
  );

  const [activeRevenueMonth, setActiveRevenueMonth] = useState(
    revenueMonthlyData[0].name,
  );

  const chartsSettingData: ChartsSettings[] = [
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
            className="mt-7 rounded-xl bg-white p-2 dark:bg-dark-50 sm:px-8 sm:py-9"
          >
            <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
              <h3 className="text-2xl font-bold text-dark-100 dark:text-white">
                {chartData.name}
              </h3>
              <ChartDatePicker
                monthData={chartData.monthData}
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
