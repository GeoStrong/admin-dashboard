import React from "react";
import ProductDescriptionAccordion from "@/components/products/product-description-accordion";
import { getSingleProduct } from "@/lib/actions/getAsyncData";
import Image from "next/image";
import BackNavigation from "@/components/general/UI/back-navigation";
import FavoriteButton from "@/components/products/favorite-button";
import { Button } from "@/components/general/UI/button";
import Link from "next/link";

type ProductIdParams = Promise<{ productId: string }>;

const Product: React.FC<{ params: ProductIdParams }> = async ({ params }) => {
  const { productId } = await params;
  const { product } = await getSingleProduct(productId);

  return (
    <>
      <BackNavigation />
      <div className="mt-6 flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col items-center sm:items-start md:w-1/2">
          <h2 className="text-md mb-5 font-bold">{product?.title}</h2>
          <div className="flex justify-between gap-3">
            <Image
              width={200}
              height={100}
              src={product?.image}
              alt={product?.title}
              className="rounded-2xl"
            />
            <div className="flex flex-col items-center">
              <FavoriteButton className="text-xl" productId={product?.id} />
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-col md:mt-20">
          <h3 className="text-center text-xl font-bold">
            Technical Characteristics
          </h3>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <p className="font-bold">
              Brand: <span className="font-light">{product?.brand}</span>
            </p>
            <p className="font-bold">
              Model: <span className="font-light">{product?.model}</span>
            </p>
            <p className="font-bold">
              Color: <span className="font-light">{product?.color}</span>
            </p>
            <p className="font-bold">
              Price: <span className="font-light">${product?.price}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <ProductDescriptionAccordion description={product?.description} />
        <Link href={`/main/product/${product?.id}/edit`}>
          <Button className="rounded-xl bg-gray-200 font-bold text-black hover:bg-gray-300 dark:bg-dark-150 dark:text-white">
            Edit Product
          </Button>
        </Link>
      </div>
    </>
  );
};
export default Product;
