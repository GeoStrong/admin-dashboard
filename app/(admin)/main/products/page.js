import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/general/UI/card";
import Image from "next/image";
import getProducts from "@/lib/actions/getProducts";
import ProductRating from "@/components/products/product-rating";
import FavoriteButton from "@/components/products/favorite-button";
import { Button } from "@/components/general/UI/button";

const Products = async () => {
  const { products } = await getProducts();

  return (
    <>
      <div className="grid grid-cols-3 gap-7">
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
            <CardContent className="flex items-center justify-between">
              <div>
                <h3 className="font-bold">
                  {product.brand.toUpperCase()} {product.model}
                </h3>
                <p className="mt-2 font-bold text-blue-500">
                  ${product.price}.00
                </p>
                <ProductRating />
              </div>
              <FavoriteButton />
            </CardContent>
            <CardFooter>
              <Button className="rounded-xl bg-gray-100 font-bold text-black hover:bg-gray-200 dark:bg-dark-150 dark:text-white">
                Edit Product
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};
export default Products;
