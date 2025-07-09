"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

const useLocation = () => {
  const pathname = usePathname();

  const location = useMemo(
    () => ({
      pathname,
      href: typeof window !== "undefined" ? window.location.href : "",
      origin: typeof window !== "undefined" ? window.location.origin : "",
      search: typeof window !== "undefined" ? window.location.search : "",
      hash: typeof window !== "undefined" ? window.location.hash : "",
    }),
    [pathname],
  );

  return { pathname, location };
};

export default useLocation;
