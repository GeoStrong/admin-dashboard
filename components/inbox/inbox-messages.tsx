"use client";

import MailStarredIcon from "@/public/svg/mail-icons/mail-starred-icon";

import { Checkbox } from "../general/UI/checkbox";
import { Button } from "../general/UI/button";
import React, { useEffect, useState } from "react";
import { useLongPress } from "react-use";
import useScreenSize from "@/lib/hooks/useScreenSize";
import { CheckboxState, RandomMessages } from "@/lib/dummy-database";

interface InboxMessagesProps {
  messageCheckStatus: CheckboxState | boolean;
  setMessageCheckStatus: React.Dispatch<React.SetStateAction<CheckboxState>>;
  dividedMessages: RandomMessages[];
  displayTools: boolean;
  setDisplayTools: (display: boolean) => void;
}

const InboxMessages: React.FC<InboxMessagesProps> = ({
  messageCheckStatus,
  setMessageCheckStatus,
  dividedMessages,
  displayTools,
  setDisplayTools,
}) => {
  const [isStarred, setIsStarred] = useState(false);
  const { isXsm, isSm } = useScreenSize();

  const isMobile = isXsm || isSm;

  const toggleMessageCheckStatus = (id: string) => {
    setMessageCheckStatus((prevState) => ({
      ...prevState,
      [id]: !messageCheckStatus[id],
    }));
  };

  const onLongPress = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement;
    const checkedId = target.getAttribute("checked-id");

    toggleMessageCheckStatus(checkedId);
  };

  useEffect(() => {
    dividedMessages &&
      dividedMessages.map((message: RandomMessages) => {
        setMessageCheckStatus((prevState) => ({
          ...prevState,
          [message.id]: false,
        }));
      });
  }, [dividedMessages, setMessageCheckStatus]);

  useEffect(() => {
    const checkedItems =
      messageCheckStatus &&
      [messageCheckStatus].some((item) => {
        return Object.values(item).some((value) => value === true);
      });

    if (setDisplayTools === undefined) return;

    setDisplayTools(checkedItems);
  }, [messageCheckStatus, setDisplayTools]);

  const defaultOptions = {
    isPreventDefault: true,
    delay: 300,
  };

  const longPressEvent = useLongPress(onLongPress, defaultOptions);

  const retrieveDate = (date: string) => {
    const dateObj = new Date(date);

    return dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      ...(isMobile ? {} : { year: "numeric" }),
    });
  };

  return (
    <div className="mt-3 flex flex-col" suppressHydrationWarning>
      {dividedMessages &&
        dividedMessages.map((message: RandomMessages) => (
          <div key={message.id} id={message.id}>
            <div
              className={`relative flex items-center justify-between gap-3 rounded-lg rounded-b-none border border-x-0 border-t-0 border-gray-300 p-4 transition-all last:border-0 ${messageCheckStatus && messageCheckStatus[message.id] && "rounded-b-lg bg-gray-300 dark:bg-dark-150"}`}
            >
              <div className="flex items-start gap-5 md:items-center">
                <div className="z-[2] flex flex-col-reverse md:flex-row md:items-center md:gap-5">
                  <Checkbox
                    suppressHydrationWarning
                    className={`${displayTools ? "block" : "hidden"} border-2 border-gray-400 data-[state=checked]:border-black data-[state=checked]:text-gray-200 dark:data-[state=checked]:border-white dark:data-[state=checked]:bg-white dark:data-[state=checked]:text-dark-50 md:block`}
                    onClick={() => {
                      toggleMessageCheckStatus(message.id);
                    }}
                    checked={
                      messageCheckStatus !== undefined &&
                      messageCheckStatus[message.id]
                    }
                  />
                  <Button
                    className="items-start bg-transparent p-0 pt-1 hover:bg-transparent md:items-center md:pt-0"
                    onClick={() => {
                      setIsStarred(!isStarred);
                    }}
                  >
                    <MailStarredIcon starred={isStarred} />
                  </Button>
                </div>
                <div className="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center">
                  <h3 className="w-40 font-bold">{message.sender.fullname}</h3>
                  <p className="text-gray-600 dark:text-gray-500">
                    {message.text.slice(0, isMobile ? 15 : 30)}...
                  </p>
                </div>
              </div>
              <div className="text-xs">{retrieveDate(message.date)}</div>
              {isMobile && (
                <div
                  className="absolute inset-0 z-[1]"
                  checked-id={message.id}
                  style={{ backgroundColor: "transparent" }}
                  {...longPressEvent}
                ></div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};
export default InboxMessages;
