import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: headers => {
    headers.set(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTk1OTY4MjEsInByaW1hcnlfbmFtZXNwYWNlIjoiYWRtaW4iLCJyb2xlX2JpbmRpbmdzIjp7ImRlZmF1bHQvKiI6WyJ2aWV3ZXIiXSwiZmlsZXN5c3RlbS8qIjpbInZpZXdlciJdLCIqLyoiOlsiYWRtaW4iXX19.Z6HRxZ7lMTayQppox5WEzq1OeeWeww4Z-uEoOD__Mdo"
    );

    return headers;
  }
});

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: [], // add tag types when needed to utilize the cache, see https://redux-toolkit.js.org/rtk-query/api/createApi#tagtypes
  endpoints: builder => ({}),
  baseQuery
});
