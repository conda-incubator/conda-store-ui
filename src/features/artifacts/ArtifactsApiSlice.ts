import { apiSlice } from "../api";

export const artifactsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getArtifacts: builder.query<string[], number | undefined>({
      query: buildId => `/api/v1/build/${buildId}`,
      transformResponse: (response: any) =>
        response.data.build_artifacts.map((artifact: any) => {
          return artifact.artifact_type;
        })
    })
  })
});

export const { useGetArtifactsQuery } = artifactsApiSlice;
