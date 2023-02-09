import { IApiResponse } from "../../common/interfaces";
import { Build } from "../../common/models/Build";
import { apiSlice } from "../api";

export const environmentDetailsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBuild: builder.query<IApiResponse<Build>, number | undefined>({
      query: buildId => `/api/v1/build/${buildId}/`,
      keepUnusedDataFor: 0
    }),
    createOrUpdate: builder.mutation({
      query: code => ({
        url: "/api/v1/specification/",
        method: "POST",
        body: code
      })
    }),
    updateBuildId: builder.mutation({
      query: ({ namespace, environment, buildId }) => ({
        url: `/api/v1/environment/${namespace}/${environment}/`,
        method: "PUT",
        body: {
          build_id: buildId
        }
      })
    })
  })
});

export const {
  useGetBuildQuery,
  useCreateOrUpdateMutation,
  useUpdateBuildIdMutation
} = environmentDetailsApiSlice;
