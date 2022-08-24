import { IApiResponse } from "src/common/interfaces";
import { Build } from "src/common/models";
import { apiSlice } from "../api";

export const environmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getEnviroments: builder.query<IApiResponse<Build[]>, void>({
      query: () => "/build/"
    }),
    getEnviroment: builder.query<IApiResponse<Build>, number>({
      query: environmentId => `/build/?environment_id=${environmentId}`
    })
  })
});

export const { useGetEnviromentsQuery, useGetEnviromentQuery } =
  environmentsApiSlice;
