import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/conda-store/api/v1",
  prepareHeaders: headers => {
    headers.set(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTk0NDIyOTMsInByaW1hcnlfbmFtZXNwYWNlIjoiYWRtaW4iLCJyb2xlX2JpbmRpbmdzIjp7ImRlZmF1bHQvKiI6WyJ2aWV3ZXIiXSwiZmlsZXN5c3RlbS8qIjpbInZpZXdlciJdLCIqLyoiOlsiYWRtaW4iXX19.sbwhJ3iZqbC1O_Ohx3Zg1_nvxcFcYw5aEozwgE1fb2Q"
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
