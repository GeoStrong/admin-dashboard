import { Skeleton } from "@/components/general/UI/skeleton";

const EditProductLoading: React.FC = () => {
  return (
    <>
      <div className="mb-6">
        <Skeleton className="mb-4 h-6 w-32" />
      </div>
      <div className="mt-6">
        <div className="mb-6">
          <Skeleton className="mb-2 h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>

        <div className="rounded-xl bg-white p-6 dark:bg-dark-150">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <Skeleton className="mb-2 h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-16" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Skeleton className="mb-2 h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-20" />
                <Skeleton className="h-48 w-full rounded-lg" />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProductLoading;
