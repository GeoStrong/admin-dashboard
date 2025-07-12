"use client";

import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  BarChart3,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  trend,
  icon,
}) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
        <div className="rounded-full bg-blue-50 p-3 dark:bg-blue-900/20">
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center">
        {trend === "up" ? (
          <TrendingUp className="h-4 w-4 text-green-500" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500" />
        )}
        <span
          className={`ml-2 text-sm font-medium ${
            trend === "up" ? "text-green-500" : "text-red-500"
          }`}
        >
          {change}
        </span>
        <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
          from last month
        </span>
      </div>
    </div>
  );
};

const MetricsOverview: React.FC = () => {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+20.1%",
      trend: "up" as const,
      icon: <DollarSign className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Active Users",
      value: "2,350",
      change: "+180.1%",
      trend: "up" as const,
      icon: <Users className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Total Orders",
      value: "12,234",
      change: "+19%",
      trend: "up" as const,
      icon: <ShoppingCart className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "-2.1%",
      trend: "down" as const,
      icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
    },
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default MetricsOverview;
