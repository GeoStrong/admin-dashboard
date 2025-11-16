import {
  assignAddressToProducts,
  assignDateToProducts,
  assignStatusToProducts,
  sortMessagesByDate,
} from "../functions/functions";
import { MessageSender, Product, RandomMessages } from "../types/types";

export async function safeJsonFetch(url: string) {
  const res = await fetch(url);

  const contentType = res.headers.get("content-type");

  // not JSON
  if (!contentType?.includes("application/json")) {
    const html = await res.text();
    console.log("Non-JSON response:", html.slice(0, 200));
    throw new Error("API did not return JSON");
  }

  return res.json();
}

export const getProducts = async (): Promise<{
  response: any;
  products: Product[];
  categories: string[];
  orderProducts: Product[];
}> => {
  const response = await safeJsonFetch("https://fakestoreapi.com/products");

  // const categories: string[] = []
  const categories: string[] = response.reduce(
    (acc: string[], product: Product) => {
      if (!acc.includes(product.category)) {
        acc.push(product.category);
      }
      return acc;
    },
    [],
  );

  const productsWithDate = assignDateToProducts(response);
  const productsWithAddress = assignAddressToProducts(productsWithDate);
  const productsWithStatus = assignStatusToProducts(productsWithAddress);

  productsWithStatus.sort((a, b) => {
    const dateA = new Date(a.date.split(".").reverse().join("-"));
    const dateB = new Date(b.date.split(".").reverse().join("-"));
    return dateB.getTime() - dateA.getTime();
  });

  return {
    response,
    products: response,
    categories,
    orderProducts: productsWithStatus,
  };
};

export const getSingleProduct = async (
  id: string,
): Promise<{ product: Product }> => {
  const request = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!request.ok) {
    console.error("Fetch failed:", request.status, await request.text());
  }

  const response = await request.json().catch((err) => {
    console.error(`JSON parse error: ${err}`);
  });
  return { product: response };
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
      console.error("Fetch failed:", request.status, await request.text());
    }

    if (!request.ok) {
      throw new Error(`HTTP error! status: ${request.status}`);
    }

    const response = await request.json().catch((err) => {
      console.error(`JSON parse error: ${err}`);
    });
    return { product: response };
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }
};

