import { Skeleton } from "@/components/general/UI/skeleton";

const StatsLoading = () => {
  return (
    <>
      <div className="mt-7 flex w-full justify-between gap-4">
        <div className="flex-1">
          <Skeleton className="h-72 w-full rounded-xl" />
        </div>
        <div className="flex-1">
          <Skeleton className="h-72 w-full rounded-xl" />
        </div>
        <div className="flex-1">
          <Skeleton className="h-72 w-full rounded-xl" />
        </div>
      </div>
      <div className="mt-7">
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    </>
  );
};
export default StatsLoading;
