import DashboardPagination from "@/components/dashboard/dashboard-pagination";
import React from "react";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <h1 className="text-3xl font-bold text-dark-100 dark:text-white">
        Dashboard
      </h1>
      {children}
      <DashboardPagination />
    </>
  );
};
export default DashboardLayout;
