"use client";

import useModeSwitch from "@/lib/hooks/useModeSwitch";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SalesAnalyticsChart = ({ data }) => {
  const { themeProperty: axisColor } = useModeSwitch("#6b6e70", "#fff");

  return (
    <ResponsiveContainer width="100%" height="92%">
      <LineChart data={data}>
        <CartesianGrid horizontal={false} vertical={false} />
        <XAxis
          padding={{ left: 5, right: 5 }}
          stroke={axisColor}
          axisLine={false}
          tickSize={0}
          tickMargin={10}
          dataKey="name"
          tick={{ fontWeight: 600, fontSize: "0.75rem" }}
        />
        <YAxis
          tickMargin={20}
          stroke={axisColor}
          axisLine={false}
          domain={[0, 100]}
          allowDataOverflow={true}
          tickFormatter={(value) => `${value}%`}
          tickSize={0}
          tick={{ fontWeight: 600, fontSize: "0.75rem" }}
        />
        <Tooltip
          cursor={false}
          content={({ payload }) => {
            return payload.length !== 0 ? (
              <div className="rounded-sm border-none bg-[#82ca9d] p-3 px-6 py-2 text-xs">
                <p className="font-semibold text-white">
                  {payload[0].payload.uv}
                </p>
              </div>
            ) : null;
          }}
        />
        <Line
          type="monotone"
          dataKey="pv"
          dot={{ stroke: "#4379EE", fill: "#82ca9d", strokeWidth: 5 }}
          activeDot={{ stroke: "#82ca9d", fill: "#82ca9d", strokeWidth: 3 }}
          stroke="#4379EE"
          style={{
            strokeWidth: 3,
          }}
        />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="#82ca9d"
          dot={{ stroke: "#82ca9d", fill: "#4379EE", strokeWidth: 5 }}
          activeDot={{ stroke: "#4379EE", fill: "#4379EE", strokeWidth: 3 }}
          style={{
            strokeWidth: 3,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default SalesAnalyticsChart;
