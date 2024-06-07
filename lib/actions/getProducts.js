const getProducts = async () => {
  const request = await fetch("https://fakestoreapi.in/api/products");
  const response = await request.json();

  return { response, products: response.products };
};
export default getProducts;
