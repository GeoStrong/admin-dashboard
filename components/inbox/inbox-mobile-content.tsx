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

const InboxMobileContent: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  const [displayTools, setDisplayTools] = useState(false);
  const [messagesCheckboxState, setMessagesCheckboxState] =
    useState<InboxMessageState>();
  const messages = useAppSelector(
    (state) => state.inboxMessages[`${activeTab}Messages`],
  );
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    dispatch(activeSlugAction.addInboxSlugName(activeTab));
  });

  return (
    <InboxContainer className="relative md:hidden">
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
    </InboxContainer>
  );
};
export default InboxMobileContent;
