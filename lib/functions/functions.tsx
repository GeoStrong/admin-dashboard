import { FormEvent } from "react";
import {
  InboxMessageState,
  RandomMessages,
  ReactDispatchState,
} from "../dummy-database";

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

export const storeBlobInLocalStorage = (blob: Blob): Promise<string> => {
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
  // const mimeType = base64String.split(",")[0].split(":")[1].split(";")[0];
  const mimeType = "audio/mpeg"; // Hardcoded for audio files

  // console.log(mimeType);

  const byteNumbers = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    byteNumbers[i] = byteString.charCodeAt(i);
  }

  return new Blob([byteNumbers], { type: mimeType });
};
