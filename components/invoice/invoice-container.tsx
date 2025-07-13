"use client";

import React, { useState, useMemo } from "react";
import InvoiceHeader from "./invoice-header";
import InvoiceList from "./invoice-list";
import InvoiceDetail from "./invoice-detail";
import InvoiceFilter, { InvoiceFilters } from "./invoice-filter";
import CreateInvoiceForm from "./create-invoice-form";
import { Invoice } from "@/lib/types/types";
import { MOCK_INVOICES } from "@/lib/dummy-database";

const InvoiceContainer: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filters, setFilters] = useState<InvoiceFilters>({
    status: "all",
    searchTerm: "",
    dateRange: "all",
    minAmount: "",
    maxAmount: "",
  });

  // Filter invoices based on current filters
  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      // Status filter
      if (filters.status !== "all" && invoice.status !== filters.status) {
        return false;
      }

      // Search filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesNumber = invoice.invoiceNumber
          .toLowerCase()
          .includes(searchLower);
        const matchesClient = invoice.to.name
          .toLowerCase()
          .includes(searchLower);
        if (!matchesNumber && !matchesClient) {
          return false;
        }
      }

      // Amount filter
      if (filters.minAmount && invoice.total < parseFloat(filters.minAmount)) {
        return false;
      }
      if (filters.maxAmount && invoice.total > parseFloat(filters.maxAmount)) {
        return false;
      }

      // Date range filter
      if (filters.dateRange !== "all") {
        const invoiceDate = new Date(invoice.invoiceDate);
        const now = new Date();

        switch (filters.dateRange) {
          case "thisMonth":
            if (
              invoiceDate.getMonth() !== now.getMonth() ||
              invoiceDate.getFullYear() !== now.getFullYear()
            ) {
              return false;
            }
            break;
          case "lastMonth":
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
            if (
              invoiceDate.getMonth() !== lastMonth.getMonth() ||
              invoiceDate.getFullYear() !== lastMonth.getFullYear()
            ) {
              return false;
            }
            break;
          case "thisYear":
            if (invoiceDate.getFullYear() !== now.getFullYear()) {
              return false;
            }
            break;
        }
      }

      return true;
    });
  }, [invoices, filters]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.status !== "all" ||
      filters.searchTerm !== "" ||
      filters.dateRange !== "all" ||
      filters.minAmount !== "" ||
      filters.maxAmount !== ""
    );
  }, [filters]);

  const handleSelectInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleBackToList = () => {
    setSelectedInvoice(null);
  };

  const handleCreateInvoice = () => {
    setShowCreateForm(true);
  };

  const handleFilterChange = () => {
    setShowFilter(true);
  };

  const handleApplyFilters = (newFilters: InvoiceFilters) => {
    setFilters(newFilters);
  };

  const handleCreateInvoiceSubmit = (newInvoiceData: Omit<Invoice, "id">) => {
    const newInvoice: Invoice = {
      ...newInvoiceData,
      id: (invoices.length + 1).toString(),
    };

    setInvoices((prev) => [newInvoice, ...prev]);
    setShowCreateForm(false);
  };

  if (selectedInvoice) {
    return (
      <InvoiceDetail invoice={selectedInvoice} onBack={handleBackToList} />
    );
  }

  return (
    <>
      <div className="mx-auto max-w-7xl">
        <InvoiceHeader
          totalInvoices={filteredInvoices.length}
          onCreateInvoice={handleCreateInvoice}
          onFilterChange={handleFilterChange}
          hasActiveFilters={hasActiveFilters}
        />
        <InvoiceList
          invoices={filteredInvoices}
          onSelectInvoice={handleSelectInvoice}
          selectedInvoiceId={selectedInvoice?.id}
        />
      </div>

      {/* Filter Modal */}
      <InvoiceFilter
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        onApplyFilters={handleApplyFilters}
        filters={filters}
      />

      {/* Create Invoice Modal */}
      <CreateInvoiceForm
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        onCreateInvoice={handleCreateInvoiceSubmit}
      />
    </>
  );
};

export default InvoiceContainer;
