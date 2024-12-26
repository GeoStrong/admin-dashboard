import React from "react";
import usersIcon from "@/public/users.svg";
import orderIcon from "@/public/order.svg";
import salesIcon from "@/public/sales.svg";
import pendingIcon from "@/public/pending.svg";
import DashboardIcon from "@/public/svg/menu-icons/dashboard-icon";
import ProductsIcon from "@/public/svg/menu-icons/products-icon";
import FavoritesIcon from "@/public/svg/menu-icons/favorites-icon";
import InboxIcon from "@/public/svg/menu-icons/inbox-icon";
import OrderIcon from "@/public/svg/menu-icons/order-icon";
import ProductStockIcon from "@/public/svg/menu-icons/product-stock-icon";
import PricingIcon from "@/public/svg/menu-icons/pricing-icon";
import CalendarIcon from "@/public/svg/menu-icons/calendar-icon";
import ToDoIcon from "@/public/svg/menu-icons/todo-icon";
import ContactIcon from "@/public/svg/menu-icons/contact-icon";
import InvoiceIcon from "@/public/svg/menu-icons/invoice-icon";
import UIElementsIcon from "@/public/svg/menu-icons/ui-elements-icon";
import TeamIcon from "@/public/svg/menu-icons/team-icon";
import LogoutIcon from "@/public/svg/menu-icons/logout-icon";
import TableIcon from "@/public/svg/menu-icons/table-icon";
import SettingsIcon from "@/public/svg/menu-icons/settings-icon";
import { getProducts } from "./actions/getAsyncData";
import MailInboxIcon from "@/public/svg/mail-icons/main-inbox-icon";
import MailStarredIcon from "@/public/svg/mail-icons/mail-starred-icon";
import MailSentIcon from "@/public/svg/mail-icons/mail-sent-icon";
import MailDraftsIcon from "@/public/svg/mail-icons/mail-drafts-icon";
import MailSpamIcon from "@/public/svg/mail-icons/mail-spam-icon";
import MailImportantIcon from "@/public/svg/mail-icons/mail-important-icon";
import MailBinIcon from "@/public/svg/mail-icons/mail-bin-icon";
import { StaticImageData } from "next/image";

export interface RandomData {
  name?: string;
  pv?: number;
  Sales?: number;
  Profit?: number;
  uv?: number;
  value?: number;
}

export interface TotalContainer {
  name: string;
  quantity: string | number;
  icon: StaticImageData;
  status: string;
  percentage: string;
  time: string;
}

export interface Links {
  name: string;
  href: string;
  hrefName?: string;
  icon?: React.ReactNode;
}

export interface ChartData {
  name: string;
  data?: RandomData[];
  value?: RandomData[];
}

export interface MonthSettings {
  monthData: ChartData[];
  activeMonth: string;
  setActiveMonth: (month: string) => void;
}

export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  brand: string;
  model: string;
  color: string;
  category: string;
  discount: number;
}

export interface MessageTexts {
  date: string;
  from: "receiver" | "sender";
  text: string;
  attachment?: string;
  // attachment?: { file: string; name: string; type: string };
}

export interface RandomMessages {
  attachment: [{ filename: string; size: string }];
  date: string;
  header: string;
  id: string;
  messages: MessageTexts[];
  sender: { email: string; fullname: string; profileImage: string };
  text: string;
}

export interface InboxRecorderControls {
  recordedBlob: Blob;
  isRecordingInProgress: boolean;
  isCleared: boolean;
  isPausedRecording: boolean;
  startRecording(): void;
  stopRecording(): void;
  clearCanvas(): void;
}

export type ToolFunctions = () => void;

export type ReactDispatchState = React.Dispatch<
  React.SetStateAction<InboxMessageState | InboxMessageState[]>
>;

