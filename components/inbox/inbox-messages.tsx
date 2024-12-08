"use client";

import MailStarredIcon from "@/public/svg/mail-icons/mail-starred-icon";

import { Checkbox } from "../general/UI/checkbox";
import { Button } from "../general/UI/button";
import React, { useState } from "react";
import { useLongPress } from "react-use";
import useScreenSize from "@/lib/hooks/useScreenSize";

const InboxMessages: React.FC<{
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
}> = ({ isChecked, setIsChecked }) => {
  const [isStarred, setIsStarred] = useState(false);
  const { isXsm, isSm } = useScreenSize();

  const onLongPress = () => {
    console.log("calls callback after long pressing 300ms");
  };

  const defaultOptions = {
    isPreventDefault: true,
    delay: 300,
  };
  const longPressEvent = useLongPress(onLongPress, defaultOptions);

  return (
    <div className="mt-3 flex flex-col">
      <div
        className={`flex items-center justify-between gap-3 rounded-lg rounded-b-none border border-x-0 border-t-0 border-gray-300 p-4 transition-all ${isChecked && "bg-gray-300 dark:bg-dark-150"}`}
      >
        <div className="flex items-center gap-5">
          <Checkbox
            className="hidden border-2 border-gray-400 data-[state=checked]:border-black data-[state=checked]:text-gray-200 dark:data-[state=checked]:border-white dark:data-[state=checked]:bg-white dark:data-[state=checked]:text-dark-50 md:block"
            onClick={() => {
              setIsChecked(!isChecked);
            }}
          />
          <Button
            className="bg-transparent p-0 hover:bg-transparent"
            onClick={() => {
              setIsStarred(!isStarred);
            }}
          >
            <MailStarredIcon starred={isStarred} />
          </Button>
          <div className="flex flex-col items-start justify-start gap-2 md:flex-row md:items-center lg:gap-16">
            <h3 className="font-bold">George</h3>
            <p className="text-gray-600 dark:text-gray-500">
              Lorem ipsum, dolor sit amet consectetur
            </p>
          </div>
        </div>
        <div className="text-xs">15 Aug</div>
        {(isXsm || isSm) && (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "transparent" }}
            {...longPressEvent}
          ></div>
        )}
      </div>
    </div>
  );
};
export default InboxMessages;
