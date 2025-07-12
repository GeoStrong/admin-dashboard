"use client";

import { lineChartData } from "@/lib/dummy-database";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent: React.FC = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Weekly User Engagement
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          User growth and session activity
        </p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={lineChartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
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
            <Line
              type="monotone"
              dataKey="users"
              stroke="#8884d8"
              strokeWidth={3}
              name="Users"
              dot={{ fill: "#8884d8", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#8884d8", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="sessions"
              stroke="#82ca9d"
              strokeWidth={3}
              name="Sessions"
              dot={{ fill: "#82ca9d", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#82ca9d", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartComponent;
