import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  credentials: "include",
  prepareHeaders: headers => {
    if (
      process.env.REACT_APP_AUTH_METHOD === "token" &&
      process.env.REACT_APP_AUTH_TOKEN
    ) {
      headers.set(
        "Authorization",
        `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`
      );
    }

    return headers;
  }
});

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: [], // add tag types when needed to utilize the cache, see https://redux-toolkit.js.org/rtk-query/api/createApi#tagtypes
  endpoints: builder => ({}),
  baseQuery
});
