import { IApiResponse } from "src/common/interfaces";
import { Environment } from "src/common/models";
import { apiSlice } from "../api";

export const environmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getEnviroments: builder.query<IApiResponse<Environment[]>, void>({
      query: () => "/build/"
    }),
    getEnviroment: builder.query<IApiResponse<Environment>, number>({
      query: environmentId => `/build/?environment_id=${environmentId}`
    })
  })
});

export const { useGetEnviromentsQuery, useGetEnviromentQuery } =
  environmentsApiSlice;
