import usersIcon from "@/public/users.svg";
import orderIcon from "@/public/order.svg";
import salesIcon from "@/public/sales.svg";
import pendingIcon from "@/public/pending.svg";
import DashboardIcon from "@/public/svg/dashboard-icon";
import ProductsIcon from "@/public/svg/products-icon";
import FavoritesIcon from "@/public/svg/favorites-icon";
import InboxIcon from "@/public/svg/inbox-icon";
import OrderIcon from "@/public/svg/order-icon";
import ProductStockIcon from "@/public/svg/product-stock-icon";

export const totalContainer = [
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

export const links = [
  { name: "Dashboard", href: "/dashboard", icon: <DashboardIcon /> },
  { name: "Products", href: "/products", icon: <ProductsIcon /> },
  { name: "Favorites", href: "/favorites", icon: <FavoritesIcon /> },
  { name: "Inbox", href: "/inbox", icon: <InboxIcon /> },
  { name: "Order Lists", href: "/order", icon: <OrderIcon /> },
  {
    name: "Product Stock",
    href: "/product-stock",
    icon: <ProductStockIcon />,
  },
];

const generateRandomData = (data) => {
  for (let i = 0; i < 30; i++)
    data.push({ pv: Math.floor(Math.random() * (85 - 7 + 1)) + 7 });
};

export const salesMonthlyData = [
  { name: "April", data: [] },
  { name: "May", data: [] },
  { name: "June", data: [] },
];

salesMonthlyData.forEach((month) => generateRandomData(month.data));
