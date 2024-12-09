"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const ThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children, ...props }) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default ThemeProvider;
