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

// // TODO: fix for jlab
// // const apiLocal = "http://localhost:5000/conda-store";
// const baseQuery = fetchBaseQuery({
//   baseUrl: process.env.REACT_APP_API_URL,
//   credentials: "include",
//   prepareHeaders: headers => {
//     if (
//       process.env.REACT_APP_AUTH_METHOD === "token" &&
//       process.env.REACT_APP_AUTH_TOKEN
//     ) {
//       headers.set(
//         "Authorization",
//         `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`
//       );
//     }

//     return headers;
//   }
// });

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: [], // add tag types when needed to utilize the cache, see https://redux-toolkit.js.org/rtk-query/api/createApi#tagtypes
  endpoints: builder => ({}),
  baseQuery: dynamicBaseQuery,
});
