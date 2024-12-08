"use client";

import { useLocation as useReactUseLocation } from "react-use";

const useLocation = () => {
  const location = useReactUseLocation();

  return { pathname: location.pathname, location };
};
export default useLocation;
