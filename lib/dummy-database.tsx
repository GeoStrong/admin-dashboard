import React from "react";
import { faker } from "@faker-js/faker";
import usersIcon from "@/public/users.svg";
import orderIcon from "@/public/order.svg";
import salesIcon from "@/public/sales.svg";
import pendingIcon from "@/public/pending.svg";
import DashboardIcon from "@/public/svg/menu-icons/dashboard-icon";
import ProductsIcon from "@/public/svg/menu-icons/products-icon";
import FavoritesIcon from "@/public/svg/menu-icons/favorites-icon";
import InboxIcon from "@/public/svg/menu-icons/inbox-icon";
import OrderIcon from "@/public/svg/menu-icons/order-icon";
import PricingIcon from "@/public/svg/menu-icons/pricing-icon";
import CalendarIcon from "@/public/svg/menu-icons/calendar-icon";
import ToDoIcon from "@/public/svg/menu-icons/todo-icon";
import ContactIcon from "@/public/svg/menu-icons/contact-icon";
import InvoiceIcon from "@/public/svg/menu-icons/invoice-icon";
import UIElementsIcon from "@/public/svg/menu-icons/ui-elements-icon";
import TeamIcon from "@/public/svg/menu-icons/team-icon";
import LogoutIcon from "@/public/svg/menu-icons/logout-icon";
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
  AppearanceSettings,
  BillingInfo,
  CalendarEvent,
  CalendarAttendee,
  ChartData,
  Invoice,
  Links,
  NotificationSettings,
  OrderFilterMenuProps,
  PricingPlan,
  PrivacySettings,
  Product,
  RandomData,
  SecuritySettings,
  TeamMember,
  TotalContainer,
  UserProfile,
} from "./types/types";
import { TodoItem } from "@/lib/types/types";
import avatarImg from "@/public/avatar.png";

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

// Mock data for charts
export const barChartData = [
  { name: "Jan", sales: 4000, revenue: 2400, profit: 1200 },
  { name: "Feb", sales: 3000, revenue: 1398, profit: 900 },
  { name: "Mar", sales: 2000, revenue: 9800, profit: 3200 },
  { name: "Apr", sales: 2780, revenue: 3908, profit: 1800 },
  { name: "May", sales: 1890, revenue: 4800, profit: 2100 },
  { name: "Jun", sales: 2390, revenue: 3800, profit: 1600 },
  { name: "Jul", sales: 3490, revenue: 4300, profit: 2200 },
  { name: "Aug", sales: 4200, revenue: 5100, profit: 2800 },
  { name: "Sep", sales: 3800, revenue: 4500, profit: 2400 },
  { name: "Oct", sales: 4100, revenue: 4800, profit: 2600 },
  { name: "Nov", sales: 3900, revenue: 4200, profit: 2300 },
  { name: "Dec", sales: 4500, revenue: 5200, profit: 3000 },
];

export const lineChartData = [
  { name: "Week 1", users: 400, sessions: 240 },
  { name: "Week 2", users: 300, sessions: 139 },
  { name: "Week 3", users: 200, sessions: 980 },
  { name: "Week 4", users: 278, sessions: 390 },
  { name: "Week 5", users: 189, sessions: 480 },
  { name: "Week 6", users: 239, sessions: 380 },
  { name: "Week 7", users: 349, sessions: 430 },
];

export const areaChartData = [
  { name: "Jan", mobile: 4000, desktop: 2400, tablet: 1200 },
  { name: "Feb", mobile: 3000, desktop: 1398, tablet: 900 },
  { name: "Mar", mobile: 2000, desktop: 9800, tablet: 3200 },
  { name: "Apr", mobile: 2780, desktop: 3908, tablet: 1800 },
  { name: "May", mobile: 1890, desktop: 4800, tablet: 2100 },
  { name: "Jun", mobile: 2390, desktop: 3800, tablet: 1600 },
];

export const pieChartData = [
  { name: "Desktop", value: 400, color: "#0088FE" },
  { name: "Mobile", value: 300, color: "#00C49F" },
  { name: "Tablet", value: 200, color: "#FFBB28" },
  { name: "Other", value: 100, color: "#FF8042" },
];

