import ProductsList from "@/components/products/products-list";
import { RANDOM_PRODUCTS } from "@/lib/constants";
import { getDividedProducts, getRandomProducts } from "@/lib/dummy-database";

const Favorites = async ({ params }) => {
  const randomProducts = await getRandomProducts(RANDOM_PRODUCTS);
  const favoriteProducts = await getDividedProducts(randomProducts);

  return (
    <>
      <h2 className="mb-5 text-2xl font-bold">Favorite Products</h2>
      <ProductsList
        products={favoriteProducts[params.favoriteProductPage - 1]}
        allProducts={favoriteProducts}
        activePage={params.favoriteProductPage}
      />
    </>
  );
};
export default Favorites;
