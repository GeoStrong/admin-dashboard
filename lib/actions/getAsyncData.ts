import { MessageSender, Product, RandomMessages } from "@/lib/dummy-database";
import { sortMessagesByDate } from "../functions/functions";

export const getProducts = async (): Promise<{
  response: any;
  products: Product[];
  categories: string[];
}> => {
  const request = await fetch("https://fakestoreapi.in/api/products");
  const response = await request.json();

  const categories: string[] = response.products.reduce(
    (acc: string[], product: Product) => {
      if (!acc.includes(product.category)) {
        acc.push(product.category);
      }
      return acc;
    },
    [],
  );

  return { response, products: response.products, categories };
};

export const getSingleProduct = async (
  id: string,
): Promise<{ product: Product }> => {
  const request = await fetch(`https://fakestoreapi.in/api/products/${id}`);
  const response = await request.json();
  return { product: response.product };
};

const fetchInboxMessages = async (): Promise<RandomMessages[]> => {
  const request = await fetch(
    `https://api.json-generator.com/templates/MHiNV6u2IvNx/data?access_token=${process.env.NEXT_PUBLIC_MESSAGES_API_KEY}`,
  );
  const response: RandomMessages[] = await request.json();

  return response;
};

export const getInboxMessages = async (
  quantity?: number,
): Promise<{
  randomMessages: RandomMessages[];
}> => {
  const response = await fetchInboxMessages();

  if (!Array.isArray(response)) {
    throw new Error("Expected response to be an array");
  }

  const randomMessages = response
    .sort(() => 0.5 - Math.random())
    .slice(0, quantity);

  sortMessagesByDate(randomMessages);

  randomMessages.forEach((message: RandomMessages) => {
    return message.messages.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  });

  return { randomMessages };
};

export const getAllInboxContacts = async (): Promise<MessageSender[]> => {
  const messages = await fetchInboxMessages();

  const contacts = messages.map((message) => message.sender);

  return contacts;
};

export const findInboxByContact = async (contact: MessageSender) => {
  const messages = await fetchInboxMessages();

  const inbox = messages.filter(
    (message) => message.sender.email === contact.email,
  );

  inbox.forEach((message: RandomMessages) => {
    return message.messages.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  });

  return inbox;
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
