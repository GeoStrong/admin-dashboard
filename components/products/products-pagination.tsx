"use client";

import React from "react";
import useLocation from "@/lib/hooks/useLocation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../general/UI/pagination";
import { Product } from "@/lib/types/types";

const ProductsPagination: React.FC<{
  pages: Product[];
  activePage: number;
}> = ({ pages, activePage }) => {
  const { pathname } = useLocation();
  const productsPathname = pathname?.split("").slice(0, -1).join("");

  return (
    <Pagination className="mt-5">
      <PaginationContent>
        {+activePage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`${productsPathname}${activePage - 1}`} />
          </PaginationItem>
        )}
        {pages.map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href={`${productsPathname}${index + 1}`}
              className={`${index + 1 === +activePage && "bg-gray-200 dark:bg-dark-50"}`}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {+activePage !== pages.length && (
          <PaginationItem>
            <PaginationNext href={`${productsPathname}${+activePage + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
export default ProductsPagination;
