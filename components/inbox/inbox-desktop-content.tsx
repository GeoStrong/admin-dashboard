"use client";

import React, { useState } from "react";
import InboxMailTools from "./inbox-mail-tools";
import InboxMessages from "./inbox-messages";
import InboxSearchInput from "./inbox-search-input";

const InboxDesktopContent: React.FC = () => {
  const [isMessageChecked, setIsMessageChecked] = useState(false);

  return (
    <div className="mt-2 hidden rounded-xl bg-gray-200 dark:bg-dark-50 md:block md:w-2/3">
      <div className="block items-center justify-between p-3 md:p-6 lg:flex">
        <div className="lg:w-1/2">
          <InboxSearchInput />
        </div>
        <div className={`${isMessageChecked ? "block" : "hidden"}`}>
          <InboxMailTools isChecked={isMessageChecked} />
        </div>
      </div>
      <InboxMessages
        isChecked={isMessageChecked}
        setIsChecked={setIsMessageChecked}
      />
    </div>
  );
};
export default InboxDesktopContent;
