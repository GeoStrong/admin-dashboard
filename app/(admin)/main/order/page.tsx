import React from "react";
import OrderTable from "@/components/order/order-table";
import OrderFilters from "@/components/order/order-filters";

const OrderLists: React.FC = () => {
  return (
    <>
      <h2 className="text-2xl font-bold">Order Lists</h2>
      <OrderFilters />
      <OrderTable />
    </>
  );
};
export default OrderLists;
