import React from "react";
import { cn } from "@/lib/utils";

const Skeleton: React.FC<{ className: string }> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-300 dark:bg-dark-150",
        className,
      )}
      {...props}
    />
  );
};

export { Skeleton };
