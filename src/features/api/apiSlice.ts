import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/conda-store/api/v1",
  // token added from http://localhost:5000/conda-store/user/
  prepareHeaders: headers => {
    headers.set(
      "Authorization",
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTkwMTkyMTksInByaW1hcnlfbmFtZXNwYWNlIjoiYWRtaW4iLCJyb2xlX2JpbmRpbmdzIjp7ImRlZmF1bHQvKiI6WyJ2aWV3ZXIiXSwiZmlsZXN5c3RlbS8qIjpbInZpZXdlciJdLCIqLyoiOlsiYWRtaW4iXX19.mHIZeDuKkY7aO4Bq8QFnaL5wZFYE2E_PK_9cj9OgTNY"
    );

    return headers;
  }
});

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: [], // add tag types when needed to utilize the cache, see https://redux-toolkit.js.org/rtk-query/api/createApi#tagtypes
  endpoints: builder => ({
    getBuild: builder.query<any, void>({
      query: () => "/build/1"
    }),
    getStatus: builder.query<any, void>({
      query: () => "/"
    })
  }),
  baseQuery
});

export const { useGetBuildQuery, useGetStatusQuery } = apiSlice;
