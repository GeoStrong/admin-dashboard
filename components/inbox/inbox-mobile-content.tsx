"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/redux-hooks";
import InboxMessages from "./inbox-messages";
import InboxComposeButton from "./inbox-compose-button";
import InboxMailTools from "./inbox-mail-tools";
import { InboxMessageState } from "@/lib/dummy-database";
import { useEffectOnce } from "react-use";
import { activeSlugAction } from "@/lib/store/active-slug-slice";
import InboxContainer from "./inbox-container";
import useInboxTools from "@/lib/hooks/useInboxTools";
import { searchMessagesByQuery } from "@/lib/functions/functions";
import { RandomMessages } from "@/lib/types/types";

const InboxMobileContent: React.FC<{
  activeTab: string;
  searchResult: string;
}> = ({ activeTab, searchResult }) => {
  const [displayTools, setDisplayTools] = useState(false);
  const [messagesCheckboxState, setMessagesCheckboxState] =
    useState<InboxMessageState>();
  const [displayedMessages, setDisplayedMessages] = useState<RandomMessages[]>(
    [],
  );
  const messages = useAppSelector(
    (state) => state.inboxMessages[`${activeTab}Messages`],
  );
  const dispatch = useAppDispatch();
  const { markSpamMessages, markImportantMessages, deleteMessages } =
    useInboxTools();

  useEffectOnce(() => {
    dispatch(activeSlugAction.addInboxSlugName(activeTab));
  });

  useEffect(() => {
    setDisplayedMessages(
      searchResult && searchResult !== ""
        ? searchMessagesByQuery(messages, searchResult)
        : messages,
    );
  }, [messages, searchResult]);

  const markTrash = () => {
    deleteMessages(
      messagesCheckboxState,
      setMessagesCheckboxState,
      messages,
      activeTab,
    );
  };

  const markImportant = () => {
    markImportantMessages(
      messagesCheckboxState,
      setMessagesCheckboxState,
      messages,
    );
  };

  const markSpam = () => {
    markSpamMessages(messagesCheckboxState, setMessagesCheckboxState, messages);
  };

  return (
    <InboxContainer className="relative md:hidden">
      {activeTab !== "bin" && (
        <div
          className={`${displayTools ? "block" : "hidden"} sticky top-28 z-10`}
        >
          <InboxMailTools
            display={displayTools}
            functions={[markSpam, markImportant, markTrash]}
          />
        </div>
      )}
      <div className="">
        {displayedMessages.length > 0 ? (
          <InboxMessages
            messageCheckStatus={messagesCheckboxState}
            setMessageCheckStatus={setMessagesCheckboxState}
            dividedMessages={displayedMessages}
            displayTools={displayTools}
            setDisplayTools={setDisplayTools}
          />
        ) : (
          <p className="mt-3 text-center text-lg font-bold text-gray-500 dark:text-gray-400">
            {process.env.NEXT_PUBLIC_NO_MESSAGES}
          </p>
        )}
      </div>
      <div className="fixed bottom-10 right-5 z-20">
        <InboxComposeButton />
      </div>
    </InboxContainer>
  );
};
export default InboxMobileContent;
