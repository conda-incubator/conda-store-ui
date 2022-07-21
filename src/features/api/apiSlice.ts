import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "" //replace with actual API url when we start working with it
});

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: [], //when needed add the models that we get from the api here so they can be put in cache
  endpoints: () => ({}),
  baseQuery
});
