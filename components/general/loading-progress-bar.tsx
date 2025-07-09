"use client";

import { ReactNode, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

// Import CSS globally
import "nprogress/nprogress.css";

// Configure NProgress
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3,
});

const LoadingProgressBar: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isNavigating = useRef(false);

  useEffect(() => {
    // Complete progress bar when navigation finishes
    if (isNavigating.current) {
      NProgress.done();
      isNavigating.current = false;
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    // Override default CSS styles for better visibility
    const style = document.createElement("style");
    style.textContent = `
      #nprogress {
        pointer-events: none;
      }
      
      #nprogress .bar {
        background: #4880ff !important;
        position: fixed !important;
        z-index: 9999 !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 3px !important;
        box-shadow: 0 0 2px #4880ff !important;
      }
      
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px #4880ff, 0 0 5px #4880ff;
        opacity: 1.0;
        transform: rotate(3deg) translate(0px, -4px);
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  useEffect(() => {
    // Add click event listener to all links
    const handleLinkClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const link = target.closest("a[href]") as HTMLAnchorElement;

      if (link) {
        const href = link.getAttribute("href");
        const currentPath = window.location.pathname + window.location.search;

        // Check if it's a Next.js Link (internal navigation)
        if (href && href.startsWith("/") && href !== currentPath) {
          isNavigating.current = true;
          NProgress.start();
        }
      }
    };

    // Listen for clicks on the document
    document.addEventListener("click", handleLinkClick);

    // Listen for browser back/forward navigation
    const handlePopState = () => {
      isNavigating.current = true;
      NProgress.start();
    };

    window.addEventListener("popstate", handlePopState);

    // Clean up on unmount
    return () => {
      document.removeEventListener("click", handleLinkClick);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return <>{children}</>;
};

export default LoadingProgressBar;
