"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/redux-hooks";
import { inboxMessagesAction } from "@/lib/store/inbox-messages-slice";
import useLocation from "@/lib/hooks/useLocation";
import InboxContainer from "./inbox-container";
import InboxMessageHeader from "./inbox-message-header";
import InboxMessageBody from "./inbox-message-body";
import InboxMessageFooter from "./inbox-message-footer";
import useScreenSize from "@/lib/hooks/useScreenSize";
import { Toaster } from "../general/UI/sonner";
import { RandomMessages } from "@/lib/types/types";
import { getInboxMessagesById } from "@/lib/actions/getAsyncData";

interface InboxMessageDetailsProps {
  messageId?: string;
  inboxTab?: string;
}

const InboxMessageDetails: React.FC<InboxMessageDetailsProps> = ({
  messageId,
  inboxTab,
}) => {
  const dispatch = useAppDispatch();
  const { activeMessage } = useAppSelector((state) => state.inboxMessages);
  const { inbox } = useAppSelector((state) => state.activeSlug);
  const [currentMessage, setCurrentMessage] = useState<RandomMessages | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  const { isMobile } = useScreenSize();

  const activeInboxTab = inboxTab || inbox || pathname.split("/")[3];

  useEffect(() => {
    const loadMessage = async () => {
      if (messageId && messageId !== currentMessage?.id) {
        setLoading(true);
        try {
          const message = await getInboxMessagesById(messageId);
          if (message) {
            setCurrentMessage(message);
            dispatch(inboxMessagesAction.setActiveMessage(message));
            localStorage.setItem("activeMessage", JSON.stringify(message));
          }
        } catch (error) {
          console.error("Error loading message:", error);
        } finally {
          setLoading(false);
        }
      } else if (activeMessage) {
        setCurrentMessage(activeMessage);
      } else {
        const stored = localStorage.getItem("activeMessage");
        if (stored) {
          try {
            const parsedMessage = JSON.parse(stored);
            setCurrentMessage(parsedMessage);
          } catch (error) {
            console.error("Error parsing stored message:", error);
          }
        }
      }
    };

    loadMessage();
  }, [messageId, activeMessage, dispatch, currentMessage?.id]);

  if (loading) {
    return (
      <InboxContainer>
        <div className="flex h-64 items-center justify-center">
          <div className="text-gray-500">Loading message...</div>
        </div>
      </InboxContainer>
    );
  }

  if (!currentMessage) {
    return (
      <InboxContainer>
        <div className="flex h-64 items-center justify-center">
          <div className="text-gray-500">No message selected</div>
        </div>
      </InboxContainer>
    );
  }

  return (
    <InboxContainer>
      <Toaster
        richColors
        position={`${isMobile ? "top-center" : "bottom-right"}`}
      />
      <InboxMessageHeader activeTab={activeInboxTab} message={currentMessage} />
      <InboxMessageBody message={currentMessage} />
      <InboxMessageFooter message={currentMessage} />
    </InboxContainer>
  );
};
export default InboxMessageDetails;
