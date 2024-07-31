export const getProducts = async () => {
  const request = await fetch("https://fakestoreapi.in/api/products");
  const response = await request.json();

  return { response, products: response.products };
};

export const getSingleProduct = async (id) => {
  const request = await fetch(`https://fakestoreapi.in/api/products/${id}`);
  const response = await request.json();
  return { product: response.product };
};

// export const getFavoriteProducts = async (ids) => {
//   const products = await Promise.all(
//     ids.map(async (id) => {
//       const request = await fetch(`https://fakestoreapi.in/api/products/${id}`);
//       const response = await request.json();
//       return response.product;
//     }),
//   );

//   console.log(products);

//   return products;
// };
