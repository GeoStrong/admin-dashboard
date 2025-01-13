import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/general/UI/card";
import Image from "next/image";
import ProductRating from "@/components/products/product-rating";
import FavoriteButton from "@/components/products/favorite-button";
import { Button } from "@/components/general/UI/button";
import ProductsPagination from "@/components/products/products-pagination";
import Link from "next/link";
import { Product } from "@/lib/types/types";

const ProductsList: React.FC<{
  products: Product[];
  allProducts: Product[];
  activePage: number;
}> = ({ products, allProducts, activePage }) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {products?.map((product, index) => (
          <Card key={index} id={product.id.toString()}>
            <CardHeader className="h-66 flex items-center justify-center">
              <Link href={`/main/product/${product.id}`}>
                <Image
                  width={200}
                  height={100}
                  src={product.image}
                  alt={product.title}
                  className="rounded-2xl"
                />
              </Link>
            </CardHeader>
            <CardContent className="flex h-40 items-center justify-between">
              <div>
                <h3 className="font-bold">
                  <Link href={`/main/product/${product.id}`}>
                    {product.brand.toUpperCase()} {product.model}
                  </Link>
                </h3>
                <p className="mt-2 font-bold text-blue-500">
                  ${product.price}.00
                </p>
                <ProductRating />
              </div>
              <FavoriteButton productId={product.id} />
            </CardContent>
            <CardFooter>
              <Button className="rounded-xl bg-gray-100 font-bold text-black hover:bg-gray-200 dark:bg-dark-150 dark:text-white">
                Edit Product
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <ProductsPagination pages={allProducts} activePage={activePage} />
    </>
  );
};
export default ProductsList;
