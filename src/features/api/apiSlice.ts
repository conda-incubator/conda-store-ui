import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/conda-store/api/v1",
  prepareHeaders: headers => {
    headers.set(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTk1MTA0NDcsInByaW1hcnlfbmFtZXNwYWNlIjoiYWRtaW4iLCJyb2xlX2JpbmRpbmdzIjp7ImRlZmF1bHQvKiI6WyJ2aWV3ZXIiXSwiZmlsZXN5c3RlbS8qIjpbInZpZXdlciJdLCIqLyoiOlsiYWRtaW4iXX19.I_v2DakGtQDh-qanCMS8-Bw691NO4L-NV6euT-e9kHY"
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
