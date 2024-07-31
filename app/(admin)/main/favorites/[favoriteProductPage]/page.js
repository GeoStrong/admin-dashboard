import ProductsList from "@/components/products/products-list";
import { getDividedProducts, getRandomProducts } from "@/lib/dummy-database";

const Favorites = async ({ params }) => {
  // const [favoriteProducts, setFavoriteProducts] = useState([]);
  // const favoriteProductsIds = useAppSelector(
  //   (state) => state.products.favoriteProducts,
  // );

  // useEffect(() => {
  //   const getProducts = async () => {
  //     const products = await getFavoriteProducts(favoriteProductsIds);
  //     setFavoriteProducts(products);
  //   };

  //   getProducts();
  // }, [favoriteProductsIds]);

  // console.log(favoriteProducts);
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
