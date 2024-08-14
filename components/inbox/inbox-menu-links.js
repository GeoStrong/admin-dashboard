"use client";

import { mailMenu } from "@/lib/dummy-database";
import useLocation from "@/lib/hooks/useLocation";
import Link from "next/link";

const InboxMenuLinks = () => {
  const { location } = useLocation();

  return (
    <ul className="mt-5 flex w-full flex-col gap-3">
      {mailMenu.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href}
            className={`flex w-full items-center justify-between rounded-md px-5 py-3  hover:bg-links-background hover:bg-opacity-15  ${
              item.hash === location.hash
                ? "active-mail-link text-links-background"
                : "text-dark-100 dark:text-white"
            }`}
          >
            <span className="flex items-center gap-3">
              {item.icon}
              <span>{item.name}</span>
            </span>
            <span className="text-sm font-thin md:hidden lg:block">
              {item.quantity}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default InboxMenuLinks;
