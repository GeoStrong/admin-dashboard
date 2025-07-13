"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../general/UI/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { InboxPaginationProps } from "@/lib/types/types";

const InboxPagination: React.FC<InboxPaginationProps> = ({
  messages,
  activePage,
  setActivePage,
}) => {
  return (
    <Pagination className="z-10 mt-4">
      <PaginationContent>
        {activePage > 1 && (
          <PaginationItem
            onClick={() => {
              setActivePage(activePage - 1);
            }}
            className="cursor-pointer rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-dark-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </PaginationItem>
        )}
        {messages.map((_, index) => (
          <PaginationItem
            key={index}
            onClick={() => setActivePage(index + 1)}
            className={`${index + 1 === activePage && "bg-gray-100 dark:bg-dark-100"} rounded-md`}
          >
            <PaginationLink>{index + 1}</PaginationLink>
          </PaginationItem>
        ))}
        {activePage !== messages.length && (
          <PaginationItem
            onClick={() => {
              setActivePage(activePage + 1);
            }}
            className={
              "cursor-pointer rounded-sm p-2 hover:bg-gray-100 dark:hover:bg-dark-100"
            }
          >
            <ChevronRight className="h-4 w-4" />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
export default InboxPagination;
