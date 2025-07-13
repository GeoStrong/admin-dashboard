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
import { Input } from "@/components/general/UI/input";
import { Label } from "@/components/general/UI/label";
import { X, Search } from "lucide-react";
import { Invoice } from "@/lib/types/types";

interface InvoiceFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: InvoiceFilters) => void;
  filters: InvoiceFilters;
}

export interface InvoiceFilters {
  status: Invoice["status"] | "all";
  searchTerm: string;
  dateRange: "all" | "thisMonth" | "lastMonth" | "thisYear";
  minAmount: string;
  maxAmount: string;
}

const InvoiceFilter: React.FC<InvoiceFilterProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  filters,
}) => {
  const [localFilters, setLocalFilters] =
    React.useState<InvoiceFilters>(filters);

  const handleFilterChange = (key: keyof InvoiceFilters, value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: InvoiceFilters = {
      status: "all",
      searchTerm: "",
      dateRange: "all",
      minAmount: "",
      maxAmount: "",
    };
    setLocalFilters(resetFilters);
    onApplyFilters(resetFilters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-dark-150">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Filter Invoices
          </h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Filter Content */}
        <div className="space-y-4">
          {/* Search */}
          <div>
            <Label
              htmlFor="search"
              className="text-gray-700 dark:text-gray-300"
            >
              Search
            </Label>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="search"
                type="text"
                placeholder="Search by invoice number or client..."
                value={localFilters.searchTerm}
                onChange={(e) =>
                  handleFilterChange("searchTerm", e.target.value)
                }
                className="pl-10"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <Label className="text-gray-700 dark:text-gray-300">Status</Label>
            <Select
              value={localFilters.status}
              onValueChange={(value) => handleFilterChange("status", value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white text-center dark:bg-dark-150">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div>
            <Label className="text-gray-700 dark:text-gray-300">
              Date Range
            </Label>
            <Select
              value={localFilters.dateRange}
              onValueChange={(value) => handleFilterChange("dateRange", value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent className="bg-white text-center dark:bg-dark-150">
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="thisMonth">This Month</SelectItem>
                <SelectItem value="lastMonth">Last Month</SelectItem>
                <SelectItem value="thisYear">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amount Range */}
          <div>
            <Label className="text-gray-700 dark:text-gray-300">
              Amount Range
            </Label>
            <div className="mt-1 flex gap-2">
              <Input
                type="number"
                placeholder="Min amount"
                value={localFilters.minAmount}
                onChange={(e) =>
                  handleFilterChange("minAmount", e.target.value)
                }
              />
              <Input
                type="number"
                placeholder="Max amount"
                value={localFilters.maxAmount}
                onChange={(e) =>
                  handleFilterChange("maxAmount", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <Button onClick={handleReset} variant="outline" className="flex-1">
            Reset
          </Button>
          <Button
            onClick={handleApply}
            className="flex-1 bg-blue-500 hover:bg-blue-600"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceFilter;
