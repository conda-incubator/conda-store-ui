import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "" // add base API url when we start working with it
});

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: [], // add tag types when needed to utilize the cache, see https://redux-toolkit.js.org/rtk-query/api/createApi#tagtypes
  endpoints: () => ({}),
  baseQuery
});
