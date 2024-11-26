import React from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { PrefContext } from "./preferences";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * React Hook to prefix API routes with the base API URL
 *
 * @param {string} route - A route in the API
 * @return {string}
 *
 * @example
 *    apiUrl = "/conda-store"
 *    useApiUrl("api/v1/namespace")
 *    "/conda-store/api/v1/namespace"
 */
export const useApiUrl = (route: string): string => {
  const { apiUrl } = React.useContext(PrefContext);
  return (
    // remove slash from end (if there is one)
    apiUrl.replace(/\/$/, "") +
    "/" +
    // remove slash from start (if there is one)
    route.replace(/^\//, "")
  );
};
