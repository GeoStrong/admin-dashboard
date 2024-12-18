"use client";

import React, { useState } from "react";
import InboxMessages from "./inbox-messages";
import InboxComposeButton from "./inbox-compose-button";
import InboxMailTools from "./inbox-mail-tools";
import { RandomMessages } from "@/lib/dummy-database";

interface InboxMobileContentProps {
  messages: RandomMessages[];
}

const InboxMobileContent: React.FC<InboxMobileContentProps> = ({
  messages,
}) => {
  const [isMessageChecked, setIsMessageChecked] = useState(false);

  return (
    <div className="relative md:hidden">
      <div
        className={`${isMessageChecked ? "block" : "hidden"} sticky top-28 z-10`}
      >
        <InboxMailTools isChecked={isMessageChecked} />
      </div>
      <div className="">
        <InboxMessages
          isChecked={isMessageChecked}
          setIsChecked={setIsMessageChecked}
          messages={messages}
        />
      </div>
      <div className="fixed bottom-10 right-5">
        <InboxComposeButton />
      </div>
    </div>
  );
};
export default InboxMobileContent;
