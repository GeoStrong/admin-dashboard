import { getRandomProducts } from "@/lib/dummy-database";
import ProductsCarousel from "./products-carousel";
import React from "react";

const FeaturesProducts: React.FC = async () => {
  return (
    <>
      <ProductsCarousel products={await getRandomProducts(5)} />
    </>
  );
};
export default FeaturesProducts;
