"use client";

import { useDispatch, useSelector, useStore } from "react-redux";
import { AppDispatch, AppStore, RootState } from "./store";
// import { AppDispatch, RootState } from "./store";

// export const useAppDispatch = useDispatch.withTypes();
// export const useAppSelector = useSelector.withTypes();
// export const useAppStore = useStore.withTypes();

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
