import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// auth token generated from http://localhost:5000/conda-store/user/
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: headers => {
    headers.set("Authorization", `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`);

    return headers;
  }
});

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: [], // add tag types when needed to utilize the cache, see https://redux-toolkit.js.org/rtk-query/api/createApi#tagtypes
  endpoints: builder => ({}),
  baseQuery
});
