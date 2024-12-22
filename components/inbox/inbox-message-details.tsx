"use client";

import { MdOutlineArrowBackIos } from "react-icons/md";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/lib/store/redux-hooks";
import useLocation from "@/lib/hooks/useLocation";
import { RandomMessages } from "@/lib/dummy-database";
import InboxMailTools from "./inbox-mail-tools";
import InboxContainer from "./inbox-container";
import InboxMessageHeader from "./inbox-message-header";
import InboxMessageBody from "./inbox-message-body";
import InboxMessageFooter from "./inbox-message-footer";

const InboxMessageDetails: React.FC = () => {
  const { activeMessage } = useAppSelector((state) => state.inboxMessages);
  const { inbox } = useAppSelector((state) => state.activeSlug);
  const [currentMessage, setCurrentMessage] = useState<RandomMessages>();
  const { pathname } = useLocation();

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
      <InboxMessageHeader activeTab={activeInboxTab} message={currentMessage} />
      <InboxMessageBody message={currentMessage} />
      <InboxMessageFooter />
    </InboxContainer>
  );
};
export default InboxMessageDetails;
