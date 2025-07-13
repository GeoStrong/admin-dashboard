"use client";

import React, { useEffect, useState, useMemo } from "react";
import OrderTable from "@/components/order/order-table";
import OrderFilters from "@/components/order/order-filters";
import { getProducts } from "@/lib/actions/getAsyncData";
import { Product } from "@/lib/types/types";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/general/UI/skeleton";
import EmptyOrder from "@/components/order/order-empty";

const OrderLists: React.FC = () => {
  const [orderProducts, setOrderProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const { orderProducts: products } = await getProducts();
        setOrderProducts(products);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (!isLoading && searchParams.toString()) {
      setIsFiltering(true);
      const timer = setTimeout(() => {
        setIsFiltering(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsFiltering(false);
    }
  }, [searchParams, isLoading]);

  const filteredProducts = useMemo(() => {
    if (isLoading) return [];

    return orderProducts.filter((product: Product) => {
      let matches = true;

      const typeParam = searchParams.get("type");
      if (typeParam && typeParam !== "") {
        matches =
          matches && product.category.toLowerCase() === typeParam.toLowerCase();
      }

      const statusParam = searchParams.get("status");
      if (statusParam && statusParam !== "") {
        matches = matches && product.status === statusParam;
      }

      const dateParam = searchParams.get("date");
      if (dateParam && dateParam !== "") {
        const dateRange = dateParam;
        const [startDateStr, endDateStr] = dateRange.split(" - ");

        if (startDateStr && endDateStr) {
          try {
            let productDateStr = product.date;
            let productDate: Date;

            if (productDateStr.includes("/")) {
              productDate = new Date(productDateStr);
            } else if (productDateStr.includes(".")) {
              const parts = productDateStr.split(".");
              productDate = new Date(
                parseInt(parts[2]),
                parseInt(parts[1]) - 1,
                parseInt(parts[0]),
              );
            } else {
              productDate = new Date(productDateStr);
            }

            const startDate = new Date(startDateStr);
            const endDate = new Date(endDateStr);

            matches =
              matches && productDate >= startDate && productDate <= endDate;
          } catch (error) {
            console.warn("Date parsing error:", error);
          }
        }
      }

      return matches;
    });
  }, [orderProducts, searchParams, isLoading]);

  const hasActiveFilters = searchParams.toString() !== "";
  const showEmptyState =
    !isLoading && !isFiltering && filteredProducts.length === 0;

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Order Lists</h2>
        {!isLoading && !isFiltering && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {hasActiveFilters ? (
              <span>
                Showing {filteredProducts.length} of {orderProducts.length}{" "}
                orders
              </span>
            ) : (
              <span>{orderProducts.length} orders total</span>
            )}
          </div>
        )}
      </div>
      <OrderFilters />

      {isLoading || isFiltering ? (
        <OrderTableSkeleton />
      ) : showEmptyState ? (
        <EmptyOrder hasActiveFilters={hasActiveFilters} />
      ) : (
        <OrderTable products={filteredProducts} />
      )}
    </>
  );
};

const OrderTableSkeleton: React.FC = () => {
  return (
    <div className="mt-5">
      <div className="rounded-t-2xl bg-white p-4 dark:bg-dark-150">
        <div className="grid grid-cols-6 gap-4">
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      <div className="bg-white dark:bg-dark-150">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="border-t border-gray-200 p-4 dark:border-gray-600"
          >
            <div className="grid grid-cols-6 gap-4">
              <Skeleton className="h-4 w-6" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-6 w-20 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderLists;
