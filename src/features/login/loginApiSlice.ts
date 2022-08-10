import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.CONDA_STORE_LOGIN_URL,
  credentials: "include"
});

export const loginApiSlice = createApi({
  reducerPath: "login",
  baseQuery,
  endpoints: builder => ({
    login: builder.mutation({
      query: (body: { username: string; password: string }) => ({
        url: "/",
        method: "POST",
        body
      })
    })
  })
});

export const { useLoginMutation } = loginApiSlice;
