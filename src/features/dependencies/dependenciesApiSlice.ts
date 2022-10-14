import { IApiResponse } from "../../common/interfaces";
import { Dependency } from "../../common/models";
import { apiSlice } from "../api";

export const dependenciesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBuildPackages: builder.query<
      IApiResponse<Dependency[]>,
      { buildId: number | undefined; page: number; size: number }
    >({
      query: dto =>
        `/api/v1/build/${dto.buildId}/packages?page=${dto.page}&size=${dto.size}`,
      keepUnusedDataFor: 0
    })
  })
});

export const { useGetBuildPackagesQuery } = dependenciesApiSlice;
