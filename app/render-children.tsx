"use client";

import ThemeProvider from "@/components/general/theme-proivder";
import React, { useEffect, useState } from "react";
import StoreProvider from "./store-provider";
import LoadingProgressBar from "@/components/general/loading-progress-bar";

const RenderChildren: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Render nothing on the server
  }

  return (
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
  );
};
export default RenderChildren;
