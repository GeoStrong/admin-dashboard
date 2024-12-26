import { DebouncedState } from "use-debounce";
import {
  InboxMessageState,
  MessageTexts,
  RandomMessages,
  ReactDispatchState,
} from "../dummy-database";
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
