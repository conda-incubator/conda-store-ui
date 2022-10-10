import { IApiResponse } from "src/common/interfaces";
import { Namespace } from "src/common/models";
import { apiSlice } from "../api";

export const namespacesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    fetchNamespaces: builder.query<
      IApiResponse<Namespace[]>,
      { page: number; size: number }
    >({
      query: dto => `/api/v1/namespace?page=${dto.page}&size=${dto.size}`
    })
  })
});

export const { useLazyFetchNamespacesQuery } = namespacesApiSlice;
