"use client";

import React from "react";
import Link from "next/link";
import { Links } from "@/lib/dummy-database";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { MotionDiv, MotionLI } from "@/components/motion/motion";

const ActiveLink: React.FC<{ link: Links }> = ({ link }) => {
  const pathname = usePathname();
  const activeLink = pathname.includes(link.hrefName);

  return (
    <>
      <MotionLI
        key={link.name}
        className={`rounded-lg text-dark-100 dark:text-white md:mb-4 ${activeLink ? "active-link animate-fade-left text-white" : ""}`}
      >
        <Link
          href={link.href}
          className={`flex items-center gap-4 px-2 py-4 md:p-4 `}
        >
          {link.icon} {link.name}
        </Link>
        {activeLink && (
          <MotionDiv
            layoutId="underline"
            className="active-underline"
          ></MotionDiv>
        )}
      </MotionLI>
    </>
  );
};
export default ActiveLink;
