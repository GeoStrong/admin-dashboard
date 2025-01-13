"use client";

import MailStarredIcon from "@/public/svg/mail-icons/mail-starred-icon";

import { Checkbox } from "../general/UI/checkbox";
import { Button } from "../general/UI/button";
import React, { useCallback, useEffect, useState } from "react";
import { useLongPress } from "react-use";
import useScreenSize from "@/lib/hooks/useScreenSize";
import { defaultOptions, InboxMessageState } from "@/lib/dummy-database";
import { useAppDispatch, useAppSelector } from "@/lib/store/redux-hooks";
import { inboxMessagesAction } from "@/lib/store/inbox-messages-slice";
import { retrieveDate, toggleMessageStatus } from "@/lib/functions/functions";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../general/UI/avatar";
import { RandomMessages, ReactDispatchState } from "@/lib/types/types";

interface InboxMessagesProps {
  messageCheckStatus: InboxMessageState | boolean;
  setMessageCheckStatus: ReactDispatchState;
  dividedMessages: RandomMessages[];
  displayTools: boolean;
  setDisplayTools: (display: boolean) => void;
}

const InboxMessages: React.FC<InboxMessagesProps> = ({
  messageCheckStatus,
  setMessageCheckStatus,
  dividedMessages,
  displayTools,
  setDisplayTools,
}) => {
  const dispatch = useAppDispatch();
  const [starredMessages, setStarredMessages] = useState<InboxMessageState[]>();
  const [activeMessageData, setActiveMessageData] = useState<RandomMessages>();
  const { inbox } = useAppSelector((state) => state.activeSlug);
  const { isMobile } = useScreenSize();

  const findStarredMessage = useCallback(
    (id: string) => {
      return starredMessages && starredMessages[id];
    },
    [starredMessages],
  );

  useEffect(() => {
    dividedMessages &&
      dividedMessages.map((message: RandomMessages) => {
        toggleMessageStatus(message.id, setMessageCheckStatus, false);

        toggleMessageStatus(
          message.id,
          setStarredMessages,
          inbox === "starred" ? true : false,
        );
      });
  }, [dividedMessages, inbox, setMessageCheckStatus]);

  useEffect(() => {
    const checkedItems =
      messageCheckStatus &&
      [messageCheckStatus].some((item) => {
        return Object.values(item).some((value) => value === true);
      });

    if (setDisplayTools === undefined) return;

    setDisplayTools(checkedItems);
  }, [messageCheckStatus, setDisplayTools]);

  useEffect(() => {
    if (inbox === "starred" || !activeMessageData) return;
    if (findStarredMessage(activeMessageData.id)) {
      dispatch(
        inboxMessagesAction.addMessages({
          name: "starredMessages",
          data: activeMessageData,
        }),
      );
    } else {
      dispatch(
        inboxMessagesAction.removeMessage({
          name: "starredMessages",
          id: activeMessageData.id,
        }),
      );
    }
  }, [activeMessageData, dispatch, findStarredMessage, inbox]);

  const onLongPress = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement;
    const checkedId = target.getAttribute("checked-id");

    toggleMessageStatus(
      checkedId,
      setMessageCheckStatus,
      !messageCheckStatus[checkedId],
    );
  };

  const longPressEvent = useLongPress(onLongPress, defaultOptions);

  return (
    <div className="mt-3 flex flex-col" suppressHydrationWarning>
      {dividedMessages &&
        dividedMessages.map((message: RandomMessages) => (
          <div key={message.id} id={message.id}>
            <div
              className={`relative flex items-center justify-between gap-3 rounded-lg border border-x-0 border-t-0 border-gray-300 p-4 transition-all last:border-0 ${messageCheckStatus && messageCheckStatus[message.id] && "bg-gray-100 dark:bg-dark-150"}`}
            >
              <div className="flex items-start gap-5 md:items-center">
                {inbox !== "bin" && (
                  <div className="z-[2] flex flex-col-reverse md:flex-row md:items-center md:gap-5">
                    <Checkbox
                      suppressHydrationWarning
                      className={`${displayTools ? "block" : "hidden"} border-2 border-gray-400 data-[state=checked]:border-black data-[state=checked]:text-gray-200 dark:data-[state=checked]:border-white dark:data-[state=checked]:bg-white dark:data-[state=checked]:text-dark-50 md:block`}
                      onClick={() => {
                        toggleMessageStatus(
                          message.id,
                          setMessageCheckStatus,
                          !messageCheckStatus[message.id],
                        );
                      }}
                      checked={
                        messageCheckStatus !== undefined &&
                        messageCheckStatus[message.id]
                      }
                    />
                    <Button
                      className="items-start bg-transparent p-0 pt-1 hover:bg-transparent md:items-center md:pt-0"
                      onClick={() => {
                        toggleMessageStatus(
                          message.id,
                          setStarredMessages,
                          !starredMessages[message.id],
                        );
                        setActiveMessageData(message);
                      }}
                    >
                      <MailStarredIcon
                        starred={findStarredMessage(message.id)}
                      />
                    </Button>
                  </div>
                )}
                <Link
                  href={`/main/inbox/${inbox}/${message.id}`}
                  className="z-[5] flex flex-col items-start justify-start gap-2 hover:text-links-background dark:hover:text-links-background md:flex-row md:items-center"
                  onClick={() => {
                    dispatch(inboxMessagesAction.setActiveMessage(message));
                    localStorage.setItem(
                      "activeMessage",
                      JSON.stringify(message),
                    );
                  }}
                >
                  <h3 className="w-40 font-bold">{message.sender.fullname}</h3>
                  <p className="text-gray-600 dark:text-gray-500">
                    {message.text.slice(0, isMobile ? 15 : 30)}...
                  </p>
                </Link>
              </div>
              <div className="text-xs">
                {isMobile ? (
                  <Avatar>
                    <AvatarImage src={message.sender.profileImage} />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                ) : (
                  retrieveDate(message.date, isMobile)
                )}
              </div>
              {isMobile && (
                <div
                  className="absolute inset-0 z-[1]"
                  checked-id={message.id}
                  style={{ backgroundColor: "transparent" }}
                  {...longPressEvent}
                ></div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};
export default InboxMessages;
