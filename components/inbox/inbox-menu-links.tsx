"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import useLocation from "@/lib/hooks/useLocation";
import { mailMenu } from "@/lib/dummy-database";
import { MotionDiv, MotionLI } from "../motion/motion";
import { useAppSelector } from "@/lib/store/redux-hooks";

const InboxMenuLinks: React.FC = () => {
  const { pathname } = useLocation();
  const [isMounted, setIsMounted] = useState(false);
  const inboxMessages = useAppSelector((state) => state.inboxMessages);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const getMessageQuantity = (name: string): number => {
    let quantity = 0;
    Object.keys(inboxMessages).forEach((key) => {
      if (key.split("Messages")[0] === name.toLocaleLowerCase()) {
        quantity = inboxMessages[key].length;
      }
    });

    return quantity;
  };

  return (
    <ul className="mt-5 flex w-full flex-col gap-3">
      {mailMenu.map((item) => (
        <MotionLI key={item.name}>
          <Link
            href={item.href}
            className={`hover:active-mail-link relative flex w-full items-center justify-between rounded-md px-5 py-3 transition-all hover:text-links-background dark:hover:text-links-background
              ${
                pathname.split("/").includes(item.href.split("/")[3])
                  ? "active-mail-link text-links-background"
                  : "text-dark-100 dark:text-white"
              }
                `}
          >
            {pathname.split("/").includes(item.href.split("/")[3]) && (
              <MotionDiv
                layoutId="active"
                className="active-link-background absolute left-0 h-full w-full rounded-md"
              ></MotionDiv>
            )}
            <span className="flex items-center gap-3">
              {item.icon}
              <span>{item.name}</span>
            </span>
            <span className="text-sm font-thin md:hidden lg:block">
              {getMessageQuantity(
                item.name === "Inbox" ? "primary" : item.name,
              )}
            </span>
          </Link>
        </MotionLI>
      ))}
    </ul>
  );
};

export default InboxMenuLinks;
