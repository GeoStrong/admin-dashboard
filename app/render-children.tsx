"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import StoreProvider from "./store-provider";
import LoadingProgressBar from "@/components/general/loading-progress-bar";

const RenderChildren: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted ? (
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
            <LoadingProgressBar>{children}</LoadingProgressBar>
          </StoreProvider>
        </ThemeProvider>
      ) : null}
    </>
  );
};
export default RenderChildren;
