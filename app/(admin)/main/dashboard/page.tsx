import ChartLayout from "@/components/dashboard/charts/chart-layout";
import TotalWrapper from "@/components/dashboard/total-wrapper";
import { totalContainer } from "@/lib/dummy-database";
import React from "react";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {totalContainer.map((total) => (
          <TotalWrapper key={total.name} totalInfo={total} />
        ))}
      </div>
      <ChartLayout />
    </>
  );
};
export default Dashboard;
