import { apiSlice } from "../api";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAuth: builder.query<any, void>({
      query: () => "/api/v1/permission/"
    }),
    logout: builder.mutation({
      query: (logoutUrl: string) => ({
        url: logoutUrl,
        method: "POST"
      })
    }),
    login: builder.mutation({
      query: (loginUrl: string) => ({
        url: loginUrl,
        method: "GET"
      })
    })
  })
});

export const { useLazyGetAuthQuery, useLogoutMutation, useLoginMutation } =
  authApiSlice;
