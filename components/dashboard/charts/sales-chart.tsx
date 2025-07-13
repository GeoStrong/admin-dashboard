"use client";

import useModeSwitch from "@/lib/hooks/useModeSwitch";
import useScreenSize from "@/lib/hooks/useScreenSize";
import { ChartData } from "@/lib/types/types";
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
} from "recharts";

const SalesChart: React.FC<{ month: ChartData }> = ({ month }) => {
  const { themeProperty: axisColor } = useModeSwitch("#6b6e70", "#fff");
  const { isXsm, isSm } = useScreenSize();
  const strokeColor = typeof axisColor === "string" ? axisColor : undefined;

  return (
    <ResponsiveContainer>
      <LineChart data={month.data}>
        <CartesianGrid vertical={false} color="red" />
        {!isXsm && (
          <XAxis
            padding={{ left: 5, right: 5 }}
            stroke={strokeColor}
            axisLine={false}
            tickSize={0}
            tickMargin={30}
            allowDataOverflow={true}
            tickFormatter={(value) => value + 1}
            tick={{ fontWeight: 600, fontSize: isSm ? 12 : 16 }}
          />
        )}
        {!isXsm && (
          <YAxis
            tickMargin={20}
            stroke={strokeColor}
            axisLine={false}
            domain={[0, 100]}
            allowDataOverflow={true}
            tickFormatter={(value) => `${value}%`}
            tickSize={0}
            tick={{ fontWeight: 600, fontSize: isSm ? 12 : 16 }}
          />
        )}
        <Tooltip
          cursor={false}
          content={({ payload }) => {
            return payload.length !== 0 ? (
              <div className="rounded-sm border-none bg-[#4880FF] p-3 px-6 py-2">
                <p className="font-semibold text-white">
                  {payload[0].payload.pv}%
                </p>
              </div>
            ) : null;
          }}
        />
        <Legend payload={[{ value: "", color: "transparent" }]} />
        <Line
          type="linear"
          dataKey="pv"
          dot={{ fill: "#4880FF", strokeWidth: 5 }}
          activeDot={{ stroke: "#F2AC34", fill: "#F2AC34", strokeWidth: 5 }}
          stroke="#4379EE"
          style={{
            strokeWidth: 2,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default SalesChart;
