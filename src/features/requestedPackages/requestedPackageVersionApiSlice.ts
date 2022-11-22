import { apiSlice } from "../api";
import { IApiResponse } from "../../common/interfaces";
import { BuildPackage } from "../../common/models";

export const requestedPackageVersionApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPackageVersionSuggestions: builder.query<
      IApiResponse<BuildPackage[]>,
      { page: number; search: string }
    >({
      query: dto =>
        `api/v1/package/?search=${dto.search}&exact=true&distinct_on=version&page=${dto.page}&order=desc&sort_by=version`
    })
  })
});

export const { useLazyGetPackageVersionSuggestionsQuery } =
  requestedPackageVersionApiSlice;
