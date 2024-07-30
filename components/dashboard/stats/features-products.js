import { getRandomProducts } from "@/lib/dummy-database";
import ProductsCarousel from "./products-carousel";

const FeaturesProducts = async () => {
  return (
    <>
      <ProductsCarousel products={await getRandomProducts(5)} />
    </>
  );
};
export default FeaturesProducts;
