import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Build } from "../../common/models";
import { environmentsApiSlice } from "./metadataApiSlice";

export interface IBuildState {
  enviroments: Build[];
  builds: any[];
  page: number;
  count: number;
  size: number;
  currentBuild: { id: number | undefined };
  newCurrentBuild: number | undefined;
}

const initialState: IBuildState = {
  enviroments: [],
  builds: [],
  page: 1,
  count: 0,
  size: 0,
  currentBuild: { id: undefined },
  newCurrentBuild: undefined
};

export const enviromentsSlice = createSlice({
  name: "environments",
  initialState,
  reducers: {
    currentBuildIdChanged: (
      state,
      action: PayloadAction<number | undefined>
    ) => {
      const newBuildId = action.payload;
      state.currentBuild.id = newBuildId;

      const build = state.builds.find(build => build.id === newBuildId);
      state.newCurrentBuild =
        build && build.status === "COMPLETED" ? build.id : undefined;
    },
    updateBuilds: (state, action: PayloadAction<Build[]>) => {
      state.builds = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      environmentsApiSlice.endpoints.getEnviroments.matchFulfilled,
      (state, { payload: { data } }) => {
        state.enviroments.push(...data);
      }
    );
    builder.addMatcher(
      environmentsApiSlice.endpoints.getEnviromentBuilds.matchFulfilled,
      (state, { payload: { data } }) => {
        state.builds = data;
      }
    );
  }
});

export const { currentBuildIdChanged, updateBuilds } = enviromentsSlice.actions;
