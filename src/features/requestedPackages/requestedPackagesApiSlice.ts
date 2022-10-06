import { IApiResponse } from "src/common/interfaces";
import { BuildPackage } from "src/common/models";
import { apiSlice } from "../api";

export const requestedPackagesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPackageSuggestions: builder.query<
      IApiResponse<BuildPackage[]>,
      { page: number; size: number; search: string }
    >({
      query: dto =>
        `api/v1/package?search=${dto.search}&page=${dto.page}&size=${dto.size}`
    })
  })
});

export const { useLazyGetPackageSuggestionsQuery } = requestedPackagesApiSlice;