export const donutChartData = [
  { name: "Product A", value: 35, color: "#8884d8" },
  { name: "Product B", value: 25, color: "#82ca9d" },
  { name: "Product C", value: 20, color: "#ffc658" },
  { name: "Product D", value: 15, color: "#ff7300" },
  { name: "Product E", value: 5, color: "#00ff88" },
];

export const radarChartData = [
  { subject: "Math", A: 120, B: 110, fullMark: 150 },
  { subject: "Chinese", A: 98, B: 130, fullMark: 150 },
  { subject: "English", A: 86, B: 130, fullMark: 150 },
  { subject: "Geography", A: 99, B: 100, fullMark: 150 },
  { subject: "Physics", A: 85, B: 90, fullMark: 150 },
  { subject: "History", A: 65, B: 85, fullMark: 150 },
];

export const composedChartData = [
  { name: "Page A", uv: 590, pv: 800, amt: 1400 },
  { name: "Page B", uv: 868, pv: 967, amt: 1506 },
  { name: "Page C", uv: 1397, pv: 1098, amt: 989 },
  { name: "Page D", uv: 1480, pv: 1200, amt: 1228 },
  { name: "Page E", uv: 1520, pv: 1108, amt: 1100 },
  { name: "Page F", uv: 1400, pv: 680, amt: 1700 },
];

export const chartColors = {
  primary: "#8884d8",
  secondary: "#82ca9d",
  tertiary: "#ffc658",
  quaternary: "#ff7300",
  quinary: "#00ff88",
};

export const chartConfig = {
  responsive: true,
  maintainAspectRatio: false,
};

// Team Mock Data
const generateTeamMember = (id: string): TeamMember => {
  const departments = [
    "Engineering",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
    "Design",
    "Operations",
  ];
  const positions = [
    "Software Engineer",
    "Senior Developer",
    "Product Manager",
    "UX Designer",
    "Marketing Manager",
    "Sales Representative",
    "HR Specialist",
    "Financial Analyst",
    "DevOps Engineer",
    "QA Engineer",
    "Data Scientist",
    "Project Manager",
  ];
  const skills = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "TypeScript",
    "AWS",
    "Docker",
    "GraphQL",
    "MongoDB",
    "PostgreSQL",
    "Git",
    "Agile",
    "Scrum",
    "UI/UX",
    "Marketing",
    "Sales",
    "Analytics",
    "Project Management",
    "Leadership",
  ];
  const locations = [
    "New York",
    "San Francisco",
    "London",
    "Berlin",
    "Tokyo",
    "Remote",
  ];
  const statuses = ["active", "inactive", "on-leave"] as const;

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const selectedSkills = faker.helpers.arrayElements(skills, {
    min: 2,
    max: 5,
  });

  return {
    id,
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }),
    phoneNumber: faker.phone.number(),
    position: faker.helpers.arrayElement(positions),
    department: faker.helpers.arrayElement(departments),
    profileImage: `https://i.pravatar.cc/150?img=${parseInt(id)}`,
    joinDate: faker.date.past({ years: 5 }).toISOString().split("T")[0],
    status: faker.helpers.arrayElement(statuses),
    skills: selectedSkills,
    location: faker.helpers.arrayElement(locations),
  };
};

export const teamMembers: TeamMember[] = Array.from(
  { length: 24 },
  (_, index) => generateTeamMember((index + 1).toString()),
);

export const teamDepartments = [
  "All",
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Design",
  "Operations",
];
export const teamStatuses = ["All", "active", "inactive", "on-leave"];

