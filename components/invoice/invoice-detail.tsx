"use client";

import React from "react";
import { Button } from "@/components/general/UI/button";
import { Invoice } from "@/lib/types/types";
import { ArrowLeft, Printer, Send } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/functions/functions";

interface InvoiceDetailProps {
  invoice: Invoice;
  onBack: () => void;
}

const InvoiceDetail: React.FC<InvoiceDetailProps> = ({ invoice, onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleSend = () => {
    console.log("Sending invoice:", invoice.invoiceNumber);
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header with back button - hidden in print */}
      <div className="mb-6 flex items-center justify-between print:hidden">
        <Button
          onClick={onBack}
          variant="ghost"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Invoices
        </Button>
        <div className="flex items-center gap-2">
          <Button
            onClick={handlePrint}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button
            onClick={handleSend}
            className="flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600"
          >
            <Send className="h-4 w-4" />
            Send
          </Button>
        </div>
      </div>

      {/* Invoice Document */}
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-dark-150 print:border-0 print:shadow-none print:dark:bg-white">
        {/* Invoice Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white print:text-black">
            Invoice
          </h1>
        </div>

        {/* Invoice Info Grid */}
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Invoice From */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400 print:text-gray-700">
              Invoice From :
            </h3>
            <div className="space-y-1">
              <div className="font-semibold text-gray-900 dark:text-white print:text-black">
                {invoice.from.name}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 print:text-gray-800">
                {invoice.from.address}
              </div>
            </div>
          </div>

          {/* Invoice To */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400 print:text-gray-700">
              Invoice To :
            </h3>
            <div className="space-y-1">
              <div className="font-semibold text-gray-900 dark:text-white print:text-black">
                {invoice.to.name}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 print:text-gray-800">
                {invoice.to.address}
              </div>
            </div>
          </div>

          {/* Invoice Dates */}
          <div>
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 print:text-gray-700">
                  Invoice Date : {formatDate(invoice.invoiceDate)}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 print:text-gray-700">
                  Due Date : {formatDate(invoice.dueDate)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 print:border-gray-400">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-100 print:bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 print:text-gray-800">
                  Serial No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 print:text-gray-800">
                  Description
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 print:text-gray-800">
                  Quantity
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 print:text-gray-800">
                  Base Cost
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 print:text-gray-800">
                  Total Cost
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-dark-150 print:divide-gray-300 print:bg-white">
              {invoice.items.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white print:text-black">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white print:text-black">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white print:text-black">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 dark:text-white print:text-black">
                    {formatCurrency(item.baseCost)}
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-gray-900 dark:text-white print:text-black">
                    {formatCurrency(item.totalCost)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="flex justify-end">
          <div className="w-64">
            <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700 print:border-gray-400">
              <span className="text-lg font-semibold text-gray-900 dark:text-white print:text-black">
                Total
              </span>
              <span className="text-lg font-bold text-gray-900 dark:text-white print:text-black">
                = {formatCurrency(invoice.total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
