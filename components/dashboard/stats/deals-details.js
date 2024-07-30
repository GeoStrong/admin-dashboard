import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/general/UI/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/general/UI/table";
import { getRandomProducts } from "@/lib/dummy-database";
import DeliveryStatus from "./delivery-status";

const DealsDetails = async () => {
  const productsList = await getRandomProducts(7);

  return (
    <Table className="mt-8">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="rounded-s-2xl">Product Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Color</TableHead>
          <TableHead className="rounded-e-2xl">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {productsList.map((product, index) => (
          <TableRow className="" key={index}>
            <TableCell className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={product.image} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              {product.brand.toUpperCase()} {product.model}
            </TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{Math.floor(Math.random() * 10) + 1}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.color}</TableCell>
            <TableCell>
              <DeliveryStatus />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default DealsDetails;
