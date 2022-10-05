import { IApiResponse } from "../../common/interfaces";
import { Environment } from "../../common/models";
import { apiSlice } from "../api";

export const environmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    fetchEnvironments: builder.query<
      IApiResponse<Environment[]>,
      { page: number; size: number; search: string }
    >({
      query: dto =>
        `/api/v1/environment?page=${dto.page}&size=${dto.size}&search=${dto.search}`
    })
  })
});

export const { useLazyFetchEnvironmentsQuery } = environmentsApiSlice;
