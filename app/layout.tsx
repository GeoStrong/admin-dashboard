import { Nunito_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import React from "react";
import RenderChildren from "./render-children";

export const metadata = {
  title: "DashStack",
  description: "Generated by create next app",
};

const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={cn(
          "grid-main bg-background font-sans antialiased",
          nunito_sans.variable,
        )}
        suppressHydrationWarning={true}
      >
        <RenderChildren>{children}</RenderChildren>
      </body>
    </html>
  );
};

export default RootLayout;
