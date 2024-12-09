"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import useLocation from "@/lib/hooks/useLocation";
import { mailMenu } from "@/lib/dummy-database";
import { MotionDiv, MotionLI } from "../motion/motion";

const InboxMenuLinks: React.FC = () => {
  const { location } = useLocation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ul className="mt-5 flex w-full flex-col gap-3">
      {mailMenu.map((item) => (
        <MotionLI key={item.name}>
          <Link
            href={item.href}
            className={`hover:active-mail-link relative flex w-full items-center justify-between rounded-md px-5 py-3 transition-all hover:text-links-background
              ${
                item.hash === location.hash
                  ? "active-mail-link text-links-background"
                  : "text-dark-100 dark:text-white"
              }
                `}
          >
            {item.hash === location.hash && (
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
              {item.quantity}
            </span>
          </Link>
        </MotionLI>
      ))}
    </ul>
  );
};

export default InboxMenuLinks;
