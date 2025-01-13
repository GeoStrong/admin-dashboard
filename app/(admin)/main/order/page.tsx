import React from "react";
import OrderTable from "@/components/order/order-table";
import OrderFilters from "@/components/order/order-filters";
import { getProducts } from "@/lib/actions/getAsyncData";

const OrderLists: React.FC = async () => {
  const { orderProducts } = await getProducts();

  return (
    <>
      <h2 className="text-2xl font-bold">Order Lists</h2>
      <OrderFilters />
      <OrderTable products={orderProducts} />
    </>
  );
};
export default OrderLists;
