"use client";

import useModeSwitch from "@/lib/hooks/useModeSwitch";
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

const SalesChart = ({ month }) => {
  const { themeProperty: axisColor } = useModeSwitch("#6b6e70", "#fff");

  return (
    <ResponsiveContainer>
      <LineChart data={month.data}>
        <CartesianGrid vertical={false} color="red" />
        <XAxis
          padding={{ left: 5, right: 5 }}
          stroke={axisColor}
          axisLine={false}
          tickSize={0}
          tickMargin={30}
          allowDataOverflow={true}
          tickFormatter={(value) => value + 1}
          tick={{ fontWeight: 600 }}
        />
        <YAxis
          tickMargin={20}
          stroke={axisColor}
          axisLine={false}
          domain={[0, 100]}
          allowDataOverflow={true}
          tickFormatter={(value) => `${value}%`}
          tickSize={0}
          tick={{ fontWeight: 600 }}
        />
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
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default SalesChart;
