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
import { retrieveCategories } from "./functions/functions";
import OrderCalendar from "@/components/order/order-calendar";
import {
  ChartData,
  Invoice,
  Links,
  OrderFilterMenuProps,
  PricingPlan,
  Product,
  RandomData,
  TotalContainer,
} from "./types/types";
import { TodoItem } from "@/lib/types/types";

export const orderFilterMenu: OrderFilterMenuProps = {
  date: <OrderCalendar />,
  type: await retrieveCategories(),
  status: ["completed", "processing", "rejected"],
};

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

export const pricingPlans: PricingPlan[] = [
  {
    name: "Basic",
    price: "$14.99",
    period: "Monthly Charge",
    buttonText: "Get Started",
    buttonVariant: "outline",
    subText: "Start Your 30 Day Free Trial",
    features: [
      { text: "Free Setup", included: true },
      { text: "Bandwidth Limit 10 GB", included: true },
      { text: "20 User Connection", included: true },
      { text: "Analytics Report", included: false },
      { text: "Public API Access", included: false },
      { text: "Plugins Integration", included: false },
      { text: "Custom Content Management", included: false },
    ],
  },
  {
    name: "Standard",
    price: "$49.99",
    period: "Monthly Charge",
    buttonText: "Get Started",
    buttonVariant: "outline",
    subText: "Start Your 30 Day Free Trial",
    isPopular: true,
    features: [
      { text: "Free Setup", included: true },
      { text: "Bandwidth Limit 10 GB", included: true },
      { text: "20 User Connection", included: true },
      { text: "Analytics Report", included: true },
      { text: "Public API Access", included: true },
      { text: "Plugins Integration", included: false },
      { text: "Custom Content Management", included: false },
    ],
  },
  {
    name: "Premium",
    price: "$89.99",
    period: "Monthly Charge",
    buttonText: "Get Started",
    buttonVariant: "default",
    subText: "Start Your 30 Day Free Trial",
    features: [
      { text: "Free Setup", included: true },
      { text: "Bandwidth Limit 10 GB", included: true },
      { text: "20 User Connection", included: true },
      { text: "Analytics Report", included: true },
      { text: "Public API Access", included: true },
      { text: "Plugins Integration", included: true },
      { text: "Custom Content Management", included: true },
    ],
  },
];

export const pricingFAQs = [
  {
    question: "Can I change my plan at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "Is there a setup fee?",
    answer:
      "No, all our plans include free setup. You can get started immediately with no additional costs.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers for annual subscriptions.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes, all plans come with a 30-day free trial. No credit card required to get started.",
  },
];

export const initialTodos: TodoItem[] = [
  {
    id: "1",
    text: "Meeting with CEO",
    completed: false,
    starred: false,
    order: 0,
  },
  {
    id: "2",
    text: "Pick up kids from school",
    completed: false,
    starred: true,
    order: 1,
  },
  {
    id: "3",
    text: "Shopping with Brother",
    completed: false,
    starred: false,
    order: 2,
  },
  {
    id: "4",
    text: "Review with HR",
    completed: true,
    starred: false,
    order: 3,
  },
  {
    id: "5",
    text: "Going to Dia's School",
    completed: false,
    starred: false,
    order: 4,
  },
  {
    id: "6",
    text: "Check design files",
    completed: false,
    starred: true,
    order: 5,
  },
  {
    id: "7",
    text: "Update File",
    completed: false,
    starred: false,
    order: 6,
  },
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-001",
    from: {
      name: "Virginia Walker",
      address: "9694 Krajcik Locks Suite 635",
    },
    to: {
      name: "Austin Miller",
      address: "Brookview",
    },
    invoiceDate: "2024-11-12",
    dueDate: "2024-12-25",
    items: [
      {
        id: "1",
        description: "Children Toy",
        quantity: 2,
        baseCost: 20,
        totalCost: 80,
      },
      {
        id: "2",
        description: "Makeup",
        quantity: 2,
        baseCost: 50,
        totalCost: 100,
      },
      {
        id: "3",
        description: "Asus Laptop",
        quantity: 5,
        baseCost: 100,
        totalCost: 500,
      },
      {
        id: "4",
        description: "Iphone X",
        quantity: 4,
        baseCost: 1000,
        totalCost: 4000,
      },
    ],
    total: 4680,
    status: "pending",
  },
  {
    id: "2",
    invoiceNumber: "INV-002",
    from: {
      name: "TechCorp Solutions",
      address: "1234 Business Ave, Suite 100",
    },
    to: {
      name: "Global Industries",
      address: "5678 Commerce Street",
    },
    invoiceDate: "2024-11-15",
    dueDate: "2024-12-15",
    items: [
      {
        id: "1",
        description: "Software License",
        quantity: 10,
        baseCost: 299,
        totalCost: 2990,
      },
      {
        id: "2",
        description: "Training Services",
        quantity: 1,
        baseCost: 1500,
        totalCost: 1500,
      },
    ],
    total: 4490,
    status: "paid",
  },
  {
    id: "3",
    invoiceNumber: "INV-003",
    from: {
      name: "Creative Agency",
      address: "456 Design Boulevard",
    },
    to: {
      name: "StartupCo",
      address: "789 Innovation Drive",
    },
    invoiceDate: "2024-11-20",
    dueDate: "2024-12-20",
    items: [
      {
        id: "1",
        description: "Logo Design",
        quantity: 1,
        baseCost: 800,
        totalCost: 800,
      },
      {
        id: "2",
        description: "Website Development",
        quantity: 1,
        baseCost: 3200,
        totalCost: 3200,
      },
      {
        id: "3",
        description: "Brand Guidelines",
        quantity: 1,
        baseCost: 500,
        totalCost: 500,
      },
    ],
    total: 4500,
    status: "overdue",
  },
  {
    id: "4",
    invoiceNumber: "INV-004",
    from: {
      name: "Consulting Pro",
      address: "321 Advisory Lane",
    },
    to: {
      name: "Enterprise Corp",
      address: "654 Executive Plaza",
    },
    invoiceDate: "2024-11-25",
    dueDate: "2025-01-25",
    items: [
      {
        id: "1",
        description: "Strategy Consultation",
        quantity: 20,
        baseCost: 150,
        totalCost: 3000,
      },
      {
        id: "2",
        description: "Market Analysis",
        quantity: 1,
        baseCost: 2500,
        totalCost: 2500,
      },
    ],
    total: 5500,
    status: "draft",
  },
  {
    id: "5",
    invoiceNumber: "INV-005",
    from: {
      name: "Digital Solutions",
      address: "987 Tech Park Way",
    },
    to: {
      name: "Retail Chain Ltd",
      address: "147 Shopping Center Blvd",
    },
    invoiceDate: "2024-12-01",
    dueDate: "2024-12-31",
    items: [
      {
        id: "1",
        description: "E-commerce Platform",
        quantity: 1,
        baseCost: 5000,
        totalCost: 5000,
      },
      {
        id: "2",
        description: "Payment Integration",
        quantity: 1,
        baseCost: 1200,
        totalCost: 1200,
      },
      {
        id: "3",
        description: "Mobile App",
        quantity: 1,
        baseCost: 3500,
        totalCost: 3500,
      },
    ],
    total: 9700,
    status: "pending",
  },
];
