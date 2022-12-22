import { IApiResponse } from "../../common/interfaces";
import { Namespace } from "../../common/models";
import { apiSlice } from "../api";

export const namespacesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    fetchNamespaces: builder.query<
      IApiResponse<Namespace[]>,
      { page: number; size: number }
    >({
      query: dto => `/api/v1/namespace/?page=${dto.page}&size=${dto.size}`
    }),
    fetchPrimaryNamespace: builder.query<any, void>({
      query: () => "/api/v1/permission/"
    })
  })
});

export const {
  useLazyFetchNamespacesQuery,
  useLazyFetchPrimaryNamespaceQuery
} = namespacesApiSlice;
