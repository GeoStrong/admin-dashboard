"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/store/redux-hooks";
import InboxMessages from "./inbox-messages";
import InboxComposeButton from "./inbox-compose-button";
import InboxMailTools from "./inbox-mail-tools";
import { CheckboxState, RandomMessages } from "@/lib/dummy-database";

const InboxMobileContent: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  const [displayTools, setDisplayTools] = useState(false);
  const [messagesCheckboxState, setMessagesCheckboxState] =
    useState<CheckboxState>();

  const messages = useAppSelector(
    (state) => state.inboxMessages[`${activeTab || "inbox"}Messages`],
  );

  return (
    <div className="relative md:hidden">
      <div
        className={`${displayTools ? "block" : "hidden"} sticky top-28 z-10`}
      >
        <InboxMailTools display={displayTools} />
      </div>
      <div className="">
        {messages && (
          <InboxMessages
            messageCheckStatus={messagesCheckboxState}
            setMessageCheckStatus={setMessagesCheckboxState}
            dividedMessages={messages}
            displayTools={displayTools}
            setDisplayTools={setDisplayTools}
          />
        )}
      </div>
      <div className="fixed bottom-10 right-5">
        <InboxComposeButton />
      </div>
    </div>
  );
};
export default InboxMobileContent;
