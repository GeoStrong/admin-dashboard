"use client";

import { ReactNode } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const LoadingProgressBar: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <>
      {children}
      <ProgressBar height="4px" color="#4880ff" shallowRouting />
    </>
  );
};
export default LoadingProgressBar;
