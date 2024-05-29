"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ActiveLink = ({ link }) => {
  const pathname = usePathname();
  const activeLink = pathname === link.href;

  return (
    <>
      <motion.li
        key={link.name}
        className={`mb-4 rounded-lg text-dark-100 dark:text-white ${activeLink ? "active-link text-white" : ""}`}
      >
        <Link href={link.href} className={`flex items-center gap-4 p-4 `}>
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
