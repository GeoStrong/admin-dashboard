"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MotionDiv, MotionLI } from "@/components/motion/motion";
import { Links } from "@/lib/types/types";

const ActiveLink: React.FC<{ link: Links }> = ({ link }) => {
  const pathname = usePathname();
  const router = useRouter();
  const activeLink = pathname.split("/").includes(link.hrefName.split("/")[2]);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    // Clear any authentication tokens/data here if you have them
    // For now, just redirect to login page
    router.push("/login");
  };

  const isLogout = link.name === "Logout";

  return (
    <>
      <MotionLI
        key={link.name}
        className={`rounded-lg text-dark-100 dark:text-white md:mb-4 ${activeLink ? "active-link animate-fade-left text-white" : ""}`}
      >
        {isLogout ? (
          <button
            onClick={handleLogout}
            className={`flex w-full items-center gap-4 px-2 py-4 text-left ${activeLink ? "hover:text-white" : "hover:text-links-background dark:hover:text-links-background"} md:p-4`}
          >
            {link.icon} {link.name}
          </button>
        ) : (
          <Link
            href={link.href}
            className={`flex items-center gap-4 px-2 py-4 ${activeLink ? "hover:text-white" : "hover:text-links-background dark:hover:text-links-background"} md:p-4`}
          >
            {link.icon} {link.name}
          </Link>
        )}
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
