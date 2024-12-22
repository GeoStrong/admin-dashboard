import { FormEvent } from "react";
import { RandomMessages, ReactDispatchState } from "../dummy-database";

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