const generateRandomData = (
  data: RandomData[],
  name: string,
  counter?: number,
) => {
  if (name === "sales")
    for (let i = 0; i < counter; i++) {
      data.push({ pv: Math.floor(Math.random() * (85 - 7 + 1)) + 7 });
    }

  if (name === "revenue") {
    for (let i = 0; i < counter; i++) {
      data.push({
        Sales: Math.floor(Math.random() * (85 - 7 + 1)) + 7,
        Profit: Math.floor(Math.random() * (85 - 7 + 1)) + 7,
      });
    }
  }
  if (name === "customers") {
    data.push({
      value: Math.floor(Math.random() * (40000 - 10000 + 1)) + 10000,
    });
  }

  if (name === "sales analytics") {
    for (let i = 0; i < counter; i++) {
      data.push({
        name: `${2018 + i}`,
        uv: Math.floor(Math.random() * (80 - 5 + 1)) + 5,
        pv: Math.floor(Math.random() * (80 - 5 + 1)) + 5,
      });
    }
  }
};

export const totalContainer: TotalContainer[] = [
  {
    name: "User",
    quantity: Math.floor(Math.random() * (50_000 - 10_000 + 1)) + 10_000,
    icon: usersIcon,
    status: Math.random() < 0.5 ? "Down" : "Up",
    percentage: (Math.random() * 10).toFixed(1),
    time: "yesterday",
  },
  {
    name: "Order",
    quantity: Math.floor(Math.random() * (5_000 - 500 + 1)) + 500,
    icon: orderIcon,
    status: Math.random() < 0.5 ? "Down" : "Up",
    percentage: (Math.random() * 10).toFixed(1),
    time: "past week",
  },
  {
    name: "Sales",
    quantity: `$ ${Math.floor(Math.random() * (100_000 - 20_000 + 1)) + 20_000}`,
    icon: salesIcon,
    status: Math.random() < 0.5 ? "Down" : "Up",
    percentage: (Math.random() * 10).toFixed(1),
    time: "past month",
  },
  {
    name: "Pending",
    quantity: Math.floor(Math.random() * (3_000 - 100 + 1)) + 100,
    icon: pendingIcon,
    status: Math.random() < 0.5 ? "Down" : "Up",
    percentage: (Math.random() * 10).toFixed(1),
    time: "yesterday",
  },
];

export const mainLinks: Links[] = [
  {
    name: "Dashboard",
    href: "/main/dashboard",
    hrefName: "/main/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Products",
    href: "/main/products/1",
    hrefName: "/main/products",
    icon: <ProductsIcon />,
  },
  {
    name: "Favorites",
    href: "/main/favorites/1",
    hrefName: "/main/favorites",
    icon: <FavoritesIcon />,
  },
  {
    name: "Inbox",
    href: "/main/inbox/primary",
    hrefName: "/main/inbox/primary",
    icon: <InboxIcon />,
  },
  {
    name: "Order Lists",
    href: "/main/order",
    hrefName: "/main/order",
    icon: <OrderIcon />,
  },
  {
    name: "Product Stock",
    href: "/main/product-stock",
    hrefName: "/main/product-stock",
    icon: <ProductStockIcon />,
  },
];

export const pagesLinks: Links[] = [
  {
    name: "Pricing",
    href: "/pages/pricing",
    hrefName: "/pages/pricing",
    icon: <PricingIcon />,
  },
  {
    name: "Calendar",
    href: "/pages/calendar",
    hrefName: "/pages/calendar",
    icon: <CalendarIcon />,
  },
  {
    name: "To-Do",
    href: "/pages/todo",
    hrefName: "/pages/todo",
    icon: <ToDoIcon />,
  },
  {
    name: "Contact",
    href: "/pages/contact",
    hrefName: "/pages/contact",
    icon: <ContactIcon />,
  },
  {
    name: "Invoice",
    href: "/pages/invoice",
    hrefName: "/pages/invoice",
    icon: <InvoiceIcon />,
  },
  {
    name: "UIElements",
    href: "/pages/ui-elements",
    hrefName: "/pages/ui-elements",
    icon: <UIElementsIcon />,
  },
  {
    name: "Team",
    href: "/pages/team",
    hrefName: "/pages/team",
    icon: <TeamIcon />,
  },
  {
    name: "Table",
    href: "/pages/table",
    hrefName: "/pages/table",
    icon: <TableIcon />,
  },
];

