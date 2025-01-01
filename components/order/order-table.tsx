import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/general/UI/table";

const OrderTable: React.FC<{}> = () => {
  return (
    <>
      <Table className="mt-5">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader className="bg-white">
          <TableRow>
            <TableHead className="rounded-s-2xl text-sm">ID</TableHead>
            <TableHead className="text-sm">NAME</TableHead>
            <TableHead className="text-sm">ADDRESS</TableHead>
            <TableHead className="text-sm">DATE</TableHead>
            <TableHead className="text-sm">TYPE</TableHead>
            <TableHead className="rounded-e-2xl text-sm">STATUS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className=""></TableBody>
      </Table>
    </>
  );
};
export default OrderTable;