// Calendar Mock Data
const generateCalendarEvent = (id: string): CalendarEvent => {
  const eventTypes = [
    "conference",
    "festival",
    "meeting",
    "reminder",
    "other",
  ] as const;
  const locations = [
    "56 Davion Mission Suite 157, Meaghenberg",
    "852 Moore Flats Suite 158, Sweden",
    "645 Walter Road Apt. 571, Turks and Caicos Islands",
    "506 Satterfield Tunnel Apt. 953, San Marino",
    "Virtual Meeting Room",
    "Conference Center",
    "Company Headquarters",
  ];

  const eventTitles = [
    "Design Conference",
    "Weekend Festival",
    "Glastonbury Festival",
    "Ultra Europe 2019",
    "Product Planning Meeting",
    "Team Standup",
    "Client Presentation",
    "Code Review Session",
    "Marketing Campaign Review",
    "Quarterly Business Review",
  ];

  const eventColors = {
    conference: "#3B82F6", // Blue
    festival: "#F59E0B", // Orange
    meeting: "#10B981", // Green
    reminder: "#EF4444", // Red
    other: "#8B5CF6", // Purple
  };

  const type = faker.helpers.arrayElement(eventTypes);
  const startDate = faker.date.between({
    from: new Date(2024, 9, 1), // October 2024
    to: new Date(2024, 9, 31),
  });

  const hour = faker.number.int({ min: 8, max: 18 });
  const minute = faker.number.int({ min: 0, max: 59 });
  const startTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  const endHour = Math.min(hour + faker.number.int({ min: 1, max: 3 }), 23);
  const endTime = `${endHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

  // Generate attendees
  const attendeeCount = faker.number.int({ min: 1, max: 5 });
  const attendees: CalendarAttendee[] = Array.from(
    { length: attendeeCount },
    (_, index) => ({
      id: `attendee-${id}-${index}`,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: `https://i.pravatar.cc/150?img=${parseInt(id) + index}`,
      status: faker.helpers.arrayElement(["accepted", "declined", "pending"]),
    }),
  );

  return {
    id,
    title: faker.helpers.arrayElement(eventTitles),
    description: faker.lorem.paragraph(),
    date: startDate.toISOString().split("T")[0],
    time: startTime,
    endTime: endTime,
    location: faker.helpers.arrayElement(locations),
    type,
    attendees,
    color: eventColors[type],
  };
};

export const calendarEvents: CalendarEvent[] = Array.from(
  { length: 15 },
  (_, index) => generateCalendarEvent((index + 1).toString()),
);

export const eventTypes = [
  "All",
  "conference",
  "festival",
  "meeting",
  "reminder",
  "other",
];

export const eventColors = {
  conference: "#3B82F6",
  festival: "#F59E0B",
  meeting: "#10B981",
  reminder: "#EF4444",
  other: "#8B5CF6",
};

// Settings Mock Data
export const userProfile: UserProfile = {
  id: "user-001",
  firstName: "Giorgi",
  lastName: "Jobava",
  email: "giorgi.jobava03@gmail.com",
  phoneNumber: "+372 5353 8485",
  avatar: avatarImg.src,
  role: "Frontend Developer",
  department: "Engineering",
  bio: "Passionate Frontend Developer with experience in React, TypeScript, and modern web technologies. Skilled in creating responsive, user-friendly interfaces and working with various development tools and frameworks.",
  location: "Tartu, Estonia",
  timezone: "Europe/Tallinn",
  language: "Georgian, English, Russian",
  joinDate: "2023-01-15",
};

export const notificationSettings: NotificationSettings = {
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
  marketingEmails: false,
  securityAlerts: true,
  taskReminders: true,
  meetingReminders: true,
  projectUpdates: true,
};

export const securitySettings: SecuritySettings = {
  twoFactorAuth: true,
  sessionTimeout: 480, // 8 hours in minutes
  passwordChangeRequired: false,
  lastPasswordChange: "2024-09-15",
  activeSessions: [
    {
      id: "session-001",
      device: "MacBook Pro",
      browser: "Chrome 120.0",
      location: "Tartu, Estonia",
      ipAddress: "192.168.1.100",
      lastActive: "2024-10-15T14:30:00Z",
      isCurrent: true,
    },
    {
      id: "session-002",
      device: "iPhone 15",
      browser: "Safari Mobile",
      location: "Tbilisi, Georgia",
      ipAddress: "192.168.1.101",
      lastActive: "2024-10-15T12:15:00Z",
      isCurrent: false,
    },
    {
      id: "session-003",
      device: "iPad Air",
      browser: "Safari",
      location: "Tbilisi, Georgia",
      ipAddress: "192.168.1.102",
      lastActive: "2024-10-14T18:45:00Z",
      isCurrent: false,
    },
  ],
};

export const appearanceSettings: AppearanceSettings = {
  theme: "system",
  language: "Georgian",
  timezone: "Asia/Tbilisi",
  dateFormat: "DD/MM/YYYY",
  timeFormat: "24h",
  compactMode: false,
};

