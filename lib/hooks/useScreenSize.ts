"use client";

import { useState, useEffect } from "react";

const useScreenSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { width, height } = windowSize;

  const isXsm = width < 640;
  const isSm = width >= 640 && width < 768;
  const isMd = width >= 768 && width < 1024;
  const isLg = width >= 1024 && width < 1280;
  const isXl = width >= 1280 && width < 1536;
  const is2xl = width >= 1536;

  const isMobile = isXsm || isSm;

  return { width, height, isXsm, isSm, isMd, isLg, isXl, is2xl, isMobile };
};

export default useScreenSize;
