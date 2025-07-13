"use client";

import { radarChartData } from "@/lib/dummy-database";
import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const RadarChartComponent: React.FC = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Performance Comparison
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Multi-dimensional analysis
        </p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarChartData}>
            <PolarGrid />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fontSize: 12 }}
              className="text-gray-600 dark:text-gray-400"
            />
            <PolarRadiusAxis
              tick={{ fontSize: 10 }}
              className="text-gray-600 dark:text-gray-400"
            />
            <Radar
              name="Team A"
              dataKey="A"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar
              name="Team B"
              dataKey="B"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RadarChartComponent;
