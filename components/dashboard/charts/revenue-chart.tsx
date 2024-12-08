"use client";

import { ChartData } from "@/lib/dummy-database";
import useModeSwitch from "@/lib/hooks/useModeSwitch";
import useScreenSize from "@/lib/hooks/useScreenSize";
import React from "react";
import {
  CartesianGrid,
  LineChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
  Area,
} from "recharts";

const RevenueChart: React.FC<{ month: ChartData }> = ({ month }) => {
  const { themeProperty: axisColor } = useModeSwitch("#6b6e70", "#fff");
  const { isXsm, isSm } = useScreenSize();

  return (
    <ResponsiveContainer>
      <AreaChart
        data={month.data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="95%" stopColor="#B38BD5" stopOpacity={0.9} />
            <stop offset="5%" stopColor="#B38BD5" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="100%" stopColor="#D37B64" stopOpacity={0.8} />
            <stop offset="5%" stopColor="#D37B64" stopOpacity={0} />
          </linearGradient>
        </defs>
        {!isXsm && (
          <XAxis
            stroke={axisColor}
            axisLine={false}
            allowDataOverflow={true}
            tickSize={0}
            tick={{
              fontWeight: 600,
              fontSize: isSm ? 12 : 16,
            }}
            tickMargin={15}
            tickFormatter={(value) => `${value * 5}k`}
          />
        )}
        {!isXsm && (
          <YAxis
            stroke={axisColor}
            axisLine={false}
            tickSize={0}
            tickMargin={15}
            tick={{
              fontWeight: 600,
              fontSize: isSm ? 12 : 16,
            }}
            domain={[0, 100]}
            allowDataOverflow={true}
            tickFormatter={(value) => `${value}%`}
          />
        )}
        <CartesianGrid vertical={false} />
        <Tooltip
          cursor={false}
          content={({ payload }) => {
            return payload.length !== 0 ? (
              <div className="rounded-sm border-none bg-orange-400 p-3 px-6 py-2">
                <p className="font-semibold text-white">
                  Sales {payload[0].payload.Sales}%
                </p>
                <p className="font-semibold text-white">
                  Profit {payload[0].payload.Profit}%
                </p>
              </div>
            ) : null;
          }}
        />
        <Area
          type="monotone"
          dataKey="Sales"
          stroke="#B38BD5"
          fillOpacity={1}
          fill="url(#colorSales)"
        />
        <Area
          type="monotone"
          dataKey="Profit"
          stroke="#D37B64"
          fillOpacity={1}
          fill="url(#colorProfit)"
        />
        <Legend
          iconType="circle"
          wrapperStyle={{ direction: "-moz-initial" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default RevenueChart;
