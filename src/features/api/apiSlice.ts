import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

import { prefGlobal } from "../../preferences";

const dynamicBaseQuery: BaseQueryFn<string | FetchArgs,
  unknown,
  FetchBaseQueryError> = async (args, WebApi, extraOptions) => {
  const baseUrl = prefGlobal.apiUrl;
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: headers => {
      if (
        prefGlobal.authMethod === "token" &&
        prefGlobal.authToken
      ) {
        headers.set(
          "Authorization",
          `Bearer ${prefGlobal.authToken}`
        );
      }
  
      return headers;
    }
  });
  return rawBaseQuery(args, WebApi, extraOptions);
};

export const apiSlice = createApi({
  baseQuery: dynamicBaseQuery,
  endpoints: builder => ({}),
  reducerPath: "api",
  refetchOnMountOrArgChange: true,
  tagTypes: [], // add tag types when needed to utilize the cache, see https://redux-toolkit.js.org/rtk-query/api/createApi#tagtypes
});
