import { Skeleton } from "@/components/general/UI/skeleton";
import React from "react";

const InboxLoading: React.FC = () => {
  return (
    <>
      <div className="flex w-full flex-col justify-between gap-3 md:flex-row">
        <Skeleton className="w-full flex-col gap-3 rounded-xl md:mx-2 md:mt-2 md:flex">
          <div className="hidden items-center justify-between border border-x-0 border-t-0 p-3 md:block md:p-6 lg:flex">
            <Skeleton className="h-12 w-56 rounded-2xl bg-gray-400 dark:bg-dark-100" />
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <Skeleton className="h-12 w-full bg-gray-400 dark:bg-dark-100" />
            <Skeleton className="h-12 w-full bg-gray-400 dark:bg-dark-100" />
            <Skeleton className="h-12 w-full bg-gray-400 dark:bg-dark-100" />
            <Skeleton className="h-12 w-full bg-gray-400 dark:bg-dark-100" />
          </div>
        </Skeleton>
      </div>
    </>
  );
};
export default InboxLoading;
