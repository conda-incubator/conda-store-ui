import { IApiResponse } from "src/common/interfaces";
import { BuildPackage } from "src/common/models";
import { apiSlice } from "../api";

export const requestedPackageVersionApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPackageVersionSuggestions: builder.query<
      IApiResponse<BuildPackage[]>,
      { page: number; search: string }
    >({
      query: dto =>
        `api/v1/package?search=${dto.search}&exact=true&distinct_on=version&page=${dto.page}&order=desc&sort_by=version`
    })
  })
});

export const { useLazyGetPackageVersionSuggestionsQuery } =
  requestedPackageVersionApiSlice;
