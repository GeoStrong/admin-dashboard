"use client";

import MailStarredIcon from "@/public/svg/mail-icons/mail-starred-icon";
import { Checkbox } from "../general/UI/checkbox";
import { Button } from "../general/UI/button";
import { useState } from "react";

const InboxMessages = () => {
  const [isStarred, setIsStarred] = useState(false);

  return (
    <div className="mt-3 flex flex-col">
      <div className="border border-x-0 border-t-0 border-gray-300 p-4">
        <div className="flex items-center gap-5">
          <Checkbox className="border-2 border-gray-400 data-[state=checked]:border-black data-[state=checked]:text-gray-200 dark:data-[state=checked]:border-white dark:data-[state=checked]:bg-white dark:data-[state=checked]:text-dark-50" />
          <Button
            className="bg-transparent p-0 hover:bg-transparent"
            onClick={() => {
              setIsStarred(!isStarred);
            }}
          >
            <MailStarredIcon starred={isStarred} />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default InboxMessages;
