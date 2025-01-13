"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/store/redux-hooks";
import useLocation from "@/lib/hooks/useLocation";
import InboxContainer from "./inbox-container";
import InboxMessageHeader from "./inbox-message-header";
import InboxMessageBody from "./inbox-message-body";
import InboxMessageFooter from "./inbox-message-footer";
import useScreenSize from "@/lib/hooks/useScreenSize";
import { Toaster } from "../general/UI/sonner";
import { RandomMessages } from "@/lib/types/types";

const InboxMessageDetails: React.FC = () => {
  const { activeMessage } = useAppSelector((state) => state.inboxMessages);
  const { inbox } = useAppSelector((state) => state.activeSlug);
  const [currentMessage, setCurrentMessage] = useState<RandomMessages>();
  const { pathname } = useLocation();
  const { isMobile } = useScreenSize();

  const activeInboxTab = inbox || pathname.split("/")[3];

  useEffect(() => {
    if (activeMessage) {
      setCurrentMessage(activeMessage);
    } else {
      setCurrentMessage(JSON.parse(localStorage.getItem("activeMessage")));
    }
  }, [activeMessage]);

  return (
    <InboxContainer>
      <Toaster
        richColors
        position={`${isMobile ? "top-center" : "bottom-right"}`}
      />
      <InboxMessageHeader activeTab={activeInboxTab} message={currentMessage} />
      <InboxMessageBody message={currentMessage} />
      <InboxMessageFooter />
    </InboxContainer>
  );
};
export default InboxMessageDetails;
