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
    }),
    updateEnvironment: builder.mutation({
      query(data) {
        const { namespace, name, description } = data;
        return {
          url: `/environment/${namespace}/${name}/`,
          method: "PUT",
          body: {
            description
          }
        };
      }
    })
  })
});

export const {
  useGetEnviromentsQuery,
  useGetEnviromentQuery,
  useUpdateEnvironmentMutation
} = environmentsApiSlice;
