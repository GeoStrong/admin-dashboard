import ProductsList from "@/components/products/products-list";
import { getProducts } from "@/lib/actions/getAsyncData";
import { getDividedProducts } from "@/lib/dummy-database";

const Products = async ({ params }) => {
  const { products } = await getProducts();
  const productsPage = await getDividedProducts(products);

  return (
    <>
      <h2 className="mb-5 text-2xl font-bold">Products</h2>
      <ProductsList
        products={productsPage[params.productPage - 1]}
        allProducts={productsPage}
        activePage={params.productPage}
      />
    </>
  );
};
export default Products;
