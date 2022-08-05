import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/conda-store/api/v1", // hardcoded for now
  prepareHeaders: headers => {
    headers.set(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTk3MjM3NjYsInByaW1hcnlfbmFtZXNwYWNlIjoianVhbmpvIiwicm9sZV9iaW5kaW5ncyI6eyJkZWZhdWx0LyoiOlsidmlld2VyIl0sImZpbGVzeXN0ZW0vKiI6WyJ2aWV3ZXIiXSwiKi8qIjpbImFkbWluIl19fQ.88CYzHnhCeppKFZHj-pS5idBnnQKhTIC7zNqlLP0T7M"
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
