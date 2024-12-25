"use client";

import React, { useEffect, useState } from "react";
import InboxMailTools from "./inbox-mail-tools";
import InboxMessages from "./inbox-messages";
import InboxSearchInput from "./inbox-search-input";
import { useAppDispatch, useAppSelector } from "@/lib/store/redux-hooks";
import { InboxMessageState, RandomMessages } from "@/lib/dummy-database";
import InboxPagination from "./inbox-pagination";
import {
  divideMessagesPage,
  searchMessagesByQuery,
} from "@/lib/functions/functions";
import { useEffectOnce } from "react-use";
import { activeSlugAction } from "@/lib/store/active-slug-slice";
import InboxContainer from "./inbox-container";
import useInboxTools from "@/lib/hooks/useInboxTools";
import useLocation from "@/lib/hooks/useLocation";

const InboxDesktopContent: React.FC<{
  activeTab: string;
  searchResult: string;
}> = ({ activeTab, searchResult }) => {
  const dispatch = useAppDispatch();
  const [displayTools, setDisplayTools] = useState(false);
  const [messagesCheckboxState, setMessagesCheckboxState] =
    useState<InboxMessageState>();
  const [dividedMessages, setDividedMessages] = useState<RandomMessages[][]>(
    [],
  );
  const [activePage, setActivePage] = useState<number>(1);
  const messages = useAppSelector(
    (state) => state.inboxMessages[`${activeTab}Messages`],
  );

  const { markSpamMessages, markImportantMessages, deleteMessages } =
    useInboxTools();

  useEffectOnce(() => {
    dispatch(activeSlugAction.addInboxSlugName(activeTab));
  });

  useEffect(() => {
    return setDividedMessages(
      divideMessagesPage(
        searchResult && searchResult !== ""
          ? searchMessagesByQuery(messages, searchResult)
          : messages,
      ),
    );
  }, [messages, searchResult]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePage]);

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
    <InboxContainer className="mx-2 hidden flex-col justify-between md:flex md:w-2/3">
      <div className="">
        <div className="border-gray-150 block items-center justify-between border border-x-0 border-t-0 p-3 dark:border-dark-150 md:p-6 lg:flex">
          <div className="lg:w-1/2">
            <InboxSearchInput />
          </div>
          <div className={`${displayTools ? "block" : "hidden"}`}>
            {activeTab !== "bin" && (
              <InboxMailTools
                display={displayTools}
                functions={[markSpam, markImportant, markTrash]}
              />
            )}
          </div>
        </div>
        {dividedMessages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-lg font-bold text-gray-500 dark:text-gray-400">
              {process.env.NEXT_PUBLIC_NO_MESSAGES}
            </p>
          </div>
        ) : (
          <InboxMessages
            messageCheckStatus={messagesCheckboxState}
            setMessageCheckStatus={setMessagesCheckboxState}
            dividedMessages={dividedMessages[activePage - 1]}
            displayTools={displayTools}
            setDisplayTools={setDisplayTools}
          />
        )}
      </div>
      {dividedMessages.length !== 0 && (
        <InboxPagination
          messages={dividedMessages}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      )}
    </InboxContainer>
  );
};
export default InboxDesktopContent;
