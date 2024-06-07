import { getRandomProducts } from "@/lib/dummy-database";
import ProductsCarousel from "./products-carousel";
import getProducts from "@/lib/actions/getProducts";

const FeaturesProducts = async () => {
  const { products } = await getProducts();

  return (
    <>
      <ProductsCarousel products={getRandomProducts(5, products)} />
    </>
  );
};
export default FeaturesProducts;
