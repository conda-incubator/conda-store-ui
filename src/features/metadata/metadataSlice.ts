import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Build, Environment } from "../../common/models";
import { environmentClosed, environmentOpened } from "../tabs";
import { environmentsApiSlice } from "./metadataApiSlice";

export interface IBuildState {
  enviroments: Build[];
  page: number;
  count: number;
  size: number;
  currentBuild: { id: number } | null;
}

const initialState: IBuildState = {
  enviroments: [],
  page: 1,
  count: 0,
  size: 0,
  currentBuild: null
};

export const enviromentsSlice = createSlice({
  name: "environments",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      environmentOpened.type,
      (
        state,
        action: PayloadAction<{
          environment: Environment;
          selectedEnvironmentId: number | undefined;
        }>
      ) => {
        const { environment } = action.payload;

        state.currentBuild = { id: environment.current_build_id };
      }
    );
    builder.addCase(environmentClosed, state => {
      state.currentBuild = null;
    });
    builder.addMatcher(
      environmentsApiSlice.endpoints.getEnviroments.matchFulfilled,
      (state, { payload: { data } }) => {
        state.enviroments.push(...data);
      }
    );
  }
});
