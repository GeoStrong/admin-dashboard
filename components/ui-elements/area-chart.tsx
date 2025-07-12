"use client";

import { areaChartData } from "@/lib/dummy-database";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AreaChartComponent: React.FC = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Device Usage Trends
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Traffic distribution across devices
        </p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={areaChartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
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
              dataKey="mobile"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
              name="Mobile"
            />
            <Area
              type="monotone"
              dataKey="desktop"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.6}
              name="Desktop"
            />
            <Area
              type="monotone"
              dataKey="tablet"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
              fillOpacity={0.6}
              name="Tablet"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaChartComponent;
