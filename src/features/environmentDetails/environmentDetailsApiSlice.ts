import { ApiResponse } from "src/common/interfaces";
import { Build } from "src/common/models/Build";
import { apiSlice } from "../api";

export const environmentDetailsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBuild: builder.query<ApiResponse<Build>, number>({
      query: buildId => `/build/${buildId}`
    })
  })
});

export const { useGetBuildQuery } = environmentDetailsApiSlice;
