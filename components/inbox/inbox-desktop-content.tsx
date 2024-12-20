"use client";

import React, { useEffect, useState } from "react";
import InboxMailTools from "./inbox-mail-tools";
import InboxMessages from "./inbox-messages";
import InboxSearchInput from "./inbox-search-input";
import { useAppSelector } from "@/lib/store/redux-hooks";
import { CheckboxState, RandomMessages } from "@/lib/dummy-database";
import InboxPagination from "./inbox-pagination";
import { divideMessagesPage } from "@/lib/functions/functions";

const InboxDesktopContent: React.FC<{ activeTab: string }> = ({
  activeTab,
}) => {
  const [displayTools, setDisplayTools] = useState(false);
  const [messagesCheckboxState, setMessagesCheckboxState] =
    useState<CheckboxState>();
  const [dividedMessages, setDividedMessages] = useState<RandomMessages[][]>(
    [],
  );
  const [activePage, setActivePage] = useState<number>(1);

  const messages = useAppSelector(
    (state) => state.inboxMessages[`${activeTab || "inbox"}Messages`],
  );

  useEffect(() => {
    return setDividedMessages(divideMessagesPage(messages));
  }, [messages]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePage]);

  return (
    <div
      suppressHydrationWarning
      className="mx-2 hidden flex-col justify-between rounded-xl bg-gray-200 pb-3 dark:bg-dark-50 md:flex md:w-2/3"
    >
      <div className="">
        <div className="block items-center justify-between p-3 md:p-6 lg:flex">
          <div className="lg:w-1/2">
            <InboxSearchInput />
          </div>
          <div className={`${displayTools ? "block" : "hidden"}`}>
            <InboxMailTools display={displayTools} />
          </div>
        </div>
        {dividedMessages && (
          <InboxMessages
            messageCheckStatus={messagesCheckboxState}
            setMessageCheckStatus={setMessagesCheckboxState}
            dividedMessages={dividedMessages[activePage - 1]}
            displayTools={displayTools}
            setDisplayTools={setDisplayTools}
          />
        )}
      </div>
      <InboxPagination
        messages={dividedMessages}
        activePage={activePage}
        setActivePage={setActivePage}
      />
    </div>
  );
};
export default InboxDesktopContent;
