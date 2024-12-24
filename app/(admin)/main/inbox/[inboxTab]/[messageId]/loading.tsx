import { Skeleton } from "@/components/general/UI/skeleton";
import React from "react";

const InboxTabLoading: React.FC = () => {
  return (
    <>
      <div className="flex w-full flex-col justify-between gap-3 md:flex-row">
        <Skeleton className="w-full flex-col gap-3 rounded-xl md:mx-2 md:mt-2 md:flex">
          <div className="items-center justify-between border border-x-0 border-t-0 p-3 md:block md:p-6 lg:flex">
            <Skeleton className="h-8 w-16 rounded-2xl bg-gray-400 dark:bg-dark-100" />
            <Skeleton className="h-8 w-36 rounded-2xl bg-gray-400 dark:bg-dark-100" />
            <Skeleton className="h-10 w-10 rounded-full bg-gray-400 dark:bg-dark-100" />
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <span className="flex w-full justify-center">
              <Skeleton className="h-8 w-10 rounded-2xl bg-gray-400 dark:bg-dark-100" />
            </span>
            <div className="flex h-full w-full justify-start gap-2 pl-2">
              <div className="flex items-end">
                <Skeleton className="h-8 w-8 rounded-full bg-gray-400 dark:bg-dark-100" />
              </div>
              <div className="w-full rounded-xl rounded-bl-none md:w-1/2">
                <Skeleton className="h-20 w-full bg-gray-400 dark:bg-dark-100" />
              </div>
            </div>
            <div className="flex h-full w-full justify-end gap-2 pr-2">
              <div className="w-full rounded-xl rounded-bl-none md:w-1/2">
                <Skeleton className="h-20 w-full bg-gray-400 dark:bg-dark-100" />
              </div>
            </div>
            <span className="flex w-full justify-center">
              <Skeleton className="h-8 w-10 rounded-2xl bg-gray-400 dark:bg-dark-100" />
            </span>
            <div className="flex h-full w-full justify-start gap-2 pl-2">
              <div className="flex items-end">
                <Skeleton className="h-8 w-8 rounded-full bg-gray-400 dark:bg-dark-100" />
              </div>
              <div className="w-full rounded-xl rounded-bl-none md:w-1/2">
                <Skeleton className="h-20 w-full bg-gray-400 dark:bg-dark-100" />
              </div>
            </div>
            <Skeleton className="mt-3 h-1 w-full rounded-2xl bg-gray-400 dark:bg-dark-100 md:h-5" />
            <div className="flex w-full items-center justify-between gap-3 p-3 md:p-6">
              <Skeleton className="h-5 w-8 rounded-2xl bg-gray-400 dark:bg-dark-100" />
              <div className="w-full">
                <Skeleton className="h-5 w-full rounded-2xl bg-gray-400 dark:bg-dark-100" />
              </div>
              <Skeleton className="h-5 w-6 rounded-2xl bg-gray-400 dark:bg-dark-100" />
              <Skeleton className="h-5 w-6 rounded-2xl bg-gray-400 dark:bg-dark-100" />
              <Skeleton className="h-5 w-14 rounded-2xl bg-gray-400 dark:bg-dark-100" />
            </div>
          </div>
        </Skeleton>
      </div>
    </>
  );
};
export default InboxTabLoading;
