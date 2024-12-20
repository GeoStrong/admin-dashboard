import { Skeleton } from "@/components/general/UI/skeleton";

import React from "react";

const DashboardLoading: React.FC = () => {
  return (
    <>
      <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="w-full">
          <Skeleton className="h-44 w-full rounded-2xl" />
        </div>
        <div className="w-full">
          <Skeleton className="h-44 w-full rounded-2xl" />
        </div>
        <div className="w-full">
          <Skeleton className="h-44 w-full rounded-2xl" />
        </div>
        <div className="w-full">
          <Skeleton className="h-44 w-full rounded-2xl" />
        </div>
      </div>
      <div className="mt-7">
        <Skeleton className="h-80 w-full rounded-xl" />
      </div>
      <div className="mt-7">
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    </>
  );
};
export default DashboardLoading;
