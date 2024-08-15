"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const LoadingProgressBar = ({ children }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#4880ff"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};
export default LoadingProgressBar;
