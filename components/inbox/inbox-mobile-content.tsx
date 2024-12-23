"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/redux-hooks";
import InboxMessages from "./inbox-messages";
import InboxComposeButton from "./inbox-compose-button";
import InboxMailTools from "./inbox-mail-tools";
import { InboxMessageState } from "@/lib/dummy-database";
import { useEffectOnce } from "react-use";
import { activeSlugAction } from "@/lib/store/active-slug-slice";
import InboxContainer from "./inbox-container";
import useInboxTools from "@/lib/hooks/useInboxTools";

const InboxMobileContent: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  const [displayTools, setDisplayTools] = useState(false);
  const [messagesCheckboxState, setMessagesCheckboxState] =
    useState<InboxMessageState>();
  const messages = useAppSelector(
    (state) => state.inboxMessages[`${activeTab}Messages`],
  );
  const dispatch = useAppDispatch();
  const { markSpamMessages, markImportantMessages, deleteMessages } =
    useInboxTools();

  useEffectOnce(() => {
    dispatch(activeSlugAction.addInboxSlugName(activeTab));
  });

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
    </InboxContainer>
  );
};
export default InboxMobileContent;
