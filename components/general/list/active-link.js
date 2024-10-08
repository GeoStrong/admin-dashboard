"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ActiveLink = ({ link }) => {
  const pathname = usePathname();
  const activeLink = pathname.includes(link.hrefName);

  return (
    <>
      <motion.li
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
          <motion.div
            layoutId="underline"
            className="active-underline"
          ></motion.div>
        )}
      </motion.li>
    </>
  );
};
export default ActiveLink;