export const accountLinks: Links[] = [
  {
    name: "Settings",
    href: "/account/settings",
    hrefName: "/account/settings",
    icon: <SettingsIcon />,
  },
  {
    name: "Logout",
    href: "/Logout",
    hrefName: "/Logout",
    icon: <LogoutIcon />,
  },
];

export const dashboardLinks: Links[] = [
  {
    name: "Dashboard",
    href: "/main/dashboard",
  },
  {
    name: "Stats",
    href: "/main/dashboard/stats",
  },
];

export const mailMenu: Links[] = [
  {
    name: "Inbox",
    icon: <MailInboxIcon />,
    href: "/main/inbox/primary",
  },
  {
    name: "Starred",
    icon: <MailStarredIcon starred={undefined} />,
    href: "/main/inbox/starred",
  },
  {
    name: "Sent",
    icon: <MailSentIcon />,
    href: "/main/inbox/sent",
  },
  {
    name: "Drafts",
    icon: <MailDraftsIcon />,
    href: "/main/inbox/drafts",
  },
  {
    name: "Spam",
    icon: <MailSpamIcon />,
    href: "/main/inbox/spam",
  },
  {
    name: "Important",
    icon: <MailImportantIcon />,
    href: "/main/inbox/important",
  },
  {
    name: "Bin",
    icon: <MailBinIcon />,
    href: "/main/inbox/bin",
  },
];

export const salesMonthlyData: ChartData[] = [
  { name: "April", data: [] },
  { name: "May", data: [] },
  { name: "June", data: [] },
];

export const revenueMonthlyData: ChartData[] = [
  { name: "April", data: [] },
  { name: "May", data: [] },
  { name: "June", data: [] },
];

export const customersData: ChartData[] = [
  { name: "New Customers", value: [] },
  { name: "Returning Customers", value: [] },
];

export const salesAnalyticsData: RandomData[] = [];

export interface InboxMessageState {
  [key: string]: boolean;
}

salesMonthlyData.forEach((month) =>
  generateRandomData(month.data, "sales", 30),
);
revenueMonthlyData.forEach((month) =>
  generateRandomData(month.data, "revenue", 10),
);
customersData.forEach((data) => generateRandomData(data.value, "customers"));
generateRandomData(salesAnalyticsData, "sales analytics", 7);

export const getRandomProducts = async (
  quantity: number,
): Promise<Product[]> => {
  const { products } = await getProducts();
  const randomProducts = [];
  const selectedIndices = new Set();

  while (randomProducts.length < quantity) {
    const randomIndex = Math.floor(Math.random() * products.length);
    if (!selectedIndices.has(randomIndex)) {
      selectedIndices.add(randomIndex);
      randomProducts.push(products[randomIndex]);
    }
  }

  return randomProducts;
};

export const getDividedProducts = async (products: Product[]) => {
  const productsPage = [];

  const productsPerPage = 10;
  const pages = Math.ceil(products.length / productsPerPage);

  for (let i = 0; i < pages; i++) {
    productsPage.push(
      products.slice(i * productsPerPage, (i + 1) * productsPerPage),
    );
  }
  return productsPage;
};

export const defaultOptions = {
  isPreventDefault: true,
  delay: 300,
};

// const favoriteProducts = [];

// export const addFavoriteProduct = (productId) => {
//   favoriteProducts.push(productId);
// };

// export const removeFavoriteProduct = (productId) => {
//   favoriteProducts.filter((id) => id !== productId);
// };

// export default favoriteProducts;
