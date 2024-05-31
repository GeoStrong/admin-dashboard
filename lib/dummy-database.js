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
import PricingIcon from "@/public/svg/pricing-icon";
import CalendarIcon from "@/public/svg/calendar-icon";
import ToDoIcon from "@/public/svg/todo-icon";
import ContactIcon from "@/public/svg/contact-icon";
import InvoiceIcon from "@/public/svg/invoice-icon";
import UIElementsIcon from "@/public/svg/ui-elements-icon";
import TeamIcon from "@/public/svg/team-icon";
import LogoutIcon from "@/public/svg/logout-icon";
import TableIcon from "@/public/svg/table-icon";
import SettingsIcon from "@/public/svg/settings-icon";

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

export const mainLinks = [
  { name: "Dashboard", href: "/main/dashboard", icon: <DashboardIcon /> },
  { name: "Products", href: "/main/products", icon: <ProductsIcon /> },
  { name: "Favorites", href: "/main/favorites", icon: <FavoritesIcon /> },
  { name: "Inbox", href: "/main/inbox", icon: <InboxIcon /> },
  { name: "Order Lists", href: "/main/order", icon: <OrderIcon /> },
  {
    name: "Product Stock",
    href: "/main/product-stock",
    icon: <ProductStockIcon />,
  },
];

export const pagesLinks = [
  { name: "Pricing", href: "/pages/pricing", icon: <PricingIcon /> },
  { name: "Calendar", href: "/pages/calendar", icon: <CalendarIcon /> },
  { name: "ToDo", href: "/pages/todo", icon: <ToDoIcon /> },
  { name: "Contact", href: "/pages/contact", icon: <ContactIcon /> },
  { name: "Invoice", href: "/pages/invoice", icon: <InvoiceIcon /> },
  { name: "UIElements", href: "/pages/ui-elements", icon: <UIElementsIcon /> },
  { name: "Team", href: "/pages/team", icon: <TeamIcon /> },
  { name: "Table", href: "/pages/table", icon: <TableIcon /> },
];

export const accountLinks = [
  { name: "Settings", href: "/account/settings", icon: <SettingsIcon /> },
  { name: "Logout", href: "/", icon: <LogoutIcon /> },
];

const generateRandomData = (data, name) => {
  if (name === "sales")
    for (let i = 0; i < 30; i++) {
      data.push({ pv: Math.floor(Math.random() * (85 - 7 + 1)) + 7 });
    }

  if (name === "revenue")
    for (let i = 0; i < 10; i++) {
      data.push({
        Sales: Math.floor(Math.random() * (85 - 7 + 1)) + 7,
        Profit: Math.floor(Math.random() * (85 - 7 + 1)) + 7,
      });
    }
};

export const salesMonthlyData = [
  { name: "April", data: [] },
  { name: "May", data: [] },
  { name: "June", data: [] },
];

export const revenueMonthlyData = [
  { name: "April", data: [] },
  { name: "May", data: [] },
  { name: "June", data: [] },
];

salesMonthlyData.forEach((month) => generateRandomData(month.data, "sales"));
revenueMonthlyData.forEach((month) =>
  generateRandomData(month.data, "revenue"),
);
