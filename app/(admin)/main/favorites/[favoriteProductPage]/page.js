import ProductsList from "@/components/products/products-list";
import { getDividedProducts, getRandomProducts } from "@/lib/dummy-database";

const Favorites = async ({ params }) => {
  const randomProducts = await getRandomProducts(22);
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
