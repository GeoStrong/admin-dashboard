"use client";

import Navbar from "@/components/general/nav/navbar";
import Header from "@/components/general/header";
import React from "react";
import { usePathname } from "next/navigation";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  if (isLandingPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <Navbar />
      <main className="main-position relative rounded-xl bg-gray-100 p-5 dark:bg-dark-100 md:ml-3">
        {children}
      </main>
    </>
  );
};

export default RootLayout;
