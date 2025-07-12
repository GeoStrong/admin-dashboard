"use client";

import { composedChartData } from "@/lib/dummy-database";
import React from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ComposedChartComponent: React.FC = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Multi-Metric Analysis
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Combined visualization of multiple data types
        </p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={composedChartData}
            margin={{
              top: 20,
              right: 30,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              className="text-gray-600 dark:text-gray-400"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              className="text-gray-600 dark:text-gray-400"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="amt"
              fill="#8884d8"
              fillOpacity={0.4}
              stroke="#8884d8"
              name="Amount"
            />
            <Bar
              dataKey="pv"
              barSize={20}
              fill="#413ea0"
              name="Page Views"
              radius={[2, 2, 0, 0]}
            />
            <Line
              type="monotone"
              dataKey="uv"
              stroke="#ff7300"
              strokeWidth={3}
              name="Unique Visitors"
              dot={{ fill: "#ff7300", strokeWidth: 2, r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComposedChartComponent;
