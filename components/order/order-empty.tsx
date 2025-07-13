import Link from "next/link";

const EmptyOrder: React.FC<{ hasActiveFilters: boolean }> = ({
  hasActiveFilters,
}) => {
  return (
    <div className="mt-8 flex flex-col items-center justify-center rounded-xl bg-white p-12 dark:bg-dark-150">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 dark:bg-dark-100">
          <svg
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>

        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          {hasActiveFilters
            ? "No orders match your filters"
            : "No orders found"}
        </h3>

        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          {hasActiveFilters
            ? "Try adjusting your filters to see more orders."
            : "Orders will appear here once they are created."}
        </p>

        {hasActiveFilters && (
          <Link
            href="/main/order"
            className="inline-flex items-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Clear all filters
          </Link>
        )}
      </div>
    </div>
  );
};

export default EmptyOrder;
