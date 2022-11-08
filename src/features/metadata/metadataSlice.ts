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
  currentBuildStatus: string;
}

const initialState: IBuildState = {
  enviroments: [],
  builds: [],
  page: 1,
  count: 0,
  size: 0,
  currentBuild: { id: undefined },
  currentBuildStatus: ""
};

export const enviromentsSlice = createSlice({
  name: "environments",
  initialState,
  reducers: {
    currentBuildIdChanged: (
      state,
      action: PayloadAction<number | undefined>
    ) => {
      state.currentBuild.id = action.payload;
    },
    buildStatusChanged: (state, action: PayloadAction<any>) => {
      state.currentBuildStatus = action.payload;
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

export const { currentBuildIdChanged, buildStatusChanged } =
  enviromentsSlice.actions;
