import { apiSlice } from "../api";

export const createEnvironment = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addEnvironment: builder.mutation({
      query: code => ({
        url: "/specification/",
        method: "POST",
        body: code
      })
    })
  })
});

export const { useAddEnvironmentMutation } = createEnvironment;
