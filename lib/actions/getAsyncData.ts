import { Product, RandomMessages } from "@/lib/dummy-database";

export const getProducts = async (): Promise<{
  response: any;
  products: Product[];
}> => {
  const request = await fetch("https://fakestoreapi.in/api/products");
  const response = await request.json();

  return { response, products: response.products };
};

export const getSingleProduct = async (
  id: string,
): Promise<{ product: Product }> => {
  const request = await fetch(`https://fakestoreapi.in/api/products/${id}`);
  const response = await request.json();
  return { product: response.product };
};

export const getInboxMessages = async (): Promise<{
  randomMessages: RandomMessages[];
}> => {
  const request = await fetch(
    `https://api.json-generator.com/templates/MHiNV6u2IvNx/data?access_token=lra00kenlplwmz4c53iha6p7c22u0ufq3h6eb9f5`,
  );
  const response = await request.json();
  const sortedMessages = response.sort(
    (a: RandomMessages, b: RandomMessages) =>
      new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  return { randomMessages: sortedMessages };
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
