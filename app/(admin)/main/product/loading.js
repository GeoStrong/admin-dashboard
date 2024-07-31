import { Skeleton } from "@/components/general/UI/skeleton";

const ProductLoading = () => {
  return (
    <>
      <div className="flex">
        <div className="flex w-full flex-col gap-5">
          <Skeleton className="h-10 w-10 rounded-2xl" />
          <div className="flex flex-col lg:flex-row">
            <div className="w-full">
              <Skeleton className="h-10 rounded-2xl md:w-1/2" />
              <div className="mt-3 flex justify-center gap-3 sm:justify-start">
                <Skeleton className="h-48 w-2/3 rounded-2xl sm:w-2/5 md:w-1/4" />
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
            </div>
            <div className="mt-10 w-full">
              <div className="flex justify-center lg:justify-start">
                <Skeleton className="h-10 w-2/3 rounded-2xl md:w-1/2" />
              </div>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <Skeleton className="h-6 w-1/2 rounded-2xl md:w-1/2" />
                <Skeleton className="h-6 w-1/2 rounded-2xl md:w-1/2" />
                <Skeleton className="h-6 w-1/2 rounded-2xl md:w-1/2" />
                <Skeleton className="h-6 w-1/2 rounded-2xl md:w-1/2" />
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col justify-between gap-5 sm:flex-row">
            <Skeleton className="h-10 rounded-2xl sm:w-1/3" />
            <Skeleton className="h-10 rounded-2xl sm:w-1/5" />
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductLoading;
