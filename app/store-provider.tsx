"use client";

import React, { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store/store";
import { EnhancedStore } from "@reduxjs/toolkit";

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const storeRef = useRef<EnhancedStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
