import { Skeleton } from "@/components/general/UI/skeleton";

const DashboardLoading = () => {
  return (
    <>
      <div className="mt-7 flex w-full gap-6">
        <div className="w-1/4">
          <Skeleton className="h-44 w-full rounded-2xl" />
        </div>
        <div className="w-1/4">
          <Skeleton className="h-44 w-full rounded-2xl" />
        </div>
        <div className="w-1/4">
          <Skeleton className="h-44 w-full rounded-2xl" />
        </div>
        <div className="w-1/4">
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