export const privacySettings: PrivacySettings = {
  profileVisibility: "team",
  showOnlineStatus: true,
  allowDirectMessages: true,
  showEmail: false,
  showPhoneNumber: false,
  activityTracking: true,
};

export const billingInfo: BillingInfo = {
  plan: "Pro Plan",
  billingCycle: "monthly",
  nextBillingDate: "2024-11-15",
  paymentMethod: {
    type: "card",
    last4: "4242",
    expiryDate: "12/27",
  },
  billingHistory: [
    {
      id: "inv-001",
      date: "2024-10-15",
      amount: 29.99,
      description: "Pro Plan - Monthly",
      status: "paid",
      invoice: "INV-2024-001",
    },
    {
      id: "inv-002",
      date: "2024-09-15",
      amount: 29.99,
      description: "Pro Plan - Monthly",
      status: "paid",
      invoice: "INV-2024-002",
    },
    {
      id: "inv-003",
      date: "2024-08-15",
      amount: 29.99,
      description: "Pro Plan - Monthly",
      status: "paid",
      invoice: "INV-2024-003",
    },
  ],
};

// Profile-specific data
export const profileStats = {
  tasksCompleted: 89,
  projectsActive: 4,
  teamMembers: 6,
  experienceYears: 2,
};

export const profileAchievements = [
  {
    id: "1",
    title: "React & TypeScript Mastery",
    date: "2024-09-15",
    description:
      "Successfully delivered multiple complex React applications with TypeScript, implementing modern patterns and best practices",
    icon: "⚛️",
  },
  {
    id: "2",
    title: "UI/UX Excellence Award",
    date: "2024-08-20",
    description:
      "Recognized for creating exceptional user experiences with responsive design and intuitive interfaces",
    icon: "🎨",
  },
  {
    id: "3",
    title: "Code Quality Champion",
    date: "2024-07-10",
    description:
      "Established coding standards and mentored team members in clean code practices and component architecture",
    icon: "💻",
  },
  {
    id: "4",
    title: "Performance Optimization Expert",
    date: "2024-06-01",
    description:
      "Improved application performance by 40% through code optimization and modern techniques",
    icon: "⚡",
  },
  {
    id: "5",
    title: "Modern Frontend Architecture",
    date: "2024-05-15",
    description:
      "Led migration to Next.js and implemented modern development workflows with Git and CI/CD",
    icon: "🏗️",
  },
];

export const profileActivities = [
  {
    id: "1",
    type: "task" as const,
    title: "Completed Admin Dashboard Enhancement",
    description:
      "Built responsive admin dashboard with React, TypeScript, and Tailwind CSS",
    timestamp: "2024-10-15T14:30:00Z",
    status: "completed" as const,
  },
  {
    id: "2",
    type: "review" as const,
    title: "Component Architecture Review",
    description:
      "Reviewed and optimized React component structure for better maintainability",
    timestamp: "2024-10-15T11:45:00Z",
    status: "completed" as const,
  },
  {
    id: "3",
    type: "meeting" as const,
    title: "Frontend Team Standup",
    description:
      "Discussed progress on responsive design implementation and Next.js migration",
    timestamp: "2024-10-15T09:00:00Z",
    status: "completed" as const,
  },
  {
    id: "4",
    type: "project" as const,
    title: "React Component Library",
    description:
      "Developing reusable component library with TypeScript and Storybook",
    timestamp: "2024-10-14T16:20:00Z",
    status: "in-progress" as const,
  },
  {
    id: "5",
    type: "task" as const,
    title: "Mobile Responsiveness Testing",
    description:
      "Tested and optimized mobile experience across different devices and browsers",
    timestamp: "2024-10-14T10:15:00Z",
    status: "completed" as const,
  },
  {
    id: "6",
    type: "task" as const,
    title: "Performance Optimization",
    description:
      "Implemented code splitting and lazy loading to improve page load times",
    timestamp: "2024-10-13T13:00:00Z",
    status: "completed" as const,
  },
];

export const profileSkills = [
  "React",
  "TypeScript",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "SCSS/Sass",
  "Next.js",
  "Node.js",
  "Git",
  "GitHub",
  "Responsive Design",
  "UI/UX Design",
  "Figma",
  "VS Code",
  "Webpack",
  "Vite",
  "REST APIs",
  "Component Libraries",
  "Testing (Jest)",
];
