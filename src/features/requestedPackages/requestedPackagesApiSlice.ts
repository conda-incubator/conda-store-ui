import { IApiResponse } from "../../common/interfaces";
import { BuildPackage } from "../../common/models";
import { apiSlice } from "../api";

export const requestedPackagesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPackageSuggestions: builder.query<
      IApiResponse<BuildPackage[]>,
      { page: number; size: number; search: string }
    >({
      query: dto =>
        `api/v1/package?search=${dto.search}&page=${dto.page}&size=${dto.size}&distinct_on=name`
    })
  })
});

export const { useLazyGetPackageSuggestionsQuery } = requestedPackagesApiSlice;
