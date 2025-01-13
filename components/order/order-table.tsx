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
import { makeFirstLetterUppercase } from "@/lib/functions/functions";
import { Product } from "@/lib/types/types";

const OrderTable: React.FC<{ products: Product[] }> = ({ products }) => {
  const generateClassesForStatusCell = (status: Product["status"]): string => {
    if (status === "completed")
      return "bg-green-400/40 text-green-600 dark:bg-green-400/90 dark:text-white";
    if (status === "processing")
      return "bg-purple-400/40 text-purple-600 dark:bg-purple-700 dark:text-white";
    if (status === "rejected")
      return "bg-red-400/40 text-red-600 dark:bg-red-600 dark:text-white";
  };

  return (
    <>
      <Table className="mt-5">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader className="">
          <TableRow className="rounded-t-2xl bg-white dark:bg-dark-150">
            <TableHead className="rounded-tl-2xl text-sm">ID</TableHead>
            <TableHead className="text-sm">NAME</TableHead>
            <TableHead className="text-sm">ADDRESS</TableHead>
            <TableHead className="text-sm">DATE</TableHead>
            <TableHead className="text-sm">TYPE</TableHead>
            <TableHead className="rounded-tr-2xl text-sm">STATUS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white dark:bg-dark-150">
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="">{product.id}</TableCell>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.address}</TableCell>
              <TableCell>{product.date}</TableCell>
              <TableCell className="">
                {makeFirstLetterUppercase(product.category)}
              </TableCell>
              <TableCell>
                <div
                  className={`rounded-lg px-4 py-2 text-center font-bold ${generateClassesForStatusCell(product.status)}`}
                >
                  {makeFirstLetterUppercase(product.status)}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
export default OrderTable;
