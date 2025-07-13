import { StaticImageData } from "next/image";
import { DateRange } from "react-day-picker";

type OrderFilterMenuStatus = "completed" | "processing" | "rejected";
type InboxTabParams = Promise<{ inboxTab: string }>;
type SearchParams = Promise<{ query: string }>;
export type ToolFunctions = () => void;
export type ReactDispatchState = React.Dispatch<
  React.SetStateAction<InboxMessageState | InboxMessageState[]>
>;

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

export interface ChartsSettings extends MonthSettings {
  height: string;
  name: string;
  chartComponent: JSX.Element;
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
  date?: string;
  address?: string;
  status?: "completed" | "processing" | "rejected";
}

export interface MessageTexts {
  date: string;
  from: "receiver" | "sender";
  text: string;
  attachment?: string;
  // attachment?: { file: string; name: string; type: string };
}

export interface MessageSender {
  email: string;
  fullname: string;
  profileImage: string;
}

export interface RandomMessages {
  attachment: [{ filename: string; size: string }];
  date: string;
  header: string;
  id: string;
  messages: MessageTexts[];
  sender: MessageSender;
  text: string;
}

export interface ContactProfile {
  id: string;
  profiles: MessageSender;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  profileImage?: string;
}

export interface ContactCardProps {
  contact: ContactProfile;
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

export interface OrderFilterMenuProps {
  date: React.ReactNode;
  type: Product["category"][];
  status: OrderFilterMenuStatus[];
}

export interface InboxMessageState {
  [key: string]: boolean;
}

export interface CalendarState {
  isCalendarOpen: boolean;
  setIsCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SelectedDateState {
  selectedDate: DateRange | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

export interface OrderFilterMobileProps {
  calendarState: CalendarState;
  selectedDateState: SelectedDateState;
  handleApply: () => void;
  handleFilter: (filter: string, value: string) => void;
  handleReset: () => void;
}

export interface SearchParamsProps {
  searchParams?: SearchParams;
  params: InboxTabParams;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  starred: boolean;
  order: number;
}

export type TodoFilter = "all" | "active" | "completed" | "starred";

export interface InboxMessagesProps {
  messageCheckStatus: InboxMessageState | boolean;
  setMessageCheckStatus: ReactDispatchState;
  dividedMessages: RandomMessages[];
  displayTools: boolean;
  setDisplayTools: (display: boolean) => void;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: PricingFeatureItem[];
  buttonText: string;
  buttonVariant: "outline" | "default";
  subText: string;
  isPopular?: boolean;
}

export interface PricingFeatureItem {
  text: string;
  included: boolean;
}

export interface PricingCardProps {
  plan: PricingPlan;
}

export interface InboxPaginationProps {
  messages: RandomMessages[][];
  activePage: number;
  setActivePage: (activePage: number) => void;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PricingFAQProps {
  faqs: FAQItem[];
}

export interface PricingFeatureProps {
  text: string;
  included: boolean;
}

export interface InboxToolsFunction {
  (
    messagesCheckboxState: InboxMessageState,
    setMessagesCheckboxState: (
      value: React.SetStateAction<InboxMessageState>,
    ) => void,
    messages: RandomMessages[],
    activeTab?: string,
  ): void;
}

export interface TodoListProps {
  todos: TodoItem[];
  onReorder: (todos: TodoItem[]) => void;
  onToggleComplete: (id: string) => void;
  onToggleStar: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface TodoItemComponentProps {
  todo: TodoItem;
  onToggleComplete: (id: string) => void;
  onToggleStar: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface TodoHeaderProps {
  onAddTask: () => void;
}

export interface AddTaskFormProps {
  onAddTask: (text: string) => void;
  onCancel: () => void;
}

export interface EditProductFormProps {
  product: Product;
  onSave: () => void;
  onCancel: () => void;
}

export interface PricingGridProps {
  plans: PricingPlan[];
}

export interface AddContactFormProps {
  onSubmit?: (data: ContactFormData) => void;
  onCancel?: () => void;
}

export interface ContactHeaderProps {
  onAddContact?: () => void;
  totalContacts?: number;
}

export interface ContactGridProps {
  contacts: ContactProfile[];
}

export interface ContactContainerProps {
  children: React.ReactNode;
}

export interface ContactPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalContacts: number;
  contactsPerPage: number;
  onPageSizeChange?: (pageSize: number) => void;
}

export interface ContactSearchProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  placeholder?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  baseCost: number;
  totalCost: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  from: {
    name: string;
    address: string;
  };
  to: {
    name: string;
    address: string;
  };
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
  total: number;
  status: "paid" | "pending" | "overdue" | "draft";
}

export interface InvoiceListProps {
  invoices: Invoice[];
  onSelectInvoice: (invoice: Invoice) => void;
  selectedInvoiceId?: string;
}

export interface InvoiceDetailProps {
  invoice: Invoice;
  onBack: () => void;
}

export interface InvoiceHeaderProps {
  totalInvoices: number;
  onCreateInvoice?: () => void;
  onFilterChange?: () => void;
  hasActiveFilters?: boolean;
}

export interface InvoiceFilters {
  status: Invoice["status"] | "all";
  searchTerm: string;
  dateRange: "all" | "thisMonth" | "lastMonth" | "thisYear";
  minAmount: string;
  maxAmount: string;
}

export interface InvoiceFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: InvoiceFilters) => void;
  filters: InvoiceFilters;
}

export interface CreateInvoiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateInvoice: (invoice: Omit<Invoice, "id">) => void;
}

// Team interfaces
export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  position: string;
  department: string;
  profileImage: string;
  joinDate: string;
  status: "active" | "inactive" | "on-leave";
  skills: string[];
  location: string;
}

export interface TeamFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  position: string;
  department: string;
  profileImage?: string;
  skills: string[];
  location: string;
}

export interface TeamCardProps {
  member: TeamMember;
}

export interface TeamFilters {
  department: string;
  status: string;
  search: string;
}

// Calendar interfaces
export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  type: "conference" | "festival" | "meeting" | "reminder" | "other";
  attendees: CalendarAttendee[];
  color: string;
}

export interface CalendarAttendee {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: "accepted" | "declined" | "pending";
}

export interface CalendarFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  type: CalendarEvent["type"];
  attendees: string[];
}

export interface CalendarViewType {
  view: "month" | "week" | "day";
}

export interface CalendarFilters {
  type: string;
  search: string;
}

// Settings interfaces
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  role: string;
  department: string;
  bio: string;
  location: string;
  timezone: string;
  language: string;
  joinDate: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  securityAlerts: boolean;
  taskReminders: boolean;
  meetingReminders: boolean;
  projectUpdates: boolean;
}

export interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  passwordChangeRequired: boolean;
  lastPasswordChange: string;
  activeSessions: SecuritySession[];
}

export interface SecuritySession {
  id: string;
  device: string;
  browser: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface AppearanceSettings {
  theme: "light" | "dark" | "system";
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: "12h" | "24h";
  compactMode: boolean;
}

export interface PrivacySettings {
  profileVisibility: "public" | "team" | "private";
  showOnlineStatus: boolean;
  allowDirectMessages: boolean;
  showEmail: boolean;
  showPhoneNumber: boolean;
  activityTracking: boolean;
}

export interface BillingInfo {
  plan: string;
  billingCycle: "monthly" | "yearly";
  nextBillingDate: string;
  paymentMethod: {
    type: "card" | "paypal";
    last4?: string;
    expiryDate?: string;
  };
  billingHistory: BillingTransaction[];
}

export interface BillingTransaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  status: "paid" | "pending" | "failed";
  invoice?: string;
}
