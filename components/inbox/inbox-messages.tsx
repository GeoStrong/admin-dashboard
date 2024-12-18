"use client";

import MailStarredIcon from "@/public/svg/mail-icons/mail-starred-icon";

import { Checkbox } from "../general/UI/checkbox";
import { Button } from "../general/UI/button";
import React, { useState } from "react";
import { useLongPress } from "react-use";
import useScreenSize from "@/lib/hooks/useScreenSize";
import { RandomMessages } from "@/lib/dummy-database";

interface InboxMessagesProps {
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
  messages: RandomMessages[];
}

const InboxMessages: React.FC<InboxMessagesProps> = ({
  isChecked,
  setIsChecked,
  messages,
}) => {
  const [isStarred, setIsStarred] = useState(false);
  const { isXsm, isSm } = useScreenSize();

  const isMobile = isXsm || isSm;

  const onLongPress = () => {
    setIsChecked(!isChecked);
  };

  const defaultOptions = {
    isPreventDefault: true,
    delay: 300,
  };
  const longPressEvent = useLongPress(onLongPress, defaultOptions);

  console.log(isChecked);

  const retrieveDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  };

  return (
    <div className="mt-3 flex flex-col">
      {messages.map((message) => (
        <>
          <div
            className={`flex items-center justify-between gap-3 rounded-lg rounded-b-none border border-x-0 border-t-0 border-gray-300 p-4 transition-all ${isChecked && "bg-gray-300 dark:bg-dark-150"}`}
          >
            <div className="flex items-start gap-5 md:items-center">
              <div className="z-[2] flex flex-col-reverse md:flex-row md:items-center md:gap-5">
                <Checkbox
                  className={`${isChecked ? "block" : "hidden"} border-2 border-gray-400 data-[state=checked]:border-black data-[state=checked]:text-gray-200 dark:data-[state=checked]:border-white dark:data-[state=checked]:bg-white dark:data-[state=checked]:text-dark-50 md:block`}
                  onClick={() => {
                    setIsChecked(!isChecked);
                  }}
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
                  {message.text.slice(0, 30)}...
                </p>
              </div>
            </div>
            <div className="text-xs">{retrieveDate(message.date)}</div>
            {isMobile && (
              <div
                className="absolute inset-0 z-[1]"
                style={{ backgroundColor: "transparent" }}
                {...longPressEvent}
              ></div>
            )}
          </div>
        </>
      ))}
    </div>
  );
};
export default InboxMessages;