let inboxMessagesCache: RandomMessages[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

const fetchInboxMessages = async (): Promise<RandomMessages[]> => {
  if (
    inboxMessagesCache &&
    cacheTimestamp &&
    Date.now() - cacheTimestamp < CACHE_DURATION
  ) {
    return inboxMessagesCache;
  }

  try {
    console.log("Fetching fresh inbox messages from API");
    const request = await fetch(
      `https://api.json-generator.com/templates/MHiNV6u2IvNx/data?access_token=${process.env.NEXT_PUBLIC_MESSAGES_API_KEY}`,
    );

    if (!request.ok) {
      throw new Error(`HTTP error! status: ${request.status}`);
    }

    const response: RandomMessages[] = await request.json();

    inboxMessagesCache = response;
    cacheTimestamp = Date.now();

    return response;
  } catch (error) {
    console.error("Error fetching inbox messages:", error);

    if (inboxMessagesCache) {
      console.log("API failed, using expired cache");
      return inboxMessagesCache;
    }

    console.log("No cache available, returning empty array");
    return [];
  }
};

export const getInboxMessages = async (
  quantity?: number,
): Promise<{
  randomMessages: RandomMessages[];
}> => {
  try {
    const response = await fetchInboxMessages();

    if (!Array.isArray(response)) {
      console.error("Expected response to be an array, got:", typeof response);
      return { randomMessages: [] };
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
  } catch (error) {
    console.error("Error in getInboxMessages:", error);
    return { randomMessages: [] };
  }
};

export const getInboxMessagesById = async (
  id: string,
): Promise<RandomMessages | null> => {
  try {
    const messages = await fetchInboxMessages();
    const inboxMessages = messages.filter((message) => message.id === id);

    if (inboxMessages.length === 0) {
      console.warn(`No messages found for id: ${id}`);
      return null;
    }

    return inboxMessages[0];
  } catch (error) {
    console.error("Error in getInboxMessagesById:", error);
    return null;
  }
};

export const getAllInboxContacts = async (): Promise<MessageSender[]> => {
  try {
    const messages = await fetchInboxMessages();

    if (!Array.isArray(messages) || messages.length === 0) {
      return [];
    }

    const contacts = messages.map((message) => message.sender);
    return contacts;
  } catch (error) {
    console.error("Error in getAllInboxContacts:", error);
    return [];
  }
};

export const findInboxByContact = async (contact: MessageSender) => {
  try {
    const messages = await fetchInboxMessages();

    if (!Array.isArray(messages) || messages.length === 0) {
      return [];
    }

    const inbox = messages.filter(
      (message) => message.sender.email === contact.email,
    );

    inbox.forEach((message: RandomMessages) => {
      return message.messages.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
    });

    return inbox;
  } catch (error) {
    console.error("Error in findInboxByContact:", error);
    return [];
  }
};

export const getProfiles = async (): Promise<
  { id: string; profiles: MessageSender }[]
> => {
  try {
    const response = await fetchInboxMessages();

    if (!Array.isArray(response) || response.length === 0) {
      return generateMockContacts();
    }

    const profiles = response.map((message) => ({
      id: message.id,
      profiles: message.sender,
    }));

    // If we have less than 20 contacts, add some mock ones to demonstrate pagination
    if (profiles.length < 20) {
      const mockContacts = generateMockContacts(20 - profiles.length);
      return [...profiles, ...mockContacts];
    }

    return profiles;
  } catch (error) {
    console.error("Error in getProfiles:", error);
    return generateMockContacts();
  }
};

// Helper function to generate mock contacts for demonstration
const generateMockContacts = (
  count: number = 25,
): { id: string; profiles: MessageSender }[] => {
  const firstNames = [
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
    "Edward",
    "Fiona",
    "George",
    "Hannah",
    "Ian",
    "Julia",
    "Kevin",
    "Laura",
    "Michael",
    "Nina",
    "Oliver",
    "Paula",
    "Quinn",
    "Rachel",
    "Samuel",
    "Tina",
    "Uma",
    "Victor",
    "Wendy",
    "Xavier",
    "Yara",
    "Zoe",
  ];

  const lastNames = [
    "Anderson",
    "Brown",
    "Clark",
    "Davis",
    "Evans",
    "Garcia",
    "Harris",
    "Johnson",
    "Jones",
    "Miller",
    "Moore",
    "Rodriguez",
    "Smith",
    "Taylor",
    "Thomas",
    "White",
    "Williams",
    "Wilson",
    "Martinez",
    "Lopez",
    "Gonzalez",
    "Perez",
    "Sanchez",
    "Ramirez",
  ];

  const companies = [
    "@tech-corp.com",
    "@innovate.io",
    "@startup.co",
    "@enterprise.net",
    "@digital.com",
    "@solutions.org",
    "@systems.biz",
    "@creative.agency",
    "@consulting.pro",
    "@design.studio",
  ];

  const mockContacts = [];

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    const company = companies[i % companies.length];

    mockContacts.push({
      id: `mock-contact-${i + 1}`,
      profiles: {
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${company}`,
        fullname: `${firstName} ${lastName}`,
        profileImage: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&size=200`,
      },
    });
  }

  return mockContacts;
};

export const clearInboxMessagesCache = (): void => {
  inboxMessagesCache = null;
  cacheTimestamp = null;
};

export const getInboxMessagesCacheStatus = (): {
  cached: boolean;
  age: number | null;
  expires: number | null;
} => {
  if (!inboxMessagesCache || !cacheTimestamp) {
    return { cached: false, age: null, expires: null };
  }

  const age = Date.now() - cacheTimestamp;
  const expires = CACHE_DURATION - age;

  return {
    cached: true,
    age,
    expires: expires > 0 ? expires : 0,
  };
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
