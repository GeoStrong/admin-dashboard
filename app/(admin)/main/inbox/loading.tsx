import { Skeleton } from "@/components/general/UI/skeleton";
import React from "react";

const InboxLoading: React.FC = () => {
  return (
    <>
      <Skeleton className="h-8 w-20 rounded-2xl" />
      <div className="flex w-full flex-col justify-between gap-3 md:flex-row">
        <Skeleton className="mt-2 w-full rounded-xl p-3 pb-3 md:h-96 md:w-1/3 md:p-6">
          <div className="hidden md:block">
            <Skeleton className="h-12 w-44 rounded-2xl bg-gray-400 dark:bg-dark-100" />
            <Skeleton className="mt-5 h-6 w-20 rounded-2xl bg-gray-400 font-bold dark:bg-dark-100" />
            <div className="mt-5 flex w-full flex-col gap-3">
              <Skeleton className="h-8 w-full rounded-2xl bg-gray-400 font-bold dark:bg-dark-100" />
              <Skeleton className="h-8 w-full rounded-2xl bg-gray-400 font-bold dark:bg-dark-100" />
              <Skeleton className="h-8 w-full rounded-2xl bg-gray-400 font-bold dark:bg-dark-100" />
              <Skeleton className="h-8 w-full rounded-2xl bg-gray-400 font-bold dark:bg-dark-100" />
              <Skeleton className="h-8 w-full rounded-2xl bg-gray-400 font-bold dark:bg-dark-100" />
            </div>
          </div>
          <div className="mt-2 flex w-full gap-3 rounded-xl p-3 pb-3 md:hidden md:w-1/3 md:p-6">
            <Skeleton className="h-8 w-10 rounded-2xl bg-gray-400 dark:bg-dark-100" />
            <Skeleton className="h-8 w-full rounded-2xl bg-gray-400 dark:bg-dark-100" />
          </div>
        </Skeleton>
        <Skeleton className="flex-col gap-3  rounded-xl md:mx-2 md:mt-2 md:flex md:w-2/3">
          <div className="hidden items-center justify-between border border-x-0 border-t-0 p-3 md:block md:p-6 lg:flex">
            <Skeleton className="h-12 w-56 rounded-2xl bg-gray-400 dark:bg-dark-100" />
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <Skeleton className="h-12 w-full rounded-2xl bg-gray-400 dark:bg-dark-100" />
            <Skeleton className="h-12 w-full rounded-2xl bg-gray-400 dark:bg-dark-100" />
            <Skeleton className="h-12 w-full rounded-2xl bg-gray-400 dark:bg-dark-100" />
            <Skeleton className="h-12 w-full rounded-2xl bg-gray-400 dark:bg-dark-100" />
          </div>
        </Skeleton>
      </div>
    </>
  );
};
export default InboxLoading;
