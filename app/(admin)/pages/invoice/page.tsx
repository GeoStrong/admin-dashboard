import React from "react";
import InvoiceContainer from "@/components/invoice/invoice-container";

const Invoice: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-dark-50">
      <InvoiceContainer />
    </div>
  );
};

export default Invoice;
