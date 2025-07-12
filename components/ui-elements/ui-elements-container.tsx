"use client";

import React from "react";
import UIElementsHeader from "@/components/ui-elements/ui-elements-header";
import MetricsOverview from "@/components/ui-elements/metrics-overview";
import BarChartComponent from "@/components/ui-elements/bar-chart";
import LineChartComponent from "@/components/ui-elements/line-chart";
import AreaChartComponent from "@/components/ui-elements/area-chart";
import PieChartComponent from "@/components/ui-elements/pie-chart";
import DonutChartComponent from "@/components/ui-elements/donut-chart";
import RadarChartComponent from "@/components/ui-elements/radar-chart";
import ComposedChartComponent from "@/components/ui-elements/composed-chart";

const UIElementsContainer: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <UIElementsHeader />

        {/* Metrics Overview */}
        <MetricsOverview />

        {/* Charts Grid */}
        <div className="grid gap-6 lg:gap-8">
          {/* First Row - Bar and Line Charts */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <BarChartComponent />
            <LineChartComponent />
          </div>

          {/* Second Row - Area and Pie Charts */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AreaChartComponent />
            <PieChartComponent />
          </div>

          {/* Third Row - Donut and Radar Charts */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <DonutChartComponent />
            <RadarChartComponent />
          </div>

          {/* Fourth Row - Composed Chart (Full Width) */}
          <div className="grid grid-cols-1 gap-6">
            <ComposedChartComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIElementsContainer;
