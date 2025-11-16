import ProductsList from "@/components/products/products-list";
import { getProducts } from "@/lib/actions/getAsyncData";
import { getDividedProducts } from "@/lib/dummy-database";
import React from "react";

type ProductPageParams = Promise<{ productPage: number }>;

const Products: React.FC<{ params: ProductPageParams }> = async ({
  params,
}) => {
  const { productPage } = await params;
  const { products } = await getProducts();
  const productsPage = await getDividedProducts(products);

  return (
    <>
      <h2 className="mb-5 text-2xl font-bold">Products</h2>
      {(!products || products.length === 0) && (
        <p className="text-center text-xl font-bold">No products to display</p>
      )}

      <ProductsList
        products={productsPage[productPage - 1]}
        allProducts={productsPage}
        activePage={productPage}
      />
    </>
  );
};
export default Products;
