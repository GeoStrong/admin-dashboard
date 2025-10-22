import ProductsList from "@/components/products/products-list";
import { getDividedProducts, getRandomProducts } from "@/lib/dummy-database";
import React from "react";

type FavoriteProductPageParams = Promise<{ favoriteProductPage: number }>;

const Favorites: React.FC<{ params: FavoriteProductPageParams }> = async ({
  params,
}) => {
  const { favoriteProductPage } = await params;
  const randomProducts = await getRandomProducts(+process.env.RANDOM_PRODUCTS);
  const favoriteProducts = await getDividedProducts(randomProducts);

  console.log("favorite", favoriteProductPage);

  return (
    <>
      <h2 className="mb-5 text-2xl font-bold">Favorite Products</h2>
      <ProductsList
        products={favoriteProducts[favoriteProductPage - 1]}
        allProducts={favoriteProducts}
        activePage={favoriteProductPage}
      />
    </>
  );
};
export default Favorites;
