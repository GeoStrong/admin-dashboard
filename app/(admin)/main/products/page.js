import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/general/UI/card";
import Image from "next/image";
import getProducts from "@/lib/actions/getProducts";

const Products = async () => {
  const { products } = await getProducts();

  return (
    <>
      <div className="grid grid-cols-3 gap-9">
        {products.map((product, index) => (
          <Card key={index}>
            <CardHeader className="flex items-center justify-center">
              <Image
                width={200}
                height={100}
                src={product.image}
                alt={product.title}
                className="rounded-2xl"
              />
            </CardHeader>
            <CardContent>
              <div className="">
                <h3 className="font-bold">
                  {product.brand.toUpperCase()} {product.model}
                </h3>
                <p className="mt-2 font-bold text-blue-500">
                  ${product.price}.00
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};
export default Products;
