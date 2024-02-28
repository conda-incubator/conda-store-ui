import { IApiResponse } from "../../common/interfaces";
import { Environment } from "../../common/models";
import { apiSlice } from "../api";

export const environmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    fetchEnvironments: builder.query<
      IApiResponse<Environment[]>,
      { search: string }
    >({
      query: dto => `/api/v1/environment/?search=${dto.search}`
    })
  })
});

export const { useLazyFetchEnvironmentsQuery } = environmentsApiSlice;
