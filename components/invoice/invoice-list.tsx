"use client";

import React from "react";
import { Button } from "@/components/general/UI/button";
import { Invoice } from "@/lib/types/types";
import { FileText, Eye } from "lucide-react";
import {
  formatCurrency,
  formatDate,
  getStatusColor,
} from "@/lib/functions/functions";

interface InvoiceListProps {
  invoices: Invoice[];
  onSelectInvoice: (invoice: Invoice) => void;
  selectedInvoiceId?: string;
}

const InvoiceList: React.FC<InvoiceListProps> = ({
  invoices,
  onSelectInvoice,
  selectedInvoiceId,
}) => {
  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <div
          key={invoice.id}
          className={`rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-dark-150 ${
            selectedInvoiceId === invoice.id
              ? "border-blue-500 ring-2 ring-blue-500/20"
              : "border-gray-200 dark:border-gray-700"
          }`}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Invoice Info */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {invoice.invoiceNumber}
                </h3>
                <div className="flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-400 sm:flex-row sm:items-center sm:gap-4">
                  <span>To: {invoice.to.name}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>Due: {formatDate(invoice.dueDate)}</span>
                </div>
              </div>
            </div>

            {/* Status and Amount */}
            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <div className="text-left sm:text-right">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(invoice.total)}
                </div>
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                    invoice.status,
                  )}`}
                >
                  {invoice.status.charAt(0).toUpperCase() +
                    invoice.status.slice(1)}
                </span>
              </div>
              <Button
                onClick={() => onSelectInvoice(invoice)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">View</span>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvoiceList;
