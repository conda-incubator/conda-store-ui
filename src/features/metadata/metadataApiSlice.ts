import { IApiResponse } from "../../common/interfaces";
import { Build } from "../../common/models";
import { apiSlice } from "../api";

export const environmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getEnviroments: builder.query<IApiResponse<Build[]>, void>({
      query: () => "/api/v1/build/"
    }),
    getEnviromentBuild: builder.query<IApiResponse<Build>, number>({
      query: environmentId => `/api/v1/build/${environmentId}/`
    }),
    getEnviroment: builder.query<IApiResponse<Build>, any>({
      query: env => `/api/v1/environment/${env.namespace.name}/${env.name}/`
    }),
    getEnviromentBuilds: builder.query<IApiResponse<Build[]>, any>({
      query: env =>
        `/api/v1/build/?namespace=${env.namespace.name}&name=${env.name}&order=desc&sort_by=scheduled_on`,
      keepUnusedDataFor: 0
    })
  })
});

export const {
  useGetEnviromentsQuery,
  useGetEnviromentQuery,
  useGetEnviromentBuildsQuery,
  useGetEnviromentBuildQuery,
  useLazyGetEnviromentBuildQuery
} = environmentsApiSlice;
