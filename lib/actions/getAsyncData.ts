import {
  assignAddressToProducts,
  assignDateToProducts,
  assignStatusToProducts,
  sortMessagesByDate,
} from "../functions/functions";
import { MessageSender, Product, RandomMessages } from "../types/types";

export const getProducts = async (): Promise<{
  response: any;
  products: Product[];
  categories: string[];
  orderProducts: Product[];
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

  const productsWithDate = assignDateToProducts(response.products);
  const productsWithAddress = assignAddressToProducts(productsWithDate);
  const productsWithStatus = assignStatusToProducts(productsWithAddress);

  productsWithStatus.sort((a, b) => {
    const dateA = new Date(a.date.split(".").reverse().join("-"));
    const dateB = new Date(b.date.split(".").reverse().join("-"));
    return dateB.getTime() - dateA.getTime();
  });

  return {
    response,
    products: response.products,
    categories,
    orderProducts: productsWithStatus,
  };
};

export const getSingleProduct = async (
  id: string,
): Promise<{ product: Product }> => {
  const request = await fetch(`https://fakestoreapi.in/api/products/${id}`);
  const response = await request.json();
  return { product: response.product };
};

export const updateProduct = async (
  id: string,
  productData: Partial<Product>,
): Promise<{ product: Product }> => {
  try {
    const request = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: productData.title,
        price: productData.price,
        description: productData.description,
        image: productData.image,
        category: productData.category,
      }),
    });

    if (!request.ok) {
      throw new Error(`HTTP error! status: ${request.status}`);
    }

    const response = await request.json();
    return { product: response };
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }
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
