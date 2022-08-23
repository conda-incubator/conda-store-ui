import { apiSlice } from "../api";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: (body: { username: string; password: string }) => ({
        url: "/login",
        method: "POST",
        body
      })
    })
  })
});

export const { useLoginMutation } = authApiSlice;
