"use client";

import React from "react";
import { Button } from "@/components/general/UI/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/general/UI/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ContactPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalContacts: number;
  contactsPerPage: number;
  onPageSizeChange?: (pageSize: number) => void;
}

const ContactPagination: React.FC<ContactPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalContacts,
  contactsPerPage,
  onPageSizeChange,
}) => {
  if (totalPages <= 1) return null;

  const startIndex = (currentPage - 1) * contactsPerPage + 1;
  const endIndex = Math.min(currentPage * contactsPerPage, totalContacts);

  const getVisiblePages = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="mt-8 flex flex-col gap-4">
      {/* Page size selector */}
      {onPageSizeChange && (
        <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-dark-150">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Show contacts per page
          </div>
          <Select
            value={contactsPerPage.toString()}
            onValueChange={(value) => onPageSizeChange(parseInt(value))}
          >
            <SelectTrigger className="w-20 border-gray-200 dark:border-gray-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="9">9</SelectItem>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="18">18</SelectItem>
              <SelectItem value="24">24</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Main pagination */}
      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-dark-150 sm:flex-row">
        {/* Results info */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            {startIndex}
          </span>{" "}
          to{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            {endIndex}
          </span>{" "}
          of{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            {totalContacts}
          </span>{" "}
          contacts
        </div>

        {/* Pagination controls */}
        <div className="flex items-center gap-2">
          {/* Previous button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1 border-gray-200 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-dark-100"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {currentPage > 3 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(1)}
                  className="h-8 w-8 border-gray-200 p-0 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-dark-100"
                >
                  1
                </Button>
                {currentPage > 4 && (
                  <span className="px-2 text-gray-400">...</span>
                )}
              </>
            )}

            {getVisiblePages().map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page)}
                className={`h-8 w-8 p-0 ${
                  page === currentPage
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "border-gray-200 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-dark-100"
                }`}
              >
                {page}
              </Button>
            ))}

            {currentPage < totalPages - 2 && (
              <>
                {currentPage < totalPages - 3 && (
                  <span className="px-2 text-gray-400">...</span>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(totalPages)}
                  className="h-8 w-8 border-gray-200 p-0 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-dark-100"
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>

          {/* Next button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 border-gray-200 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-dark-100"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactPagination;
