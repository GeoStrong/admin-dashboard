import { Skeleton } from "@/components/general/UI/skeleton";

const ProductsLoading = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-7">
        <Skeleton className="h-96 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    </>
  );
};
export default ProductsLoading;
