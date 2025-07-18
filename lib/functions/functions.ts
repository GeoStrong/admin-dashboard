import { faker } from "@faker-js/faker";
import { DateRange } from "react-day-picker";
import { getProducts } from "../actions/getAsyncData";
import {
  CalendarEvent,
  InboxMessageState,
  Invoice,
  MessageTexts,
  Product,
  RandomMessages,
  ReactDispatchState,
  TeamMember,
} from "../types/types";
import { ExtFile } from "@files-ui/react";

export const divideMessagesPage = (
  messages: RandomMessages[],
): RandomMessages[][] => {
  const dividedMessages: RandomMessages[][] = [];
  let i = 0;
  let j = 0;
  while (i < messages.length) {
    dividedMessages.push(messages.slice(i, i + 10));
    i += 10;
    j++;
  }

  return dividedMessages;
};

export const retrieveDate = (date: string, condition?: boolean) => {
  const dateObj = new Date(date);

  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(condition ? {} : { year: "numeric" }),
  });
};

export const toggleMessageStatus = (
  id: string,
  setStatusFnc: ReactDispatchState,
  newState: boolean,
) => {
  setStatusFnc((prevState) => ({
    ...prevState,
    [id]: newState,
  }));
};

export const isSender = (msg: string) => {
  return msg === "sender";
};

export const getTime = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getYear = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
  });
};

export const getSelectedMessages = (
  messagesCheckboxState: InboxMessageState,
) => {
  return Object.keys(messagesCheckboxState).filter(
    (key) => messagesCheckboxState[key],
  );
};

export const stringifyBlobObject = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;
      localStorage.setItem("audioBlob", base64String);
      resolve(base64String); // Return the Base64 string
    };

    reader.onerror = (error) => {
      console.error("Error reading Blob: ", error);
      reject(error);
    };

    reader.readAsDataURL(blob); // Convert Blob to Base64
  });
};

export const retrieveBlobFromLocalStorage = (
  base64String: string,
): Blob | null => {
  // Decode Base64 and recreate the Blob
  const byteString = atob(base64String.split(",")[1]);
  const mimeType = base64String.split(",")[0].split(":")[1].split(";")[0];

  const byteNumbers = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    byteNumbers[i] = byteString.charCodeAt(i);
  }

  return new Blob([byteNumbers], { type: mimeType });
};

export const strungifyFileObject = async (
  attachment: ExtFile,
): Promise<string> => {
  const base64File = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(attachment.file); // Convert File to Base64
  });

  const fileObject = {
    ...attachment,
    file: base64File,
  };

  return JSON.stringify(fileObject);
};

export const decodeFileObject = (fileObject: string) => {
  const { file: base64File, name, type, size, id } = JSON.parse(fileObject);

  const byteString = atob(base64File.split(",")[1]);
  const byteNumbers = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    byteNumbers[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([byteNumbers], { type });

  const recreatedFile: {
    id: string | number;
    name: string;
    type: string;
    file: File;
  } = {
    id,
    name,
    type,
    file: new File([blob], name, { type }),
  };

  return recreatedFile;
};

export const checkIsMessageAudio = (msg: MessageTexts) =>
  msg.text.startsWith("data:audio/webm");

export const checkIsAttachmentImage = (attachment: string) =>
  attachment.startsWith("image/");

export const isIOS = () => {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
};

export const sortMessagesByDate = (messages: RandomMessages[]) => {
  return messages.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};

export const searchMessagesByQuery = (
  messages: RandomMessages[],
  query: string,
) => {
  return messages.filter((message) => {
    const sender = Object.values(message.sender).join(" ");
    const messageValues = Object.values(message).join(" ").concat(sender);
    return messageValues.toLowerCase().includes(query.toLowerCase());
  });
};

export const clearSearchValue = (
  inputEl: HTMLInputElement,
  handleSearchClear: () => void,
) => {
  inputEl.value = "";
  handleSearchClear();
};

export const retrieveCategories = async () => {
  const { categories } = await getProducts();
  return categories;
};

export const makeFirstLetterUppercase = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const formatDateRange = (range: DateRange): string => {
  if (!range.from || !range.to) return "Select Date Range";
  const format = (date: Date) => date.toLocaleDateString();
  return `${format(range.from)} - ${format(range.to)}`;
};

export const assignDateToProducts = (products: Product[]) =>
  products.map((product) => {
    const start = new Date(2015, 0, 1).getTime();
    const end = new Date().getTime();
    const randomDate = new Date(
      start + Math.random() * (end - start),
    ).toLocaleDateString();

    return {
      ...product,
      date: randomDate,
    };
  });

export const assignAddressToProducts = (products: Product[]) =>
  products.map((product) => {
    const randomStreet = faker.location.streetAddress();
    const randomCity = faker.location.city();
    const randomState = faker.location.state();
    const randomCountry = faker.location.country();
    const randomAddress = `${randomStreet}, ${randomCity}, ${randomState}, ${randomCountry}`;

    return {
      ...product,
      address: randomAddress,
    };
  });

export const assignStatusToProducts = (products: Product[]) =>
  products.map((product) => {
    const randomStatus: Product["status"] =
      Math.random() < 0.33
        ? "completed"
        : Math.random() < 0.5
          ? "processing"
          : "rejected";

    return {
      ...product,
      status: randomStatus,
    };
  });

export const getStatusColor = (status: Invoice["status"]) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "overdue":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "draft":
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  }
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Team Functions
export const filterTeamMembers = (
  members: TeamMember[],
  filters: { department: string; status: string; search: string },
): TeamMember[] => {
  return members.filter((member) => {
    const matchesDepartment =
      filters.department === "All" || member.department === filters.department;
    const matchesStatus =
      filters.status === "All" || member.status === filters.status;
    const matchesSearch =
      !filters.search ||
      `${member.firstName} ${member.lastName}`
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      member.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      member.position.toLowerCase().includes(filters.search.toLowerCase());

    return matchesDepartment && matchesStatus && matchesSearch;
  });
};

export const paginateTeamMembers = (
  members: TeamMember[],
  currentPage: number,
  itemsPerPage: number,
): TeamMember[] => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return members.slice(startIndex, endIndex);
};

export const getTotalTeamPages = (
  totalMembers: number,
  itemsPerPage: number,
): number => {
  return Math.ceil(totalMembers / itemsPerPage);
};

// Calendar Functions
export const filterCalendarEvents = (
  events: CalendarEvent[],
  filters: { type: string; search: string },
): CalendarEvent[] => {
  return events.filter((event) => {
    const matchesType = filters.type === "All" || event.type === filters.type;
    const matchesSearch =
      !filters.search ||
      event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      event.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      event.location.toLowerCase().includes(filters.search.toLowerCase());

    return matchesType && matchesSearch;
  });
};

export const getEventsForDate = (
  events: CalendarEvent[],
  date: string,
): CalendarEvent[] => {
  return events.filter((event) => event.date === date);
};

export const getEventsForMonth = (
  events: CalendarEvent[],
  year: number,
  month: number,
): CalendarEvent[] => {
  return events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month;
  });
};

export const formatEventTime = (time: string, endTime?: string): string => {
  if (endTime) {
    return `${time} - ${endTime}`;
  }
  return time;
};

export const getCalendarDays = (year: number, month: number): Date[] => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const days: Date[] = [];
  const endDate = new Date(lastDay);
  endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    days.push(new Date(date));
  }

  return days;
};

export const formatCalendarDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const isSameMonth = (
  date: Date,
  year: number,
  month: number,
): boolean => {
  return date.getFullYear() === year && date.getMonth() === month;
};
