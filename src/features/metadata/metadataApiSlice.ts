import { apiSlice } from "../api";

export const environmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getEnviroments: builder.query({
      query: () => ({
        url: "/build/"
      })
    }),
    getEnviroment: builder.query({
      query: environmentId => `/build/?environment_id=${environmentId}`
    })
  })
});

export const { useGetEnviromentsQuery, useGetEnviromentQuery } =
  environmentsApiSlice;
