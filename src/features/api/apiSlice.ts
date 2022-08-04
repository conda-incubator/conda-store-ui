import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// auth token generated from http://localhost:5000/conda-store/user/
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: headers => {
    headers.set(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTk2ODM3NDEsInByaW1hcnlfbmFtZXNwYWNlIjoiYWRtaW4iLCJyb2xlX2JpbmRpbmdzIjp7ImRlZmF1bHQvKiI6WyJ2aWV3ZXIiXSwiZmlsZXN5c3RlbS8qIjpbInZpZXdlciJdLCIqLyoiOlsiYWRtaW4iXX19.ix4dD6Z70MVxfK7uPELlHQ2ebOI7UXLhW-d2fW600MY"
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
