"use client";

import React from "react";
import { Button } from "@/components/general/UI/button";
import { Plus, Filter } from "lucide-react";

interface InvoiceHeaderProps {
  totalInvoices: number;
  onCreateInvoice?: () => void;
  onFilterChange?: () => void;
  hasActiveFilters?: boolean;
}

const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({
  totalInvoices,
  onCreateInvoice,
  onFilterChange,
  hasActiveFilters = false,
}) => {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Invoice
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {totalInvoices} {totalInvoices === 1 ? "invoice" : "invoices"} total
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={onFilterChange}
          variant="outline"
          className={`flex items-center gap-2 ${
            hasActiveFilters
              ? "border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
              : ""
          }`}
        >
          <Filter className="h-4 w-4" />
          Filter
          {hasActiveFilters && (
            <span className="ml-1 rounded-full bg-blue-500 px-1.5 py-0.5 text-xs text-white">
              •
            </span>
          )}
        </Button>
        <Button
          onClick={onCreateInvoice}
          className="flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600"
        >
          <Plus className="h-4 w-4" />
          Create Invoice
        </Button>
      </div>
    </div>
  );
};

export default InvoiceHeader;
