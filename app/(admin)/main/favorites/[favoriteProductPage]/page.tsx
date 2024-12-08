import ProductsList from "@/components/products/products-list";
import { RANDOM_PRODUCTS } from "@/lib/constants";
import {
  getDividedProducts,
  getRandomProducts,
  Product,
} from "@/lib/dummy-database";
import React from "react";

type FavoriteProductPageParams = Promise<{ favoriteProductPage: number }>;

const Favorites: React.FC<{ params: FavoriteProductPageParams }> = async ({
  params,
}) => {
  const { favoriteProductPage } = await params;
  const randomProducts = await getRandomProducts(RANDOM_PRODUCTS);
  const favoriteProducts = await getDividedProducts(randomProducts);

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
