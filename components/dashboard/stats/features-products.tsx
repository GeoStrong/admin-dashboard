import { getRandomProducts } from "@/lib/dummy-database";
import ProductsCarousel from "./products-carousel";
import React from "react";

const FeaturesProducts: React.FC = async () => {
  const products = await getRandomProducts(5);

  if (!products || products.length === 0) {
    return <div className=""></div>;
  }

  return (
    <>
      <ProductsCarousel products={await getRandomProducts(5)} />
    </>
  );
};
export default FeaturesProducts;
